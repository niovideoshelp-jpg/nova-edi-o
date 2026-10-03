import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  chapterSourceRefs,
  commonAssetRefs,
  cueAssetRefs,
  unusedReasons,
} from "./part2-asset-refs.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) =>
  JSON.parse(
    fs.readFileSync(path.join(root, `data/part2/${name}.json`), "utf8"),
  );
const words = read("words");
const transcript = read("transcript");
const fps = 30,
  durationInFrames = 6593;
const q = (id, wordId, expected, label = "", options = {}) => ({
  id,
  wordId,
  expected,
  label,
  ...options,
});
const chapters = [
  {
    id: "inventory",
    title: "April 2025: fleet inventory",
    startFrame: 0,
    endFrame: 1026,
    beats: [
      q("inventory-april-2025", 3, "April", "April 2025"),
      q("inventory-surface-57", 6, "57", "57", { sound: "hit" }),
      q("inventory-rfa-13", 14, "13", "13"),
      q("inventory-submarines-9", 22, "9", "9"),
      q("inventory-vanguard-4", 27, "four", "4"),
      q("inventory-nuclear-deterrent", 37, "nuclear", "Nuclear deterrent"),
      q("inventory-attack-5", 40, "five", "5"),
      q("inventory-different-roles", 49, "categories"),
      q("inventory-vanguard-mission", 55, "Vanguard", "Vanguard"),
      q("inventory-carrier-exclusion", 67, "aircraft"),
      q("inventory-second-strike", 74, "primary"),
      q("inventory-deterrent-capability", 80, "nuclear", "Second strike", {
        labelWordId: 81,
      }),
    ],
  },
  {
    id: "readiness",
    title: "Inventory is not readiness",
    startFrame: 1026,
    endFrame: 1771,
    beats: [
      q("readiness-surface-context", 87, "57", "57"),
      q("readiness-specialist-ships", 93, "context."),
      q("readiness-mine-countermeasures", 98, "mine"),
      q("readiness-out-of-service-5", 106, "five", "5"),
      q("readiness-retiring-frigates-3", 119, "three", "3"),
      q("readiness-in-service", 131, "in", "In service"),
      q("readiness-leave-port", 141, "leave"),
      q("readiness-maintenance", 151, "maintenance."),
    ],
  },
  {
    id: "escort",
    title: "The carrier support system",
    startFrame: 1771,
    endFrame: 2403,
    beats: [
      q("escort-carrier-protection", 154, "carrier"),
      q("escort-high-threat", 168, "high"),
      q("escort-type-45", 175, "Type", "Type 45"),
      q("escort-air-defense", 182, "air"),
      q("escort-asw-team", 185, "frigates"),
      q("escort-attack-submarine", 193, "Attack"),
      q("escort-logistics", 202, "logistics"),
    ],
  },
  {
    id: "capacity",
    title: "Limited spare capacity",
    startFrame: 2403,
    endFrame: 3226,
    beats: [
      q("capacity-limited-fleet", 214, "limited"),
      q("capacity-parallel-missions", 224, "missions,"),
      q("capacity-maintenance-delays", 227, "maintenance"),
      q("capacity-reduced-options", 235, "options"),
      q("capacity-single-loss", 246, "single"),
      q("capacity-disproportionate-impact", 254, "impact."),
      q("capacity-fleet-size", 263, "size"),
      q("capacity-spare-capacity", 272, "spare"),
      q("capacity-simultaneous-operations", 281, "operations"),
    ],
  },
  {
    id: "renewal",
    title: "The frigate transition",
    startFrame: 3226,
    endFrame: 4360,
    beats: [
      q("renewal-renewing", 286, "But"),
      q("renewal-type26-eight", 296, "eight", "8", { sound: "hit" }),
      q("renewal-asw", 303, "anti"),
      q("renewal-type31-five", 307, "five", "5"),
      q("renewal-general-purpose", 315, "purpose"),
      q("renewal-type23-replacement", 325, "Type", "Type 23"),
      q("renewal-transition-gap", 336, "transition"),
      q("renewal-retirements", 341, "leaving"),
      q("renewal-trials", 351, "tested,"),
      q("renewal-june-2025", 358, "June", "June 2025"),
      q("renewal-acknowledgement", 367, "acknowledged"),
      q("renewal-not-ready", 384, "ready"),
    ],
  },
  {
    id: "industry",
    title: "Industrial continuity and future plans",
    startFrame: 4360,
    endFrame: 5461,
    beats: [
      q("industry-preserved-capability", 387, "On"),
      q("industry-industrial-value", 398, "important,"),
      q("industry-design-build", 404, "build"),
      q("industry-aukus", 412, "AUKUS", "AUKUS"),
      q("industry-partners", 420, "Australia,", "Australia"),
      q("industry-2025-announcement", 427, "2025,", "2025"),
      q("industry-up-to-12", 438, "12", "Up to 12", { sound: "hit" }),
      q("industry-attack-role", 443, "attack"),
      q("industry-astute-transition", 452, "astute", "Astute"),
      q("industry-long-term-expansion", 466, "expansion,"),
      q("industry-sustained-investment", 475, "investment"),
      q("industry-build-rate", 481, "build"),
    ],
  },
  {
    id: "atlantic",
    title: "North Atlantic and undersea infrastructure",
    startFrame: 5461,
    endFrame: 5903,
    beats: [
      q("atlantic-defense-review", 488, "Britain's"),
      q("atlantic-north-atlantic", 499, "North", "North Atlantic"),
      q("atlantic-russian-submarines", 512, "Russian"),
      q("atlantic-surveillance", 516, "surveillance"),
      q("atlantic-cable-infrastructure", 519, "cables", "Undersea cables", {
        labelWordId: 518,
      }),
    ],
  },
  {
    id: "availability",
    title: "Sustaining availability",
    startFrame: 5903,
    endFrame: 6593,
    beats: [
      q("availability-military-value", 525, "So", "Royal Navy", {
        labelWordId: 527,
      }),
      q("availability-capabilities", 531, "capabilities"),
      q("availability-sustain", 540, "keeping", "Availability", {
        labelWordId: 543,
      }),
      q("availability-crews", 549, "crews,"),
      q("availability-maintenance", 553, "maintained,"),
      q("availability-supplies", 556, "supplied,"),
      q("availability-replacements", 563, "replace"),
      q("availability-sources", 575, "sources", "Sources"),
      q("availability-description", 586, "description."),
    ],
  },
];

