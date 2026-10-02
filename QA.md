# Production checks

## Visual revision 3

- Removed every globe and both balance illustrations from the active storyboard. Replaced the old hand-drawn country assets and removed the obsolete SVG library.
- 15 geographic scenes built from Natural Earth polygons; UK/Ireland detail at 1:10 million. Turf.js generates the geodesics and verifies route endpoints; D3 projects coordinates. Five historical connections run from London to representative former colonies.
- Liquid UK fill uses a moving curved SVG paint front and a seeded displacement texture clipped to the real coastline. Routes reveal through animated masks while preserving their dotted pattern.
- Official `@remotion/gsap@4.0.532` installed and `useGsapTimeline()` used for actual DOM/SVG animation in the scene, text, map and naval illustration components. No manually created GSAP timelines remain in `src`.
- Exported 35 revised naval SVGs and 16 reusable map SVGs. Five licensed documentary photographs and six generated cutouts are used in the revised main scenes. Source metadata and credits are archived.
- Rendered and inspected all 62 scene stills at 1920×1080. A further 15 stills check the rapid inventory shots, early/late paint and completed connections. Saved reports: `data/visual-qa-v3.json` and `data/visual-qa-v3-details.json`.
- The final non-sequential render test produced identical SHA-256 PNG hashes for repeated frames 60 and 426, with zero browser warnings. Earlier runs showed only one RGB level of antialias variation in 66–128 edge pixels; the reproducible test documents a strict tolerance below 0.01% of pixels and rejects larger differences.
- TypeScript, ESLint and timeline/geographic checks pass. No adjacent main visual ID, entrance or exit repeats.
- Studio preview checked via its WebMCP interface at frame 450: no error overlay. Fixed the background wrapper so the navy field, grain and vignette also appear in Studio, matching the still renderer.
- No complete MP4 was exported. The editable preview, narration, timing and export command remain available.

## Visual revision 2

- Eight generated transparent PNGs and three OGL photographs integrated into the film; 22 main scenes now use raster imagery, with additional changes inside the rapid inventory shots.
- Alpha-channel presence and transparent pixels checked for all generated assets; results in `data/image-alpha-check.json`.
- Sixteen revised representative frames rendered and visually reviewed. The photographs were then given aspect-correct dimensions to preserve full ships and rotors.
- Generated images retain the native alpha. No programmatic background removal or retouching was used.
- TypeScript, ESLint and timeline checks passed after the visual update.
- Image provenance, licensing and generation prompts recorded in `IMAGE-SOURCES.md` and `data/image-prompts.json`.

## Base production

- Format: 1920×1080, 30 fps, 6047 frames (201.567 seconds).
- Timeline: 62 contiguous shots, each 60–120 frames; original audio fully covered.
- Main icon cues: four frames before aligned words.
- No adjacent repeated main asset, entrance or exit in the authored scene timeline.
- TypeScript and ESLint passed.
- Sixteen representative full-resolution frames rendered successfully and inspected as a contact sheet: opening, historical imagery, aircraft carriers, Merlin, 2025, eight months, Indo-Pacific, 24 F-35Bs, allies and closing fleet pressure.
- Text and principal imagery fit the safe margins in inspected frames.
- Final MP3 measured by FFmpeg ebur128: -16.5 LUFS integrated, 2.5 LU loudness range, -1.0 dBFS true peak.
- The full-film Studio preview is available; a complete MP4 export has not been produced in this delivery. Run `npm run render` to export.
- Word alignment is reused ASR output from an SHA-256-identical audio file. Acoustic onset accuracy of ±3 frames for every word is not certified. Proper-name spelling corrections are documented in the timeline.
- Fast spoken lists use shorter internal icon/name handoffs within the 2–4-second scene structure.

Ship diagrams remain editorial illustrations and do not establish technical dimensions or actual force availability. Revision 3 geographic outlines come from Natural Earth; connection lines are illustrative links, not recorded voyages or a dated map of imperial territory.
