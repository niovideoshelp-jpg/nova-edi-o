"""Original deterministic ambient score and restrained transition cues. No stock media."""
from pathlib import Path
import json, wave, subprocess
import numpy as np
from PIL import Image

root=Path(__file__).resolve().parent.parent
sr=44100
duration=201.566667
rng=np.random.default_rng(734)
grain=rng.integers(0,256,(1080,1920),dtype=np.uint8)
Image.fromarray(grain).save(root/'public/grain.png')
n=int(sr*duration)
t=np.arange(n,dtype=np.float64)/sr
bed=np.zeros(n,dtype=np.float64)
# Slow D minor / Bb / F / C voicings, eight-second equal-power overlaps.
chords=[[73.416,110,146.832,174.614,220],[58.27,116.541,146.832,174.614,233.082],[65.406,130.813,164.814,196,261.626],[65.406,98,130.813,164.814,196]]
for block,start in enumerate(np.arange(-8,duration,12)):
    a=max(0,int(start*sr)); b=min(n,int((start+20)*sr)); tt=t[a:b]-start
    env=np.minimum(np.clip(tt/7,0,1),np.clip((20-tt)/7,0,1))
    env=np.sin(env*np.pi/2)**2
    pad=np.zeros(b-a)
    for j,freq in enumerate(chords[block%4]):
        pad+=(np.sin(2*np.pi*freq*tt+.17*j)+.25*np.sin(2*np.pi*(freq*1.002)*tt))*(.6 if j==0 else .20)
    bed[a:b]+=pad*env
bed*=np.minimum(np.clip(t/3,0,1),np.clip((duration-t)/3,0,1))
bed/=max(abs(bed))

def wav(path,a):
    with wave.open(str(path),'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(a,-1,1)*32767).astype('<i2').tobytes())

wav(root/'public/audio/ambient-source.wav',bed)
sfx=np.zeros(n)
timeline=json.loads((root/'data/timeline.json').read_text())
events=[(s['startFrame']/30,'whoosh') for s in timeline['scenes'] if s['index'] in [2,7,19,21,23,35,43,51,59,61]]
events +=[(107.58,'hit'),(114.70,'hit'),(123.78,'hit')]
for at,kind in events:
    length=.42 if kind=='whoosh' else .55
    u=np.arange(int(sr*length))/sr
    if kind=='whoosh':
        noise=rng.normal(0,1,len(u))
        noise=np.convolve(noise,np.ones(24)/24,mode='same')
        signal=noise*np.sin(np.pi*u/length)**2
    else:
        signal=(np.sin(2*np.pi*(100*u-28*u*u))+.14*np.sin(2*np.pi*320*u))*np.exp(-u*13)*np.minimum(u/.015,1)
    signal/=max(abs(signal))
    a=int(at*sr); b=min(n,a+len(signal));sfx[a:b]+=signal[:b-a]
wav(root/'public/audio/sfx-source.wav',sfx)
filters='[0:a]loudnorm=I=-16:TP=-1.5:LRA=9,aresample=44100,asplit=2[voice][control];[1:a]volume=-22dB[bed];[bed][control]sidechaincompress=threshold=0.02:ratio=5:attack=25:release=350[duck];[2:a]volume=-18dB[fx];[voice][duck][fx]amix=inputs=3:duration=longest:normalize=0,alimiter=limit=0.89:level=false[mix]'
subprocess.run(['ffmpeg','-y','-v','warning','-i',str(root/'public/audio/Intro.mp3'),'-i',str(root/'public/audio/ambient-source.wav'),'-i',str(root/'public/audio/sfx-source.wav'),'-filter_complex',filters,'-map','[mix]','-t',str(duration),'-c:a','libmp3lame','-b:a','256k',str(root/'public/audio/mix.mp3')],check=True)
# Compressed stems keep the public repository small; WAV sources are reproducible and ignored.
for stem in ['ambient','sfx']:
    subprocess.run(['ffmpeg','-y','-v','error','-i',str(root/f'public/audio/{stem}-source.wav'),'-c:a','libmp3lame','-b:a','192k',str(root/f'public/audio/{stem}-source.mp3')],check=True)
print('Generated original ambient score, SFX, ducked narration mix and grain.')
