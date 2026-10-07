import { useRef, useState, type CSSProperties } from "react";
import type { Analysis } from "../lib/yomikata";

interface TextAreaProps {
  sourceText: string;
  setSourceText: (text: string) => void;
  analysis: Analysis | null;
  onTranslate: () => void;
}

const Shared =
  "md:text-xl text-sm p-3 w-full h-full rounded [scrollbar-gutter:stable]";

export default function TextArea({
  sourceText,
  setSourceText,
  analysis,
  onTranslate,
}: TextAreaProps) {
  // const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang] = useState("ja");
  const backdropRef = useRef<HTMLDivElement>(null);

  const segments =
    analysis && analysis.text === sourceText ? analysis.segments : null;

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    onTranslate();

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLang}|${targetLang}`
      );
      const data = await response.json();

      if (data && data.responseData) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setTranslatedText("Translation failed.");
      }
    } catch (e) {
      console.error("Translation error:", e);
      setTranslatedText(
        "An error occured during translation. Please try again",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:px-4">
      <div className="md:p-4 rounded-lg w-full">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          {/* First Column (Original text) */}
          <div className="bg-white font-zhongsong dark:bg-dark-light-bg flex-1 flex flex-col shadow-2xl rounded-lg border dark:border-mid-gray text-black dark:text-white">
            <div className="flex mb-2 px-4 py-3 gap-5 bg-white dark:bg-dark-light-bg shadow-md border-b">
              <i className="ri-circle-fill text-xs mt-1"></i>
              <h1 className="font-zhongsong text-sm md:text-lg">
                Original text
              </h1>
            </div>

            <div className="relative h-64">
              {/* highlight layer (behind) */}
              <div
                ref={backdropRef}
                aria-hidden
                className={`${Shared} absolute inset-0 z-0 overflow-hidden whitespace-pre-wrap wrap-break-word text-transparent pointer-events-none`}
              >
                {segments
                  ? segments.map((s, i) =>
                      s.hue === undefined ? (
                        <span key={i}>{s.text}</span>
                      ) : (
                        <mark
                          key={i}
                          style={{ "--h": s.hue } as CSSProperties}
                          className="rounded-sm text-transparent bg-[hsl(var(--h)_70%_82%)] dark:bg-[hsl(var(--h)_45%_30%)]"
                        >
                          {s.text}
                        </mark>
                      ),
                    )
                  : sourceText}
                {"\u200b"}
              </div>

              {/* the real textarea (in front) */}
              <textarea
                value={sourceText}
                placeholder="Type your text here"
                onChange={(e) => setSourceText(e.target.value)}
                onScroll={(e) => {
                  if (backdropRef.current)
                    backdropRef.current.scrollTop = e.currentTarget.scrollTop;
                }}
                className={`${Shared} relative z-10 resize-none bg-transparent text-black dark:text-white placeholder:text-gray-400 focus:outline-gray-400`}
              ></textarea>
            </div>
          </div>

          {/* Second Column (Translated text) */}
          <div className="bg-white dark:bg-dark-light-bg flex-1 flex flex-col shadow-2xl rounded-lg border dark:border-mid-gray text-black dark:text-white">
            <div className="flex md:flex-row flex-col mb-2 px-4 py-3 gap-5 justify-between bg-white dark:bg-dark-light-bg shadow-md border-b">
              <div className="flex flex-row gap-5 md:border-none border-b">
                <i className="ri-circle-fill text-xs mt-1 md:mb-0 mb-2"></i>
                <h1 className="font-zhongsong text-sm md:text-lg md:mb-0 mb-2">
                  Translated text
                </h1>
              </div>

              <div className="flex font-zhongsong gap-3">
                <label className="text-sm md:text-lg" htmlFor="lang">
                  Translated to:
                </label>
                <select
                  className="border px-2 text-sm md:text-md bg-white text-black dark:bg-dark-light-bg dark:text-white"
                  name="language"
                  id="lang"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="id">Indonesian</option>
                </select>
              </div>
            </div>
            <textarea
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
              className="md:text-xl text-sm bg-white dark:bg-dark-light-bg text-black dark:text-white placeholder:text-gray-400 focus:outline-gray-400 h-64 p-3 rounded w-full resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mt-15 flex justify-center font-libertinus font-bold ">
        <button
          onClick={handleTranslate}
          disabled={isLoading}
          className="items-center justify-center hover:cursor-pointer"
        >
          <div className="bg-black dark:bg-mid-gray shadow-md text-white dark:text-black px-15 py-3 text-lg mt-4 hover:bg-gray-700 transition-colors duration-300">
            {isLoading ? "Translating..." : "Translate"}
          </div>
        </button>
      </div>
    </div>
  );
}
