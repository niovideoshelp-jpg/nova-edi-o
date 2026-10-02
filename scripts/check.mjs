import fs from 'node:fs';
import assert from 'node:assert/strict';
const t=JSON.parse(fs.readFileSync('data/timeline.json','utf8'));
const words=JSON.parse(fs.readFileSync('data/words.json','utf8'));
let prev=null;
for(const s of t.scenes){
 assert(s.durationInFrames>=60&&s.durationInFrames<=120,`${s.id}: shot length ${s.durationInFrames}`);
 assert.equal(s.triggerFrame-s.iconRevealFrame,4);
 assert(fs.existsSync(`public/svg/${s.asset}.svg`));
 assert(s.iconRevealFrame>=s.startFrame);
 assert.equal(s.triggerFrame,Math.round(words[s.wordId].startMs/1000*30));
 if(prev){assert.equal(prev.endFrame,s.startFrame);assert.notEqual(prev.asset,s.asset);assert.notEqual(prev.entry,s.entry);assert.notEqual(prev.transition,s.transition);}
 prev=s;
}
assert.equal(t.scenes[0].startFrame,0);
assert.equal(prev.endFrame,t.durationInFrames);
assert.equal(Math.ceil(t.audioDurationSeconds*30),t.durationInFrames);
console.log(`PASS: ${t.scenes.length} continuous 2–4s scenes; 4-frame icon anticipation; no adjacent repeated main assets, entries or exits; ${words.length} aligned words; audio duration covered.`);
