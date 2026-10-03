import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
  renderMedia,
} from "@remotion/renderer";
const folder = "out/review-v5";
fs.mkdirSync(folder, { recursive: true });
const serveUrl = path.resolve("out/bundle-v5");
if (!process.argv.includes("--reuse-bundle"))
  await bundle({
    entryPoint: path.resolve("src/index.ts"),
    outDir: serveUrl,
    rspack: true,
  });
const browser = await openBrowser("chrome", {
  browserExecutable:
    process.env.CHROME_PATH ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  chromiumOptions: { gl: "angle" },
});
const warnings = [];
const log = (entry) => {
  if (["warn", "error"].includes(entry.type)) warnings.push(entry);
};
try {
  const composition = await selectComposition({
    serveUrl,
    id: "RoyalNavy",
    puppeteerInstance: browser,
    inputProps: { reviewMuted: true },
  });
  const only = process.argv.find((x) => x.startsWith("--only="));
  const timeline = JSON.parse(fs.readFileSync("data/timeline.json"));
  const frames = only
    ? only.slice(7).split(",").map(Number)
    : [
        ...new Set([
          ...timeline.scenes.map(
            (s) =>
              s.startFrame + Math.min(50, Math.floor(s.durationInFrames * 0.6)),
          ),
          1915,
          1916,
          1930,
          1939,
          2404,
          2425,
          2470,
          2602,
          2624,
          3325,
          3326,
          3338,
          3349,
          3954,
          4000,
          4770,
          4800,
          4971,
          4972,
          4984,
          4995,
          5650,
          5700,
          5780,
          6046,
        ]),
      ].sort((a, b) => a - b);
  for (const frame of frames) {
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `${folder}/frame-${frame}.png`,
      imageFormat: "png",
      inputProps: { reviewMuted: true },
      puppeteerInstance: browser,
      timeoutInMilliseconds: 120000,
      onBrowserLog: log,
    });
    console.log(`Frame ${frame}`);
  }
  if (process.argv.includes("--motion")) {
    for (const [id, start, end] of [
      ["fleet", 2385, 2800],
      ["handoff", 3260, 3399],
      ["supply", 4660, 5059],
    ]) {
      await renderMedia({
        serveUrl,
        composition,
        codec: "h264",
        crf: 22,
        scale: 0.5,
        concurrency: 1,
        frameRange: [start, end],
        inputProps: { reviewMuted: true },
        outputLocation: `${folder}/${id}-motion.mp4`,
        puppeteerInstance: browser,
        chromiumOptions: { gl: "angle" },
        timeoutInMilliseconds: 120000,
        onBrowserLog: log,
      });
      console.log(`Motion ${id}`);
    }
  }
  fs.writeFileSync(
    `${folder}/report.json`,
    JSON.stringify(
      { frames, warnings, resolution: "1920x1080", fps: 30 },
      null,
      2,
    ),
  );
  if (warnings.length)
    throw new Error(`${warnings.length} browser warnings — see report.json`);
} finally {
  await browser.close({ silent: true });
}
