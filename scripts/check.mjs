import fs from "node:fs";
import assert from "node:assert/strict";
const t = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
const words = JSON.parse(fs.readFileSync("data/words.json", "utf8"));
const plans = JSON.parse(fs.readFileSync("data/visual-plan.json", "utf8"));
const atlas = JSON.parse(fs.readFileSync("data/geography/atlas.json", "utf8"));
let prev = null;
for (const s of t.scenes) {
  assert(
    s.durationInFrames >= 60 && s.durationInFrames <= 120,
    `${s.id}: shot length ${s.durationInFrames}`,
  );
  assert.equal(s.triggerFrame - s.iconRevealFrame, 4);
  const visual = plans[s.id];
  assert(!["balance", "globe"].includes(visual.name));
  assert.deepEqual(s.visualMedia, visual);
  if (visual.kind === "map")
    assert(fs.existsSync(`public/maps/${visual.name}.svg`));
  if (visual.kind === "graphic")
    assert(fs.existsSync(`public/svg-v3/${visual.name}.svg`));
  if (["cutout", "photo"].includes(visual.kind))
    assert(
      fs.existsSync(
        `public/images/${visual.kind === "photo" ? "web" : "generated"}/${visual.name}.${visual.kind === "photo" ? "jpg" : "png"}`,
      ),
    );
  assert(s.iconRevealFrame >= s.startFrame);
  assert.equal(
    s.triggerFrame,
    Math.round((words[s.wordId].startMs / 1000) * 30),
  );
  if (prev) {
    assert.equal(prev.endFrame, s.startFrame);
    assert.notEqual(plans[prev.id].name, visual.name);
    assert.notEqual(prev.entry, s.entry);
    assert.notEqual(prev.transition, s.transition);
  }
  prev = s;
}
assert.equal(t.scenes[0].startFrame, 0);
assert.equal(prev.endFrame, t.durationInFrames);
assert.equal(Math.ceil(t.audioDurationSeconds * 30), t.durationInFrames);
console.log(
  `PASS: ${t.scenes.length} continuous 2–4s scenes; 4-frame icon anticipation; no adjacent repeated main assets, entries or exits; ${words.length} aligned words; audio duration covered.`,
);
assert.equal(atlas.views.colonies.routes.length, 5);
for (const r of atlas.views.colonies.routes) {
  assert(r.kilometers > 1000);
  assert(
    Math.hypot(r.from[0] - r.samples[0][0], r.from[1] - r.samples[0][1]) < 0.01,
  );
  assert(
    Math.hypot(r.to[0] - r.samples.at(-1)[0], r.to[1] - r.samples.at(-1)[1]) <
      0.01,
  );
}
const uk = JSON.parse(
  fs.readFileSync("data/geography/british-isles-10m.json", "utf8"),
).features.find((f) => f.properties.code === "GBR");
assert(
  uk.geometry.coordinates.flat(Infinity).length > 10000,
  "Detailed UK coastline required",
);
for (const file of [
  "src/Scene.tsx",
  "src/MapAtlas.tsx",
  "src/NavalGraphic.tsx",
]) {
  const source = fs.readFileSync(file, "utf8");
  assert(/from ["']@remotion\/gsap["']/.test(source));
  assert(source.includes("useGsapTimeline<"));
  assert(!source.includes("gsap.timeline("));
}
console.log(
  "PASS: Natural Earth UK detail, five Turf geodesics and endpoints; official GSAP hook active in scene, map and SVG renderers.",
);
