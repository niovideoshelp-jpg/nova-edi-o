# Assets — revisão 4

A composição ativa combina **seis recortes gerados**, **cinco fotografias documentais**, cartografia real e diagramas vetoriais desenhados dentro dos capítulos. Os 35 SVGs da revisão 3 permanecem arquivados e não são usados na montagem atual.

## Recortes gerados em uso

PNGs com canal alfa, criados com a ferramenta de geração de imagens. São ilustrações editoriais, não fotografias de exemplares ou acontecimentos específicos. [Prompts completos](data/image-prompts.json) e [informações de origem](IMAGE-SOURCES.md).

| Asset | Uso na revisão 4 |
|---|---|
| [carrier.png](public/images/generated/carrier.png) | Continuidade entre história e frota, aproximações do convés, operações e disponibilidade |
| [f35b.png](public/images/generated/f35b.png) | Passagem da aeronave e composição da ala aérea |
| [merlin.png](public/images/generated/merlin.png) | Contexto aéreo da representação de sonar |
| [sailing-ship.png](public/images/generated/sailing-ship.png) | Navegação histórica e transição para o poder naval atual |
| [numenor.png](public/images/generated/numenor.png) | Interpretação visual da ilha fictícia mencionada na narração |
| [logistics.png](public/images/generated/logistics.png) | Suprimentos e sustentação da operação |

[anchor.png](public/images/generated/anchor.png) e [globe.png](public/images/generated/globe.png) continuam disponíveis como arquivos anteriores, sem uso na composição ativa.

## Fotografias em uso

As cinco fotografias foram obtidas sob **Open Government Licence v1.0**, com créditos completos e páginas de origem em [IMAGE-SOURCES.md](IMAGE-SOURCES.md). Os JPEGs preservam os arquivos baixados; máscaras, enquadramento e movimento são aplicados na composição.

| Fotografia | Conteúdo |
|---|---|
| [queen-elizabeth.jpg](public/images/web/queen-elizabeth.jpg) | Vista aérea de HMS Queen Elizabeth e seu convés |
| [prince-of-wales.jpg](public/images/web/prince-of-wales.jpg) | HMS Prince of Wales no estaleiro |
| [daring-dauntless.jpg](public/images/web/daring-dauntless.jpg) | HMS Daring e HMS Dauntless |
| [merlin-hm2.jpg](public/images/web/merlin-hm2.jpg) | Helicóptero Merlin Mark 2 em voo |
| [replenishment.jpg](public/images/web/replenishment.jpg) | Reabastecimento entre HMS Cumberland e RFA Wave Knight |

São imagens históricas de equipamentos e operações; não constituem registros identificados como Highmast 2025. Autores e licença devem acompanhar a distribuição do vídeo.

## Vetores ativos na composição

Os mapas e diagramas são SVGs editáveis em React, animados por `useGsapTimeline()` da integração oficial `@remotion/gsap`.

| Arquivo | Elementos vetoriais |
|---|---|
| [Atlas.tsx](src/documentary/Atlas.tsx) | Costas geográficas, máscara de pintura líquida, rotas, pontos de origem e destino |
| [HistoryChapter.tsx](src/documentary/HistoryChapter.tsx) | Apresentação histórica, relações entre as ilhas e deslocamentos cartográficos |
| [FleetChapter.tsx](src/documentary/FleetChapter.tsx) | Trajetória sobre o convés, conexões de comando, cobertura aérea, linha d’água, sonar e submarino |
| [OperationsChapter.tsx](src/documentary/OperationsChapter.tsx) | Rota, transferências de suprimentos e marcações da operação |
| [EnduranceChapter.tsx](src/documentary/EnduranceChapter.tsx) | Conexões entre aliados e diagramas de disponibilidade e tempo |

Os diagramas navais são representações editoriais, não plantas técnicas nem indicação de quantidades operacionais reais. A contagem de 24 aeronaves segue o trecho específico da narração.

## Cartografia e exportações disponíveis

Natural Earth, domínio público. Turf.js processa polígonos e trajetos geodésicos; D3 realiza a projeção. O mundo usa detalhe 1:50 milhões e Reino Unido/Irlanda, 1:10 milhões. [Dados congelados e origem](data/geography/sources.json) · [atlas utilizado pelos componentes](data/geography/atlas.json).

