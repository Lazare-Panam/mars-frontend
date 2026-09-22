import { test, expect } from "@playwright/test";

/**
 * Link-integrity smoke test: for each seed page, collect every internal link
 * (<a href="/...">) present in the DOM and assert its target resolves
 * (HTTP < 400). Catches typo'd hrefs, removed pages, and broken CTAs. Failures
 * are collected per page so one run reports every bad link, not just the first.
 */
const SEED_PAGES = [
  "/",
  "/products",
  "/applications",
  "/about",
  "/mars-brand",
  "/news",
  "/products/one-piece-ball-valves",
];

for (const path of SEED_PAGES) {
  test(`internal links resolve on ${path}`, async ({ page, request }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });

    const hrefs = await page.$$eval('a[href^="/"]', (els) =>
      els.map((e) => e.getAttribute("href") || ""),
    );
    const targets = [
      ...new Set(hrefs.map((h) => h.split("#")[0]).filter((h) => h.length > 0)),
    ]
      // Deep variant/SKU pages are numerous and slow (each hits the backend);
      // they're covered by the sitemap test. Keep this a fast structural check.
      .filter((h) => !h.includes("/variants"));

    expect(targets.length, `no internal links found on ${path}`).toBeGreaterThan(0);

    const broken: string[] = [];
    for (const href of targets) {
      const res = await request.get(href, { timeout: 20_000 });
      if (res.status() >= 400) broken.push(`${href} -> HTTP ${res.status()}`);
    }
    expect(broken, `broken links found on ${path}`).toEqual([]);
  });
}
