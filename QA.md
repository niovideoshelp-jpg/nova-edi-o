# Production checks

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

SVG shapes and route graphics are schematic illustrations. They do not establish precise ship dimensions, force availability or geographic borders.
