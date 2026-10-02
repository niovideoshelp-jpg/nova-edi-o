import fs from 'node:fs';
const generated={anchor:'anchor',independence:'anchor',sail:'sailing-ship',globe:'globe',route:'globe',island:'numenor',carrier:'carrier',mission:'carrier',jet:'f35b',helicopter:'merlin',box:'logistics',fuel:'logistics'};
const photos={S25:'queen-elizabeth',S28:'queen-elizabeth',S29:'daring-dauntless',S33:'merlin-hm2'};
const timeline=JSON.parse(fs.readFileSync('data/timeline.json','utf8'));
const media=(asset,scene)=>photos[scene]?{kind:'photo',file:`public/images/web/${photos[scene]}.jpg`,credits:'IMAGE-SOURCES.md'}:generated[asset]?{kind:'generated-cutout',file:`public/images/generated/${generated[asset]}.png`,prompt:'data/image-prompts.json'}:{kind:'svg',file:`public/svg/${asset}.svg`};
for(const s of timeline.scenes){s.visualMedia=media(s.asset,s.id);for(const v of s.variants)v.visualMedia=media(v.asset);}
timeline.visualRevision=2;
timeline.imageCredits='IMAGE-SOURCES.md';
fs.writeFileSync('data/timeline.json',JSON.stringify(timeline,null,2));
console.log(`${timeline.scenes.filter(s=>s.visualMedia.kind!=='svg').length} main scenes use raster imagery; 8 generated cutouts and 3 sourced photographs.`);
