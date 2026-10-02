"""Optional local reproduction of word transcription; not required for preview.
Install faster-whisper and numpy, with FFmpeg available on PATH.
"""
import json, pathlib, subprocess
import numpy as np
from faster_whisper import WhisperModel

root=pathlib.Path(__file__).resolve().parent.parent
model=WhisperModel('small',device='cpu',compute_type='int8')
pcm=subprocess.check_output(['ffmpeg','-v','error','-i',str(root/'public/audio/Intro.mp3'),'-f','f32le','-ac','1','-ar','16000','-'])
segments,info=model.transcribe(np.frombuffer(pcm,dtype=np.float32),word_timestamps=True,beam_size=5,vad_filter=True)
rows=[]
for s in segments:
    rows.append({'start':s.start,'end':s.end,'text':s.text,'words':[{'start':w.start,'end':w.end,'word':w.word} for w in s.words]})
    print(f'{s.start:.2f} - {s.end:.2f}: {s.text}',flush=True)
(root/'data/transcript.regenerated.json').write_text(json.dumps({'language':info.language,'segments':rows},ensure_ascii=False,indent=2),encoding='utf8')
print('Saved separately. Review alignment before replacing the production transcript.')
