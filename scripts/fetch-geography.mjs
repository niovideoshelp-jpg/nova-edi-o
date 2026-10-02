import fs from "node:fs";
import crypto from "node:crypto";
const dir = "data/geography";
fs.mkdirSync(dir, { recursive: true });
const commit = await fetch(
  "https://api.github.com/repos/nvkelso/natural-earth-vector/commits/master",
  { headers: { "User-Agent": "RoyalNavy-Remotion" } },
).then((r) => r.json());
if (!commit.sha) throw new Error("Natural Earth commit unavailable");
const sources = [];
for (const scale of ["50m", "10m"]) {
  const url = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/${commit.sha}/geojson/ne_${scale}_admin_0_countries.geojson`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const raw = await response.text();
  const collection = JSON.parse(raw);
  const features = collection.features
    .filter((f) =>
      scale === "50m"
        ? f.properties.ADM0_A3 !== "ATA"
        : ["GBR", "IRL"].includes(f.properties.ADM0_A3),
    )
    .map((f) => ({
      type: "Feature",
      properties: { name: f.properties.ADMIN, code: f.properties.ADM0_A3 },
      geometry: f.geometry,
    }));
  const file = scale === "50m" ? "world-50m.json" : "british-isles-10m.json";
  fs.writeFileSync(
    `${dir}/${file}`,
    JSON.stringify({ type: "FeatureCollection", features }),
  );
  sources.push({
    file,
    source: url,
    sourceSha256: crypto.createHash("sha256").update(raw).digest("hex"),
    features: features.length,
    scale,
    license: "Public domain",
    processing:
      "Properties reduced; Antarctica excluded from world. UK and Ireland at 1:10 million. Coordinates unmodified.",
  });
  console.log(`${file}: ${features.length} features`);
}
fs.writeFileSync(
  `${dir}/sources.json`,
  JSON.stringify(
    {
      provider: "Natural Earth",
      commit: commit.sha,
      terms: "https://www.naturalearthdata.com/about/terms-of-use/",
      sources,
    },
    null,
    2,
  ),
);
