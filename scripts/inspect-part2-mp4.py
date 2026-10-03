"""Extract representative frames from the delivered MP4, not the Studio bundle."""
from pathlib import Path
from PIL import Image, ImageDraw
import json, subprocess, shutil
root=Path(__file__).resolve().parent.parent
folder=root/'out/final-part2';folder.mkdir(parents=True,exist_ok=True)
ffmpeg=shutil.which('ffmpeg') or root/'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'
frames=[90,440,1026,1480,1995,2450,3240,3530,4066,4650,4935,5370,5595,5840,6195,6248,6479,6592]
preview=[140,653,2031,3530,4613,4779,5653,5871,6210]
selected=sorted(set(frames+preview))
select='+'.join(f'eq(n\\,{frame})' for frame in selected)
subprocess.run([str(ffmpeg),'-v','error','-y','-i',str(root/'out/RoyalNavy-Part2.mp4'),'-vf',f'select={select}','-vsync','0','-frames:v',str(len(selected)),str(folder/'selected-%02d.png')],check=True)
for i,frame in enumerate(selected,1):
    (folder/f'selected-{i:02}.png').replace(folder/f'frame-{frame}.png')
for j in range(2):
    sheet=Image.new('RGB',(1920,3*388),(11,26,46));draw=ImageDraw.Draw(sheet)
    for i,frame in enumerate(frames[j*9:j*9+9]):
        im=Image.open(folder/f'frame-{frame}.png').convert('RGB');im.thumbnail((640,360));x=(i%3)*640;y=(i//3)*388;sheet.paste(im,(x,y));draw.text((x+12,y+366),f'{frame/30:.2f}s | frame {frame}',fill='white')
    sheet.save(folder/f'final-contact-{j+1}.jpg',quality=92)
sheet=Image.new('RGB',(1920,1080),(11,26,46))
for i,frame in enumerate(preview):
    im=Image.open(folder/f'frame-{frame}.png').convert('RGB');im.thumbnail((640,360));sheet.paste(im,((i%3)*640,(i//3)*360))
sheet.save(root/'docs/preview-part2.jpg',quality=93)
(folder/'frames.json').write_text(json.dumps({'source':'out/RoyalNavy-Part2.mp4','frames':selected,'preview':preview},indent=2),encoding='utf8')
print(f'Extracted {len(selected)} frames from final MP4 and created documentation preview')
