import { useEffect, useRef, useState } from "react";
import TextArea from "./TextArea";
import Yomikata from "./Yomikata";
import { useAnalysis } from "../lib/useAnalysis";

export function Home() {
  const [sourceText, setSourceText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const analysis = useAnalysis(sourceText);
  const yomikataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!submittedText) return;
    const id = setTimeout(
      () => yomikataRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
    return () => clearTimeout(id);
  }, [submittedText]);

  return (
    <section className="min-h-screen flex mt-15 md:mt-25">
      <div className="flex flex-col gap-10 md:gap-15 w-full px-1 md:px-2">
        <div className="flex flex-col md:items-center gap-10 md:gap-15 w-full px-4 md:px-2 justify-center">
          <div className="font-zhongsong md:text-center">
            <h1 className="text-2xl md:text-5xl text-black dark:text-white">
              Find Out and Learn!
            </h1>
            <p className="md:text-md text-sm text-gray-500 dark:text-mid-gray mt-2 tracking-widest">
              How to read and what it mean
            </p>
          </div>

          <TextArea
            sourceText={sourceText}
            setSourceText={setSourceText}
            analysis={analysis}
            onTranslate={() => 
              setSubmittedText(sourceText.trim() ? sourceText : "")
            }
          />
        </div>

        {submittedText && (
          <div className="w-full">
            <Yomikata text={sourceText} analysis={analysis} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