[public/maps/layers](public/maps/layers) contém camadas SVG em cache, geradas a partir desse mesmo atlas por [scripts/cache-map-layers.mjs](scripts/cache-map-layers.mjs). Os componentes reutilizam essas camadas para desenhar países, ilhas e máscaras sem reconstruir todos os polígonos a cada frame; as animações continuam nos capítulos.

As conexões com antigas colônias usam limites atuais e não representam o território completo do império em determinada data. Os trajetos modernos são ilustrativos, não rastreamentos reais.

Estas 16 vistas SVG continuam disponíveis para consulta ou reaproveitamento. A animação atual lê a geometria do atlas, em vez de reproduzir cada exportação como um ícone independente.

- [allies.svg](public/maps/allies.svg)
- [colonies.svg](public/maps/colonies.svg)
- [comparison.svg](public/maps/comparison.svg)
- [daylight.svg](public/maps/daylight.svg)
- [distance.svg](public/maps/distance.svg)
- [empire.svg](public/maps/empire.svg)
- [europe.svg](public/maps/europe.svg)
- [home-range.svg](public/maps/home-range.svg)
- [indo-pacific.svg](public/maps/indo-pacific.svg)
- [leadership.svg](public/maps/leadership.svg)
- [mediterranean.svg](public/maps/mediterranean.svg)
- [norway.svg](public/maps/norway.svg)
- [reach.svg](public/maps/reach.svg)
- [return.svg](public/maps/return.svg)
- [sovereignty.svg](public/maps/sovereignty.svg)
- [uk-paint.svg](public/maps/uk-paint.svg)

## Arquivo da revisão 3 — fora da montagem atual

Os 35 arquivos abaixo têm fundo transparente e viewBox 1200×760. Foram exportados da geometria de `src/NavalGraphic.tsx`, sem conversão de bitmap em vetor. Esse componente, `src/Scene.tsx`, `src/MapAtlas.tsx` e `src/scenes` pertencem à arquitetura anterior.

- [archive](public/svg-v3/archive.svg)
- [manuscript](public/svg-v3/manuscript.svg)
- [compass](public/svg-v3/compass.svg)
- [harbor](public/svg-v3/harbor.svg)
- [island-distance](public/svg-v3/island-distance.svg)
- [naval-influence](public/svg-v3/naval-influence.svg)
- [inquiry](public/svg-v3/inquiry.svg)
- [broadside](public/svg-v3/broadside.svg)
- [era-change](public/svg-v3/era-change.svg)
- [capability](public/svg-v3/capability.svg)
- [flagship](public/svg-v3/flagship.svg)
- [formation](public/svg-v3/formation.svg)
- [deck-plan](public/svg-v3/deck-plan.svg)
- [ski-jump](public/svg-v3/ski-jump.svg)
- [supply](public/svg-v3/supply.svg)
- [command](public/svg-v3/command.svg)
- [sonar](public/svg-v3/sonar.svg)
- [defense-ring](public/svg-v3/defense-ring.svg)
- [highmast](public/svg-v3/highmast.svg)
- [eight-months](public/svg-v3/eight-months.svg)
- [airwing](public/svg-v3/airwing.svg)
- [reveal](public/svg-v3/reveal.svg)
- [communications](public/svg-v3/communications.svg)
- [ammunition](public/svg-v3/ammunition.svg)
- [endurance](public/svg-v3/endurance.svg)
- [frigate](public/svg-v3/frigate.svg)
- [interoperability](public/svg-v3/interoperability.svg)
- [burden](public/svg-v3/burden.svg)
- [autonomy](public/svg-v3/autonomy.svg)
- [availability](public/svg-v3/availability.svg)
- [dockyard](public/svg-v3/dockyard.svg)
- [sustain](public/svg-v3/sustain.svg)
- [fleet-pressure](public/svg-v3/fleet-pressure.svg)
- [maintenance](public/svg-v3/maintenance.svg)
- [fuel](public/svg-v3/fuel.svg)

## Áudio e tipografia

[Intro.mp3](public/audio/Intro.mp3) é a narração fornecida pelo usuário. [mix.mp3](public/audio/mix.mp3) reúne voz, música ambiente original e efeitos suaves; as fontes de áudio e o script de síntese permanecem no projeto. Inter é carregada localmente, com licença OFL incluída.

Os timestamps da transcrição automática são estimativas; a precisão acústica de ±3 frames para todas as palavras não foi certificada manualmente. O manifesto ativo de capítulos e gatilhos está em [data/documentary-timeline.json](data/documentary-timeline.json).
