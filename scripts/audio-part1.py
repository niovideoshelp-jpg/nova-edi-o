"""Part 1: preserve narration, reuse our original score, and mix fresh restrained cues."""
from pathlib import Path
import json, subprocess, wave, shutil
import numpy as np

root=Path(__file__).resolve().parent.parent
ffmpeg=shutil.which('ffmpeg') or root/'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'
plan=json.loads((root/'data/part1/timeline.json').read_text(encoding='utf8'))
duration=plan['durationInFrames']/30
sr=44100
n=round(duration*sr)
rng=np.random.default_rng(1201)
sfx=np.zeros(n)
events=[(c['startFrame']/30,'whoosh') for c in plan['chapters'][1:]]
events += [(s['triggerFrame']/30,'hit') for s in plan['scenes'] if s.get('sound')=='hit']
for at,kind in events:
    length=.42 if kind=='whoosh' else .5
    t=np.arange(round(sr*length))/sr
    if kind=='whoosh':
        signal=np.convolve(rng.normal(0,1,len(t)),np.ones(36)/36,mode='same')*np.sin(np.pi*t/length)**2
    else:
        signal=(np.sin(2*np.pi*(92*t-23*t*t))+.09*np.sin(2*np.pi*290*t))*np.exp(-t*14)*np.minimum(t/.018,1)
    signal/=max(abs(signal))
    a=round(at*sr);b=min(n,a+len(signal))
    if a<n:sfx[a:b]+=signal[:b-a]
stem=root/'public/audio/part1/sfx-source.wav'
with wave.open(str(stem),'wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
    w.writeframes((np.clip(sfx,-1,1)*32767).astype('<i2').tobytes())
filters=f'[0:a]loudnorm=I=-16:TP=-1.5:LRA=9,aresample=44100,asplit=2[voice][control];[1:a]atrim=duration={duration},afade=t=in:st=0:d=2,afade=t=out:st={duration-3}:d=3,volume=-22dB[bed];[bed][control]sidechaincompress=threshold=0.02:ratio=5:attack=25:release=350[duck];[2:a]volume=-18dB[fx];[voice][duck][fx]amix=inputs=3:duration=longest:normalize=0,alimiter=limit=0.89:level=false,apad,atrim=duration={duration}[mix]'
subprocess.run([str(ffmpeg),'-hide_banner','-v','warning','-y','-i',str(root/'public/audio/part1/1.mp3'),'-i',str(root/'public/audio/ambient-source.mp3'),'-i',str(stem),'-filter_complex',filters,'-map','[mix]','-t',str(duration),'-c:a','libmp3lame','-b:a','256k',str(root/'public/audio/part1/mix.mp3')],check=True)
subprocess.run([str(ffmpeg),'-hide_banner','-v','error','-y','-i',str(stem),'-c:a','libmp3lame','-b:a','192k',str(stem.with_suffix('.mp3'))],check=True)
(root/'data/part1/audio-mix.json').write_text(json.dumps({'durationSeconds':duration,'narration':'public/audio/part1/1.mp3','narrationTargetLUFS':-16,'musicGainDb':-22,'sfxGainDb':-18,'ducking':{'ratio':5,'attackMs':25,'releaseMs':350},'events':events},indent=2),encoding='utf8')
print('Part 1 audio mix complete')
