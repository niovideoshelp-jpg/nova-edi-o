// Semantic asset ledger checked against the eight live Part2 chapters.
// SVG exports mirror the components animated inline; the video does not load
// those static SVG copies. Source files also cover the chapter-local diagrams.
const svg = (name) => `public/svg-part2/${name}.svg`;
const photo = (name) => `public/images/part2/${name}.jpg`;
const film = (name) => `public/video/part2/${name}.mp4`;
const generated = (name) => `public/images/part2/generated/${name}.png`;
const world = ["public/maps/part2/world.svg", "data/part2/geography.json"];
const atlantic = [
  "public/maps/part2/north-atlantic.svg",
  "data/part2/geography.json",
];
const formation = [
  "carrier-plan",
  "destroyer-plan",
  "frigate-plan",
  "attack-submarine-plan",
  "supply-plan",
].map(svg);
const renewalFleet = ["type23-profile", "type26-profile", "type31-profile"].map(
  svg,
);

export const commonAssetRefs = [
  "public/audio/part2/mix.mp3",
  "public/grain.png",
  "public/fonts/inter-latin-wght-normal.woff2",
];

export const chapterSourceRefs = {
  inventory: "src/part2/InventoryChapter.tsx",
  readiness: "src/part2/ReadinessChapter.tsx",
  escort: "src/part2/OperationsChapter.tsx",
  capacity: "src/part2/OperationsChapter.tsx",
  renewal: "src/part2/RenewalChapter.tsx",
  industry: "src/part2/IndustryChapter.tsx",
  atlantic: "src/part2/AtlanticChapter.tsx",
  availability: "src/part2/AvailabilityChapter.tsx",
};

