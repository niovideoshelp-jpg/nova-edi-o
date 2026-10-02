import fs from "node:fs";
const rows = [
  ["map", "uk-paint", "Coastline draw and liquid ink fill"],
  ["graphic", "archive", "Naval logbook"],
  ["cutout", "anchor", "Royal Navy identity"],
  ["cutout", "sailing-ship", "Age of sail"],
  ["map", "colonies", "UK connections to five former colonies"],
  ["title", "empire-title", "British Empire typographic punctuation"],
  ["map", "daylight", "Daylight travels across connected continents"],
  ["graphic", "manuscript", "Tolkien manuscript"],
  ["cutout", "numenor", "Fictional island miniature"],
  ["graphic", "compass", "Fictional world orientation"],
  ["graphic", "harbor", "Maritime civilization"],
  ["graphic", "island-distance", "Small island in a wide ocean"],
  ["graphic", "naval-influence", "Sailing fleet influence"],
  ["title", "tolkien-title", "Author name"],
  ["graphic", "inquiry", "Uncertain historical inspiration"],
  ["map", "comparison", "British geography grounds the comparison"],
  ["map", "europe", "Pull out to show the island off Europe"],
  ["graphic", "broadside", "Naval power, ship broadside"],
  ["map", "reach", "Connections across oceans"],
  ["graphic", "era-change", "Shift to a modern hull"],
  ["graphic", "capability", "Present carrier capability"],
  ["graphic", "flagship", "Modern Royal Navy silhouette"],
  ["graphic", "formation", "Carrier with escorts"],
  ["graphic", "deck-plan", "Carrier flight deck in plan"],
  ["map", "home-range", "Ocean scale from home"],
  ["photo", "queen-elizabeth", "HMS Queen Elizabeth, archival photograph"],
  ["photo", "prince-of-wales", "HMS Prince of Wales, archival photograph"],
  ["graphic", "ski-jump", "Deck and departure path"],
  ["photo", "daring-dauntless", "Ships deploy together"],
  ["photo", "merlin-hm2", "Merlin helicopter, documentary photograph"],
  ["graphic", "supply", "Underway replenishment"],
  ["graphic", "command", "Command links around flagship"],
  ["graphic", "sonar", "Anti-submarine search"],
  ["graphic", "defense-ring", "Layered escort coverage"],
  ["title", "year", "2025 chapter marker"],
  ["graphic", "highmast", "Flagship leads operation"],
  ["graphic", "eight-months", "Eight-month timeline"],
  ["map", "indo-pacific", "Regional geographic connections"],
  ["map", "mediterranean", "Accurate Mediterranean coastline"],
  ["cutout", "f35b", "Aircraft and spoken count"],
  ["graphic", "airwing", "Twenty-four aircraft on one deck"],
  ["cutout", "carrier", "Queen Elizabeth class, closer view"],
  ["graphic", "reveal", "Scanning the deployment"],
  ["map", "leadership", "United Kingdom, first finding"],
  ["graphic", "communications", "Command coordinates the operation"],
  ["map", "distance", "UK to the other side of the world"],
  ["cutout", "logistics", "Supplies, maintenance and fuel"],
  ["graphic", "ammunition", "Ammunition inventory"],
  ["graphic", "endurance", "Operating across time"],
  ["map", "return", "Distance from home"],
  [
    "photo",
    "replenishment",
    "Replenishment at sea replaces the balance metaphor",
  ],
  ["map", "allies", "United Kingdom, Norway and Canada"],
  ["graphic", "frigate", "Allied frigates"],
  ["map", "norway", "Norwegian support"],
  ["graphic", "interoperability", "Overlapping allied defensive coverage"],
  ["graphic", "burden", "Distributed operational load"],
  ["map", "sovereignty", "United Kingdom, precise outline"],
  ["graphic", "autonomy", "Single sovereign carrier capability"],
  ["graphic", "availability", "Fleet availability question"],
  ["graphic", "dockyard", "Ships in dock"],
  ["graphic", "sustain", "Operational endurance"],
  ["graphic", "fleet-pressure", "Pressure on the remaining fleet"],
];
const plans = Object.fromEntries(
  rows.map(([kind, name, concept], i) => [
    `S${String(i + 1).padStart(2, "0")}`,
    { kind, name, concept },
  ]),
);
fs.writeFileSync("data/visual-plan.json", JSON.stringify(plans, null, 2));
const t = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
const variants = {
  jet: ["cutout", "f35b"],
  helicopter: ["cutout", "merlin"],
  escort: ["graphic", "frigate"],
  command: ["graphic", "communications"],
  shield: ["graphic", "defense-ring"],
  wrench: ["graphic", "maintenance"],
  fuel: ["graphic", "fuel"],
};
for (const scene of t.scenes) {
  scene.visualMedia = plans[scene.id];
  for (const v of scene.variants) {
    const alt = v.asset !== scene.asset ? variants[v.asset] : null;
    v.visualMedia =
      scene.id === "S26"
        ? {
            kind: "photo",
            name: "prince-of-wales",
            concept: "HMS Prince of Wales",
          }
        : alt
          ? { kind: alt[0], name: alt[1], concept: "Word-aligned detail" }
          : plans[scene.id];
  }
}
t.visualRevision = 3;
t.animationIntegration = "@remotion/gsap 4.0.532: useGsapTimeline()";
t.geography = {
  source: "Natural Earth",
  license: "Public domain",
  coastlines: "1:10m UK and Ireland; 1:50m world",
  processing: "Turf.js and d3-geo",
  historicalConnections:
    "Five representative former colonies, not exhaustive and not a dated territorial map",
  modernConnections: "Schematic geographic links, not recorded ship tracks",
};
fs.writeFileSync("data/timeline.json", JSON.stringify(t, null, 2));
fs.writeFileSync(
  "data/timeline.csv",
  "scene,start_seconds,end_seconds,trigger,trigger_seconds,visual_kind,visual,text,transition\n" +
    t.scenes
      .map((s) =>
        [
          s.id,
          (s.startFrame / 30).toFixed(3),
          (s.endFrame / 30).toFixed(3),
          s.trigger,
          s.triggerSeconds,
          plans[s.id].kind,
          plans[s.id].name,
          s.text,
          s.transition,
        ]
          .map((x) => JSON.stringify(x))
          .join(","),
      )
      .join("\n"),
);
fs.writeFileSync(
  "STORYBOARD.md",
  "# Revised visual direction\n\n62 individually timed scenes. Precise cartography replaces hand-drawn country shapes and every globe. Balances are removed. Modern route lines are schematic geographic connections, not a reconstruction of the actual voyage. Historical links show representative former colonies using modern geography.\n\n| Scene | Time | Visual | Narrative purpose |\n|---|---|---|---|\n" +
    t.scenes
      .map(
        (s) =>
          `| ${s.id} | ${(s.startFrame / 30).toFixed(2)} s | ${plans[s.id].kind}: ${plans[s.id].name} | ${plans[s.id].concept} |`,
      )
      .join("\n"),
);
console.log(
  `Revised ${rows.length} scenes; ${rows.filter((r) => r[0] === "map").length} cartographic scenes; no globes or balances.`,
);

let film = fs.readFileSync("src/Film.tsx", "utf8");
for (const [id, v] of Object.entries(plans))
  film = film.replace(
    new RegExp('name=\"' + id + ' · [^\"]+\"'),
    'name=\"' + id + " · " + v.name + '\"',
  );
fs.writeFileSync("src/Film.tsx", film);
