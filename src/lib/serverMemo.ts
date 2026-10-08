// Short-lived in-memory cache for catalogue API reads made on the server.
// A crawler hitting hundreds of model pages otherwise makes the same API calls
// for every page (metadata + layout prefetch), which is what timed out in the
// SE Ranking audit. In the browser it does nothing; React Query caches there.
const TTL_MS = 5 * 60 * 1000;
const store = new Map<string, { at: number; value: Promise<unknown> }>();

export function serverMemo<T>(key: string, load: () => Promise<T>): Promise<T> {
  if (typeof window !== "undefined") return load();
  const hit = store.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value as Promise<T>;
  const value = load().catch((err) => {
    store.delete(key); // don't keep failures
    throw err;
  });
  store.set(key, { at: Date.now(), value });
  return value;
}
