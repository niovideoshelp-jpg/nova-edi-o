# Imagens e créditos — versão 2

## Imagens geradas com IA

Criadas com a ferramenta integrada **image_gen**, com `transparent_background: true`. Os canais alfa foram conferidos nos arquivos PNG. Estes são assets ilustrativos, não fotografias documentais de navios, aeronaves ou eventos específicos. Os prompts completos estão em [data/image-prompts.json](data/image-prompts.json).

| Asset | Arquivo |
|---|---|
| Porta-aviões da classe Queen Elizabeth | [carrier.png](public/images/generated/carrier.png) |
| F-35B | [f35b.png](public/images/generated/f35b.png) |
| Merlin | [merlin.png](public/images/generated/merlin.png) |
| Navio histórico | [sailing-ship.png](public/images/generated/sailing-ship.png) |
| Interpretação de Númenor | [numenor.png](public/images/generated/numenor.png) |
| Ícone de logística | [logistics.png](public/images/generated/logistics.png) |
| Ícone de âncora | [anchor.png](public/images/generated/anchor.png) |
| Globo de alcance marítimo | [globe.png](public/images/generated/globe.png) |

## Fotografias da internet

As três fotos abaixo são reproduzidas sob a [Open Government Licence v1.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/1/). Contêm informação do setor público britânico licenciada sob OGL v1.0. © Crown copyright, Ministry of Defence. A utilização não implica endosso oficial. Ajustes de saturação, contraste, escala e máscara são feitos na composição; os JPEGs baixados foram preservados.

- **HMS Queen Elizabeth**, ensaios no mar em 28 de junho de 2017. Foto: **Fleet Air Arm aircrew / Ministry of Defence**. [Página original e licença](https://commons.wikimedia.org/wiki/File:Aerial_view_of_HMS_Queen_Elizabeth_(R08)_off_Scotland_on_28_June_2017_(4516752).jpg). Arquivo: [queen-elizabeth.jpg](public/images/web/queen-elizabeth.jpg). Ilustra os navios e seu convés; não é apresentada como registro da missão de 2025.
- **HMS Daring e HMS Dauntless**. Foto: **LA(Phot) Ian Simpson / Ministry of Defence**. [Página original e licença](https://commons.wikimedia.org/wiki/File:HMS_Daring_and_Dauntless_MOD_45151055.jpg). Arquivo: [daring-dauntless.jpg](public/images/web/daring-dauntless.jpg). Ilustra o conceito de escoltas, sem atribuir os navios a outra nacionalidade.
- **Merlin Mark 2**. Foto: **Andrew Linnett / Ministry of Defence**. [Página original e licença](https://commons.wikimedia.org/wiki/File:Royal_Navy_Merlin_Mark_2_Helicopter_MOD_45155783.jpg). Arquivo: [merlin-hm2.jpg](public/images/web/merlin-hm2.jpg). Ilustra a aviação antissubmarino.

Metadados de origem e licenciamento, consultados em 2 de outubro de 2026: [data/web-sources.raw.json](data/web-sources.raw.json). Ao distribuir um vídeo exportado, inclua estes créditos e links na descrição ou no material que o acompanha.
# Revisão 3: fontes adicionais

## Cartografia

Natural Earth, domínio público. Reino Unido e Irlanda em 1:10 milhões; mundo em 1:50 milhões. Dados, commit e SHA-256 das fontes em [data/geography/sources.json](data/geography/sources.json). [Termos de uso](https://www.naturalearthdata.com/about/terms-of-use/) · [Repositório original](https://github.com/nvkelso/natural-earth-vector).

As rotas de antigas colônias são conexões ilustrativas entre lugares atuais, sem representar extensão territorial em uma data específica. Os trajetos modernos também são ilustrativos, não rastreamentos da missão Highmast.

## Fotografias adicionadas

- **HMS Prince of Wales (R09), primeiras provas de mar:** Alex Ceolin / UK MOD, Crown copyright. [Fonte](https://commons.wikimedia.org/wiki/File:HMS_Prince_of_Wales_(R09)_sets_sail_for_the_first_time_-_18.jpg). Arquivo local: `public/images/web/prince-of-wales.jpg`.
- **Reabastecimento no mar, HMS Cumberland e RFA Wave Knight:** LA(Phot) Ray Jones / UK MOD, Crown copyright. [Fonte](https://commons.wikimedia.org/wiki/File:Replenishment_At_Sea._MOD_45144979.jpg). Arquivo local: `public/images/web/replenishment.jpg`.

Ambas sob [Open Government Licence v1.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/1/), conforme metadata arquivada em [data/web-sources-v3.json](data/web-sources-v3.json). São fotografias históricas de equipamento/operação, não imagens identificadas como Highmast 2025. Os créditos devem acompanhar a publicação do vídeo. Na composição, recebem apenas enquadramento preservando a imagem, movimento e dessaturação leve por CSS.

O globo gerado da revisão 2 foi retirado da timeline. Seis recortes gerados continuam ativos; o Merlin gerado é uma alternativa disponível à foto documental.
