"""Part 2 mix: original narration, crossfaded original score, sparse quiet cues."""
from pathlib import Path
import hashlib
import json
import math
import re
import shutil
import subprocess
import wave
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/audio/part2'
OUT.mkdir(parents=True, exist_ok=True)
FFMPEG = shutil.which('ffmpeg') or str(ROOT / 'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe')
FFPROBE = shutil.which('ffprobe') or str(ROOT / 'node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe')
PLAN = json.loads((ROOT / 'data/part2/timeline.json').read_text(encoding='utf-8'))
DURATION = PLAN['durationInFrames'] / PLAN['fps']
SR = 44100
N = round(DURATION * SR)
VOICE = OUT / '2.mp3'
BED = ROOT / 'public/audio/ambient-source.mp3'
EXTENDED = OUT / 'ambient-extended.wav'
MIX = OUT / 'mix.mp3'


def ffmpeg(arguments, capture=False):
    result = subprocess.run([str(FFMPEG), '-hide_banner', '-v', 'info' if capture else 'warning',
                             '-threads', '1', '-filter_threads', '1', '-filter_complex_threads', '1',
                             '-y', *arguments], check=True,
                            stdout=subprocess.PIPE if capture else None,
                            stderr=subprocess.PIPE if capture else None, text=capture)
    return result.stderr if capture else None


def probe(file):
    return json.loads(subprocess.check_output([
        str(FFPROBE), '-v', 'error', '-show_entries',
        'format=duration:stream=codec_name,sample_rate,channels,duration', '-of', 'json', str(file)
    ], text=True))


# Append one internal 30-second excerpt. A four-second equal-power crossfade
# overlaps the original end, then the extended bed is trimmed to the video.
extension = (
    '[0:a]asplit=2[main][excerpt];'
    '[main]asetpts=PTS-STARTPTS[base];'
    '[excerpt]atrim=start=60:end=90,asetpts=PTS-STARTPTS[tail];'
    '[base][tail]acrossfade=d=4:c1=qsin:c2=qsin,apad,'
    f'atrim=duration={DURATION},aresample={SR}[extended]'
)
ffmpeg(['-i', str(BED), '-filter_complex', extension, '-map', '[extended]',
        '-c:a', 'pcm_s16le', str(EXTENDED)])

rng = np.random.default_rng(1202)
sfx = np.zeros(N, dtype=np.float64)
events = [dict(atFrame=chapter['startFrame'], kind='whoosh', cueId=chapter['id'])
          for chapter in PLAN['chapters'][1:]]
events += [dict(atFrame=scene['triggerFrame'], kind='hit', cueId=scene['id'])
           for scene in PLAN['scenes'] if scene.get('sound') == 'hit']
events.sort(key=lambda event: event['atFrame'])
for event in events:
    duration = .42 if event['kind'] == 'whoosh' else .5
    t = np.arange(round(SR * duration)) / SR
    if event['kind'] == 'whoosh':
        signal = np.convolve(rng.normal(0, 1, len(t)), np.ones(36)/36, mode='same') * np.sin(np.pi*t/duration)**2
    else:
        signal = (np.sin(2*np.pi*(92*t-23*t*t))+.09*np.sin(2*np.pi*290*t))*np.exp(-t*14)*np.minimum(t/.018, 1)
    signal /= max(abs(signal))
    a = round(event['atFrame']/PLAN['fps']*SR)
    b = min(N, a+len(signal))
    if a < N:
        sfx[a:b] += signal[:b-a]
    event.update(atSeconds=event['atFrame']/PLAN['fps'], durationSeconds=duration, gainDb=-18)
stem = OUT / 'sfx-source.wav'
with wave.open(str(stem), 'wb') as wav:
    wav.setnchannels(1)
    wav.setsampwidth(2)
    wav.setframerate(SR)
    wav.writeframes((np.clip(sfx, -1, 1)*32767).astype('<i2').tobytes())

filters = (
    '[0:a]loudnorm=I=-16:TP=-1.5:LRA=9,aresample=44100,asplit=2[voice][control];'
    f'[1:a]afade=t=in:st=0:d=2,afade=t=out:st={DURATION-3}:d=3,volume=-22dB[bed];'
    '[bed][control]sidechaincompress=threshold=0.02:ratio=5:attack=25:release=350[duck];'
    '[2:a]volume=-18dB[fx];'
    '[voice][duck][fx]amix=inputs=3:duration=longest:normalize=0,'
    f'alimiter=limit=0.89:level=false,apad,atrim=duration={DURATION}[mix]'
)
ffmpeg(['-i', str(VOICE), '-i', str(EXTENDED), '-i', str(stem),
        '-filter_complex', filters, '-map', '[mix]', '-t', str(DURATION),
        '-c:a', 'libmp3lame', '-b:a', '256k', str(MIX)])
for source in [EXTENDED, stem]:
    ffmpeg(['-i', str(source), '-c:a', 'libmp3lame', '-b:a', '192k', str(source.with_suffix('.mp3'))])

analysis = ffmpeg(['-i', str(MIX), '-af', 'loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json',
                  '-f', 'null', '-'], capture=True)
matches = re.findall(r'\{[^{}]*"input_i"[^{}]*\}', analysis, flags=re.S)
measurement = json.loads(matches[-1]) if matches else {}
with wave.open(str(EXTENDED), 'rb') as wav:
    extended_seconds = wav.getnframes()/wav.getframerate()
assert abs(extended_seconds-DURATION) < 1/SR
metadata = {
    'durationInFrames': PLAN['durationInFrames'], 'fps': PLAN['fps'], 'durationSeconds': DURATION,
    'narration': 'public/audio/part2/2.mp3', 'narrationSourceSha256': hashlib.sha256(VOICE.read_bytes()).hexdigest(),
    'narrationTargetLUFS': -16, 'musicGainDb': -22, 'sfxGainDb': -18,
    'musicSource': 'public/audio/ambient-source.mp3', 'musicSourceProbe': probe(BED),
    'musicExtension': {'method': 'append internal excerpt with equal-power crossfade',
                       'excerptStartSeconds': 60, 'excerptDurationSeconds': 30,
                       'crossfadeSeconds': 4, 'curveOut': 'qsin', 'curveIn': 'qsin',
                       'extendedDurationSeconds': extended_seconds,
                       'output': 'public/audio/part2/ambient-extended.mp3'},
    'ducking': {'threshold': .02, 'ratio': 5, 'attackMs': 25, 'releaseMs': 350},
    'events': events, 'mix': 'public/audio/part2/mix.mp3', 'mixProbe': probe(MIX),
    'loudnessMeasurement': measurement,
    'reproduction': 'python scripts/audio-part2.py',
}
(ROOT / 'data/part2/audio-mix.json').write_text(json.dumps(metadata, indent=2)+'\n', encoding='utf-8')
print(f'Part 2 mix complete: {DURATION:.6f}s, {len(events)} sparse cues, 4s score crossfade.')
print('Measured mix input:', measurement)
