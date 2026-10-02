import fs from "node:fs";
import {
  bbox,
  bboxPolygon,
  featureCollection,
  greatCircle,
  length,
  rewind,
  simplify,
  along,
} from "@turf/turf";
import { geoMercator, geoNaturalEarth1, geoPath } from "d3-geo";
const read = (n) =>
  JSON.parse(fs.readFileSync(`data/geography/${n}.json`, "utf8"));
const world = read("world-50m"),
  isles = read("british-isles-10m");
const uk = isles.features.find((f) => f.properties.code === "GBR");
const london = [-0.1276, 51.5072];
const colonies = [
  { name: "Canada", code: "CAN", point: [-63.5752, 44.6488] },
  { name: "Jamaica", code: "JAM", point: [-76.7936, 17.9712] },
  { name: "South Africa", code: "ZAF", point: [18.4241, -33.9249] },
  { name: "India", code: "IND", point: [72.8777, 19.076] },
  { name: "Australia", code: "AUS", point: [151.2093, -33.8688] },
];
const modes = {
  "uk-paint": { region: [-12, 49, 4, 61.5], countries: ["GBR"], detail: true },
  colonies: {
    world: true,
    countries: ["GBR", ...colonies.map((x) => x.code)],
    routes: colonies,
  },
  empire: {
    world: true,
    countries: ["GBR", ...colonies.map((x) => x.code)],
    routes: colonies.slice().reverse(),
  },
  daylight: {
    world: true,
    countries: ["GBR", ...colonies.map((x) => x.code)],
    routes: [],
  },
  comparison: { region: [-12, 46, 16, 62], countries: ["GBR"], detail: true },
  europe: { region: [-16, 35, 28, 66], countries: ["GBR"], detail: true },
  reach: {
    world: true,
    countries: ["GBR"],
    routes: [colonies[4], colonies[0], colonies[2]],
  },
  "home-range": {
    region: [-68, 8, 27, 65],
    countries: ["GBR"],
    routes: [colonies[0]],
  },
  "indo-pacific": {
    region: [30, -38, 154, 45],
    countries: ["IND", "AUS"],
    routes: [
      { name: "Singapore", point: [103.8198, 1.3521], origin: [56, 14] },
      { name: "Japan", point: [139.69, 35.68], origin: [103.8198, 1.3521] },
    ],
  },
  mediterranean: {
    region: [-7, 28, 38, 47],
    countries: [],
    routes: [
      { name: "Mediterranean", point: [29.92, 31.2], origin: [-5.61, 36.14] },
    ],
  },
  leadership: { region: [-20, 41, 14, 64], countries: ["GBR"], detail: true },
  distance: {
    world: true,
    countries: ["GBR"],
    routes: [{ name: "Singapore", point: [103.8198, 1.3521] }],
  },
  return: {
    world: true,
    countries: ["GBR"],
    routes: [
      { name: "United Kingdom", point: london, origin: [103.8198, 1.3521] },
    ],
  },
  allies: {
    region: [-90, 35, 35, 72],
    countries: ["GBR", "CAN", "NOR"],
    routes: [
      { name: "Norway", point: [5.322, 60.392], origin: [-1.108, 50.8] },
      { name: "Canada", point: [-63.5752, 44.6488], origin: [-1.108, 50.8] },
    ],
  },
  norway: {
    region: [-6, 54, 32, 72],
    countries: ["NOR"],
    routes: [
      { name: "Norway", point: [5.322, 60.392], origin: [-1.108, 50.8] },
    ],
  },
  sovereignty: { region: [-12, 49, 4, 61.5], countries: ["GBR"], detail: true },
};
const atlas = {
  provider: "Natural Earth",
  processing:
    "Turf.js bbox, bboxPolygon, rewind, simplify, greatCircle, length, along; D3 geographic projections",
  ukBounds: bbox(uk),
  colonies,
  views: {},
};
fs.mkdirSync("public/maps", { recursive: true });
for (const [id, config] of Object.entries(modes)) {
  const projection = config.world
    ? geoNaturalEarth1().fitExtent(
        [
          [38, 80],
          [1162, 710],
        ],
        { type: "Sphere" },
      )
    : geoMercator().fitExtent(
        [
          [75, 36],
          [1125, 724],
        ],
        rewind(bboxPolygon(config.region), { reverse: true }),
      );
  projection.clipExtent([
    [20, 12],
    [1180, 748],
  ]);
  const path = geoPath(projection).digits(2);
  const countries = world.features
    .map((f) =>
      config.detail && ["GBR", "IRL"].includes(f.properties.code)
        ? isles.features.find((h) => h.properties.code === f.properties.code)
        : f,
    )
    .filter(Boolean)
    .map((f) => {
      const shape = rewind(
        simplify(f, {
          tolerance:
            config.detail && f.properties.code === "GBR" ? 0.004 : 0.018,
          highQuality: true,
        }),
        { reverse: true },
      );
      return {
        code: f.properties.code,
        name: f.properties.name,
        d: path(shape),
        highlight: config.countries.includes(f.properties.code),
      };
    })
    .filter((f) => f.d);
  const routes = (config.routes ?? []).map((dest) => {
    const origin = dest.origin ?? london;
    const route = greatCircle(origin, dest.point, { npoints: 120 });
    const km = length(route);
    // Path and samples share one geodesic; projected endpoints cannot drift apart.
    const samples = Array.from({ length: 25 }, (_, i) =>
      projection(along(route, (km * i) / 24).geometry.coordinates),
    );
    return {
      ...dest,
      d: path(route),
      origin,
      from: projection(origin),
      to: projection(dest.point),
      kilometers: km,
      samples,
      geometry: route.geometry,
    };
  });
  const unitedKingdom = countries.find((f) => f.code === "GBR")?.d ?? "";
  atlas.views[id] = {
    countries,
    routes,
    uk: unitedKingdom,
    origin: projection(london),
    bounds: config.region ?? [-180, -90, 180, 90],
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760"><title>${id}: Natural Earth geography</title>${countries.map((f) => `<path d="${f.d}" fill="${f.highlight ? "#3A6EA5" : "#18334A"}" stroke="${f.highlight ? "#F4F7FA" : "#426078"}" stroke-width="1.2"/>`).join("")}${routes.map((r) => `<path d="${r.d}" fill="none" stroke="#D4A94A" stroke-width="2.5" stroke-dasharray="2 9" stroke-linecap="round"/>`).join("")}</svg>`;
  fs.writeFileSync(`public/maps/${id}.svg`, svg);
}
fs.writeFileSync("data/geography/atlas.json", JSON.stringify(atlas));
console.log(
  `Built ${Object.keys(modes).length} accurate map views; UK bounds ${atlas.ukBounds}; ${featureCollection(world.features).features.length} countries.`,
);
