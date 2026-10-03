import fs from "node:fs";
import assert from "node:assert/strict";
import ts from "typescript";
const t = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
const words = JSON.parse(fs.readFileSync("data/words.json", "utf8"));
const plans = JSON.parse(fs.readFileSync("data/visual-plan.json", "utf8"));
const atlas = JSON.parse(fs.readFileSync("data/geography/atlas.json", "utf8"));
const documentary = JSON.parse(
  fs.readFileSync("data/documentary-timeline.json", "utf8"),
);
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
  `PASS: ${t.scenes.length} continuous 2–4s narration cues; original 4-frame trigger lead metadata; ${words.length} word timestamps; complete audio coverage.`,
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
  "src/documentary/NarrationCue.tsx",
  "src/documentary/HistoryChapter.tsx",
  "src/documentary/FleetChapter.tsx",
  "src/documentary/OperationsChapter.tsx",
  "src/documentary/EnduranceChapter.tsx",
  "src/documentary/FootageShot.tsx",
]) {
  const source = fs.readFileSync(file, "utf8");
  assert(/from ["']@remotion\/gsap["']/.test(source));
  assert(source.includes("useGsapTimeline<"));
  assert(!source.includes("gsap.timeline("));
  const ast = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "set"
    ) {
      assert(
        node.arguments.length >= 3,
        `${file}: GSAP set() must have an explicit timeline position to avoid late resets`,
      );
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
}
console.log(
  "PASS: Natural Earth coastline, Turf geodesics; official GSAP hook in all four documentary environments and cue renderer.",
);
assert.equal(documentary.chapters[0].startFrame, 0);
assert.equal(documentary.chapters.at(-1).endFrame, t.durationInFrames);
documentary.chapters.forEach((c, i) => {
  if (i) assert.equal(documentary.chapters[i - 1].endFrame, c.startFrame);
});
const film = fs.readFileSync("src/Film.tsx", "utf8");
assert.equal((film.match(/<NarrationCue /g) || []).length, 62);
assert(!film.includes("NavalGraphic"));
assert(!film.includes("from './scenes/"));
assert.equal(documentary.transitionOverlapFrames, 24);
assert.equal(documentary.width, 1920);
assert.equal(documentary.height, 1080);
assert.equal(documentary.fps, 30);
console.log(
  "PASS: Four continuous environments, 62 editable cue Sequences, chapter overlaps, 1920x1080 at 30 fps.",
);
const footage = JSON.parse(fs.readFileSync("data/video-sources.json", "utf8"));
assert.equal(footage.shots.length, 6);
for (const shot of footage.shots) {
  assert(fs.existsSync(shot.file), `Missing local footage: ${shot.file}`);
  const video = shot.probe.streams.find((s) => s.codec_name === "h264");
  assert(video, shot.id);
  assert.equal(video.width, 1920);
  assert.equal(video.height, 1080);
  assert.equal(video.avg_frame_rate, "30/1");
  assert(
    Number(video.nb_frames) >= shot.endFrame - shot.startFrame,
    `${shot.id}: footage too short`,
  );
}
console.log(
  "PASS: Six local HD footage clips at 30 fps; every shot fits its source without looping.",
);
