import fs from "node:fs";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
const title =
  "File:Type 45 Destroyer HMS Daring in the English Channel MOD 45151622.jpg";
const curl = (url) =>
  execFileSync(
    "curl.exe",
    [
      "-L",
      "--fail",
      "--silent",
      "--show-error",
      "--max-time",
      "120",
      "-A",
      "RoyalNavyDocumentaryResearch/1.0",
      url,
    ],
    { maxBuffer: 25 * 1024 * 1024 },
  );
const response = JSON.parse(
  curl(
    "https://commons.wikimedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        format: "json",
        titles: title,
        prop: "imageinfo",
        iiprop: "url|extmetadata|size",
      }),
  ),
);
const info = Object.values(response.query.pages)[0].imageinfo[0];
const plain = (v) =>
  (v ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const meta = info.extmetadata;
if (!/OGL/.test(meta.LicenseShortName.value)) throw Error("Unexpected license");
const file = "public/images/part2/daring-profile.jpg";
const bytes = fs.existsSync(file)
  ? fs.readFileSync(file)
  : curl(info.url.split("?")[0]);
fs.writeFileSync(file, bytes);
const record = {
  id: "daring-profile",
  kind: "photo",
  file,
  sourcePage: info.descriptionurl,
  downloadUrl: info.url.split("?")[0],
  width: info.width,
  height: info.height,
  date: plain(meta.DateTimeOriginal?.value),
  author: plain(meta.Artist?.value),
  license: plain(meta.LicenseShortName.value),
  licenseUrl: meta.LicenseUrl?.value,
  description: plain(meta.ImageDescription?.value),
  role: "HMS Daring, Type45, English Channel after RAS. Actual ship profile; date retained, not evidence of 2025 readiness.",
  bytes: bytes.length,
  sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
  originalMetadata: meta,
};
const dest = "data/part2/media-sources.json";
const manifest = JSON.parse(fs.readFileSync(dest));
manifest.photos = manifest.photos.filter((x) => x.id !== record.id);
manifest.photos.push(record);
fs.writeFileSync(dest, JSON.stringify(manifest, null, 2) + "\n");
const text = `\n## Additional Type 45 profile\n\n[${title}](${record.sourcePage}) · ${record.date}. ${record.author}. ${record.license}; [license](${record.licenseUrl}). Original downloaded without generative alteration. Used instead of the small Diamond in the background of the USS Mason image.\n`;
const md = "data/part2/media-sources.md";
if (!fs.readFileSync(md, "utf8").includes("Additional Type 45 profile"))
  fs.appendFileSync(md, text);
console.log(
  JSON.stringify({ ...record, originalMetadata: undefined }, null, 2),
);