// Editorial beat boundaries are fitted to 2–4 seconds. Word/icon timing remains
// exact and independent: a continuous chapter may begin a camera move before a
// glyph/text reveal. This avoids cutting narration merely to meet beat length.
function boundaries(chapter) {
  const count = chapter.beats.length;
  let previous = new Map([[chapter.startFrame, { cost: 0, previous: null }]]);
  const history = [previous];
  for (let i = 1; i < count; i++) {
    const target = Math.max(0, words[chapter.beats[i].wordId].startFrame - 4);
    const minimum = Math.max(
      chapter.startFrame + i * 60,
      chapter.endFrame - (count - i) * 120,
    );
    const maximum = Math.min(
      chapter.startFrame + i * 120,
      chapter.endFrame - (count - i) * 60,
    );
    const current = new Map();
    for (let frame = minimum; frame <= maximum; frame++) {
      let best = { cost: Infinity, previous: null };
      for (let old = frame - 120; old <= frame - 60; old++) {
        const state = previous.get(old);
        if (state && state.cost < best.cost)
          best = { cost: state.cost, previous: old };
      }
      if (Number.isFinite(best.cost))
        current.set(frame, {
          cost: best.cost + (frame - target) ** 2,
          previous: best.previous,
        });
    }
    history.push(current);
    previous = current;
  }
  const finalists = [...previous]
    .filter(
      ([frame]) =>
        chapter.endFrame - frame >= 60 && chapter.endFrame - frame <= 120,
    )
    .sort((a, b) => a[1].cost - b[1].cost);
  if (!finalists.length) throw new Error(`Cannot fit beats in ${chapter.id}`);
  const result = Array(count + 1);
  result[count] = chapter.endFrame;
  let cursor = finalists[0][0];
  for (let i = count - 1; i >= 1; i--) {
    result[i] = cursor;
    cursor = history[i].get(cursor).previous;
  }
  result[0] = chapter.startFrame;
  return result;
}

if (!transcript.complete || transcript.durationInFrames !== durationInFrames)
  throw new Error("Complete reviewed transcript required");