export const cueAssetRefs = {
  "inventory-april-2025": [svg("type23-profile"), svg("inventory-water")],
  "inventory-surface-57": [svg("inventory-surface"), svg("inventory-water")],
  "inventory-rfa-13": [svg("inventory-supply"), svg("inventory-water")],
  "inventory-submarines-9": [
    svg("inventory-submarine"),
    svg("inventory-water"),
  ],
  "inventory-vanguard-4": [svg("vanguard-profile"), svg("inventory-water")],
  "inventory-nuclear-deterrent": [
    svg("vanguard-profile"),
    svg("inventory-water"),
  ],
  "inventory-attack-5": [
    svg("vanguard-profile"),
    svg("astute-profile"),
    svg("inventory-water"),
  ],
  "inventory-different-roles": [
    svg("vanguard-profile"),
    svg("astute-profile"),
    svg("inventory-water"),
  ],
  "inventory-vanguard-mission": [
    svg("vanguard-profile"),
    svg("inventory-water"),
  ],
  "inventory-carrier-exclusion": [
    svg("vanguard-profile"),
    svg("carrier-plan"),
    svg("inventory-water"),
  ],
  "inventory-second-strike": [svg("vanguard-profile"), svg("inventory-water")],
  "inventory-deterrent-capability": [
    svg("vanguard-profile"),
    svg("inventory-water"),
  ],

  "readiness-surface-context": [svg("patrol-profile")],
  "readiness-specialist-ships": [svg("patrol-profile"), svg("mine-profile")],
  "readiness-mine-countermeasures": [
    svg("mine-profile"),
    svg("supply-profile"),
  ],
  "readiness-out-of-service-5": [svg("frigate-plan")],
  "readiness-retiring-frigates-3": [svg("frigate-plan")],
  "readiness-in-service": [svg("destroyer-profile")],
  "readiness-leave-port": [svg("destroyer-profile")],
  "readiness-maintenance": [svg("destroyer-profile")],

  "escort-carrier-protection": [svg("carrier-plan")],
  "escort-high-threat": [svg("carrier-plan")],
  "escort-type-45": [
    photo("daring-profile"),
    svg("carrier-plan"),
    svg("destroyer-plan"),
  ],
  "escort-air-defense": [
    photo("daring-profile"),
    svg("carrier-plan"),
    svg("destroyer-plan"),
  ],
  "escort-asw-team": [
    photo("merlin-hm2-2025"),
    svg("carrier-plan"),
    svg("destroyer-plan"),
    svg("frigate-plan"),
    svg("merlin-plan"),
  ],
  "escort-attack-submarine": [
    svg("carrier-plan"),
    svg("destroyer-plan"),
    svg("frigate-plan"),
    svg("merlin-plan"),
    svg("attack-submarine-plan"),
  ],
  "escort-logistics": [
    photo("tiderace-ras-2021"),
    ...formation,
    svg("merlin-plan"),
  ],

  "capacity-limited-fleet": formation,
  "capacity-parallel-missions": formation,
  "capacity-maintenance-delays": formation,
  "capacity-reduced-options": formation,
  "capacity-single-loss": formation,
  "capacity-disproportionate-impact": formation,
  "capacity-fleet-size": formation,
  "capacity-spare-capacity": formation,
  "capacity-simultaneous-operations": formation,

  "renewal-renewing": [film("richmond-bow"), svg("type23-profile")],
  "renewal-type26-eight": [svg("type26-profile")],
  "renewal-asw": [svg("type26-profile")],
  "renewal-type31-five": [svg("type26-profile"), svg("type31-profile")],
  "renewal-general-purpose": [svg("type26-profile"), svg("type31-profile")],
  "renewal-type23-replacement": renewalFleet,
  "renewal-transition-gap": renewalFleet,
  "renewal-retirements": renewalFleet,
  "renewal-trials": [svg("type26-profile")],
  "renewal-june-2025": [svg("type26-profile")],
  "renewal-acknowledgement": [svg("type26-profile")],
  "renewal-not-ready": [svg("type26-profile")],

  "industry-preserved-capability": [photo("glasgow-construction-2021")],
  "industry-industrial-value": [
    photo("glasgow-construction-2021"),
    generated("naval-industry"),
  ],
  "industry-design-build": [generated("naval-industry")],
  "industry-aukus": [generated("naval-industry"), ...world],
  "industry-partners": world,
  "industry-2025-announcement": world,
  "industry-up-to-12": [...world, svg("future-submarine-symbol")],
  "industry-attack-role": [svg("future-submarine-symbol")],
  "industry-astute-transition": [photo("anson-2022"), svg("astute-profile")],
  "industry-long-term-expansion": [svg("astute-profile"), svg("naval-yard")],
  "industry-sustained-investment": [svg("naval-yard")],
  "industry-build-rate": [svg("naval-yard")],

  "atlantic-defense-review": [photo("proteus-2025")],
  "atlantic-north-atlantic": [photo("proteus-2025"), ...atlantic],
  "atlantic-russian-submarines": [],
  "atlantic-surveillance": [],
  "atlantic-cable-infrastructure": [generated("subsea-cable")],

  "availability-military-value": [film("merlin-mk3-flight")],
  "availability-capabilities": [film("merlin-mk3-flight")],
  "availability-sustain": [svg("frigate-plan")],
  "availability-crews": [film("merlin-mk3-crew")],
  "availability-maintenance": [svg("maintenance-shaft")],
  "availability-supplies": [film("lyme-bay-deck")],
  "availability-replacements": [svg("frigate-plan")],
  "availability-sources": [],
  "availability-description": [],
};

export const unusedReasons = {
  "public/images/part2/diamond-2024.jpg":
    "Researched alternative. The mounted Type 45 insert uses the clearer HMS Daring profile photograph.",
  "public/video/part2/richmond-broadside.mp4":
    "Acquired alternative angle; Renewal mounts richmond-bow.mp4 only.",
  "public/video/part2/lyme-bay-transfer.mp4":
    "Acquired alternative transfer shot; Availability mounts lyme-bay-deck.mp4 for supplies.",
  "public/maps/part2/uk.svg":
    "Prepared standalone UK view; the active chapters use world.svg and north-atlantic.svg.",
};
