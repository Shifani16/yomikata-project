import type { VercelRequest, VercelResponse } from "@vercel/node";
import { error } from "console";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== "string") {
    return res.status(400).json({ error: "Missing or invalid keyword " });
  }

  try {
    const targetUrl = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`;
    const resp = await fetch(targetUrl);

    if (!resp.ok) {
      throw new Error(`Jisho responded with status ${resp.status}`);
    }

    const data = await resp.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (e) {
    console.error("Vercel proxy error:", e)
    return res.status(500).json({ e: "Failed to fetch from Jisho"})
  }
}
