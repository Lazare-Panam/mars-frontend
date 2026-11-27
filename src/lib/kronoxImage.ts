// Rebranded Kronox product photos.
//
// The original product photos carry MARS marks. Each rebranded batch is
// uploaded to the `kronox/products/` blob folder and listed here, keyed by the
// old image's path inside the `mars-valves` container. The backend API still
// returns the old links, so every API response is passed through
// `rebrandImages()` (see api/axiosClient.ts) and every hard-coded link through
// `kronoxImage()`. Keys are exact paths, matched by comparing the photos
// themselves, because the API reuses the same photo under different names
// (e.g. two-piece/hp-bv-2.jpg is the Series 24 photo).

const KX = "https://pblol2.blob.core.windows.net/kronox/products/";
const OLD_PREFIX = "pblol2.blob.core.windows.net/mars-valves/";

/** Old path inside mars-valves (decoded) -> rebranded Kronox URL. */
const REBRANDED: Record<string, string> = {
  "ball-valves/fire-safe/series-28.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-28.jpg",
  "ball-valves/one-piece/10-10.png":
    KX + "One-piece-ball-valves/series-10-10.png",
  "ball-valves/one-piece/10-30.png":
    KX + "One-piece-ball-valves/series-10-30.png",
  "ball-valves/one-piece/10-40.jpg":
    KX + "One-piece-ball-valves/series-10-40.jpg",
  "ball-valves/one-piece/10-50.jpg":
    KX + "One-piece-ball-valves/series-10-50.jpg",
  "ball-valves/one-piece/F10-20.jpg":
    KX + "One-piece-ball-valves/series-f10-20.jpg",
  "ball-valves/one-piece/F10-30.png":
    KX + "One-piece-ball-valves/series-f10-30.png",
  "ball-valves/one-piece/F10-50.png":
    KX + "One-piece-ball-valves/series-f10-50.png",
  "ball-valves/one-piece/F10-60.jpg":
    KX + "One-piece-ball-valves/series-f10-60.jpg",
  "ball-valves/series-10-10.png":
    KX + "One-piece-ball-valves/series-10-10.png",
  "ball-valves/series-20-20.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-20.jpg",
  "ball-valves/series-20-40.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-40.jpg",
  // The API's Series 22 photo is actually the Series 20-20 lever valve; show
  // the real Series 22 (direct mount, actuated) photo instead, as on the cards.
  "ball-valves/series-22.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-22.png",
  "ball-valves/two-piece/eco-2.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-10.jpg",
  "ball-valves/two-piece/eco-2/20-20.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-10.jpg",
  "ball-valves/two-piece/hp-2.png":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-22.png",
  "ball-valves/two-piece/hp-bv-2.jpg":
    KX + "High%20Pressure%202-Piece%20Ball%20Valves/series-24.jpg",
  "mars series images/economical-two-piece-ball-valve/series-20-10.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-10.jpg",
  "mars series images/economical-two-piece-ball-valve/series-20-20.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-20.jpg",
  "mars series images/economical-two-piece-ball-valve/series-20-30.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-30.jpg",
  "mars series images/economical-two-piece-ball-valve/series-20-40.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-20-40.jpg",
  "mars series images/economical-two-piece-ball-valve/series-f20-60.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-f20-60.jpg",
  "mars series images/economical-two-piece-ball-valve/series-f20b-2c.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-f20b-2c.jpg",
  "mars series images/economical-two-piece-ball-valve/series-f20b-3c.jpg":
    KX + "Economical%202-Piece%20Ball%20Valves/series-f20b-3c.jpg",
  "mars series images/high-performance-two-piece-ball-valve/series-20-50.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-20-50.jpg",
  "mars series images/high-performance-two-piece-ball-valve/series-22.png":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-22.png",
  "mars series images/high-performance-two-piece-ball-valve/series-28.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-28.jpg",
  "mars series images/high-performance-two-piece-ball-valve/series-f20-80.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-f20-80.jpg",
  "mars series images/high-performance-two-piece-ball-valve/series-f202d.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-f202d.jpg",
  "mars series images/high-performance-two-piece-ball-valve/series-f21-10.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-f21-10.jpg",
  "mars series images/high-performance-two-piece-ball-valve/series-f21-20.jpg":
    KX + "High%20Performance%202-Piece%20Ball%20Valves/series-f21-20.jpg",
  "mars series images/high-pressure-two-piece-ball-valve/series-24.jpg":
    KX + "High%20Pressure%202-Piece%20Ball%20Valves/series-24.jpg",
  "mars series images/high-pressure-two-piece-ball-valve/series-f21-70.jpg":
    KX + "High%20Pressure%202-Piece%20Ball%20Valves/series-f21-70.jpg",
  "mars series images/high-pressure-two-piece-ball-valve/series-f21-90.jpg":
    KX + "High%20Pressure%202-Piece%20Ball%20Valves/series-f21-90.jpg",
  "mars series images/high-pressure-two-piece-ball-valve/series-f21-9k.jpg":
    KX + "High%20Pressure%202-Piece%20Ball%20Valves/series-f21-9k.jpg",
  "mars series images/high-pressure-two-piece-ball-valve/series-f22-40.jpg":
    KX + "High%20Pressure%202-Piece%20Ball%20Valves/series-f22-50.jpg",
  "mars series images/high-pressure-two-piece-ball-valve/series-f22-50.jpg":
    KX + "High%20Pressure%202-Piece%20Ball%20Valves/series-f22-50.jpg",
  "mars series images/one-piece-ball-valves/series-10-10.png":
    KX + "One-piece-ball-valves/series-10-10.png",
  "mars series images/one-piece-ball-valves/series-10-30.png":
    KX + "One-piece-ball-valves/series-10-30.png",
  "mars series images/one-piece-ball-valves/series-10-40.jpg":
    KX + "One-piece-ball-valves/series-10-40.jpg",
  "mars series images/one-piece-ball-valves/series-10-50.jpg":
    KX + "One-piece-ball-valves/series-10-50.jpg",
  "mars series images/one-piece-ball-valves/series-f10-20.jpg":
    KX + "One-piece-ball-valves/series-f10-20.jpg",
  "mars series images/one-piece-ball-valves/series-f10-30.png":
    KX + "One-piece-ball-valves/series-f10-30.png",
  "mars series images/one-piece-ball-valves/series-f10-50.png":
    KX + "One-piece-ball-valves/series-f10-50.png",
  "mars series images/one-piece-ball-valves/series-f10-60.jpg":
    KX + "One-piece-ball-valves/series-f10-60.jpg",
  "ball-valves/series-50.jpg":
    KX + "Economical%203-Piece%20Ball%20Valves/series-50.jpg",
  "ball-valves/three-piece/eco-3.jpg":
    KX + "Economical%203-Piece%20Ball%20Valves/series-50.jpg",
  "catalogs/series-50.jpg":
    KX + "Economical%203-Piece%20Ball%20Valves/series-50.jpg",
  "mars series images/economical-three-piece-ball-valve/series-50.jpg":
    KX + "Economical%203-Piece%20Ball%20Valves/series-50.jpg",
  "mars series images/economical-three-piece-ball-valve/series-55.jpg":
    KX + "Economical%203-Piece%20Ball%20Valves/series-55.jpg",
  "mars series images/economical-three-piece-ball-valve/series-55a.jpg":
    KX + "Economical%203-Piece%20Ball%20Valves/series-55a.jpg",
  "ball-valves/fire-safe/series-83.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-83.png",
  "ball-valves/fire-safe/series-88.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-88.png",
  "ball-valves/meta-seat/3-p.jpg":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-83.png",
  "ball-valves/series-77.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
  "ball-valves/series-83.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-83.png",
  "ball-valves/series-88.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-88.png",
  "ball-valves/three-piece/hp-3.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
  "ball-valves/three-piece/series-77.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
  "ball-valves/three-piece/series-83.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-83.png",
  "ball-valves/three-piece/series-88.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-88.png",
  "ball-valves/v-port/77v.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
  "ball-valves/v-port/83v.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-83.png",
  "ball-valves/v-port/88v.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-88.png",
  "mars series images/high-performance-three-piece-ball-valve/series-f86a.jpg":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-f86a.jpg",
  "mars series images/high-performance-three-piece-ball-valve/series-77.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
  "mars series images/high-performance-three-piece-ball-valve/series-83.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-83.png",
  "mars series images/high-performance-three-piece-ball-valve/series-88.png":
    KX + "High%20Performance%203-Piece%20Ball%20Valves/series-88.png",
};

/** Returns the rebranded Kronox photo for an old MARS-era image URL, or the
 *  URL unchanged if that image hasn't been rebranded yet. */
export function kronoxImage<T extends string | null | undefined>(url: T): T {
  if (!url) return url;
  const i = url.indexOf(OLD_PREFIX);
  if (i < 0) return url;
  let path = url.slice(i + OLD_PREFIX.length).split("?")[0];
  try {
    path = decodeURIComponent(path);
  } catch {
    /* keep as is */
  }
  return (REBRANDED[path] ?? url) as T;
}

/** Deep-replaces old image links anywhere in an API response. */
export function rebrandImages<T>(data: T): T {
  if (typeof data === "string") return kronoxImage(data) as T;
  if (Array.isArray(data)) return data.map(rebrandImages) as T;
  if (data && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) out[k] = rebrandImages(v);
    return out as T;
  }
  return data;
}
