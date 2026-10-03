import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundle = path.join(root, "out/part1-vector-components.mjs");
const destination = path.join(root, "public/svg-part1");
fs.mkdirSync(path.dirname(bundle), { recursive: true });
fs.mkdirSync(destination, { recursive: true });
fs.mkdirSync(path.join(root, "data/part1"), { recursive: true });

// One build imports the active components themselves. No copied/recreated paths.
await build({
  stdin: {
    contents: [
      'export {CapitalShip,FleetCarrier,MerchantPlan,EscortPlan,SubmarineProfile} from "./src/part1/WarVectors";',
      'export {BattlePlan,PatrolAircraft,EscortSide,Submarine} from "./src/part1/WarfareVectors";',
      'export {JutlandDreadnought,DreadnoughtPlan,JutlandToken} from "./src/part1/JutlandVectors";',
    ].join("\n"),
    resolveDir: root,
    sourcefile: "part1-vector-export-entry.ts",
    loader: "ts",
  },
  outfile: bundle,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  packages: "external",
  jsx: "automatic",
  treeShaking: true,
  logLevel: "warning",
});
const components = await import(pathToFileURL(bundle).href);

// ViewBoxes include strokes, gun barrels, masts, propellers, smoke and wakes.
// Coordinates were inspected in the actual TSX geometry, including negative axes.
const definitions = [
  {
    name: "capital-ship",
    component: "CapitalShip",
    source: "WarVectors",
    chapter: "WorldWarChapter",
    viewBox: "-8 10 644 182",
    props: { detail: true },
  },
  {
    name: "capital-ship-fleet",
    component: "CapitalShip",
    source: "WarVectors",
    chapter: "WorldWarChapter",
    viewBox: "-8 10 644 182",
    props: { detail: false },
  },
  {
    name: "fleet-carrier",
    component: "FleetCarrier",
    source: "WarVectors",
    chapter: "WorldWarChapter",
    viewBox: "10 -7 602 154",
    props: { detail: true },
  },
  {
    name: "merchant-plan",
    component: "MerchantPlan",
    source: "WarVectors",
    chapter: "WorldWarChapter",
    viewBox: "-20 -39 40 100",
    props: { small: false },
  },
  {
    name: "merchant-plan-small",
    component: "MerchantPlan",
    source: "WarVectors",
    chapter: "WorldWarChapter",
    viewBox: "-16 -38 32 78",
    props: { small: true },
  },
  {
    name: "escort-plan",
    component: "EscortPlan",
    source: "WarVectors",
    chapter: "WorldWarChapter",
    viewBox: "-40 -136 80 318",
    props: {},
  },
  {
    name: "submarine-profile",
    component: "SubmarineProfile",
    source: "WarVectors",
    chapter: "WorldWarChapter",
    viewBox: "10 42 598 141",
    props: {},
  },
  {
    name: "battle-plan",
    component: "BattlePlan",
    source: "WarfareVectors",
    chapter: "TransformationChapter",
    viewBox: "42 0 116 560",
    props: { small: false },
  },
  {
    name: "patrol-aircraft",
    component: "PatrolAircraft",
    source: "WarfareVectors",
    chapter: "TransformationChapter",
    viewBox: "-112 -85 224 184",
    props: {},
  },
  {
    name: "escort-side",
    component: "EscortSide",
    source: "WarfareVectors",
    chapter: "TransformationChapter",
    viewBox: "6 -6 591 201",
    props: {},
  },
  {
    name: "submarine",
    component: "Submarine",
    source: "WarfareVectors",
    chapter: "TransformationChapter",
    viewBox: "5 -12 421 138",
    props: {},
  },
  {
    name: "jutland-dreadnought",
    component: "JutlandDreadnought",
    source: "JutlandVectors",
    chapter: "JutlandChapter",
    viewBox: "0 -5 1205 365",
    props: {},
  },
  {
    name: "dreadnought-plan",
    component: "DreadnoughtPlan",
    source: "JutlandVectors",
    chapter: "JutlandChapter",
    viewBox: "-14 -30 28 62",
    props: {},
  },
  {
    name: "jutland-token-british",
    component: "JutlandToken",
    source: "JutlandVectors",
    chapter: "JutlandChapter",
    viewBox: "-12 -20 24 40",
    props: { color: "#B1CBDA" },
  },
  {
    name: "jutland-token-german",
    component: "JutlandToken",
    source: "JutlandVectors",
    chapter: "JutlandChapter",
    viewBox: "-12 -20 24 40",
    props: { color: "#C4B17D" },
  },
];
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const sources = Object.fromEntries(
  [...new Set(definitions.map((d) => d.source))].map((name) => {
    const file = `src/part1/${name}.tsx`;
    return [
      name,
      { file, sha256: sha256(fs.readFileSync(path.join(root, file))) },
    ];
  }),
);
const assets = [];
for (const item of definitions) {
  const Component = components[item.component];
  if (typeof Component !== "function")
    throw new Error(`Missing component: ${item.component}`);
  const file = `public/svg-part1/${item.name}.svg`;
  const animationChapter = `src/part1/${item.chapter}.tsx`;
  const [, , width, height] = item.viewBox.split(" ").map(Number);
  const title = item.name.replaceAll("-", " ");
  const svg = renderToStaticMarkup(
    React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: item.viewBox,
        width,
        height,
        fill: "none",
        role: "img",
        "aria-labelledby": "title description",
      },
      React.createElement("title", { id: "title" }, title),
      React.createElement(
        "desc",
        { id: "description" },
        `Transparent static export of ${item.component}. The same geometry is animated in ${item.chapter} using the official @remotion/gsap useGsapTimeline() hook.`,
      ),
      React.createElement(Component, item.props),
    ),
  );
  if (!svg.startsWith("<svg ") || !svg.endsWith("</svg>"))
    throw new Error(`Invalid SVG root: ${item.name}`);
  if (/<(script|foreignObject|image)\b/.test(svg))
    throw new Error(`Unexpected non-vector element: ${item.name}`);
  fs.writeFileSync(path.join(root, file), svg + "\n");
  assets.push({
    file,
    publicPath: `svg-part1/${item.name}.svg`,
    component: item.component,
    source: sources[item.source].file,
    sourceSha256: sources[item.source].sha256,
    props: item.props,
    viewBox: item.viewBox,
    width,
    height,
    background: "transparent",
    geometry: "ReactDOMServer export of the active component; no paths redrawn",
    standaloneAnimation: false,
    animation: {
      chapter: animationChapter,
      integration: "@remotion/gsap",
      hook: "useGsapTimeline()",
    },
    sha256: sha256(svg + "\n"),
  });
}
const manifest = {
  schemaVersion: 1,
  generator: "scripts/export-part1-vectors.mjs",
  assetCount: assets.length,
  componentCount: new Set(assets.map((asset) => asset.component)).size,
  format: "SVG",
  background: "transparent",
  usage:
    "Standalone files contain static vector artwork. The video animates the same source components with the official @remotion/gsap useGsapTimeline() hook.",
  boundsReview:
    "Explicit viewBoxes include all inspected component geometry and stroke extents, including wakes, smoke, turrets and negative coordinates.",
  assets,
};
fs.writeFileSync(
  path.join(root, "data/part1/svg-assets.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Exported ${assets.length} transparent SVGs from ${manifest.componentCount} active components (including active detail/color variants).`,
);
console.log("Manifest: data/part1/svg-assets.json");
