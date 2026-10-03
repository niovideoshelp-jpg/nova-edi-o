# Royal Navy — Parte 2

Composição isolada `RoyalNavyPart2`: 1920×1080, 30 fps, **6593 frames** (219.766667 s). A narração original tem 219.742041 s informados pelo FFprobe bundled; o PCM decodificado tem 219.715937 s. A pequena diferença é preenchimento/temporização do MP3, sem alteração da fala.

## Fonte única de tempo

- [Timeline JSON](../data/part2/timeline.json) e [CSV](../data/part2/timeline.csv): 74 beats de 60–120 frames em oito capítulos.
- [Palavras](../data/part2/words.json): 590 palavras com IDs explícitos, segundos, milissegundos e frames estimados.
- [Transcrição](../data/part2/transcript.json): 33 frases completas e contexto do alinhamento.
- [Revisão de termos](../data/part2/transcript-term-review.json): “aircraft” e “late” foram reconhecidos em recortes independentes sem prompt lexical. O alinhamento completo os havia omitido; os trechos corrigidos e a origem estão registrados. A [saída bruta](../data/part2/transcript-raw.json) fica preservada para auditoria.

| Capítulo | Primeiro frame | Fim exclusivo | Intervalo |
|---|---:|---:|---|
| inventory | 0 | 1026 | 0.000–34.200 s |
| readiness | 1026 | 1771 | 34.200–59.033 s |
| escort | 1771 | 2403 | 59.033–80.100 s |
| capacity | 2403 | 3226 | 80.100–107.533 s |
| renewal | 3226 | 4360 | 107.533–145.333 s |
| industry | 4360 | 5461 | 145.333–182.033 s |
| atlantic | 5461 | 5903 | 182.033–196.767 s |
| availability | 5903 | 6593 | 196.767–219.767 s |

Os IDs semânticos dos cues são estáveis. `triggerFrame` é a palavra falada; `iconRevealFrame` antecipa exatamente quatro frames; `textRevealFrame` aponta para a palavra do rótulo. `startFrame` e `durationInFrames` definem o beat editorial de câmera de 2–4 s, independentemente do instante preciso da revelação. Os capítulos permanecem contínuos e recebem sobreposição de 24 frames, exceto o último. Os timestamps são alinhamento automático revisado, não certificação auditiva quadro a quadro.

## Contexto factual da narração

A edição apresenta os números como **dados históricos de abril de 2025**, não como inventário ao vivo: 57 embarcações de superfície, 13 da Royal Fleet Auxiliary e nove submarinos. As ressalvas precisam permanecer junto aos dados: quatro Vanguard são dedicados à dissuasão nuclear; os cinco submarinos de ataque têm outra função. Cinco dos 57 navios não estavam classificados em serviço, incluindo três fragatas em retirada. Isso **não permite afirmar que os outros 52 estavam operacionais**; manutenção e prontidão são estados distintos.

O programa de oito Type 26 e cinco Type 31 é apresentado como renovação/substituição das Type 23. A declaração sobre a transição tem contexto de **junho de 2025**. A previsão de **até 12 SSN-AUKUS**, a substituição da classe Astute e o **fim dos anos 2030** são planos futuros, sujeitos a investimento e capacidade de construção, não capacidade já entregue.

Mapas de cabos são esquemáticos e não afirmam posições de infraestrutura real. Perfis navais e o berço de manutenção são diagramas editoriais, sem alegação de representar um navio identificado. As duas embarcações não especificadas do grupo de cinco usam símbolos neutros; somente três são representadas como fragatas. Fotografia/filmagem histórica mantém identificação e crédito da fonte. A cena industrial gerada não é apresentada como registro documental. Consulte [fontes de mídia](../data/part2/media-sources.md) e [assets gerados](../data/part2/generated-assets.json). A lista abaixo acompanha a chamada final para as fontes na descrição do vídeo.

## Sources for video description

The fleet totals in this video describe **1 April 2025**. Publication dates and later policy announcements are identified separately; future programmes are not counted as delivered capability. Sources checked on 3 October 2026.

