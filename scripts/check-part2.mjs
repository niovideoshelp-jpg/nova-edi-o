import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import ts from "typescript";

const timeline = JSON.parse(
  fs.readFileSync("data/part2/timeline.json", "utf8"),
);
const transcript = JSON.parse(
  fs.readFileSync("data/part2/transcript.json", "utf8"),
);
const words = JSON.parse(fs.readFileSync("data/part2/words.json", "utf8"));
assert.equal(
  transcript.complete,
  true,
  "Transcription must cover the entire audio",
);
assert.equal(
  timeline.durationInFrames,
  Math.ceil(transcript.durationSeconds * 30),
);
assert.equal(timeline.width, 1920);
assert.equal(timeline.height, 1080);
assert.equal(timeline.fps, 30);
let end = 0;
for (const scene of timeline.scenes) {
  assert.equal(
    scene.startFrame,
    end,
    `Timeline gap/overlap before ${scene.id}`,
  );
  assert(scene.durationInFrames > 0);
  assert(words[scene.wordId], `Missing trigger word ${scene.id}`);
  assert.equal(scene.triggerFrame, words[scene.wordId].startFrame);
  assert.equal(scene.iconRevealFrame, scene.triggerFrame - 4);
  const chapter = timeline.chapters.find((c) => c.id === scene.chapter);
  assert(
    scene.triggerFrame >= chapter.startFrame &&
      scene.triggerFrame < chapter.endFrame,
    `Trigger outside chapter ${scene.id}`,
  );
  assert(
    scene.durationInFrames >= 60 && scene.durationInFrames <= 120,
    `Beat outside 2–4s: ${scene.id}`,
  );
  end = scene.startFrame + scene.durationInFrames;
}
assert.equal(end, timeline.durationInFrames);
for (const word of words) {
  assert(
    word.start >= 0 &&
      word.end >= word.start &&
      word.end <= transcript.durationSeconds,
  );
}
end = 0;
for (const chapter of timeline.chapters) {
  assert.equal(chapter.startFrame, end);
  end = chapter.endFrame;
}
assert.equal(end, timeline.durationInFrames);
for (const file of fs
  .readdirSync("src/part2")
  .filter((f) => f.endsWith(".tsx"))) {
  const source = fs.readFileSync(path.join("src/part2", file), "utf8");
  assert(
    !source.includes("gsap.timeline("),
    `${file}: use official frame-seeked hook`,
  );
  const ast = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "set" &&
      node.expression.expression.getText(ast) === "timeline"
    )
      assert(
        node.arguments.length >= 3 && node.arguments[2].getText(ast) === "0",
        `${file}: GSAP initial set must be at position zero`,
      );
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
console.log(
  `PASS: ${words.length} timed words, ${timeline.scenes.length} continuous editorial beats, ${timeline.chapters.length} chapters, ${timeline.durationInFrames} frames; deterministic GSAP initial states.`,
);
