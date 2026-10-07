// import Kuroshiro from "kuroshiro";
// import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import { useState, useEffect, type CSSProperties } from "react";
import {
  lookupMeaning,
  toFurigana,
  type Analysis,
  type Entry,
} from "../lib/yomikata";

// const kuroshiro = new Kuroshiro();
// let isInitialized = false;
// const analyzer = new KuromojiAnalyzer({ dictPath: "/dict/" });

interface YomikataProps {
  text: string;
  analysis: Analysis | null;
}

function EntryRow({ entry }: { entry: Entry }) {
  const [furigana, setFurigana] = useState("");
  const [meaning, setMeaning] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    toFurigana(entry.surface)
      .then((html) => !cancelled && setFurigana(html))
      .catch(() => {});
    lookupMeaning(entry.base).then((m) => !cancelled && setMeaning(m));
    return () => {
      cancelled = true;
    };
  }, [entry.surface, entry.base]);

  return (
    <div
      style={{ "--h": entry.hue } as CSSProperties}
      className="border-l-4 border-[hsl(var(--h)_70%_75%)] dark:border-[hsl(var(--h)_45%_40%)] pl-3 flex flex-wrap items-baseline gap-x-3 text-xl md:text-2xl [&_rt]:text-xs md:[&_rt]:text-sm"
    >
      <span dangerouslySetInnerHTML={{ __html: furigana || entry.surface }} />
      <span>=</span>
      <span>{entry.reading}</span>
      <span>=</span>
      <span className="text-xl md:text-3xl">
        {meaning === null ? "…" : meaning || "(no meaning found)"}
      </span>
    </div>
  );
}

export function Yomikata({ text, analysis }: YomikataProps) {
  // const hasText = sourceText.trim().length > 0;
  const current = analysis && analysis.text === text ? analysis : null;
  const entries = analysis?.entries ?? [];

  return (
    <section className="md:w-full px-5 md:px-10 md:min-h-screen text-black dark:text-white">
      <div className="border-b w-1/2 ">
        <h1 className="text-2xl md:text-5xl font-zhongsong md:mb-5">
          Yomikata
        </h1>
      </div>

      <div className="p-1 md:p-2 font-zhongsong mt-5 md:mt-10 mb-10 flex flex-col gap-8">
        {!current ? (
          <p className="text-lg md:text-2xl border-l-5 px-2 border-pink-300">
            
          </p>
        ) : !analysis ? (
          <p className="text-lg md:text-2xl border-l-5 px-2 border-pink-300">
            Analyzing...
          </p>
        ) : entries.length === 0 ? (
          <p className="text-lg md:text-2xl border-l-5 px-2 border-pink-300">
            No kanji found.
          </p>
        ) : (
          entries.map((e) => <EntryRow key={e.surface} entry={e} />)
        )}
      </div>
    </section>
  );
}

export default Yomikata;
