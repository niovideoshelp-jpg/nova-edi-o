import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const read = (file) => JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
const runs = fs.readdirSync("out/review-part2/runs").map((name) => read(`out/review-part2/runs/${name}`));
const seek = read("out/review-part2/seek-result.json");
const render = read("data/part2/render.json");
const audio = read("data/part2/audio-render-qa.json");
const final = read("out/final-part2/frames.json");
assert.equal(render.frames, 6593);
assert.equal(render.fullDecodeExitCode, 0);
assert.equal(render.warnings.length, 0);
assert(seek.every((check) => check.match));
assert(runs.every((run) => run.warnings.length === 0));
const report = {
  composition: "RoyalNavyPart2",
  generatedAt: new Date().toISOString(),
  deliverable: render,
  stillReview: {
    frames: [...new Set(runs.flatMap((run) => run.frames))].sort((a, b) => a-b),
    method: "Rendered editorial-beat stills, chapter overlaps and targeted corrections; contact sheets and selected 1920x1080 frames inspected visually.",
    reviewedAreas: ["Framing and safe margins", "Title legibility and alignment", "Ship identity and photographic context", "Map and wave layer edges", "Valid images under overlapping transitions"],
    corrections: [
      "Separated fixed SVG placement from the carrier GSAP entry transform.",
      "Extended the Inventory water geometry to cover camera translation.",
      "Kept Type23 inside the safe margin during the renewal comparison; removed its residual offscreen silhouette.",
      "Kept Proteus credit outside its photo camera and feathered the Atlantic map lower edge."
    ]
  },
  motionReview: {
    probes: runs.filter((run) => run.motion).map((run) => ({ frameRange: run.motion.split(',').map(Number), audio: run.audio })),
    method: "H.264 probes with mixed audio; sampled temporal filmstrips inspected for continuity. Audio alignment measured against the source mix.",
    probeAudio: read("out/review-part2/audio-sync.json"),
    seekChecks: seek.map(({file, ...check}) => ({file:path.basename(file),...check}))
  },
  finalMp4Review: {decodedFrames: final.frames, preview: "docs/preview-part2.jpg", audio},
  synchronization: {
    wordCount: 590,
    editorialBeats: 74,
    chapters: 8,
    iconAnticipationFrames: 4,
    note: "Word landmarks are reviewed automatic alignment, not a manual phonetic annotation of every frame. PCM correlation separately verifies that muxing did not displace the approved mix."
  },
  checks: ["ESLint", "TypeScript noEmit", "Timeline coverage and 2–4 second editorial beats", "Deterministic GSAP initial states", "Four forward/reverse PNG hashes match", "Full final video and audio decode", "Final 1920x1080 / 30fps / 6593 frames", "Rendered audio PCM alignment"],
  priorCompositions: "Intro and Part1 composition sources and assets preserved.",
};
fs.writeFileSync("data/part2/visual-qa.json",JSON.stringify(report,null,2)+"\n");
console.log(`Part2 QA recorded: ${report.stillReview.frames.length} unique stills, ${final.frames.length} final-MP4 frames, ${seek.length} matching seek checks`);
