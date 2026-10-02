import fs from "node:fs";
import path from "node:path";

const atlas = JSON.parse(fs.readFileSync("data/geography/atlas.json", "utf8"));
const output = path.resolve("public/maps/layers");
fs.mkdirSync(output, { recursive: true });
const document = (content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760">${content}</svg>\n`;
const manifest = {
  source: "data/geography/atlas.json",
  note: "Geometry is copied verbatim. Country bases exclude GBR; the live component draws its animated coastline above these cached layers.",
  views: {},
};

for (const [mode, map] of Object.entries(atlas.views)) {
  const files = [];
  // The land mask keeps the exact original fill contours, without country strokes.
  const maskName = `${mode}.land.svg`;
  fs.writeFileSync(
    path.join(output, maskName),
    document(
      map.countries.map((c) => `<path d="${c.d}" fill="#fff"/>`).join(""),
    ),
  );
  files.push(maskName);
  for (const light of [false, true]) {
    for (const routes of [false, true]) {
      for (const onlyUk of [false, true]) {
        const filename = `${mode}.${light ? "light" : "dark"}.${routes ? "routes" : "plain"}.${onlyUk ? "isles" : "countries"}.svg`;
        const countries = map.countries.filter(
          (c) => c.code !== "GBR" && (!onlyUk || c.code === "IRL"),
        );
        const paths = countries.map((c) => {
          const fill =
            c.highlight && routes ? "#37658A" : light ? "#D6E0E8" : "#23465F";
          const stroke = light ? "#95A8B9" : "#51748C";
          return `<path data-country="${c.code}" d="${c.d}" fill="${fill}" stroke="${stroke}" stroke-width=".45" stroke-linejoin="round"/>`;
        });
        fs.writeFileSync(path.join(output, filename), document(paths.join("")));
        files.push(filename);
      }
    }
  }
  manifest.views[mode] = files;
}
fs.writeFileSync(
  path.join(output, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
const files = Object.values(manifest.views).flat();
const bytes = files.reduce(
  (sum, file) => sum + fs.statSync(path.join(output, file)).size,
  0,
);
console.log(
  `Cached ${files.length} map layers for ${Object.keys(atlas.views).length} views (${(bytes / 1024 / 1024).toFixed(2)} MiB), with unchanged geometry.`,
);
