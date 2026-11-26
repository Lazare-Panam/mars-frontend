// Rebranded Kronox product photos.
//
// The original product photos carry MARS marks. As each batch is rebranded
// and uploaded to the `kronox/products/` blob folder, add its files here.
// Image URLs from the backend API (which still point at the old MARS images)
// are passed through `kronoxImage()` so the site shows the Kronox version
// without a database change.

const KX = "https://pblol2.blob.core.windows.net/kronox/products/";

/** Old image file name -> rebranded Kronox URL. */
const REBRANDED: Record<string, string> = {
  // Batch 1: one-piece ball valves
  "series-10-10.png": KX + "One-piece-ball-valves/series-10-10.png",
  "series-10-30.png": KX + "One-piece-ball-valves/series-10-30.png",
  "series-f10-30.png": KX + "One-piece-ball-valves/series-f10-30.png",
  "series-f10-50.png": KX + "One-piece-ball-valves/series-f10-50.png",
  "series-f10-60.jpg": KX + "One-piece-ball-valves/series-f10-60.jpg",
  "series-f10-20.jpg": KX + "One-piece-ball-valves/series-f10-20.jpg",
  "series-10-50.jpg": KX + "One-piece-ball-valves/series-10-50.jpg",
  "series-10-40.jpg": KX + "One-piece-ball-valves/series-10-40.jpg",
  // Batch 2: economical two-piece ball valves
  "series-20-10.jpg": KX + "Economical%202-Piece%20Ball%20Valves/series-20-10.jpg",
  "series-20-20.jpg": KX + "Economical%202-Piece%20Ball%20Valves/series-20-20.jpg",
  "series-20-30.jpg": KX + "Economical%202-Piece%20Ball%20Valves/series-20-30.jpg",
  "series-20-40.jpg": KX + "Economical%202-Piece%20Ball%20Valves/series-20-40.jpg",
  "series-f20-60.jpg": KX + "Economical%202-Piece%20Ball%20Valves/series-f20-60.jpg",
  "series-f20b-2c.jpg": KX + "Economical%202-Piece%20Ball%20Valves/series-f20b-2c.jpg",
  "series-f20b-3c.jpg": KX + "Economical%202-Piece%20Ball%20Valves/series-f20b-3c.jpg",
};

/** Returns the rebranded Kronox photo for an old MARS-era image URL, or the
 *  URL unchanged if that image hasn't been rebranded yet. */
export function kronoxImage<T extends string | null | undefined>(url: T): T {
  if (!url || !url.includes("pblol2.blob.core.windows.net/mars-valves/")) return url;
  const file = decodeURIComponent(url.split("?")[0].split("/").pop() ?? "").toLowerCase();
  return (REBRANDED[file] ?? url) as T;
}
