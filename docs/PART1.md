# Royal Navy — Part 1

Composição documental `RoyalNavyPart1`, dedicada à Royal Navy nas duas guerras mundiais e à transição de uma frota de grandes navios para operações dependentes de cobertura aérea, escoltas, sensores e capacidade industrial.

1920×1080, 16:9, 30 fps, **5390 frames / 179,667 s**. A narração original tem 179,644 s e fica em `public/audio/part1/1.mp3`. Esta composição é independente de `RoyalNavy`, a introdução contemporânea anterior.

## Estrutura e sincronização

`src/part1/Part1Film.tsx` monta quatro capítulos em `<Sequence>`. Os três primeiros conservam 24 frames de imagem além do limite editorial para sustentar a entrada do capítulo seguinte. As passagens usam câmera, máscara direcional ou dissolução com imagem válida por baixo.

| Capítulo | Intervalo editorial, fim exclusivo | Tempo | Módulo |
|---|---|---|---|
| Origins — a navy for an empire |0–860 |0–28,667 s |`OriginsChapter.tsx` |
| Jutland and endurance |860–2180 |28,667–72,667 s |`JutlandChapter.tsx` |
| World War II — a global war |2180–3608 |72,667–120,267 s |`WorldWarChapter.tsx` |
| Air power and adaptation |3608–5390 |120,267–179,667 s |`TransformationChapter.tsx` |

`data/part1/timeline.json` registra **62 momentos editoriais contínuos**, com palavras-gatilho, rótulos e frames. Esses registros orientam mudanças de câmera, desenhos, contadores e mídia dentro dos ambientes dos quatro capítulos; não representam 62 cortes secos nem 62 recriações da mesma cena. Subsequências locais isolam inserções de arquivo.

`transcript.json`, `transcript.txt` e `words.json` conservam a transcrição e 495 palavras. O alinhamento foi produzido por `faster-whisper small`, CPU/int8. **Os timestamps por palavra são estimativas automáticas**, não medições fonéticas verificadas manualmente. Os gatilhos normalmente antecipam a estimativa em 4 frames; a precisão real de ±3 frames precisa ser avaliada ouvindo o áudio, não inferida apenas do JSON.

As animações usam a integração oficial **`@remotion/gsap` e `useGsapTimeline()`**. Câmeras, movimentos dos navios, desenho de trajetos, máscaras de texto e fluxos são procurados pelo frame do Remotion. `timeline.set()` recebe posição explícita; não há criação paralela de `gsap.timeline()` nos módulos da Part1. `Shared.tsx` contém os estilos Emotion, `Cue`, `Passage` e `MediaShot`.

## Assets e linguagem visual

O inventário ativo está em [`data/part1/assets.json`](../data/part1/assets.json). Créditos individuais, licenças, URLs, cortes de origem e hashes estão em [`media-sources.md`](../data/part1/media-sources.md) e [`media-sources.json`](../data/part1/media-sources.json).

- **Geração raster:** `public/images/part1/generated/early-battleship.png`, recorte de um navio de guerra genérico do início do século XX, usado aproximadamente entre 3–8 s. É uma ilustração gerada, não fotografia histórica nem reprodução identificável de HMS Prince of Wales, HMS Repulse ou outro navio real. Não serve como referência de desenho técnico.
- **Fotografias:** `grand-fleet-highres.jpg`, `jutland-lion.jpg`, `prince-of-wales-1941.jpg` e `repulse-1941.jpg`, todas em `public/images/part1/`, provenientes de fotografias IWM com Crown copyright expirado conforme os registros Commons.
- **Vídeos ativos:** `public/video/pow-arrival.mp4` na abertura; `public/video/part1/atlantic-convoy.mp4`, `pow-modern.mp4`, `atlantic-air-cover.mp4`, `us-shipyards.mp4` e `atlantic-refueling.mp4` nas passagens históricas e de comparação. Os takes são locais, silenciosos e não entram em loop.
- **Mapas:** `public/maps/part1/world.svg`, `atlantic.svg`, `malaya.svg` e `war-world.svg`; coordenadas e curvas congeladas em `data/part1/geography.json`. O mapa da Segunda Guerra preserva a projeção das rotas e elimina contornos internos de países, sem modificar a introdução.

Os **15 SVGs transparentes** exportados da geometria ativa ficam em `public/svg-part1`, com viewBoxes, componentes de origem e hashes em `data/part1/svg-assets.json`. `node scripts/export-part1-vectors.mjs` os reproduz. O prompt e a revisão da ilustração raster estão em `data/part1/image-prompt.json`.

As quatro famílias vetoriais são: cartografia e rotas; `JutlandVectors.tsx`; `WarVectors.tsx`; `WarfareVectors.tsx`. A cartografia inclui o mapa de Origins, `NorthSeaCoast`, o `OperationMap` de WorldWar e os mapas de Transformation. Natural Earth fornece a geometria real; Turf.js processa geometrias e trajetos, enquanto D3 faz as projeções. `scripts/build-part1-geography.mjs` gera as três bases SVG. Os demais componentes desenham silhuetas de dreadnoughts, porta-aviões históricos, cargueiros, escoltas, aeronaves a hélice e submarinos para explicar escala e sistemas. São diagramas editoriais, não plantas de engenharia.

