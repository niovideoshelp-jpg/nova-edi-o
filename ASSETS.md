# Assets — revisão 5

A composição ativa `RoyalNavy` combina **quatro recortes gerados**, **seis trechos de filmagens documentais**, cartografia real e diagramas vetoriais animados. A lista foi conferida nos imports e elementos usados por `Film.tsx` e seus quatro capítulos. Os outros quatro recortes gerados, as cinco fotografias e os 35 SVGs da revisão 3 permanecem arquivados, fora da montagem atual.

## Recortes gerados em uso

PNGs com canal alfa, criados com a ferramenta de geração de imagens. São ilustrações editoriais, não fotografias de exemplares ou acontecimentos específicos. [Prompts completos](data/image-prompts.json) e [informações de origem](IMAGE-SOURCES.md).

| Asset | Uso na revisão 5 |
|---|---|
| [carrier.png](public/images/generated/carrier.png) | Continuidade entre HistoryChapter e FleetChapter e aproximações do porta-aviões no capítulo da frota |
| [f35b.png](public/images/generated/f35b.png) | Passagem da aeronave em FleetChapter; a contagem de 24 usa vetores próprios |
| [sailing-ship.png](public/images/generated/sailing-ship.png) | Navegação histórica em uma aparição principal, com vento e esteira vetoriais |
| [numenor.png](public/images/generated/numenor.png) | Interpretação visual da ilha fictícia mencionada na narração |

[grain.png](public/grain.png) continua ativo como textura discreta de fundo; não é um recorte ilustrativo.

## Filmagens documentais em uso

Seis recortes locais H.264, 1920×1080 e 30 fps, sem áudio e sem loop. As fontes estão identificadas como **PUBLIC DOMAIN** no manifesto consultado. Autoria, páginas de origem, datas e recortes da fonte estão em [VIDEO-SOURCES.md](VIDEO-SOURCES.md); metadados técnicos e hashes estão em [data/video-sources.json](data/video-sources.json).

| Arquivo | Conteúdo e registro | Capítulo ativo |
|---|---|---|
| [qe-arrival.mp4](public/video/qe-arrival.mp4) | HMS Queen Elizabeth chegando a Norfolk, 2022 | FleetChapter |
| [pow-arrival.mp4](public/video/pow-arrival.mp4) | HMS Prince of Wales chegando a Norfolk, 2023 | FleetChapter |
| [f35-landing.mp4](public/video/f35-landing.mp4) | Teste de pouso de F-35 em HMS Prince of Wales, 2023 | FleetChapter |
| [qe-bow.mp4](public/video/qe-bow.mp4) | Proa de HMS Queen Elizabeth, 2022 | OperationsChapter |
| [ordnance-lift.mp4](public/video/ordnance-lift.mp4) | Movimentação de munição para HMS Prince of Wales, 2025 | OperationsChapter |
| [ordnance-deck.mp4](public/video/ordnance-deck.mp4) | Trabalho no convés durante movimentação de munição, 2025 | EnduranceChapter |

[FootageShot.tsx](src/documentary/FootageShot.tsx) reproduz os arquivos locais, aplica enquadramento, movimento, máscara de entrada e crédito com a data do registro. Os planos de 2022 e 2023 ilustram os equipamentos; não são apresentados como registros de Highmast 2025. As filmagens de munição não constituem evidência de manutenção, defeito ou indisponibilidade.

## Recortes e fotografias arquivados

Estes quatro PNGs não são importados nem exibidos pelos capítulos ativos:

| Recorte | Situação na revisão 5 |
|---|---|
| [merlin.png](public/images/generated/merlin.png) | Substituído pelo helicóptero SVG animado de FleetHelicopter |
| [logistics.png](public/images/generated/logistics.png) | Substituído por diagramas de abastecimento e filmagens documentais |
| [anchor.png](public/images/generated/anchor.png) | Asset anterior, sem uso atual |
| [globe.png](public/images/generated/globe.png) | Asset anterior, sem uso atual; a montagem utiliza cartografia real |

As cinco fotografias abaixo também estão fora da montagem ativa. Foram obtidas sob **Open Government Licence v1.0**, com créditos completos e páginas de origem preservados em [IMAGE-SOURCES.md](IMAGE-SOURCES.md).

