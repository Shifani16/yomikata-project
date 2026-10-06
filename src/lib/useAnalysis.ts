import { useEffect, useState } from "react";
import { analyze, type Analysis } from "./yomikata";

export function useAnalysis(text: string) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    if (!text) return;
    let cancelled = false;

    analyze(text)
      .then((r) => {
        if (!cancelled) setAnalysis(r);
      })
      .catch((e) => console.error("Analysis error:", e));

    return () => {
      cancelled = true;
    };
  }, [text]);

  return analysis;
}