Os mapas são contextos geográficos. As linhas mostram conexões e corredores marítimos esquemáticos; não afirmam reconstruir coordenadas de um comboio específico, posições táticas completas, rotas exatas da Force Z ou fronteiras políticas de 1914/1939.

A paleta mantém azul-marinho `#0B1A2E`, azul-aço `#3A6EA5`, branco `#F4F7FA`, dourado `#D4A94A` para destaque e vermelho `#C8102E` para ameaça/perdas. Inter é a família tipográfica; os títulos respeitam o eixo de 154×110 px e a área segura. O grão é sutil. Os arquivos históricos de baixa resolução entram em janelas editoriais com data e crédito.

## Escopo histórico e créditos

Jutland, 31 de maio–1 de junho de 1916: **151 navios britânicos contra 99 alemães; 14 navios britânicos perdidos e mais de 6000 mortos britânicos**. A Royal Navy confirma esses números, inclusive 6094 mortos em seu relato comemorativo. Os 151 representam os navios britânicos envolvidos na batalha, não toda a Royal Navy. O vídeo preserva a formulação arredondada da narração. [Royal Navy, 2 de junho de 2016](https://www.royalnavy.mod.uk/news/2016/june/02/160602-the-royal-and-german-navy-remember-the-battle-of-jutland).

Créditos das fotografias: Royal Navy official photographer / IWM Q18121 (Grand Fleet, WWI); IWM SP1704 (HMS Lion, Jutland 1916); H. J. Abrahams / IWM A6784 (Prince of Wales, Singapura, 4/12/1941); Capitão W. L. G. Adams / IWM A29069 (Repulse, 8/12/1941). As duas últimas fotografias antecedem os afundamentos e não mostram o ataque.

Os filmes de comboio, patrulha aérea e reabastecimento são registros **do Atlântico, 1941–1942**, OSS/NARA ARC40149, em domínio público. **Não são imagens do ataque à Force Z na Malásia.** O lançamento em estaleiro foi filmado em Superior, Wisconsin, 9/5/1943, United States Navy / Naval Photographic Center 6318 / NARA 77824. O timecode da cópia de arquivo permanece visível.

Os dois takes modernos mostram o porta-aviões HMS Prince of Wales em Norfolk, 2023, U.S. Navy / Bryan Weyers / DVIDS 899101, domínio público. A comparação aborda somente o nome compartilhado: o encouraçado perdido em 1941 e o porta-aviões moderno são navios distintos.

`arctic-convoy-1942.mp4` permanece como opção pesquisada, **não é usado na composição padrão**. Sua localização é o Ártico, a caminho da Rússia. `grand-fleet.jpg` foi substituído pelo arquivo de alta resolução e também não é ativo.

## Áudio

`public/audio/part1/mix.mp3` combina a voz, a trilha ambiente original do projeto e efeitos sintetizados por `scripts/audio-part1.py`. O alvo da voz é −16 LUFS; a música recebe ganho −22 dB e ducking controlado pela voz; os efeitos recebem −18 dB. Os ganhos não equivalem a uma medição final de loudness de cada elemento. Eventos, duração e parâmetros estão em `data/part1/audio-mix.json`. Música e SFX não são extraídos dos filmes históricos.

## Verificação, prévia e exportação

Executar na raiz do projeto:

```powershell
node scripts/check-part1.mjs
npm run lint
node scripts/review-part1.mjs
```

`check-part1` verifica a cobertura da transcrição, a continuidade dos 62 registros e dos quatro capítulos, os 5390 frames e estados GSAP explícitos. Esses testes não substituem a revisão visual e auditiva. `review-part1` cria `out/bundle-part1`, renderiza amostras e registra avisos em `out/review-part1/report.json`.

Para uma seleção curta de frames ou uma passagem em movimento:

```powershell
node scripts/review-part1.mjs --only=90,860,2180,3608,4800
node scripts/review-part1.mjs --reuse-bundle --only=860 --motion=836,908
```

`--reuse-bundle` só reutiliza um bundle já atualizado. Depois de revisar o bundle correspondente ao código final:

```powershell
node scripts/render-part1.mjs
```

A exportação escreve `out/RoyalNavy-Part1.mp4`, em H.264/AAC. O script trabalha por capítulos, reutiliza segmentos apenas quando o fingerprint do bundle coincide, verifica tamanho/fps/contagem de frames/áudio e decodifica o resultado completo. Progresso em `out/full-part1/progress.json`; relatório final em `data/part1/render.json`.

Render final concluído: **93.544.538 bytes**, 5390 frames, 1920×1080, 30 fps, 179,667 segundos. Vídeo e áudio passaram pela decodificação integral sem erros; não houve avisos do navegador. O relatório de revisão visual está em `data/part1/visual-qa.json`. A introdução v5 permanece preservada em seu arquivo anterior.
