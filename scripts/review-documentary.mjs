import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
  renderMedia,
} from "@remotion/renderer";

const outputDir = "out/review-v4";
fs.mkdirSync(outputDir, { recursive: true });
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  outDir: path.resolve(
    process.argv.includes("--motion")
      ? "out/qa-v4-motion-bundle"
      : "out/qa-v4-stills-bundle",
  ),
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
const log = (l) => {
  if (l.type === "warn" || l.type === "error") warnings.push(l);
};
try {
  if (process.argv.includes("--motion")) {
    for (const clip of [
      { name: "02-carrier", frames: [2460, 2699] },
      { name: "03-airwing", frames: [3710, 3949] },
    ].filter(
      (clip) =>
        (!process.argv.includes("--carrier-only") ||
          clip.name === "02-carrier") &&
        (!process.argv.includes("--airwing-only") ||
          clip.name === "03-airwing"),
    )) {
      let milestone = -1;
      await renderMedia({
        serveUrl,
        composition,
        codec: "h264",
        crf: 22,
        scale: 0.5,
        concurrency: 1,
        frameRange: clip.frames,
        inputProps: { reviewMuted: true },
        outputLocation: `${outputDir}/${clip.name}-silent.mp4`,
        puppeteerInstance: browser,
        chromiumOptions: { gl: "swangle" },
        onBrowserLog: log,
        onProgress: ({ progress }) => {
          const p = Math.floor(progress * 10);
          if (p !== milestone) {
            milestone = p;
            console.log(`${clip.name} ${p * 10}%`);
          }
        },
      });
      const ffmpeg =
        process.env.FFMPEG_PATH ||
        path.resolve(
          "node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe",
        );
      const mux = spawnSync(
        ffmpeg,
        [
          "-hide_banner",
          "-loglevel",
          "error",
          "-y",
          "-i",
          `${outputDir}/${clip.name}-silent.mp4`,
          "-ss",
          String(clip.frames[0] / 30),
          "-i",
          "public/audio/mix.mp3",
          "-map",
          "0:v:0",
          "-map",
          "1:a:0",
          "-t",
          String((clip.frames[1] - clip.frames[0] + 1) / 30),
          "-c:v",
          "copy",
          "-c:a",
          "aac",
          `${outputDir}/${clip.name}.mp4`,
        ],
        { encoding: "utf8" },
      );
      if (mux.status !== 0) throw new Error(mux.stderr);
    }
    fs.writeFileSync(
      "data/motion-qa-v4.json",
      JSON.stringify(
        {
          resolution: "960x540",
          fps: 30,
          type: "Continuous motion review excerpts; composition remains 1920x1080",
          clips: [
            { file: "motion-test.mp4", start: 180, end: 359 },
            { file: "02-carrier.mp4", start: 2460, end: 2699 },
            { file: "03-airwing.mp4", start: 3710, end: 3949 },
          ],
          warnings,
        },
        null,
        2,
      ),
    );
  } else {
    const timeline = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
    let samples = process.argv.includes("--ending")
      ? [5015, 5120, 5200, 5330, 5490, 5610, 5750, 5890, 5995, 6040]
      : timeline.scenes.map(
          (s) =>
            s.startFrame + Math.min(50, Math.floor(s.durationInFrames * 0.6)),
        );
    const only = process.argv.find((arg) => arg.startsWith("--only="));
    if (only) samples = only.slice(7).split(",").map(Number);
    const manifest = [];
    for (let i = 0; i < samples.length; i += 2)
      await Promise.all(
        samples.slice(i, i + 2).map(async (frame) => {
          const output = `${outputDir}/frame-${frame}.png`;
          if (
            process.argv.includes("--resume") &&
            fs.existsSync(output) &&
            !(
              process.argv.includes("--refresh-fleet") &&
              frame >= 1916 &&
              frame < 3326
            )
          ) {
            const existing = fs.readFileSync(output);
            if (existing.subarray(-8, -4).toString() === "IEND") {
              manifest.push({
                frame,
                file: output,
                sha256: crypto
                  .createHash("sha256")
                  .update(existing)
                  .digest("hex"),
              });
              console.log(`Reused checked frame ${frame}`);
              return;
            }
          }
          await renderStill({
            serveUrl,
            composition,
            frame,
            output,
            imageFormat: "png",
            inputProps: { reviewMuted: true },
            timeoutInMilliseconds: 90000,
            puppeteerInstance: browser,
            onBrowserLog: log,
          });
          manifest.push({
            frame,
            file: output,
            sha256: crypto
              .createHash("sha256")
              .update(fs.readFileSync(output))
              .digest("hex"),
          });
          console.log(`Frame ${frame}`);
        }),
      );
    fs.writeFileSync(
      `data/visual-qa-v4${process.argv.includes("--ending") ? "-ending" : only ? "-fixes" : ""}.json`,
      JSON.stringify(
        {
          resolution: "1920x1080",
          frames: manifest.sort((a, b) => a.frame - b.frame),
          warnings,
        },
        null,
        2,
      ),
    );
  }
  if (warnings.length) throw new Error(`Browser warnings: ${warnings.length}`);
} finally {
  await browser.close({ silent: true });
}
