import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  renderStill,
  selectComposition,
} from "@remotion/renderer";
const timeline = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
const folder = "out/review-v3";
fs.mkdirSync(folder, { recursive: true });
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  outDir: path.resolve("out/qa-bundle"),
  rspack: true,
});
const browser = await openBrowser("chrome", {
  browserExecutable:
    process.env.CHROME_PATH ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  chromiumOptions: { gl: "swangle" },
});
const composition = await selectComposition({
  serveUrl,
  id: "RoyalNavy",
  puppeteerInstance: browser,
});
const warnings = [];
const render = async (frame, name) => {
  const output = `${folder}/${name}.png`;
  await renderStill({
    composition,
    serveUrl,
    frame,
    output,
    imageFormat: "png",
    puppeteerInstance: browser,
    chromiumOptions: { gl: "swangle" },
    onBrowserLog: (l) => {
      if (l.type === "error" || l.type === "warn") warnings.push(l);
    },
  });
  console.log(`${name} frame ${frame}`);
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync(output))
    .digest("hex");
};
try {
  const allSamples = timeline.scenes.map((s) => ({
    frame:
      s.startFrame +
      Math.min(
        53,
        Math.floor(((s.variants[0]?.frame ?? s.endFrame) - s.startFrame) * 0.7),
      ),
    name: s.id,
  }));
  const details = process.argv.includes("--details");
  const samples = details
    ? [
        ...allSamples.filter(
          (x) => timeline.scenes.find((s) => s.id === x.name).variants.length,
        ),
        { frame: 45, name: "paint-early" },
        { frame: 75, name: "paint-late" },
        { frame: 465, name: "colonies-late" },
      ]
    : allSamples;
  for (let i = 0; i < samples.length; i += 2)
    await Promise.all(
      samples.slice(i, i + 2).map((x) => render(x.frame, x.name)),
    );
  // Compare repeated frames in non-sequential access. SVG edge rasterization may
  // differ by one RGB level in a few pixels; no geometric/motion drift is allowed.
  const repeats = [];
  for (const f of [60, 426, 4987, 31, 426, 60])
    repeats.push({
      frame: f,
      sha: await render(f, `seek-${f}-${repeats.length}`),
    });
  const differences = [];
  for (const f of [60, 426]) {
    const indices = repeats
      .map((x, i) => (x.frame === f ? i : -1))
      .filter((i) => i >= 0);
    if (repeats[indices[0]].sha === repeats[indices[1]].sha) {
      differences.push({ frame: f, changedPixels: 0, maxChannelDelta: 0 });
      continue;
    }
    const code =
      'from PIL import Image,ImageChops\nimport sys,json\nd=ImageChops.difference(Image.open(sys.argv[1]).convert("RGB"),Image.open(sys.argv[2]).convert("RGB"))\np=list(d.getdata())\nprint(json.dumps({"changedPixels":sum(max(x)>0 for x in p),"maxChannelDelta":max(max(x) for x in p)}))';
    const result = spawnSync(
      process.env.ROYAL_NAVY_PYTHON || "python",
      ["-c", code, ...indices.map((i) => `${folder}/seek-${f}-${i}.png`)],
      { encoding: "utf8" },
    );
    if (result.status !== 0)
      throw new Error(
        "PNG comparison needs Pillow; set ROYAL_NAVY_PYTHON to your Python executable. " +
          result.stderr,
      );
    const metric = JSON.parse(result.stdout);
    differences.push({ frame: f, ...metric });
    if (metric.maxChannelDelta > 1 || metric.changedPixels > 192)
      throw new Error(
        `Frame ${f} differs beyond the SVG antialias tolerance: ${JSON.stringify(metric)}`,
      );
  }
  fs.writeFileSync(
    `data/visual-qa-v3${details ? "-details" : ""}.json`,
    JSON.stringify(
      {
        resolution: [1920, 1080],
        sceneStills: samples.length,
        randomAccessChecks: repeats,
        pixelDifferences: differences,
        tolerance:
          "Maximum one RGB level, at most 192 pixels out of 2,073,600 (<0.01%); larger changes fail.",
        browserWarnings: warnings,
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${samples.length} scene stills; repeated non-sequential frames within strict antialias tolerance. Warnings: ${warnings.length}`,
  );
} finally {
  await browser.close({ silent: true });
}
