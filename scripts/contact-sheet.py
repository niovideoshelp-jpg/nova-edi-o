"""Contact sheets for visual QA; source artwork is never modified."""
from pathlib import Path
import sys
from PIL import Image, ImageDraw, ImageFont

folder=Path(sys.argv[1])
out=Path(sys.argv[2])
files=sorted(folder.glob('frame-*.png'),key=lambda p:int(p.stem.split('-')[-1]))
if len(sys.argv)>3:
    wanted={int(x) for x in sys.argv[3].split(',')}
    files=[p for p in files if int(p.stem.split('-')[-1]) in wanted]
columns=4
width,height=480,270
sheet=Image.new('RGB',(columns*width,((len(files)+columns-1)//columns)*(height+30)),'#0B1A2E')
draw=ImageDraw.Draw(sheet)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
for i,file in enumerate(files):
    x=(i%columns)*width; y=(i//columns)*(height+30)
    im=Image.open(file).convert('RGB'); im.thumbnail((width,height))
    sheet.paste(im,(x,y))
    frame=int(file.stem.split('-')[-1])
    draw.text((x+10,y+height+6),f'{frame/30:.2f}s  /  frame {frame}',font=font,fill='#F4F7FA')
out.parent.mkdir(parents=True,exist_ok=True)
sheet.save(out,quality=92)
print(f'{out}: {len(files)} frames')