- **Fleet inventory and classification:** [Ministry of Defence — UK armed forces equipment and formations 2025](https://www.gov.uk/government/statistics/uk-armed-forces-equipment-and-formations-2025/uk-armed-forces-equipment-and-formations-2025), published 30 October 2025, sections 3.1–3.2. The April snapshot records 57 Royal Navy surface vessels, 13 RFA vessels and nine submarines: four ballistic nuclear and five attack submarines. Five surface vessels were outside the in-service category, including three decommissioning frigates. These totals do not measure immediate operational readiness.
- **Frigate renewal and roles:** [Royal Navy — Navy News, January 2025, issue 846 (PDF)](https://cd.royalnavy.mod.uk/-/media/rnweb/navynews/archivepdfs/2020s/2025/navy-news-january-2025-issue-846.pdf?rev=8016475e4fa344969dd374530c503cee), pages 5 and 13. The planned eight Type 26 and five Type 31 frigates replace Type 23 roles, with anti-submarine specialisation for Type 26 and general-purpose duties for Type 31.
- **The June 2025 transition statement:** [House of Commons Defence Committee — The work of the Chief of Defence Staff, oral evidence, 10 June 2025](https://committees.parliament.uk/oralevidence/16049/html/), questions 7–8. Admiral Sir Tony Radakin discusses ageing frigates and replacements that were not yet ready. This is a dated statement about the transition, not a claim about fleet status today.
- **Parliamentary background:** [House of Commons Library — UK defence in 2025: Warships and the surface fleet](https://commonslibrary.parliament.uk/research-briefings/cbp-10257/). This briefing provides context on capability gaps, renewal and the June testimony; its later updates should not be substituted for the April inventory snapshot.
- **Future SSN-AUKUS fleet and industrial capacity:** [Ministry of Defence / Prime Minister's Office — UK to expand submarine programme in response to Strategic Defence Review, 1 June 2025](https://www.gov.uk/government/news/uk-to-expand-submarine-programme-in-response-to-strategic-defence-review). The announcement describes a plan for up to 12 attack submarines, replacing Astute from the late 2030s, dependent on expanded construction capacity.
- **Deterrence, escort roles and the North Atlantic:** [Ministry of Defence — Strategic Defence Review 2025](https://www.gov.uk/government/publications/the-strategic-defence-review-2025-making-britain-safer-secure-at-home-strong-abroad/the-strategic-defence-review-2025-making-britain-safer-secure-at-home-strong-abroad), published 2 June 2025 and updated 8 July 2025, chapters 7.1–7.2 and Box 12. The review covers nuclear deterrence, Type 45 air defence, RFA logistical support, the North Atlantic and protection of undersea infrastructure. Atlantic Bastion is presented as a plan, not a completed system.

Archival visual credits and reuse terms: [Part2 media sources](../data/part2/media-sources.md). Generated illustrations: [generated asset ledger](../data/part2/generated-assets.json). Diagrams of ships and cables are explanatory and do not disclose operational positions.

## Áudio

A [cópia original](../public/audio/part2/2.mp3) preserva o SHA256 `128d7180411bc24f82499f91bc69728f49d460b05126652c192a4e25d9dda76c`. A [mixagem](../public/audio/part2/mix.mp3) usa a voz original, alvo de voz −16 LUFS, trilha ambiente original a −22 dB com ducking (ratio 5, ataque 25 ms, release 350 ms) e dez efeitos esparsos a −18 dB.

O bed existente foi estendido com seu trecho interno de 60–90 s, sobreposição equal-power de quatro segundos e corte na duração exata da composição. Resultado medido: **-16.95 LUFS / -1.20 dBTP**. [Metadados de mixagem](../data/part2/audio-mix.json) registram o probe, eventos e parâmetros. MP3 pode apresentar padding de codec nos leitores; o stem WAV tem a duração exata de 6593/30 s.

Reprodução: `scripts/transcribe-part2.py`, `scripts/build-part2-timeline.mjs`, `scripts/audio-part2.py`. O ASR usa faster-whisper small CPU/int8 com duas threads; o mixer limita o FFmpeg a uma thread. Os scripts escrevem somente a Parte 2.

## Arquivos e reprodução

- Filme: `out/RoyalNavy-Part2.mp4`; projeto editável: `out/RoyalNavy-Part2-project.zip`.
- Composição: `src/part2/Part2Film.tsx`; montagem em oito `<Sequence>`, com 24 frames de sobreposição entre capítulos.
- Timing e helpers: `src/part2/Timing.ts` e `Shared.tsx`. Os capítulos usam `useGsapTimeline()` de `@remotion/gsap`; contadores são derivados do frame, sem callbacks assíncronos.
- Assets: [inventário](../data/part2/assets.json), [uso por cue](../data/part2/asset-usage.json), [22 SVGs exportados](../data/part2/svg-assets.json) e [fontes de mídia](../data/part2/media-sources.md). Os SVGs exportados reutilizam a geometria dos componentes animados; as animações permanecem no React.
- Verificação final: [render](../data/part2/render.json), [QA visual](../data/part2/visual-qa.json) e [alinhamento do áudio renderizado](../data/part2/audio-render-qa.json).

No Studio, `RoyalNavyPart2` reproduz o filme com áudio. As oito composições `P2-*` em `Part2-Chapters` são prévias visuais isoladas, úteis para editar os movimentos de cada capítulo.

```sh
npm ci
npm run dev
npm run lint
npm run check:part2
npm run review:part2
npm run render:part2
```

Os scripts de revisão e render usam Chrome instalado no caminho padrão do Windows, ANGLE e um único renderer. O render consome o bundle produzido pela revisão, preserva capítulos já concluídos somente se seu hash coincidir e valida o MP4 completo. `scripts/inspect-part2-mp4.py`, `scripts/verify-part2-audio.py --final` e `scripts/package-part2.py` usam Python; os dois primeiros também usam FFmpeg completo instalado no PATH.

## Transcrição completa

**0.00–9.40 s** — Official figures from April 2025 recorded 57 vessels in the Royal Navy's surface fleet, 13 ships in the Royal Fleet Auxiliary, and 9 submarines.

**10.26–18.92 s** — Among those submarines, four were Vanguard-class ballistic missile submarines tied to Britain's nuclear deterrent, while five were nuclear-powered attack submarines.

**19.62–22.16 s** — And those two categories serve very different purposes.

**23.00–29.12 s** — The Vanguard submarines are not simply four additional boats available to escort an aircraft carrier or hunt enemy submarines.

**29.87–33.91 s** — Their primary mission is to maintain Britain's nuclear second strike capability.

**34.47–37.89 s** — The figure of 57 surface vessels also needs some context.

**38.53–42.63 s** — It includes patrol ships, mine countermeasure vessels, and other specialized ships.

**43.21–49.87 s** — And five of those vessels were no longer classified as being in service, including three frigates already in the process of being retired.

**50.49–55.41 s** — Even the phrase, in service, doesn't necessarily mean a ship is ready to leave port tomorrow.

**55.41–58.81 s** — That category can still include vessels undergoing maintenance.

**59.27–64.73 s** — An aircraft carrier needs protection and logistical support if it is going to operate in a high-threat environment.

**65.21–73.15 s** — In the British fleet, Type 45 destroyers are primarily responsible for air defense, while frigates and helicopters help detect and track submarines.

**73.97–79.81 s** — Attack submarines can add another layer of protection, while logistics ships provide fuel, supplies, and ammunition.

**80.37–90.57 s** — When there are only a limited number of ships available to perform all of these missions, every extended maintenance period, delay, or mechanical problem reduces the options commanders have.

**90.91–96.19 s** — And in wartime, the loss of even a single escort ship would have a proportionally greater impact.

**96.69–100.43 s** — That is the fundamental issue created by the size of the modern fleet.

**101.03–107.25 s** — There simply isn't much spare capacity to replace ships while maintaining several major operations at the same time.

**107.77–109.53 s** — But the fleet is being renewed.

**110.11–119.99 s** — Current British programs include eight Type 26 frigates designed primarily for anti-submarine warfare, and five Type 31 frigates intended for more general purpose missions.

**120.53–124.27 s** — Together, they are expected to replace the older Type 23 frigates.

**124.57–127.81 s** — The problem is that this creates a difficult transition period.

**128.33–134.75 s** — Older ships are leaving service, while their replacements still have to be completed, tested, and prepared for operational deployment.

**135.33–145.01 s** — In June 2025, Britain's chief of the defense staff himself acknowledged that the Royal Navy was going through a difficult transition, with the new frigates still not ready for service.

**145.61–154.33 s** — On the other hand, the United Kingdom has preserved something extremely important, its ability to design and build advanced frigates and nuclear powered submarines.

**155.19–159.81 s** — The AUKUS program, developed with the United States and Australia, is part of that continuity.

**160.31–171.84 s** — In 2025, London announced plans for a future force of up to 12 SSN AUKUS nuclear powered attack submarines, which are expected to begin replacing the astute class from the late 2030s onward.

**172.11–181.77 s** — That would represent a major long-term expansion, but one that will depend heavily on sustained investment and Britain's ability to actually build the submarines at the required pace.

**182.29–188.45 s** — Britain's defense review has also placed greater emphasis on protecting the North Atlantic and critical undersea infrastructure.

**188.95–196.43 s** — That means countering the threat posed by Russian submarines and improving surveillance around undersea cables and other strategically important infrastructure.

**197.11–201.39 s** — So the Royal Navy still possesses capabilities with enormous military value.

**201.99–214.59 s** — The real challenge is keeping those capabilities available for long enough, having the crews, keeping the ships maintained, keeping them supplied, and having enough vessels available to replace the ones that eventually have to leave the fight.

**215.23–218.53 s** — All the sources used and analyzed for this video are linked in the description.

**219.07–219.45 s** — Take a look!