const scenes = [];
for (const chapter of chapters) {
  for (const beat of chapter.beats) {
    const word = words[beat.wordId];
    if (!word || word.text !== beat.expected)
      throw new Error(
        `${beat.id}: word ${beat.wordId} expected ${beat.expected}, received ${word?.text}`,
      );
  }
  const starts = boundaries(chapter);
  chapter.beats.forEach((beat, i) => {
    if (!Object.hasOwn(cueAssetRefs, beat.id))
      throw new Error(`Missing semantic asset references: ${beat.id}`);
    const word = words[beat.wordId];
    const labelWord = words[beat.labelWordId ?? beat.wordId];
    scenes.push({
      id: beat.id,
      index: scenes.length,
      chapter: chapter.id,
      wordId: beat.wordId,
      trigger: word.text,
      triggerFrame: word.startFrame,
      triggerEndFrame: word.endFrame,
      iconRevealFrame: Math.max(0, word.startFrame - 4),
      anticipationFrames: Math.min(4, word.startFrame),
      startFrame: starts[i],
      endFrame: starts[i + 1],
      durationInFrames: starts[i + 1] - starts[i],
      localStartFrame: starts[i] - chapter.startFrame,
      localTriggerFrame: word.startFrame - chapter.startFrame,
      label: beat.label,
      labelWordId: labelWord.id,
      textRevealFrame: labelWord.startFrame,
      ...(beat.sound ? { sound: beat.sound } : {}),
      startSeconds: starts[i] / fps,
      endSeconds: starts[i + 1] / fps,
      triggerSeconds: word.startFrame / fps,
      textRevealSeconds: labelWord.startFrame / fps,
      assetRefs: [
        ...new Set([chapterSourceRefs[chapter.id], ...cueAssetRefs[beat.id]]),
      ],
    });
  });
}
if (Object.keys(cueAssetRefs).length !== scenes.length)
  throw new Error("Asset ledger has missing or obsolete cue IDs");
const allAssetRefs = [
  ...new Set([
    ...commonAssetRefs,
    ...scenes.flatMap((scene) => scene.assetRefs),
  ]),
];
for (const file of allAssetRefs) {
  const resolved = path.resolve(root, file);
  if (!resolved.startsWith(root + path.sep) || !fs.existsSync(resolved))
    throw new Error(`Missing or invalid local asset: ${file}`);
}
const vectorExports = new Map(
  read("svg-assets").assets.map((asset) => [asset.file, asset]),
);
const assetCatalog = allAssetRefs.map((file) => {
  const vector = vectorExports.get(file);
  return {
    file,
    usage: vector
      ? "inline-vector-geometry-export"
      : file.startsWith("src/")
        ? "inline-scene-source"
        : file.startsWith("data/")
          ? "precomputed-geography"
          : "loaded-media",
    ...(vector
      ? {
          component: vector.component,
          sourceFile: vector.sourceFile,
          props: vector.props,
        }
      : {}),
  };
});
const media = read("media-sources");
const acquired = [...media.photos, ...media.video];
const generated = read("generated-assets").assets;
const mapFiles = fs
  .readdirSync(path.join(root, "public/maps/part2"))
  .filter((name) => name.endsWith(".svg"))
  .map((name) => ({ file: `public/maps/part2/${name}` }));
const auditAsset = (asset) => ({
  file: asset.file,
  used: allAssetRefs.includes(asset.file),
  cueIds: scenes
    .filter((scene) => scene.assetRefs.includes(asset.file))
    .map((scene) => scene.id),
  ...(!allAssetRefs.includes(asset.file)
    ? {
        reason:
          unusedReasons[asset.file] ??
          "Prepared material with no reference in the current chapter composition.",
      }
    : {}),
});
const assetAudit = {
  composition: "RoyalNavyPart2",
  checkedAgainst: Object.values(chapterSourceRefs).filter(
    (value, index, values) => values.indexOf(value) === index,
  ),
  note: "Semantic references associate assets with the cue and its continuous transition. They are not an exact per-frame visibility list. Static SVG exports are reusable copies of inline animated component geometry, not separate footage loaded by the renderer. Common audio, grain and font apply throughout.",
  acquired: acquired.map(auditAsset),
  generated: generated.map(auditAsset),
  maps: mapFiles.map(auditAsset),
};
// Verify direct media references against the live source instead of trusting the
// semantic ledger alone. This catches a renamed or dropped photo/film insertion.
const chapterCode = assetAudit.checkedAgainst
  .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n");
