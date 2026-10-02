import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { transform } from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const compiled = await transform(
  fs.readFileSync("src/NavalGraphic.tsx", "utf8"),
  { loader: "tsx", format: "esm", jsx: "automatic" },
);
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/naval-artwork.mjs", compiled.code);
const { NavalArtwork } = await import(
  pathToFileURL(path.resolve("out/naval-artwork.mjs")).href
);
const plans = JSON.parse(fs.readFileSync("data/visual-plan.json", "utf8"));
const modes = [
  ...new Set([
    ...Object.values(plans)
      .filter((v) => v.kind === "graphic")
      .map((v) => v.name),
    "communications",
    "maintenance",
    "fuel",
  ]),
];
fs.mkdirSync("public/svg-v3", { recursive: true });
for (const mode of modes) {
  let markup = renderToStaticMarkup(
    React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1200 760",
        fill: "none",
      },
      React.createElement("title", null, mode),
      React.createElement(NavalArtwork, { mode, uid: `asset-${mode}` }),
    ),
  );
  markup = markup
    .replaceAll('stroke-dashoffset="100"', 'stroke-dashoffset="0"')
    .replaceAll('fill-opacity="0"', 'fill-opacity="0.82"');
  fs.writeFileSync(`public/svg-v3/${mode}.svg`, markup);
}
const maps = fs.readdirSync("public/maps").filter((x) => x.endsWith(".svg"));
fs.writeFileSync(
  "ASSETS.md",
  `# Assets vetoriais — revisão 3\n\nOs desenhos da versão anterior foram substituídos na composição. Os mapas usam contornos geográficos reais. Os navios são ilustrações editoriais originais, não plantas técnicas; os agrupamentos não representam quantidades operacionais reais, exceto os 24 aviões explicitamente narrados.\n\n## Cartografia (${maps.length} vistas)\n\nNatural Earth, domínio público; processamento com Turf.js e projeção D3. Dados e origem em [data/geography/sources.json](data/geography/sources.json). O efeito líquido e as linhas animadas estão em [MapAtlas.tsx](src/MapAtlas.tsx).\n\n${maps.map((m) => `- [${m}](public/maps/${m})`).join("\n")}\n\n## Ilustrações SVG (${modes.length})\n\nFundo transparente, viewBox 1200×760, paleta naval. Exportadas da mesma geometria usada por [NavalGraphic.tsx](src/NavalGraphic.tsx); nenhuma conversão de bitmap em vetor. Animação pelo hook oficial useGsapTimeline.\n\n${modes.map((m) => `- [${m}](public/svg-v3/${m}.svg)`).join("\n")}\n\n## Imagens e fotografias\n\n[Prompts, transparência, fontes e créditos](IMAGE-SOURCES.md). O globo gerado anteriormente não é mais utilizado.\n`,
);
console.log(
  `Exported ${modes.length} revised transparent SVGs, alongside ${maps.length} geographic SVGs.`,
);
