import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(
  root,
  "public/maps/layers/reach.dark.plain.countries.svg",
);
const output = path.join(root, "public/maps/part1/war-world.svg");
const source = fs.readFileSync(input, "utf8");
const svgRoot = source.match(/^<svg\b[^>]*>/)?.[0];
if (!svgRoot) throw new Error("Atlas SVG root was not found");

// Keep every projected coordinate exactly. A compound fill removes internal
// country strokes and anti-alias seams without redrawing or simplifying land.
// The active chapter continues to draw its original gold UK outline separately.
const fills = new Map();
let countryCount = 0;
for (const match of source.matchAll(/<path\b([^>]*?)\/>/g)) {
  const attributes = Object.fromEntries(
    [...match[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((item) => [
      item[1],
      item[2],
    ]),
  );
  if (!attributes.d || !attributes.fill || !attributes["data-country"])
    throw new Error("Unexpected cached atlas path");
  if (attributes["data-country"] === "GBR")
    throw new Error("UK must remain in the unchanged animated chapter layer");
  const contours = fills.get(attributes.fill) ?? [];
  contours.push(attributes.d);
  fills.set(attributes.fill, contours);
  countryCount++;
}
if (countryCount < 150) throw new Error("Incomplete source world geography");
const land = [...fills]
  .map(
    ([fill, contours]) =>
      `<path d="${contours.join(" ")}" fill="${fill}" stroke="none" fill-rule="nonzero"/>`,
  )
  .join("");
const svg = `${svgRoot}<title>World geography without political borders</title><desc>Original cached Natural Earth projected contours, unchanged. Internal country outlines removed; the chapter supplies its original gold United Kingdom layer.</desc>${land}</svg>\n`;
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, svg);
console.log(
  `Cached ${countryCount} unchanged country contours as ${fills.size} continuous land fill(s): public/maps/part1/war-world.svg`,
);
