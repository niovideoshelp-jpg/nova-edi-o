import fs from 'node:fs';
import crypto from 'node:crypto';
const put=(p,v)=>fs.writeFileSync(p,typeof v==='string'?v:JSON.stringify(v,null,2));
const raw=JSON.parse(fs.readFileSync('data/transcript.raw.json','utf8'));
const words=raw.segments.flatMap(s=>s.words).map((w,i)=>({id:i,text:w.word.trim().replace('Hymast','Highmast').replace('Numenor','Númenor'),startMs:Math.round(w.start*1000),endMs:Math.round(w.end*1000),timestampMs:Math.round(w.start*1000),confidence:null}));
put('data/words.json',words);
put('data/transcript.txt',raw.segments.map(s=>s.text.trim().replace('Hymast','Highmast').replace('Numenor','Númenor')).join('\n'));
// Vector geometry is authored in src/NavalGraphic.tsx and data/geography.
// trigger seconds refer to the original audio; starts are 4 frames ahead.
// Text is restricted to names, places, numbers and the closing key question.
const beats=[
[.94,'uk','United Kingdom','United','lift','course'],
[3.90,'book','','history','open','page'],
[6.32,'anchor','Royal Navy','Royal','draw','dive'],
[9.42,'sail','','centuries','sail','course'],
[12.48,'globe','','stretched','expand','orbit'],
[16.08,'crown','British Empire','vast','lift','horizon'],
[19.40,'sun','','sun','rise','iris'],
[22.76,'book',"J. R. R. Tolkien",'Tolkien','open','page'],
[25.30,'island','Númenor','island','draw','dive'],
[28.30,'compass','Middle-earth','Middle','turn','orbit'],
[31.24,'crown','','civilizations','lift','iris'],
[34.20,'island','','island','expand','course'],
[37.76,'sail','','naval','sail','horizon'],
[40.36,'quill','J. R. R. Tolkien','Tolkien','draw','page'],
[43.94,'question','','Well','rise','iris'],
[46.80,'balance','','comparison','open','course'],
[50.34,'uk','','small','lift','dive'],
[53.64,'sail','','powerful','sail','horizon'],
[56.98,'route','','every','draw','orbit'],
[60.78,'hourglass','','world','rise','iris'],
[64.00,'question','','power','expand','dive'],
[67.34,'anchor','Royal Navy','Royal','lift','horizon'],
[71.10,'medal','','remains','rise','iris'],
[74.32,'carrier-top','','carrier','draw','course'],
[77.10,'route','','away','sail','orbit'],
[80.30,'carrier','HMS Queen Elizabeth','HMS','lift','horizon'],
[83.04,'carrier-top','HMS Prince of Wales','Wales','draw','dive'],
[86.90,'flightdeck','','And','expand','course'],
[90.90,'network','','alone','open','iris'],
[93.84,'helicopter','Merlin','Merlin','rise','horizon'],
[96.14,'support','','support','sail','course'],
[98.96,'command','','command','draw','iris'],
[101.48,'submarine','','-submarine','dive','dive'],
[104.74,'shield','','very','lift','horizon'],
[107.58,'calendar','2025','2025','open','page',2025],
[111.00,'mission','Operation Highmast','Wales','draw','course'],
[114.70,'clock','8 months','eight','turn','orbit',8],
[118.54,'pacific','Indo-Pacific','Indo','expand','horizon'],
[122.08,'mediterranean','Mediterranean','Mediterranean','sail','course'],
[124.98,'jet','24 F-35Bs','F','rise','dive',24],
[128.20,'flightdeck','','largest','draw','horizon'],
[131.92,'carrier','Queen Elizabeth class',"Britain's",'lift','course'],
[135.64,'binoculars','','revealed','open','iris'],
[139.56,'uk','1','First','rise','dive',1],
[143.30,'command','','leading','draw','course'],
[146.42,'globe','','world','expand','orbit'],
[149.92,'box','','It','open','page'],
[153.10,'ammunition','','ammunition','lift','horizon'],
[156.36,'clock','','operating','turn','iris'],
[159.12,'route','','miles','sail','course'],
[162.04,'balance','2','important','rise','orbit',2],
[165.86,'alliance','','allies','open','horizon'],
[169.20,'escort','','frigates','sail','course'],
[172.04,'support','','support','lift','dive'],
[175.24,'shield','','defenses','draw','iris'],
[178.14,'network','','burden','expand','orbit'],
[181.90,'uk','United Kingdom','United','rise','horizon'],
[185.02,'independence','','own','lift','dive'],
[188.64,'question','','we','open','iris'],
[191.74,'dock','How many ships?','ships','draw','course'],
[195.26,'clock','','long','turn','orbit'],
[198.82,'pressure','','starts','rise','iris']
];
const totalFrames=6047;
const scenes=beats.map((b,i)=>{
const [at,asset,text,trigger,entry,transition,value]=b;
const word=words.reduce((best,w)=>Math.abs(w.startMs-at*1000)<Math.abs(best.startMs-at*1000)?w:best,words[0]);
const startFrame=i===0?0:Math.round(at*30)-4;
const endFrame=i===beats.length-1?totalFrames:Math.round(beats[i+1][0]*30)-4;
let textAt=at;
if(i===0)textAt=.94;
if(i===22)textAt=71.40;
if(i===26)textAt=81.98;
if(i===35)textAt=111.92;
if(i===39)textAt=123.78;
if(i===41)textAt=132.54;
if(i===50)textAt=160.62;
if(i===59)textAt=191.14;
return {id:`S${String(i+1).padStart(2,'0')}`,index:i,asset,text,trigger:word.text,wordId:word.id,triggerSeconds:at,triggerFrame:Math.round(at*30),startFrame,endFrame,durationInFrames:endFrame-startFrame,iconLeadFrames:4,iconRevealFrame:Math.round(at*30)-4,textFrame:Math.round(textAt*30),entry,transition,value:value??null,alert:i===61,
// Local subordinate transformations keep rapidly spoken lists inside a 2–4 sec shot.
variants:i===28?[{frame:Math.round(92.10*30)-4,asset:'jet',text:'F-35B'}]:i===29?[{frame:Math.round(95.16*30)-4,asset:'escort',text:''}]:i===30?[{frame:Math.round(97.82*30)-4,asset:'command',text:''}]:i===31?[{frame:Math.round(100.34*30)-4,asset:'shield',text:''}]:i===46?[{frame:Math.round(151.56*30)-4,asset:'wrench',text:''},{frame:Math.round(152.44*30)-4,asset:'fuel',text:''}]:i===47?[{frame:Math.round(153.96*30)-4,asset:'escort',text:''}]:i===52?[{frame:Math.round(169.80*30),asset:'escort',text:'Norway'},{frame:Math.round(170.44*30),asset:'escort',text:'Canada'},{frame:Math.round(171.74*30),asset:'escort',text:'Norway'}]:i===53?[{frame:Math.round(172.04*30),asset:'support',text:'Norway'}]:[]};
});
// The early carrier-name cue begins before the scene: retain it in the preceding shot.
scenes[25].variants=[{frame:Math.round(81.98*30),asset:'carrier',text:'HMS Prince of Wales'}];
// The spoken number precedes the aircraft name. Put the synchronized count in the route shot.
scenes[38].variants=[{frame:Math.round(123.78*30),asset:'mediterranean',text:'24',value:24}];
scenes[39].textFrame=scenes[39].startFrame+4;
scenes[50].text='';
scenes[49].variants=[{frame:Math.round(160.62*30),asset:'route',text:'2',value:2}];
// Final question reveal begins with its first spoken word.
scenes[58].variants=[{frame:Math.round(191.14*30),asset:'question',text:'How many ships?'}];
const timeline={fps:30,width:1920,height:1080,durationInFrames:totalFrames,durationSeconds:totalFrames/30,audioDurationSeconds:201.560813,sourceSha256:crypto.createHash('sha256').update(fs.readFileSync('public/audio/Intro.mp3')).digest('hex'),transcription:{engine:'faster-whisper small, CPU int8, beam_size=5, word_timestamps=true',reusedMatchingAudio:true,manualCorrections:['Hymast → Highmast','Numenor → Númenor'],accuracyNote:'Word timestamps are ASR estimates. Cues are frame-exact to the supplied alignment; ±3-frame acoustic accuracy is not certified.'},scenes};
put('data/timeline.json',timeline);
put('data/timeline.csv','scene,start_seconds,end_seconds,trigger,trigger_seconds,asset,text,transition\n'+scenes.map(s=>[s.id,(s.startFrame/30).toFixed(3),(s.endFrame/30).toFixed(3),s.trigger,s.triggerSeconds,s.asset,s.text,s.transition].map(x=>JSON.stringify(x)).join(',')).join('\n'));
// Authored JSX nodes let each scene be edited independently in Studio.
for(const s of scenes)put(`src/scenes/${s.id}.tsx`,`import {Scene} from '../Scene';\nimport timeline from '../../data/timeline.json';\nexport const ${s.id} = () => <Scene scene={timeline.scenes[${s.index}]} />;\n`);
const imports=scenes.map(s=>`import {${s.id}} from './scenes/${s.id}';`).join('\n');
put('src/Film.tsx',`import {AbsoluteFill, Sequence, staticFile} from 'remotion';\nimport {Audio} from '@remotion/media';\nimport {Background} from './Background';\n${imports}\nexport const Film = () => <AbsoluteFill><Background/>\n${scenes.map(s=>`<Sequence name="${s.id} · ${s.asset}" from={${s.startFrame}} durationInFrames={${s.durationInFrames}}><${s.id}/></Sequence>`).join('\n')}\n<Audio src={staticFile('audio/mix.mp3')} />\n</AbsoluteFill>;\n`);
put('src/Root.tsx',`import {Composition, Folder} from 'remotion';\nimport {Film} from './Film';\nimport './style.css';\n${imports}\nexport const RemotionRoot = () => <>\n<Composition id="RoyalNavy" component={Film} durationInFrames={6047} fps={30} width={1920} height={1080}/>\n<Folder name="Scenes">${scenes.map(s=>`\n<Composition id="${s.id}" component={${s.id}} durationInFrames={${s.durationInFrames}} fps={30} width={1920} height={1080}/>`).join('')}\n</Folder></>;\n`);
put('src/Film.tsx',fs.readFileSync('src/Film.tsx','utf8').replace(' from={0}',''));
await import('./revise-storyboard.mjs');
await import('./export-vectors.mjs');
console.log(`${scenes.length} scenes / ${words.length} words / revised cartographic and naval SVG assets`);
