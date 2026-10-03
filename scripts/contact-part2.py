"""QA contact sheets only: original media and rendered frames are never modified."""
from pathlib import Path
from PIL import Image, ImageDraw
import json, math
root=Path(__file__).resolve().parent.parent
folder=root/'out/review-part2'
frames=sorted(folder.glob('frame-*.png'),key=lambda p:int(p.stem.split('-')[1]))
for index in range(math.ceil(len(frames)/12)):
    page=frames[index*12:index*12+12]
    sheet=Image.new('RGB',(1920,4*388),(11,26,46))
    draw=ImageDraw.Draw(sheet)
    for i,path in enumerate(page):
        image=Image.open(path).convert('RGB');image.thumbnail((640,360))
        x=(i%3)*640;y=(i//3)*388
        sheet.paste(image,(x,y))
        f=int(path.stem.split('-')[1]);draw.text((x+12,y+366),f'{f/30:.2f}s  |  frame {f}',fill='white')
    dest=folder/f'contact-{index+1:02}.jpg';sheet.save(dest,quality=91)
    print(dest)
print(f'{len(frames)} reviewed-frame candidates')