| Fotografia | Conteúdo |
|---|---|
| [queen-elizabeth.jpg](public/images/web/queen-elizabeth.jpg) | Vista aérea de HMS Queen Elizabeth e seu convés |
| [prince-of-wales.jpg](public/images/web/prince-of-wales.jpg) | HMS Prince of Wales no estaleiro |
| [daring-dauntless.jpg](public/images/web/daring-dauntless.jpg) | HMS Daring e HMS Dauntless |
| [merlin-hm2.jpg](public/images/web/merlin-hm2.jpg) | Helicóptero Merlin Mark 2 em voo |
| [replenishment.jpg](public/images/web/replenishment.jpg) | Reabastecimento entre HMS Cumberland e RFA Wave Knight |

Os JPEGs originais continuam disponíveis para reaproveitamento. Seus créditos e licença devem acompanhar eventual reutilização; não constituem registros identificados como Highmast 2025.

## Vetores ativos na composição

Os mapas e diagramas são SVGs editáveis em React, animados por `useGsapTimeline()` da integração oficial `@remotion/gsap`.

| Arquivo | Elementos vetoriais |
|---|---|
| [Atlas.tsx](src/documentary/Atlas.tsx) | Costas geográficas, máscara de pintura líquida, rotas, pontos de origem e destino |
| [HistoryNavigation.tsx](src/documentary/HistoryNavigation.tsx) | Vento e esteira do veleiro, sinais sobre os geodésicos Turf, conexões esquemáticas do porto de Númenor e embarcações seguindo corredores marítimos ilustrativos |
| [HistoryChapter.tsx](src/documentary/HistoryChapter.tsx) | Animação dos diagramas históricos, pintura líquida, luz sobre o mapa, comparação das ilhas e movimentos de câmera |
| [FleetHelicopter.tsx](src/documentary/FleetHelicopter.tsx) | Helicóptero vetorial com rotores principal e de cauda animados e ponto de ligação ao sonar |
| [FleetSystems.tsx](src/documentary/FleetSystems.tsx) | Planta esquemática do porta-aviões, escoltas, apoio, ligações de comando, sinais e cobertura aérea; inclui FleetCarrierPlan |
| [FleetChapter.tsx](src/documentary/FleetChapter.tsx) | Trajetória no convés, transição pela linha d’água, cabo e sonda de sonar, ondas e submarino |
| [NavalDiagramsV5.tsx](src/documentary/NavalDiagramsV5.tsx) | Perfis de porta-aviões, escolta e apoio, vistas superiores de embarcações e unidade vetorial de aeronave; geometrias animadas pelos capítulos |
| [OperationsChapter.tsx](src/documentary/OperationsChapter.tsx) | Contagem de 24 aeronaves vetoriais, alcance geográfico, reabastecimento lado a lado e transferência de suprimentos |
| [EnduranceChapter.tsx](src/documentary/EnduranceChapter.tsx) | Formação multinacional, conexões entre aliados, disponibilidade das embarcações e evolução da pressão sobre a frota |

Os diagramas navais são representações editoriais, não plantas técnicas nem indicação de quantidades operacionais reais. A contagem de 24 aeronaves segue o trecho específico da narração.

As conexões de Númenor são esquemáticas, sem pretensão de reproduzir a cartografia canônica de Middle-earth. O diagrama europeu usa a projeção do atlas e corredores marítimos ilustrativos. Os sinais que cruzam o mapa mundial representam conexões geográficas, não navios navegando por terra.

## Cartografia e exportações disponíveis

Também estão disponíveis seis SVGs transparentes exportados da geometria ativa da revisão 5. São estados estáticos reutilizáveis; a animação permanece nos componentes Remotion/GSAP.

- [carrier-profile.svg](public/svg-v5/carrier-profile.svg) · [carrier-plan.svg](public/svg-v5/carrier-plan.svg)
- [escort-profile.svg](public/svg-v5/escort-profile.svg) · [escort-plan.svg](public/svg-v5/escort-plan.svg)
- [supply-profile.svg](public/svg-v5/supply-profile.svg) · [supply-plan.svg](public/svg-v5/supply-plan.svg)

[Manifesto](data/svg-v5.json) · [Gerador](scripts/export-documentary-vectors.mjs).

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
