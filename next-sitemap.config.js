const fs = require('fs');
const path = require('path');

// Blog posts are the only pages with a real "last changed" date, so read each
// post's slug + date out of the blog data and use it as <lastmod>. Every other
// URL gets no <lastmod> at all: a fake build-time date on every URL tells
// Google nothing and teaches it to ignore the field. changefreq/priority are
// omitted for the same reason (Google ignores both).
function blogDates() {
  const src = fs.readFileSync(path.join(__dirname, 'src/app/news/data/blog.ts'), 'utf8');
  const dates = {};
  const re = /slug:\s*"([^"]+)",[\s\S]*?date:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    const d = new Date(`${m[2]} UTC`);
    if (!Number.isNaN(d.getTime())) dates[`/news/${m[1]}`] = d.toISOString().slice(0, 10);
  }
  return dates;
}

const BLOG_DATES = blogDates();

// Series with their own page (/products/series-10-10). Their copy under a
// category (/products/one-piece-ball-valves/series-10-10) points Google at the
// series page, so it must not be listed (SE Ranking: "Non-canonical pages in
// XML sitemap"). Read from the series data so new series are picked up.
function seriesEntries() {
  const src = fs.readFileSync(path.join(__dirname, 'src/app/products/data/categories.ts'), 'utf8');
  const block = src.slice(src.indexOf('export const SERIES'), src.indexOf('export const CATEGORIES'));
  return [...block.matchAll(/id:\s*"([^"]+)"[\s\S]*?href:\s*"([^"]+)"/g)].map((m) => ({ id: m[1], href: m[2] }));
}
const SERIES = seriesEntries();
const SERIES_IDS = SERIES.map((s) => s.id);

// Series on the catalogue route (/series/N), read from the series data and the
// Products menu (Series 20-40 is only in the menu). Their old /products/{id}
// pages canonicalise to these, so only the /series URLs are listed.
function catalogueSeriesPaths() {
  const menu = fs.readFileSync(path.join(__dirname, 'src/Common/Navbar/categoryBarData.ts'), 'utf8');
  const fromMenu = [...menu.matchAll(/href:\s*"(\/series\/\d+)"/g)].map((m) => m[1]);
  const fromData = SERIES.filter((s) => s.href.startsWith('/series/')).map((s) => s.href);
  return [...new Set([...fromData, ...fromMenu])];
}
const CATALOGUE_SERIES = catalogueSeriesPaths();

// Pages rendered on request, so next-sitemap can't discover them from the
// build output; listed here so search engines find them.
const EXTRA_PATHS = [
  ...SERIES.filter((s) => !s.href.startsWith('/series/')).flatMap((s) => [`/products/${s.id}`, `/products/${s.id}/variants`]),
  ...CATALOGUE_SERIES.flatMap((p) => [p, `${p}/variants`]),
  '/products/sanitary-ball-valves',
  '/products/sanitary-ball-valves/economical-sanitary-ball-valve',
  '/products/sanitary-ball-valves/high-performance-sanitary-ball-valve',
  '/products/sanitary-ball-valves/sanitary-butterfly-valve',
  '/products/sanitary-ball-valves/sanitary-multi-port-ball-valve',
  '/products/fire-safe-ball-valves',
  '/products/v-port-ball-valves',
];

const isNonCanonicalSeriesCopy = (loc) =>
  SERIES_IDS.some((id) => new RegExp(`^/products/[^/]+/${id}(/|$)`).test(loc));
const NEWEST_POST = Object.values(BLOG_DATES).sort().pop();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.marsvalvenok.com/',
  generateRobotsTxt: true,
  autoLastmod: false,
  // Variant detail pages canonicalise to their parent product page, so only
  // the parent belongs in the sitemap. (The /variants listing page stays.)
  // Also drop pages marked noindex (SE Ranking: "Noindex pages in XML
  // sitemap"): sign-in, cart, account and the credit form.
  exclude: [
    '/products/*/*/variants/*',
    '/login',
    '/register',
    '/cart',
    '/credit-application',
    '/dashboard',
    '/dashboard/*',
  ],
  additionalPaths: async (config) =>
    Promise.all(EXTRA_PATHS.map((loc) => config.transform(config, loc))),
  transform: async (config, loc) => isNonCanonicalSeriesCopy(loc) ? null : ({
    loc,
    lastmod: BLOG_DATES[loc] ?? (loc === '/news' ? NEWEST_POST : undefined),
    alternateRefs: config.alternateRefs ?? [],
  }),
};
