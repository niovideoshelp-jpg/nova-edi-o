import fs from "node:fs";
const items = [
  [
    "prince-of-wales",
    "File:HMS Prince of Wales (R09) sets sail for the first time - 18.jpg",
  ],
  ["replenishment", "File:Replenishment At Sea. MOD 45144979.jpg"],
];
const ledger = [];
for (const [name, title] of items) {
  const query = new URLSearchParams({
    action: "query",
    format: "json",
    titles: title,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1920",
  });
  const result = await fetch(
    "https://commons.wikimedia.org/w/api.php?" + query,
    { headers: { "User-Agent": "RoyalNavyProject/1.0" } },
  ).then((r) => r.json());
  const info = Object.values(result.query.pages)[0].imageinfo[0];
  if (info.extmetadata.LicenseShortName.value !== "OGL v1.0")
    throw new Error("Check source licence");
  const response = await fetch(info.thumburl || info.url);
  if (!response.ok) throw new Error(`${response.status}`);
  const file = `public/images/web/${name}.jpg`;
  fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()));
  ledger.push({ name, file, title, ...info });
  console.log(`${name}: ${info.extmetadata.Artist?.value}`);
}
fs.writeFileSync("data/web-sources-v3.json", JSON.stringify(ledger, null, 2));
