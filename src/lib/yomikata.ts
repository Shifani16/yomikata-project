// src/lib/yomikata.ts

import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const KANJI = /[\u4e00-\u9fff\u3400-\u4dbf々]/;

const kataToHira = (s: string) =>
  s.replace(/[\u30a1-\u30f6]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0x60),
  );

export type Segment = { text: string; hue?: number };
export type Entry = {
  surface: string;
  reading: string;
  base: string;
  hue: number;
};
export type Analysis = { text: string; segments: Segment[]; entries: Entry[] };

const kuroshiro = new Kuroshiro();
const analyzer = new KuromojiAnalyzer({ dictPath: "/dict/" });
let initPromise: Promise<void> | null = null;

export function initKuroshiro() {
  if (!initPromise) {
    initPromise = kuroshiro.init(analyzer).catch((e: unknown) => {
      initPromise = null;
      throw e;
    });
  }
  return initPromise;
}

export async function analyze(text: string): Promise<Analysis> {
  await initKuroshiro();
  const tokens = await (analyzer as any).parse(text);

  const hues = new Map<string, number>();
  const entries: Entry[] = [];
  const segments: Segment[] = [];
  let cursor = 0;

  for (const t of tokens) {
    const surface: string = t.surface_form;
    const at = text.indexOf(surface, cursor);
    if (at === -1) continue;

    if (at > cursor) segments.push({ text: text.slice(cursor, at) });
    cursor = at + surface.length;

    if (!KANJI.test(surface)) {
      segments.push({ text: surface });
      continue;
    }

    let hue = hues.get(surface);
    if (hue === undefined) {
      hue = (hues.size * 137.5) % 360;
      hues.set(surface, hue);
      entries.push({
        surface,
        hue,
        reading: kataToHira(t.reading ?? surface),
        base: t.basic_form && t.basic_form !== "*" ? t.basic_form : surface,
      });
    }
    segments.push({ text: surface, hue });
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });

  return { text, segments, entries };
}

export async function toFurigana(surface: string): Promise<string> {
  await initKuroshiro();
  return kuroshiro.convert(surface, { mode: "furigana", to: "hiragana" });
}

let dictPromise: Promise<Record<string, string>> | null = null;

function loadDict() {
  if (!dictPromise) {
    dictPromise = fetch("/jmdict-lite.json")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .catch((e) => {
        dictPromise = null;
        throw e;
      });
  }
  return dictPromise;
}

export async function lookupMeaning(word: string): Promise<string> {
  try {
    const dict = await loadDict();
    return dict[word] ?? "";
  } catch (e) {
    console.error("Dictionary load failed:", e);
    return "";
  }
}