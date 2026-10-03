"""Transcribe Part 2 locally with cached faster-whisper small (CPU/int8).

Produces JSON word captions, segment timestamps, a readable transcript, and a
byte-for-byte audio copy. No introduction files are changed. Word/frame timing
is a model estimate and should be checked against the narration during editing.
"""

import argparse
import hashlib
import io
import json
import math
import pathlib
import re
import shutil
import subprocess
import sys
import time
import wave


ROOT = pathlib.Path(__file__).resolve().parent.parent
FPS = 30
TOTAL_FRAMES = 6593
SAMPLE_RATE = 16000


def reconcile_term_reviews(words, reviews):
    """Use independent excerpt alignments for two previously omitted terms."""
    result = [dict(word) for word in words]
    corrections = []
    normalized = lambda text: text.lower().strip('.,;:!?')
    for term, first, last, near in [
        ('aircraft', 'escort', 'submarines', 26.52),
        ('late', 'astute', 'onward', 169.47),
    ]:
        review = next(item for item in reviews if item['term'] == term)
        if not review['recognized']:
            raise ValueError(f'Independent excerpt did not resolve {term}')
        candidates = review['words']
        a = min((i for i,w in enumerate(candidates) if normalized(w['text'])==first),
                key=lambda i:abs(candidates[i]['start']-near))
        b = next(i for i in range(a,len(candidates)) if normalized(candidates[i]['text'])==last)
        start = min((i for i,w in enumerate(result) if normalized(w['text'])==first),
                    key=lambda i:abs(result[i]['start']-near))
        end = next(i for i in range(start,len(result)) if normalized(result[i]['text'])==last)
        replacement = [dict(word,alignmentSource='independent-excerpt') for word in candidates[a:b+1]]
        corrections.append({'term':term,'before':' '.join(w['text'] for w in result[start:end+1]),
                            'after':' '.join(w['text'] for w in replacement),
                            'start':replacement[0]['start'],'end':replacement[-1]['end'],
                            'method':'independent excerpt without lexical prompt'})
        result[start:end+1] = replacement
    for i,word in enumerate(result):
        if i and result[i-1]['end']>word['start']:
            overlap=result[i-1]['end']-word['start']
            if overlap>.05:
                raise ValueError(f'Unexpected alignment overlap: {overlap}')
            result[i-1]['end']=word['start']
    for i,word in enumerate(result):
        word.update(id=i,startMs=round(word['start']*1000),endMs=round(word['end']*1000),
                    timestampMs=round(word['start']*1000),
                    startFrame=math.floor(word['start']*FPS+.5),
                    endFrame=math.floor(word['end']*FPS+.5))
    rows=[]
    pending=[]
    for i,word in enumerate(result):
        pending.append(word)
        if re.search(r'[.!?]["\x27)]*$',word['text']) or i==len(result)-1:
            text=re.sub(r'\s+(-[A-Za-z])',r'\1',' '.join(w['text'] for w in pending))
            rows.append({'id':len(rows),'start':pending[0]['start'],'end':pending[-1]['end'],
                         'startFrame':pending[0]['startFrame'],'endFrame':pending[-1]['endFrame'],
                         'text':text,'words':pending})
            pending=[]
    return rows,result,corrections


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=pathlib.Path,
                        default=ROOT / "public/audio/part2/2.mp3")
    parser.add_argument("--packages", type=pathlib.Path,
                        help="Optional local pip --target directory")
    parser.add_argument("--model", default="small",
                        help="Cached model name or local snapshot directory")
    parser.add_argument("--threads", type=int, default=2)
    args = parser.parse_args()
    if args.packages:
        sys.path.insert(0, str(args.packages))

    import numpy as np
    from faster_whisper import WhisperModel

    source = args.source.resolve(strict=True)
    audio = ROOT / "public/audio/part2/2.mp3"
    output = ROOT / "data/part2"
    audio.parent.mkdir(parents=True, exist_ok=True)
    output.mkdir(parents=True, exist_ok=True)
    if source != audio.resolve():
        shutil.copyfile(source, audio)

    binary_dir = ROOT / "node_modules/@remotion/compositor-win32-x64-msvc"
    ffmpeg = binary_dir / "ffmpeg.exe"
    ffprobe = binary_dir / "ffprobe.exe"
    if not ffmpeg.exists() or not ffprobe.exists():
        raise FileNotFoundError("Install project dependencies for bundled FFmpeg")

    probe = json.loads(subprocess.check_output([
        str(ffprobe), "-v", "error", "-show_entries",
        "format=duration:stream=codec_name,sample_rate,channels,duration",
        "-of", "json", str(audio),
    ], text=True))
    duration = float(probe["format"]["duration"])
    pcm = subprocess.check_output([
        str(ffmpeg), "-v", "error", "-i", str(audio), "-vn", "-f", "wav",
        "-acodec", "pcm_s16le",
        "-ac", "1", "-ar", str(SAMPLE_RATE), "-",
    ])
    with wave.open(io.BytesIO(pcm), "rb") as wav:
        samples = wav.readframes(wav.getnframes())
    waveform = np.frombuffer(samples, dtype=np.int16).astype(np.float32) / 32768.0
    decoded_duration = len(waveform) / SAMPLE_RATE
    rows = []
    words = []
    metadata = {
        "source": "public/audio/part2/2.mp3",
        "sourceSha256": hashlib.sha256(audio.read_bytes()).hexdigest(),
        "language": "en",
        "model": "faster-whisper small",
        "device": "cpu",
        "computeType": "int8",
        "fps": FPS,
        "durationSeconds": duration,
        "decodedDurationSeconds": decoded_duration,
        "durationInFrames": TOTAL_FRAMES,
        "timingStatus": "automatic word alignment; frame numbers are estimates",
        "audioProbe": probe,
    }

    def persist(complete):
        document = {
            **metadata,
            "complete": complete,
            "transcribedThroughSeconds": rows[-1]["end"] if rows else 0,
            "wordCount": len(words),
            "text": " ".join(row["text"].strip() for row in rows),
            "segments": rows,
        }
        (output / "transcript.json").write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8")
        (output / "words.json").write_text(
            json.dumps(words, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8")
        lines = [
            f"[{row['start']:07.2f} - {row['end']:07.2f}] {row['text'].strip()}"
            for row in rows
        ]
        (output / "transcript.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")

    persist(False)
    print(f"Audio: {duration:.6f}s; decoded {decoded_duration:.6f}s; "
          f"{metadata['durationInFrames']} frames at {FPS}fps", flush=True)
    print("Loading cached small model, CPU/int8...", flush=True)
    model = WhisperModel(
        args.model, device="cpu", compute_type="int8",
        cpu_threads=args.threads, num_workers=1, local_files_only=True,
    )
    started = time.monotonic()
    segments, info = model.transcribe(
        waveform, language="en", task="transcribe", word_timestamps=True,
        beam_size=5, vad_filter=True, condition_on_previous_text=True,
    )
    metadata["languageProbability"] = info.language_probability
    metadata["durationAfterVadSeconds"] = info.duration_after_vad
    for segment in segments:
        segment_words = []
        for word in segment.words or []:
            start = round(float(word.start), 4)
            end = round(float(word.end), 4)
            item = {
                "id": len(words),
                "text": word.word.strip(),
                "start": start,
                "end": end,
                "startMs": round(start * 1000),
                "endMs": round(end * 1000),
                "timestampMs": round(start * 1000),
                "confidence": round(float(word.probability), 6),
                "startFrame": math.floor(start * FPS + 0.5),
                "endFrame": math.floor(end * FPS + 0.5),
            }
            words.append(item)
            segment_words.append(item)
        row = {
            "id": segment.id,
            "start": round(float(segment.start), 4),
            "end": round(float(segment.end), 4),
            "startFrame": math.floor(segment.start * FPS + 0.5),
            "endFrame": math.floor(segment.end * FPS + 0.5),
            "text": segment.text.strip(),
            "words": segment_words,
        }
        rows.append(row)
        persist(False)
        print(f"{segment.start:07.2f} - {segment.end:07.2f}: {segment.text.strip()}",
              flush=True)
    # Independent short excerpts resolve two omissions seen during planning.
    # No prompt supplies either disputed term to the recognizer.
    reviews = []
    for name, clip_start, clip_end in [("aircraft", 22.0, 30.0), ("late", 159.4, 172.1)]:
        reviewed, _ = model.transcribe(
            waveform[round(clip_start*SAMPLE_RATE):round(clip_end*SAMPLE_RATE)],
            language="en", task="transcribe", word_timestamps=True,
            beam_size=5, vad_filter=False, condition_on_previous_text=False,
        )
        reviewed_words = []
        for excerpt in reviewed:
            for word in excerpt.words or []:
                reviewed_words.append({"text":word.word.strip(),
                    "start":round(clip_start+word.start,4),
                    "end":round(clip_start+word.end,4),
                    "confidence":round(float(word.probability),6)})
        review_text=" ".join(word["text"] for word in reviewed_words)
        reviews.append({"term":name,"clipStart":clip_start,"clipEnd":clip_end,
            "text":review_text,"words":reviewed_words,
            "recognized":any(word["text"].lower().strip('.,;:!?')==name for word in reviewed_words)})
        print(f"TERM REVIEW {name}: {review_text}",flush=True)
    (output / "transcript-term-review.json").write_text(
        json.dumps({"method":"Independent local ASR excerpts, no lexical prompt", "reviews":reviews},indent=2)+"\n",encoding="utf-8")
    shutil.copyfile(output/'transcript.json',output/'transcript-raw.json')
    rows,words,corrections = reconcile_term_reviews(words,reviews)
    metadata["alignmentCorrections"] = corrections
    assert all(0 <= word["start"] <= word["end"] <= duration for word in words)
    metadata["termReview"]="data/part2/transcript-term-review.json"
    metadata["transcriptionWallSeconds"] = round(time.monotonic() - started, 3)
    persist(True)
    print(f"Complete: {len(rows)} segments, {len(words)} words in "
          f"{metadata['transcriptionWallSeconds']:.1f}s. Files: {output}", flush=True)


if __name__ == "__main__":
    main()
