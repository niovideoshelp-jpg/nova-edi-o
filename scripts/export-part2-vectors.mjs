import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const root = process.cwd();
const output = path.resolve("out/part2-vector-components.mjs");
const modules = ["PresentVectors", "FutureVectors", "AvailabilityChapter"];
const nuclear = "src/part2/NuclearVectors.tsx";
if (fs.existsSync(nuclear)) modules.push("NuclearVectors");
await build({
  stdin: {
    contents: modules
      .map((x) => `export * from './src/part2/${x}';`)
      .join("\n"),
    resolveDir: root,
    sourcefile: "part2-vectors.ts",
    loader: "ts",
  },
  outfile: output,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  packages: "external",
  jsx: "automatic",
  logLevel: "warning",
});
const exports = await import(pathToFileURL(output).href);
const definitions = [
  ...["carrier", "destroyer", "frigate", "supply"].map((kind) => ({
    name: `${kind}-plan`,
    component: "ShipPlan",
    source: "PresentVectors",
    viewBox: "-75 -175 150 350",
    props: { kind },
  })),
  ...["destroyer", "patrol", "mine", "supply"].map((kind) => ({
    name: `${kind}-profile`,
    component: "ShipSide",
    source: "PresentVectors",
    viewBox: "-315 -115 630 205",
    props: { kind },
  })),
  {
    name: "merlin-plan",
    component: "MerlinPlan",
    source: "PresentVectors",
    viewBox: "-60 -60 120 130",
    props: {},
  },
  {
    name: "attack-submarine-plan",
    component: "SubmarinePlan",
    source: "PresentVectors",
    viewBox: "-52 -157 104 320",
    props: {},
  },
  ...["type23", "type26", "type31"].map((kind) => ({
    name: `${kind}-profile`,
    component: "FrigateProfile",
    source: "FutureVectors",
    viewBox: "0 0 1200 360",
    props: { kind },
  })),
  {
    name: "astute-profile",
    component: "AstuteProfile",
    source: "FutureVectors",
    viewBox: "0 0 1200 330",
    props: {},
  },
  {
    name: "future-submarine-symbol",
    component: "PlannedBoat",
    source: "FutureVectors",
    viewBox: "0 0 220 70",
    props: {},
  },
  {
    name: "naval-yard",
    component: "YardRig",
    source: "FutureVectors",
    viewBox: "0 0 1600 800",
    props: {},
  },
  {
    name: "maintenance-shaft",
    component: "MaintenanceShaft",
    source: "AvailabilityChapter",
    viewBox: "0 0 1920 1080",
    props: {},
  },
  {
    name: "vanguard-profile",
    component: "VanguardProfile",
    source: "NuclearVectors",
    viewBox: "0 0 1400 350",
    props: {},
  },
  ...["surface", "supply", "submarine"].map((kind) => ({
    name: `inventory-${kind}`,
    component: "InventoryHull",
    source: "NuclearVectors",
    viewBox: kind === "submarine" ? "0 0 210 72" : "0 0 70 190",
    props: { kind },
  })),
  {
    name: "inventory-water",
    component: "InventoryWater",
    source: "NuclearVectors",
    viewBox: "0 0 1920 1080",
    props: {},
  },
];
const sha = (b) => crypto.createHash("sha256").update(b).digest("hex");
fs.mkdirSync("public/svg-part2", { recursive: true });
const assets = [];
for (const item of definitions) {
  const Component = exports[item.component];
  if (!Component) throw Error(`Missing component ${item.component}`);
  const [, , width, height] = item.viewBox.split(" ").map(Number);
  const svg =
    renderToStaticMarkup(
      React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: item.viewBox,
          width,
          height,
          fill: "none",
        },
        React.createElement("title", null, item.name.replaceAll("-", " ")),
        React.createElement(Component, item.props),
      ),
    ) + "\n";
  if (/<(script|foreignObject|image)\b/.test(svg))
    throw Error("Non-vector element in " + item.name);
  const file = `public/svg-part2/${item.name}.svg`;
  fs.writeFileSync(file, svg);
  assets.push({
    ...item,
    file,
    width,
    height,
    background: "transparent",
    sourceFile: `src/part2/${item.source}.tsx`,
    sourceSha256: sha(fs.readFileSync(`src/part2/${item.source}.tsx`)),
    sha256: sha(svg),
    standaloneAnimation: false,
    animation:
      "The video animates these exact source components with @remotion/gsap useGsapTimeline; static files are reusable geometry.",
  });
}
fs.writeFileSync(
  "data/part2/svg-assets.json",
  JSON.stringify(
    {
      generator: "scripts/export-part2-vectors.mjs",
      assetCount: assets.length,
      assets,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Exported ${assets.length} transparent SVG assets from active React components`,
);