for (const asset of [...acquired, ...generated, ...mapFiles]) {
  const loadedInCode = chapterCode.includes(
    asset.file.replace(/^public\//, ""),
  );
  if (loadedInCode !== allAssetRefs.includes(asset.file))
    throw new Error(`Asset ledger/source disagreement: ${asset.file}`);
}
const timeline = {
  composition: "RoyalNavyPart2",
  width: 1920,
  height: 1080,
  fps,
  durationInFrames,
  audioDurationSeconds: transcript.durationSeconds,
  transitionOverlapFrames: 24,
  timingNote:
    "Reviewed automatic word alignment. Every cue has an explicit immutable wordId. Icons begin 4 frames before that word; text uses textRevealFrame. Editorial beat boundaries are 2–4 seconds and independent of the precise reveals, allowing continuous camera moves within each chapter.",
  sourceFiles: {
    transcript: "data/part2/transcript.json",
    words: "data/part2/words.json",
    narration: "public/audio/part2/2.mp3",
    assetLedger: "scripts/part2-asset-refs.mjs",
    assetUsage: "data/part2/asset-usage.json",
  },
  secondsNote:
    "All *Seconds fields are the corresponding composition frame divided by 30. For unquantized ASR times, use words.json.",
  assetReferenceNote: assetAudit.note,
  commonAssetRefs,
  assetCatalog,
  historicalContext:
    "Inventory figures are narrated as April 2025; the transition statement is June 2025; SSN-AUKUS quantities and late-2030s dates are future plans, not delivered capability.",
  chapters: chapters.map(({ beats, ...chapter }) => ({
    ...chapter,
    durationInFrames: chapter.endFrame - chapter.startFrame,
    cueIds: beats.map((beat) => beat.id),
    startSeconds: chapter.startFrame / fps,
    endSeconds: chapter.endFrame / fps,
    assetRefs: [
      ...new Set(
        scenes
          .filter((scene) => scene.chapter === chapter.id)
          .flatMap((scene) => scene.assetRefs),
      ),
    ],
  })),
  scenes,
};
if (scenes.length < 70 || scenes.length > 80)
  throw new Error(`Unexpected beat count: ${scenes.length}`);
if (new Set(scenes.map((scene) => scene.id)).size !== scenes.length)
  throw new Error("Duplicate cue ID");
if (
  scenes.some(
    (scene) => scene.durationInFrames < 60 || scene.durationInFrames > 120,
  )
)
  throw new Error("Beat duration outside 2–4 seconds");
if (scenes.some((scene) => scene.iconRevealFrame !== scene.triggerFrame - 4))
  throw new Error("Icon anticipation mismatch");
fs.writeFileSync(
  path.join(root, "data/part2/timeline.json"),
  JSON.stringify(timeline, null, 2) + "\n",
);
const columns = [
  "id",
  "chapter",
  "wordId",
  "trigger",
  "triggerFrame",
  "iconRevealFrame",
  "startFrame",
  "endFrame",
  "durationInFrames",
  "localStartFrame",
  "localTriggerFrame",
  "label",
  "textRevealFrame",
  "startSeconds",
  "endSeconds",
  "triggerSeconds",
  "textRevealSeconds",
  "assetRefs",
];
// RFC 4180: assetRefs is a JSON array inside one properly quoted CSV field.
const csvValue = (value) =>
  typeof value === "number"
    ? String(value)
    : `"${(Array.isArray(value) ? JSON.stringify(value) : String(value ?? "")).replaceAll('"', '""')}"`;
fs.writeFileSync(
  path.join(root, "data/part2/timeline.csv"),
  [
    columns.join(","),
    ...scenes.map((scene) =>
      columns.map((key) => csvValue(scene[key])).join(","),
    ),
  ].join("\n") + "\n",
);
fs.writeFileSync(
  path.join(root, "data/part2/asset-usage.json"),
  JSON.stringify(assetAudit, null, 2) + "\n",
);
console.log(
  `${scenes.length} beats, 8 chapters, ${durationInFrames} frames; all beat durations 2–4s and every icon 4 frames early.`,
);
for (const chapter of timeline.chapters)
  console.log(`${chapter.id}: ${chapter.cueIds.join(", ")}`);
