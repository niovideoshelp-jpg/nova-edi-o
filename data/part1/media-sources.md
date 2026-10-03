# Part 1 — documentary media ledger

Retrieved 3 October 2026. Machine-readable source URLs, dates, authors, descriptions, exact source intervals, SHA-256 hashes and media probes are in `media-sources.json`. Originals are cached outside `public` in `out/part1-research`. All excerpts are silent, H.264, constant 30 fps, with no loop.

## Photographs

| Local image | Historical content | Credit / rights | Resolution |
|---|---|---|---|
| `public/images/part1/grand-fleet-highres.jpg` | Grand Fleet battleships in line-abreast columns in the North Sea, WWI | Royal Navy official photographer / IWM Q18121; PD-UKGov | 5324×3948 |
| `public/images/part1/jutland-lion.jpg` | HMS Lion on the horizon after Q turret was hit at Jutland, 31 May 1916 | IWM SP1704; author unknown; PD-UKGov | 2347×1772 |
| `public/images/part1/prince-of-wales-1941.jpg` | Battleship HMS Prince of Wales arriving Singapore, 4 December 1941 | H. J. Abrahams, Lt., Royal Navy / IWM A6784; PD-UKGov | 2480×1870 |
| `public/images/part1/repulse-1941.jpg` | HMS Repulse departing Singapore on her final operation, 8 December 1941 | Captain W. L. G. Adams / IWM A29069; PD-UKGov | 2480×1802 |

These are historical photographs, not generated reconstructions. Their Commons records explicitly mark public domain on the basis of expired UK Crown copyright. IWM scan links also mention a non-commercial scan licence; the Commons records distinguish that from expired Crown copyright on the underlying photograph.

Source pages: [Grand Fleet Q18121](https://commons.wikimedia.org/wiki/File:The_Royal_Navy_during_the_First_World_War_Q18121.jpg), [Jutland SP1704](https://commons.wikimedia.org/wiki/File:The_Battle_of_Jutland_31_May_1916_SP1704.jpg), [Prince of Wales A6784](https://commons.wikimedia.org/wiki/File:HMS_PRINCE_OF_WALES_arrives_at_Singapore,_4_December_1941._A6784.jpg), [Repulse A29069](https://commons.wikimedia.org/wiki/File:HMS_Repulse_leaving_Singapore.jpg).

The earlier `grand-fleet.jpg` is a superseded low-resolution scout and is not part of the selected ledger. Use `grand-fleet-highres.jpg`.

## Film excerpts

| Local video in `public/video/part1/` | Duration / frames | Source interval | Content and use |
|---|---|---|---|
| `atlantic-convoy.mp4` | 7 s /210 | Iceland reel 2,194–201 s | Aerial convoy toward Halifax. WorldWar passage around99–103 s. |
| `atlantic-refueling.mp4` | 7 s /210 | Iceland reel 2,355–362 s | Ships alongside for mid-ocean replenishment; a different shot for the closing passage171–175 s. |
| `atlantic-air-cover.mp4` | 4 s /120 | Iceland reel 2,215–219 s | Patrol flying boat in flight. Generic Allied air-cover context only; not aircraft that attacked Force Z. |
| `us-shipyards.mp4` | 5 s /150 | NPC6318,234.8–239.8 s | Cargo ship launches sideways at Superior, Wisconsin,9 May1943. Industrial expansion passage160–165 s. |
| `arctic-convoy-1942.mp4` | 4 s /120 | Universal newsreel,20–24 s | Optional additional Arctic convoy source, released19 October1942. This is the route toward Russia, not the Halifax convoy. |
| `pow-modern.mp4` | 4 s /120 | DVIDS899101,106–110 s | Modern aircraft carrier Prince of Wales, R09 island detail at Norfolk2023. Name comparison133.7–137 s; distinct from opening shot. |

The [Iceland reel](https://commons.wikimedia.org/wiki/File:Iceland_during_WW2_reel_2.ogv) is NARA ARC40149 /226-D-6550, OSS Field Photographic Branch, filmed November1941–early spring1942. It is explicitly marked PD-USGov. The original400×300 transfer is soft; exports are800×600 to preserve4:3 framing. Use a bounded editorial film window, not a falsely sharp full-screen image.

The [shipyard source](https://archive.org/details/NPC-6318) is Naval Photographic Center6318, [NARA77824](https://catalog.archives.gov/id/77824), United States Navy,9 May1943, marked Public Domain. Its640×360 transfer includes archival timecode. The timecode remains untouched. The source is faded/low contrast; no fabricated restoration, details or colorization were applied.

The [optional Arctic newsreel](https://archive.org/details/1942-10-19_Big_Convoy_To_Russia) is marked Public Domain by the item. [NARA explains the Universal collection rights](https://www.archives.gov/research/motion-pictures/newsreels); underlying third-party material can still have separate rights. The selected4 s contains only historical sea/ship footage, with its soundtrack removed. It is an optional source, not a required Atlantic replacement.

The [modern Prince of Wales source](https://www.dvidshub.net/video/899101/hms-prince-wales-r09-arrives-naval-station-norfolk) is Bryan Weyers / United States Navy,30 September2023, DVIDS PUBLIC DOMAIN. The modern carrier shares the name with the1941 battleship, but they are different ships.

## Verification and reproduction

All selected photographs and all excerpt shot ranges were visually inspected using local images/contact sheets. FFprobe checks exact duration/frame count for every clip. No Remotion/Chrome render was run for this sourcing task.

`node scripts/fetch-part1-media.mjs --download-photos` retrieves the four selected photographs and metadata, preserving the video ledger. `node scripts/fetch-part1-video.mjs --download-sources --build` downloads missing sources and regenerates the clips; requires full FFmpeg/FFprobe on PATH. Running the video script without flags only verifies/hashes the files and refreshes metadata. Old Ogg/Theora archive files report inaccurate keyframe flags during input seeking; the emitted MP4 files are independently decoded during verification.
