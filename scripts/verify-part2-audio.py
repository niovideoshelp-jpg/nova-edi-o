"""Measure rendered audio alignment against the approved mix, independent of ASR."""
from pathlib import Path
import json, subprocess, shutil, sys
import numpy as np

root=Path(__file__).resolve().parent.parent
ffmpeg=shutil.which('ffmpeg')
if not ffmpeg: raise RuntimeError('Full FFmpeg is required')
rate=8000
def decode(file):
    result=subprocess.run([ffmpeg,'-v','error','-i',str(file),'-vn','-ac','1','-ar',str(rate),'-f','f32le','pipe:1'],capture_output=True,check=True)
    return np.frombuffer(result.stdout,dtype='<f4')
reference=decode(root/'public/audio/part2/mix.mp3')
final='--final' in sys.argv
items=[('out/RoyalNavy-Part2.mp4',0)] if final else [('out/review-part2/motion-1735-1854.mp4',1735/30),('out/review-part2/motion-5680-5860.mp4',5680/30)]
reports=[]
for name,start in items:
    rendered=decode(root/name)
    windows=[1,35,80,145,183,210] if final else [0.5]
    results=[]
    for at in windows:
        offset=round(at*rate);target=rendered[offset:offset+rate]
        expected=round((start+at)*rate)
        values=[]
        for lag in range(-400,401):
            ref=reference[expected+lag:expected+lag+len(target)]
            if len(ref)!=len(target): continue
            coefficient=float(np.dot(target,ref)/(np.linalg.norm(target)*np.linalg.norm(ref)+1e-15))
            values.append((coefficient,lag))
        coefficient,lag=max(values)
        assert coefficient>0.95,(name,at,coefficient)
        assert abs(lag)/rate<1/30,(name,at,lag)
        results.append({'atSeconds':at,'correlation':round(coefficient,6),'offsetMilliseconds':lag/rate*1000})
    reports.append({'file':name,'sourceStartSeconds':start,'checks':results})
report={'method':'PCM waveform correlation against approved mix; ±50ms search, <1 frame offset required','sampleRate':rate,'results':reports}
dest=root/('data/part2/audio-render-qa.json' if final else 'out/review-part2/audio-sync.json')
dest.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,indent=2))
