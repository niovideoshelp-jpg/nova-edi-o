import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  openBrowser,
  selectComposition,
  renderMedia,
} from "@remotion/renderer";

const folder = path.resolve("out/full-part1");
const serveUrl = path.resolve("out/bundle-part1");
fs.mkdirSync(folder, { recursive: true });
const plan = JSON.parse(fs.readFileSync("data/part1/timeline.json", "utf8"));
const fingerprint = crypto.createHash("sha256");
function walk(dir) {
  for (const e of fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(dir, e.name);
    if (e.isDirectory()) walk(file);
    else {
      fingerprint.update(path.relative(serveUrl, file));
      fingerprint.update(fs.readFileSync(file));
    }
  }
}
walk(serveUrl);
const hash = fingerprint.digest("hex");
const binaries = path.resolve(
  "node_modules/@remotion/compositor-win32-x64-msvc",
);
const ffmpeg = path.join(binaries, "ffmpeg.exe");
const ffprobe = path.join(binaries, "ffprobe.exe");
const probe = (file) => {
  const r = spawnSync(
    ffprobe,
    ["-v", "error", "-show_streams", "-show_format", "-of", "json", file],
    { encoding: "utf8" },
  );
  return r.status === 0 ? JSON.parse(r.stdout) : null;
};
const ranges = plan.chapters.map((c) => [c.id, c.startFrame, c.endFrame - 1]);
const inputProps = { reviewMuted: true };
const warnings = [];
const started = Date.now();
const status = (value) =>
  fs.writeFileSync(
    path.join(folder, "progress.json"),
    JSON.stringify(
      { ...value, elapsedSeconds: Math.round((Date.now() - started) / 1000) },
      null,
      2,
    ),
  );
const browser = await openBrowser("chrome", {
  browserExecutable:
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  chromiumOptions: { gl: "angle" },
});
try {
  const composition = await selectComposition({
    serveUrl,
    id: "RoyalNavyPart1",
    inputProps,
    puppeteerInstance: browser,
  });
  assert.equal(composition.durationInFrames, plan.durationInFrames);
  for (const [name, start, end] of ranges) {
    const file = path.join(folder, `${name}.mp4`);
    const stamp = path.join(folder, `${name}.sha256`);
    const existing = fs.existsSync(file)
      ? probe(file)?.streams.find((s) => s.codec_type === "video")
      : null;
    if (
      fs.existsSync(stamp) &&
      fs.readFileSync(stamp, "utf8") === hash &&
      Number(existing?.nb_frames) === end - start + 1
    ) {
      console.log(`Reuse ${name}`);
      continue;
    }
    let last = -1;
    console.log(`Rendering ${name}: ${start}-${end}`);
    await renderMedia({
      serveUrl,
      composition,
      inputProps,
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
        if (["warn", "error"].includes(l.type)) warnings.push(l);
      },
      onProgress: (p) => {
        const percent = Math.floor(p.progress * 100);
        if (percent !== last) {
          last = percent;
          status({
            phase: "render",
            chapter: name,
            percent,
            renderedFrames: p.renderedFrames,
          });
          if (percent % 5 === 0) console.log(`${name}: ${percent}%`);
        }
      },
    });
    const video = probe(file)?.streams.find((s) => s.codec_type === "video");
    assert.equal(Number(video?.nb_frames), end - start + 1);
    assert.equal(video.width, 1920);
    assert.equal(video.height, 1080);
    fs.writeFileSync(stamp, hash);
  }
} finally {
  await browser.close({ silent: true });
}
status({ phase: "mux" });
const list = path.join(folder, "concat.txt");
fs.writeFileSync(list, ranges.map(([name]) => `file '${name}.mp4'`).join("\n"));
const final = path.resolve("out/RoyalNavy-Part1.mp4");
const duration = plan.durationInFrames / 30;
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
    path.resolve("public/audio/part1/mix.mp3"),
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
assert.equal(mux.status, 0, mux.stderr);
const meta = probe(final);
const video = meta.streams.find((s) => s.codec_type === "video");
const audio = meta.streams.find((s) => s.codec_type === "audio");
assert.equal(Number(video.nb_frames), plan.durationInFrames);
assert.equal(video.avg_frame_rate, "30/1");
assert.equal(video.width, 1920);
assert.equal(video.height, 1080);
assert.equal(audio.codec_name, "aac");
assert(Math.abs(Number(audio.duration) - duration) < 0.05);
status({ phase: "verify" });
const decode = spawnSync(
  ffmpeg,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-xerror",
    "-i",
    final,
    "-map",
    "0:v:0",
    "-map",
    "0:a:0",
    "-c:v",
    "rawvideo",
    "-c:a",
    "pcm_s16le",
    "-f",
    "null",
    "NUL",
  ],
  { encoding: "utf8" },
);
assert.equal(decode.status, 0, decode.stderr);
const report = {
  file: "out/RoyalNavy-Part1.mp4",
  bytes: fs.statSync(final).size,
  sha256: crypto
    .createHash("sha256")
    .update(fs.readFileSync(final))
    .digest("hex"),
  duration,
  frames: plan.durationInFrames,
  width: 1920,
  height: 1080,
  fps: 30,
  fullDecodeExitCode: decode.status,
  warnings,
  elapsedSeconds: Math.round((Date.now() - started) / 1000),
};
fs.writeFileSync("data/part1/render.json", JSON.stringify(report, null, 2));
status({ phase: "complete", ...report });
if (warnings.length)
  throw new Error(`Rendered with ${warnings.length} browser warnings`);
console.log(JSON.stringify(report, null, 2));
