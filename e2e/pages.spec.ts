import { test, expect } from "@playwright/test";

/**
 * Dead-page coverage: every route renders real content (HTTP < 400, no visible
 * Next error <h1>, non-trivial body text), an unknown URL returns a genuine
 * 404, and everything the sitemap advertises resolves.
 */
const STATIC_ROUTES = [
  "/",
  "/about",
  "/applications",
  "/cart",
  "/contact",
  "/delivery-information",
  "/login",
  "/mars-brand",
  "/news",
  "/product-index",
  "/products",
  "/register",
  "/return-policy",
  "/shop",
];

// Known dynamic routes (category ids from products/data/categories.ts + a news slug).
const DYNAMIC_ROUTES = [
  "/products/one-piece-ball-valves",
  "/products/two-piece-ball-valves",
  "/products/three-piece-ball-valves",
  "/products/flanged-ball-valves",
  "/products/multi-port-ball-valves",
  "/products/metal-seated-ball-valves",
  "/news/fire-safe-ball-valves",
];

async function assertHealthy(path: string, page: import("@playwright/test").Page) {
  const res = await page.goto(path, { waitUntil: "domcontentloaded" });
  expect(res, `no response for ${path}`).not.toBeNull();
  expect(res!.status(), `${path} HTTP status`).toBeLessThan(400);

  // Next renders <h1 class="next-error-h1"> on 404/500. Match the element (not
  // the HTML string — the dev overlay embeds that class name everywhere).
  await expect(page.locator("h1.next-error-h1")).toBeHidden();
  const text = (await page.locator("body").innerText()).trim();
  expect(text.length, `${path} rendered no visible content`).toBeGreaterThan(100);
}

test.describe("Every route renders (no dead pages)", () => {
  for (const path of [...STATIC_ROUTES, ...DYNAMIC_ROUTES]) {
    test(`renders ${path}`, async ({ page }) => {
      await assertHealthy(path, page);
    });
  }
});

test.describe("Error handling", () => {
  test("unknown URL returns a real 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist-" + Date.now(), {
      waitUntil: "domcontentloaded",
    });
    expect(res).not.toBeNull();
    expect(res!.status()).toBe(404);
  });

  test("sitemap is reachable and valid", async ({ request }) => {
    const idx = await request.get("/sitemap.xml");
    expect(idx.status()).toBe(200);
    expect(await idx.text()).toContain("<?xml");
  });
});

test.describe("Sitemap URLs resolve", () => {
  const MAX = 120; // cap so runs stay fast; log what is skipped

  test("all advertised URLs resolve (capped)", async ({ request }) => {
    const res = await request.get("/sitemap-0.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();

    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length, "sitemap has URLs").toBeGreaterThan(0);

    const paths = locs.map((u) => {
      try {
        return new URL(u).pathname;
      } catch {
        return u;
      }
    });

    const toCheck = paths.slice(0, MAX);
    if (paths.length > MAX) {
      // eslint-disable-next-line no-console
      console.log(`sitemap: checking ${MAX} of ${paths.length} URLs (capped)`);
    }

    const broken: string[] = [];
    for (const p of toCheck) {
      const r = await request.get(p);
      if (r.status() >= 400) broken.push(`${p} -> HTTP ${r.status()}`);
    }
    expect(broken, "broken sitemap URLs").toEqual([]);
  });
});
