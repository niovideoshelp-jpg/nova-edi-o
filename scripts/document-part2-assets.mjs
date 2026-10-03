import fs from "node:fs";
import crypto from "node:crypto";
const sha = (file) =>
  crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const generated = [
  {
    id: "naval-industry",
    file: "public/images/part2/generated/naval-industry.png",
    source: "Built-in image_gen tool",
    role: "Generic explanatory naval shipbuilding illustration, not a photograph or an identified shipyard/vessel.",
    prompt:
      "Modern naval gantry crane, separate steel hull sections, partly built generic frigate. Transparent cutout, steel blue/navy/off-white, small gold lighting, realistic miniature editorial illustration, no text/logos.",
    alphaReview:
      "RGBA verified; open gaps and surrounding background alpha0. First generation selected; later variant not used.",
  },
  {
    id: "subsea-cable",
    file: "public/images/part2/generated/subsea-cable.png",
    source: "Built-in image_gen tool",
    role: "Generic explanatory fiber-optic subsea cable section, not a technical specification of an actual cable.",
    prompt:
      "Isolated curved armored undersea fiber-optic cable, exposed concentric cross-section, studio miniature editorial illustration on fully transparent background; navy, steel, copper/gold, no text/arrows.",
    alphaReview: "RGBA verified; transparent exterior, complete silhouette.",
  },
].map((x) => ({ ...x, bytes: fs.statSync(x.file).size, sha256: sha(x.file) }));
fs.writeFileSync(
  "data/part2/generated-assets.json",
  JSON.stringify({ assets: generated }, null, 2) + "\n",
);
const media = JSON.parse(fs.readFileSync("data/part2/media-sources.json"));
const vectors = JSON.parse(fs.readFileSync("data/part2/svg-assets.json"));
const maps = ["world", "uk", "north-atlantic"].map((id) => ({
  id,
  file: `public/maps/part2/${id}.svg`,
  source: "Natural Earth coastline data; Turf processing; D3 projection",
  license: "Public domain",
  sha256: sha(`public/maps/part2/${id}.svg`),
}));
const assets = {
  composition: "RoyalNavyPart2",
  generated,
  photos: media.photos,
  video: media.video,
  vectors: vectors.assets,
  maps,
  notes: [
    "Archival media dates are not evidence of current fleet readiness.",
    "Future SSN-AUKUS uses abstract planned-capacity symbols.",
    "Geographic links and seabed cables are illustrative; no actual patrol or cable positions are asserted.",
    "Diamond operator image is retained as researched material; the clearer HMS Daring photo is the active Type45 insert.",
  ],
};
fs.writeFileSync(
  "data/part2/assets.json",
  JSON.stringify(assets, null, 2) + "\n",
);
console.log("Part2 asset inventory documented");
