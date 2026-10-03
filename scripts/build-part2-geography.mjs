import fs from "node:fs";
import { geoMercator, geoNaturalEarth1, geoPath } from "d3-geo";
import {
  rewind,
  featureCollection,
  bboxPolygon,
  greatCircle,
  simplify,
} from "@turf/turf";
const world = JSON.parse(
  fs.readFileSync("data/geography/world-50m.json", "utf8"),
);
const isles = JSON.parse(
  fs.readFileSync("data/geography/british-isles-10m.json", "utf8"),
);
const uk = isles.features.find((f) => f.properties.code === "GBR");
const land = featureCollection(
  world.features.map((f) =>
    rewind(simplify(f, { tolerance: 0.015, highQuality: true }), {
      reverse: true,
    }),
  ),
);
const places = {
  UK: [-2, 54],
  London: [-0.1276, 51.5072],
  USA: [-77.0369, 38.9072],
  Australia: [133, -25],
  Iceland: [-21.94, 64.15],
  Norway: [10.75, 59.91],
  Canada: [-63.5752, 44.6488],
  Govan: [-4.31, 55.86],
  Rosyth: [-3.44, 56.02],
  Barrow: [-3.23, 54.11],
  Faslane: [-4.82, 56.07],
};
const regions = {
  world: null,
  "north-atlantic": [-83, 35, 26, 73],
  uk: [-9, 49, 3, 60],
};
const output = {
  provider: "Natural Earth public domain",
  processing:
    "Turf rewind/simplify/greatCircle; D3 projection. Routes show editorial geographic connections, not real patrol tracks or cable coordinates.",
  places,
  views: {},
};
fs.mkdirSync("public/maps/part2", { recursive: true });
for (const [name, region] of Object.entries(regions)) {
  const projection = region
    ? geoMercator().fitExtent(
        [
          [100, 70],
          [1500, 750],
        ],
        rewind(bboxPolygon(region), { reverse: true }),
      )
    : geoNaturalEarth1().fitExtent(
        [
          [35, 30],
          [1565, 780],
        ],
        { type: "Sphere" },
      );
  const path = geoPath(projection);
  const paths = land.features
    .map((f) => path(f))
    .filter(Boolean)
    .join(" ");
  const ukPath = path(rewind(uk, { reverse: true }));
  fs.writeFileSync(
    `public/maps/part2/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="800" viewBox="0 0 1600 800"><path d="${paths}" fill="#24475F" stroke="none"/><path d="${ukPath}" fill="#426F94" stroke="#B5CADD" stroke-width="1"/></svg>`,
  );
  output.views[name] = {
    points: Object.fromEntries(
      Object.entries(places).map(([id, p]) => [id, projection(p)]),
    ),
    uk: ukPath,
    routes: ["USA", "Australia", "Iceland", "Norway", "Canada"].map((id) => ({
      id,
      d: path(greatCircle(places.UK, places[id], { npoints: 100 })),
      from: projection(places.UK),
      to: projection(places[id]),
    })),
  };
}
fs.writeFileSync("data/part2/geography.json", JSON.stringify(output));
console.log("Part2 geography: 3 maps, AUKUS and North Atlantic connections");
