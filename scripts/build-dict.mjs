import { unzipSync, strFromU8 } from "fflate";
import { mkdirSync, writeFileSync } from "node:fs";

const commonOnly = process.argv.includes("--common");

const rel = await (
  await fetch(
    "https://api.github.com/repos/scriptin/jmdict-simplified/releases/latest",
    { headers: { "User-Agent": "yomikata-build" } },
  )
).json();

const asset = rel.assets.find(
  (a) =>
    a.name.startsWith("jmdict-eng-") &&
    a.name.endsWith(".json.zip") &&
    a.name.includes("common") === commonOnly,
);
if (!asset) throw new Error("JMdict asset not found");
console.log("Downloading", asset.name);

const zip = new Uint8Array(
  await (await fetch(asset.browser_download_url)).arrayBuffer(),
);
const files = unzipSync(zip);
const jsonName = Object.keys(files).find((n) => n.endsWith(".json"));
const { words } = JSON.parse(strFromU8(files[jsonName]));

const best = new Map();
for (const w of words) {
  const glosses = (w.sense?.[0]?.gloss ?? []).map((g) => g.text).slice(0, 2);
  if (!glosses.length) continue;
  const meaning = glosses.join(", ");

  for (const k of w.kanji ?? []) {
    const score = k.common ? 1 : 0;
    const prev = best.get(k.text);
    if (!prev || score > prev.score) best.set(k.text, { score, meaning });
  }
}

const out = {};
for (const [text, { meaning }] of best) out[text] = meaning;

mkdirSync("public", { recursive: true });
writeFileSync("public/jmdict-lite.json", JSON.stringify(out));
console.log("Wrote public/jmdict-lite.json with", best.size, "entries");