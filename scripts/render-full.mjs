import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  openBrowser,
  selectComposition,
  renderMedia,
} from "@remotion/renderer";

const root = process.cwd();
const folder = path.join(root, "out", "full-v5");
fs.mkdirSync(folder, { recursive: true });
const serveUrl = path.join(root, "out", "bundle-v5");
if (!fs.existsSync(path.join(serveUrl, "index.html")))
  throw new Error(
    "Revision 5 bundle missing; run node scripts/review-v5.mjs first",
  );
const fingerprint = crypto.createHash("sha256");
const walk = (dir) => {
  for (const entry of fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else {
      fingerprint.update(path.relative(serveUrl, file));
      fingerprint.update(fs.readFileSync(file));
    }
  }
};
walk(serveUrl);
const bundleHash = fingerprint.digest("hex");
const stampFile = path.join(folder, "bundle-hash.txt");
const matchingBundle =
  fs.existsSync(stampFile) && fs.readFileSync(stampFile, "utf8") === bundleHash;
const ffmpeg = path.join(
  root,
  "node_modules",
  "@remotion",
  "compositor-win32-x64-msvc",
  "ffmpeg.exe",
);
const ffprobe = path.join(
  root,
  "node_modules",
  "@remotion",
  "compositor-win32-x64-msvc",
  "ffprobe.exe",
);
const ranges = [
  ["history", 0, 1915],
  ["fleet", 1916, 3325],
  ["operations", 3326, 4971],
  ["endurance", 4972, 6046],
];
const warnings = [];
const compatible420 = (info) => ["yuv420p", "yuvj420p"].includes(info?.pix_fmt);
const started = Date.now();
const browser = await openBrowser("chrome", {
  browserExecutable:
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  chromiumOptions: { gl: "angle" },
});
const saveStatus = (value) =>
  fs.writeFileSync(
    path.join(folder, "progress.json"),
    JSON.stringify(
      { ...value, elapsedSeconds: Math.round((Date.now() - started) / 1000) },
      null,
      2,
    ),
  );
const probe = (file) => {
  const result = spawnSync(
    ffprobe,
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height,nb_frames,avg_frame_rate,pix_fmt",
      "-of",
      "json",
      file,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) return null;
  return JSON.parse(result.stdout).streams?.[0];
};
try {
  const composition = await selectComposition({
    serveUrl,
    id: "RoyalNavy",
    puppeteerInstance: browser,
    inputProps: { reviewMuted: true },
  });
  if (
    composition.width !== 1920 ||
    composition.height !== 1080 ||
    composition.fps !== 30 ||
    composition.durationInFrames !== 6047
  )
    throw new Error("Unexpected composition format");
  for (const [name, start, end] of ranges) {
    const file = path.join(folder, `${name}.mp4`);
    const expected = end - start + 1;
    const existing = fs.existsSync(file) ? probe(file) : null;
    if (
      matchingBundle &&
      existing &&
      Number(existing.nb_frames) === expected &&
      existing.width === 1920 &&
      existing.height === 1080
    ) {
      console.log(`Reuse verified ${name}: ${expected} frames`);
      continue;
    }
    let last = -1;
    console.log(`Rendering ${name}: frames ${start}–${end}`);
    await renderMedia({
      serveUrl,
      composition,
      inputProps: { reviewMuted: true },
      codec: "h264",
      crf: 18,
      x264Preset: "veryfast",
      pixelFormat: "yuv420p",
      imageFormat: "jpeg",
      jpegQuality: 95,
      concurrency: 1,
      frameRange: [start, end],
      outputLocation: file,
      puppeteerInstance: browser,
      chromiumOptions: { gl: "angle" },
      timeoutInMilliseconds: 120000,
      onBrowserLog: (l) => {
        if (l.type === "warn" || l.type === "error") warnings.push(l);
      },
      onProgress: (p) => {
        const percent = Math.floor(p.progress * 100);
        if (percent !== last) {
          last = percent;
          saveStatus({
            phase: "render",
            chapter: name,
            startFrame: start,
            endFrame: end,
            percent,
            renderedFrames: p.renderedFrames,
          });
          if (percent % 5 === 0) console.log(`${name}: ${percent}%`);
        }
      },
    });
    const info = probe(file);
    if (
      !info ||
      Number(info.nb_frames) !== expected ||
      info.width !== 1920 ||
      info.height !== 1080 ||
      !compatible420(info)
    )
      throw new Error(`Invalid rendered chapter ${name}`);
    console.log(`Verified ${name}: ${expected} frames`);
  }
  fs.writeFileSync(stampFile, bundleHash);
} finally {
  await browser.close({ silent: true });
}

saveStatus({ phase: "mux" });
const list = path.join(folder, "concat.txt");
fs.writeFileSync(list, ranges.map(([name]) => `file '${name}.mp4'`).join("\n"));
const final = path.join(root, "out", "RoyalNavy-v5.mp4");
const duration = 6047 / 30;
const mux = spawnSync(
  ffmpeg,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    list,
    "-i",
    path.join(root, "public", "audio", "mix.mp3"),
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-ar",
    "48000",
    "-af",
    `apad,atrim=duration=${duration}`,
    "-t",
    String(duration),
    "-movflags",
    "+faststart",
    final,
  ],
  { encoding: "utf8" },
);
if (mux.status !== 0) throw new Error(mux.stderr || "Mux failed");
const info = probe(final);
if (
  !info ||
  Number(info.nb_frames) !== 6047 ||
  info.width !== 1920 ||
  info.height !== 1080 ||
  info.avg_frame_rate !== "30/1" ||
  !compatible420(info)
)
  throw new Error("Final MP4 verification failed");
fs.writeFileSync(
  path.join(folder, "render-report.json"),
  JSON.stringify(
    {
      file: final,
      composition: "RoyalNavy",
      width: 1920,
      height: 1080,
      fps: 30,
      frames: 6047,
      duration,
      video: info,
      warnings,
      elapsedSeconds: Math.round((Date.now() - started) / 1000),
    },
    null,
    2,
  ),
);
saveStatus({ phase: "complete", file: final, frames: 6047 });
console.log(`COMPLETE: ${final}`);
