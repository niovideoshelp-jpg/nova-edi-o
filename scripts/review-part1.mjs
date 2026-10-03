import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
  renderMedia,
} from "@remotion/renderer";

const folder = path.resolve("out/review-part1");
const serveUrl = path.resolve("out/bundle-part1");
fs.mkdirSync(folder, { recursive: true });
if (!process.argv.includes("--reuse-bundle")) {
  await bundle({
    entryPoint: path.resolve("src/index.ts"),
    outDir: serveUrl,
    rspack: true,
  });
}
const browser = await openBrowser("chrome", {
  browserExecutable:
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  chromiumOptions: { gl: "angle" },
});
const warnings = [];
const inputProps = { reviewMuted: true };
try {
  const composition = await selectComposition({
    serveUrl,
    id: "RoyalNavyPart1",
    puppeteerInstance: browser,
    inputProps,
  });
  const plan = JSON.parse(fs.readFileSync("data/part1/timeline.json", "utf8"));
  const only = process.argv.find((a) => a.startsWith("--only="));
  const frames = only
    ? only.slice(7).split(",").map(Number)
    : [
        ...new Set(
          plan.scenes.map((s) =>
            Math.min(
              composition.durationInFrames - 1,
              s.startFrame + Math.floor(s.durationInFrames * 0.6),
            ),
          ),
        ),
      ];
  for (const frame of frames) {
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `${folder}/frame-${frame}.png`,
      imageFormat: "png",
      inputProps,
      puppeteerInstance: browser,
      timeoutInMilliseconds: 120000,
      onBrowserLog: (l) => {
        if (["warn", "error"].includes(l.type)) warnings.push(l);
      },
    });
    console.log(`Frame ${frame}`);
  }
  const motion = process.argv.find((a) => a.startsWith("--motion="));
  if (motion) {
    const [start, end] = motion.slice(9).split(",").map(Number);
    await renderMedia({
      serveUrl,
      composition,
      inputProps,
      frameRange: [start, end],
      codec: "h264",
      crf: 22,
      scale: 0.5,
      concurrency: 1,
      outputLocation: `${folder}/motion-${start}-${end}.mp4`,
      puppeteerInstance: browser,
      chromiumOptions: { gl: "angle" },
      timeoutInMilliseconds: 120000,
    });
  }
  fs.writeFileSync(
    `${folder}/report.json`,
    JSON.stringify(
      { frames, warnings, width: 1920, height: 1080, fps: 30 },
      null,
      2,
    ),
  );
  if (warnings.length)
    throw new Error(`${warnings.length} browser warnings; see report.json`);
} finally {
  await browser.close({ silent: true });
}
