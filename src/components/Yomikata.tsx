import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import { useState, useEffect } from "react";

const kuroshiro = new Kuroshiro();
let isInitialized = false;

interface YomikataProps {
  sourceText: string;
}

export function Yomikata({ sourceText }: YomikataProps) {
  const [furigana, setFurigana] = useState("");

  useEffect(() => {
    async function initKuroshiro() {
      if (!isInitialized) {
        try {
             await kuroshiro.init(new KuromojiAnalyzer({ dictPath: "/dict/" }));
          isInitialized = true;
        } catch (e) {
          console.error("Failed to initialize kuroshiro:", e);
        }
      }
    }
    initKuroshiro();
  }, []);

  useEffect(() => {
    async function generateFuri() {
      if (!isInitialized || !sourceText.trim()) {
        setFurigana("");
        return;
      }

      try {
        const res = await kuroshiro.convert(sourceText, {
          mode: "furigana",
          to: "hiragana",
        });
        setFurigana(res);
      } catch (e) {
        console.error("Conversion error.", e);
      }
    }
    generateFuri();
  }, [sourceText]);

  return (
    <section className="md:w-full px-5 md:px-10 md:h-screen text-black dark:text-white">
      <div className="border-b w-1/2 ">
        <h1 className="text-2xl md:text-5xl font-zhongsong md:mb-5">
          Yomikata
        </h1>
      </div>

      <div className="p-1 md:p-2 font-zhongsong mt-5 md:mt-10 mb-10">
        {sourceText.trim() ? (
          <div
            className="text-2xl md:text-4xl leading-relaxed [&>ruby>rt]:text-xs [&>ruby>rt]:text-pink-400"
            dangerouslySetInnerHTML={{ __html: furigana }}
          />
        ) : (
          <p className="text-lg md:text-2xl border-l-5 px-2 border-pink-300">
            Type something in the box above...
          </p>
        )}
      </div>
    </section>
  );
}

export default Yomikata;