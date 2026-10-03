import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import crypto from 'node:crypto';

// Frozen documentary selection. Run --download-sources to fetch missing originals,
// --build to create the excerpts, or with no flag to verify files and refresh ledger.
const sources={
 iceland:{file:'out/part1-research/iceland-reel2.ogv',url:'https://upload.wikimedia.org/wikipedia/commons/5/57/Iceland_during_WW2_reel_2.ogv',page:'https://commons.wikimedia.org/wiki/File:Iceland_during_WW2_reel_2.ogv',archiveId:'40149',catalog:'https://catalog.archives.gov/id/40149',reference:'226-D-6550, Iceland (reel 2)',author:'Office of Strategic Services, Field Photographic Branch / NARA',date:'November 1941–early spring 1942',license:'Public domain — PD-USGov; 17 USC 105',licenseUrl:'https://creativecommons.org/publicdomain/mark/1.0/',description:'Naval convoy toward Halifax, air patrol and mid-ocean refueling; historical film report, not footage of Force Z.',sourceWidth:400,sourceHeight:300},
 shipyards:{file:'out/part1-research/us-shipyards-source.mp4',url:'https://archive.org/download/NPC-6318/NPC-6318.mp4',page:'https://archive.org/details/NPC-6318',catalog:'https://catalog.archives.gov/id/77824',archiveId:'77824',reference:'Naval Photographic Center 6318',author:'United States Navy / Naval Photographic Center',date:'1943-05-09',license:'Public domain — PD-USGov; 17 USC 105',licenseUrl:'https://creativecommons.org/publicdomain/mark/1.0/',description:'Cargo ships on ways and launching at Superior, Wisconsin. Source transfer includes visible archive timecode, preserved in excerpt.',sourceWidth:640,sourceHeight:360},
 arctic:{file:'out/part1-research/arctic-convoy-newsreel.mp4',url:'https://archive.org/download/1942-10-19_Big_Convoy_To_Russia/1942-10-19_Big_Convoy_To_Russia.mp4',page:'https://archive.org/details/1942-10-19_Big_Convoy_To_Russia',author:'Universal Studios / Universal Newsreel',date:'1942-10-19',license:'Public domain — item marked public domain; Universal collection rights deeded to United States',licenseUrl:'http://creativecommons.org/licenses/publicdomain/',rightsEvidence:'https://www.archives.gov/research/motion-pictures/newsreels',description:'Convoy bound for Russia off the Scandinavian north capes; NOT the Halifax Atlantic convoy. Optional source; retain Arctic date/context.'},
 pow:{...JSON.parse(fs.readFileSync('data/video-sources.json','utf8')).sources.pow,file:'out/footage-v5/prince-of-wales.mp4',license:'DVIDS PUBLIC DOMAIN / United States Navy',licenseUrl:'https://www.dvidshub.net/about/copyright',description:'Modern aircraft carrier HMS Prince of Wales R09 at Norfolk, 2023; island detail. Never identify as the battleship lost in 1941.'},
};
const shots=[
 {id:'atlantic-convoy',source:'iceland',start:194,duration:7,width:800,height:600,description:'Aerial convoy view; distant ships visible below aircraft wing.'},
 {id:'atlantic-refueling',source:'iceland',start:355,duration:7,width:800,height:600,description:'Two ships close alongside at sea for replenishment; visible wave and line movement.'},
 {id:'atlantic-air-cover',source:'iceland',start:215,duration:4,width:800,height:600,description:'Patrol flying boat in flight above convoy context. Not Japanese attack footage.'},
 {id:'us-shipyards',source:'shipyards',start:234.8,duration:5,width:640,height:360,description:'Cargo ship launches sideways into water at Superior, Wisconsin.'},
 {id:'arctic-convoy-1942',source:'arctic',start:20,duration:4,width:800,height:600,description:'Optional Arctic convoy attack/sea context; use only with correct location/date.'},
 {id:'pow-modern',source:'pow',start:106,duration:4,width:1920,height:1080,description:'R09 island and deck detail; different source interval from opening pow-arrival.'},
];
fs.mkdirSync('out/part1-research',{recursive:true});fs.mkdirSync('public/video/part1',{recursive:true});
if(process.argv.includes('--download-sources'))for(const s of Object.values(sources))if(!fs.existsSync(s.file))execFileSync('curl.exe',['-L','--fail','--silent','--show-error','--retry','3','--max-time','180','-A','RoyalNavyDocumentaryResearch/1.0',s.url,'-o',s.file],{stdio:'inherit'});
for(const shot of shots){
 shot.file=`public/video/part1/${shot.id}.mp4`;
 if(process.argv.includes('--build'))execFileSync('ffmpeg',['-hide_banner','-loglevel','warning','-y','-ss',String(shot.start),'-i',sources[shot.source].file,'-t',String(shot.duration),'-an','-vf',`setpts=PTS-STARTPTS,fps=30,tpad=stop_mode=clone:stop_duration=1,scale=${shot.width}:${shot.height}:flags=lanczos,setsar=1`,'-frames:v',String(shot.duration*30),'-c:v','libx264','-preset','veryfast','-crf','18','-threads','2','-movflags','+faststart',shot.file],{stdio:'inherit'});
 const bytes=fs.readFileSync(shot.file);shot.bytes=bytes.length;shot.sha256=crypto.createHash('sha256').update(bytes).digest('hex');
 shot.probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','stream=width,height,r_frame_rate,nb_frames,codec_name','-show_entries','format=duration','-of','json',shot.file],{encoding:'utf8'}));
 if(Number(shot.probe.streams[0].nb_frames)!==shot.duration*30)throw new Error(`Frame count mismatch: ${shot.id}`);
 console.log(`${shot.id}: ${shot.probe.format.duration}s, ${shot.probe.streams[0].nb_frames} frames`);
}
const ledgerPath='data/part1/media-sources.json';const ledger=JSON.parse(fs.readFileSync(ledgerPath,'utf8'));
ledger.retrieved='2026-10-03';ledger.videoSources=sources;ledger.video=shots;fs.writeFileSync(ledgerPath,JSON.stringify(ledger,null,2)+'\n');
