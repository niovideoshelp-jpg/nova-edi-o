"""Inspect decoded frames from the completed deliverable, not a separate render."""
from pathlib import Path
import subprocess,json
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parent.parent
out=root/'out/final-part1'
out.mkdir(parents=True,exist_ok=True)
video=root/'out/RoyalNavy-Part1.mp4'
ffmpeg=root/'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'
frames=[0,859,860,1698,2180,3000,3520,3608,4130,4490,4960,5389]
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18)
sheet=Image.new('RGB',(1920,900),'#0B1A2E')
draw=ImageDraw.Draw(sheet)
for i,frame in enumerate(frames):
    file=out/f'frame-{frame}.png'
    subprocess.run([str(ffmpeg),'-hide_banner','-v','error','-y','-ss',str(frame/30),'-i',str(video),'-frames:v','1',str(file)],check=True)
    im=Image.open(file).convert('RGB');im.thumbnail((480,270))
    x=(i%4)*480;y=(i//4)*300
    sheet.paste(im,(x,y));draw.text((x+12,y+276),f'{frame/30:.2f}s · {frame}',font=font,fill='#F4F7FA')
sheet.save(out/'final-contact.jpg',quality=93)
(out/'frames.json').write_text(json.dumps({'source':str(video),'frames':frames},indent=2),encoding='utf8')
print(f'Decoded {len(frames)} final-MP4 frames into {out}')
