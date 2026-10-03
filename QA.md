# Verificação de produção

## Revisão 5 — composição atual

- Formato preservado: 1920×1080, 30 fps, 6047 frames. Quatro ambientes contínuos, 62 Sequences de narração e três passagens de 24 frames.
- 40 quadros em resolução completa renderizados e inspecionados, incluindo a formação naval, sonar, saída de 2025, entradas de filmagem e limites entre capítulos. [Manifesto](data/visual-qa-v5.json).
- Três excertos contínuos renderizados em 960×540: frota (2385–2800), passagem para Highmast (3260–3399), suprimentos/aliados (4660–5059). Foram inspecionadas sequências de imagens desses excertos; isso não é uma afirmação de reprodução humana integral em tempo real.
- Zero avisos ou erros de navegador nessas renderizações. ESLint, TypeScript e npm run check passaram.
- A QA encontrou e corrigiu a ancoragem do sonar junto à roda, o corte das escoltas durante o recuo da câmera e um resíduo da camada submersa na passagem para 2025. Quadros posteriores confirmaram as correções. Os símbolos de embarcação no mapa histórico também foram reduzidos e verificados nos frames 1638, 1650 e 1675 para eliminar sobreposição.
- Seis filmagens locais 1920×1080/30 fps verificadas com FFprobe. As fontes têm duração suficiente para cada janela e não entram em loop. Autoria, datas, intervalos e hashes estão em [VIDEO-SOURCES.md](VIDEO-SOURCES.md) e [data/video-sources.json](data/video-sources.json).
- A contagem foi conferida como grade de 8×3 = 24. Navios de disponibilidade são esquemas qualitativos, sem inventar percentuais operacionais.
- MP4 completo exportado: H.264, 1920×1080, 30 fps, 6047 frames, 201,566667 s e 160.779.472 bytes. Áudio AAC 48 kHz, início em 0, duração 201,566 s. A decodificação integral de vídeo e áudio passou sem erros; zero avisos de navegador. [Relatório final e SHA-256](data/render-v5.json).
- Foram decodificados e inspecionados 62 quadros do MP4 final, um por cue, em quatro folhas de contato. As junções 1916/3326/4972 e o último frame 6046 também foram extraídos do MP4. A inspeção permanece por amostragem; não é uma afirmação de visualização humana integral em tempo real.

Os timestamps continuam derivados de ASR: a precisão acústica de ±3 frames para todas as palavras não foi certificada manualmente. A mixagem original foi preservada. As filmagens de 2022/2023 mostram equipamentos; o abastecimento está datado em 2025. Nenhum desses planos é apresentado como prova de avaria ou indisponibilidade.

---
## Histórico — revisão 4

- Formato mantido: **1920×1080, 30 fps, 6047 frames**. A montagem usa quatro capítulos visuais contínuos e **62 Sequences de marcação da narração**, com sobreposição de 12 frames entre capítulos. [Manifesto ativo](data/documentary-timeline.json).
- Animações de câmera, elementos, máscaras e textos usam a integração oficial **`@remotion/gsap` / `useGsapTimeline()`**, sincronizada aos frames do Remotion.
- Foram renderizados **62 quadros finais em 1920×1080**, com **zero warnings** registrados pelo navegador. O [manifesto dos quadros](data/visual-qa-v4.json) identifica os frames, arquivos e hashes. Uma seleção está na [folha de contato](docs/preview-v4.jpg).
- Foram gerados os três excertos contínuos abaixo, em **960×540, 30 fps**, com zero warnings no [manifesto de movimento](data/motion-qa-v4.json). A composição principal conserva a resolução de 1920×1080.
- **ESLint, TypeScript e `npm run check` passaram.**
- A passagem de “24” para “24 F-35Bs” conserva o número entre as marcações, evitando reinício do contador. Três quadros adicionais foram decodificados do excerto final em 960×540 para verificar essa continuidade: 3744, 3745 e 3750, registrados em `data/visual-qa-v4-fixes.json`. A tentativa separada de renderizar esses três stills em 1920×1080 foi interrompida após produzir somente o frame 3745; ela não é contada como uma renderização completa.

| Excerto local | Frames globais, inclusive | Duração |
|---|---|---|
| `out/review-v4/motion-test.mp4` | 180–359 | 6 s |
| `out/review-v4/02-carrier.mp4` | 2460–2699 | 8 s |
| `out/review-v4/03-airwing.mp4` | 3710–3949 | 8 s |

Os excertos de [porta-aviões](docs/preview-carrier-v4.mp4) e [ala aérea](docs/preview-airwing-v4.mp4) também estão disponíveis em `docs`. FFprobe confirmou, em ambos, 240 frames, 8 segundos e áudio AAC. A sequência de imagens do excerto do porta-aviões foi inspecionada, incluindo a passagem da fotografia para a aproximação do convés.

A cobertura desta revisão consiste nos quadros amostrados e nos três trechos indicados. **Não foi assistido nem exportado um MP4 do filme inteiro.** A ausência de warnings confirma a execução dessas renderizações; não certifica, por si só, a qualidade de toda a animação.

**Não foi realizado um teste de repetição de hashes após buscas não sequenciais na revisão 4.** Os hashes do manifesto identificam os arquivos produzidos. O teste de repetibilidade descrito abaixo pertence à revisão 3 e não deve ser atribuído à montagem atual.

O alinhamento das palavras continua baseado em ASR. A precisão acústica de **±3 frames para todas as palavras não foi certificada manualmente**. As fotografias são históricas e ilustram equipamentos e operações; não são registros identificados como Highmast 2025. Os recortes gerados e diagramas são ilustrações editoriais, e os trajetos geográficos são representações ilustrativas. Fontes e créditos permanecem em [IMAGE-SOURCES.md](IMAGE-SOURCES.md).

## Histórico — revisão visual 3

Os registros desta seção descrevem a montagem anterior e seus componentes, testes e limitações. Não são resultados de validação da revisão 4.

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

## Histórico — revisão visual 2

- Eight generated transparent PNGs and three OGL photographs integrated into the film; 22 main scenes now use raster imagery, with additional changes inside the rapid inventory shots.
- Alpha-channel presence and transparent pixels checked for all generated assets; results in `data/image-alpha-check.json`.
- Sixteen revised representative frames rendered and visually reviewed. The photographs were then given aspect-correct dimensions to preserve full ships and rotors.
- Generated images retain the native alpha. No programmatic background removal or retouching was used.
- TypeScript, ESLint and timeline checks passed after the visual update.
- Image provenance, licensing and generation prompts recorded in `IMAGE-SOURCES.md` and `data/image-prompts.json`.

## Histórico — produção inicial

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
