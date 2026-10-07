// api/jisho.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== "string") {
    return res.status(400).json({ error: "Missing or invalid keyword" });
  }

  try {
    const resp = await fetch(
      `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`,
      { headers: { "User-Agent": "yomikata-project/1.0", Accept: "application/json" } },
    );

    if (!resp.ok) {
      return res.status(502).json({ error: `Jisho responded with ${resp.status}` });
    }

    const data = await resp.json();
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    return res.status(200).json(data);
  } catch (e) {
    console.error("Jisho proxy error:", e);
    return res.status(500).json({ error: "Failed to fetch from Jisho" });
  }
}