"""Package the complete editable repository, excluding caches, render outputs and WAV intermediates."""
from pathlib import Path
import zipfile
root=Path(__file__).resolve().parent.parent
files=[]
for folder in ['src','public','data','scripts','docs']:
    files.extend(p for p in (root/folder).rglob('*') if p.is_file() and p.suffix.lower() not in ['.wav','.pyc'] and '__pycache__' not in p.parts)
files.extend(p for p in root.iterdir() if p.is_file() and (p.suffix in ['.json','.md','.ts','.js','.mjs'] or p.name in ['.gitignore','.prettierrc'] or p.name.startswith('LICENSE')))
output=root/'out'/'RoyalNavy-Part1-project.zip'
with zipfile.ZipFile(output,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=3) as z:
    for p in sorted(set(files)):
        z.write(p,Path('royal-navy-intro')/p.relative_to(root))
with zipfile.ZipFile(output) as z:
    bad=z.testzip()
    if bad:raise RuntimeError(bad)
print(f'{output}: {len(set(files))} files, {output.stat().st_size} bytes; ZIP integrity passed')
