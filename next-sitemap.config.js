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
const NEWEST_POST = Object.values(BLOG_DATES).sort().pop();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.marsvalvenok.com/',
  generateRobotsTxt: true,
  autoLastmod: false,
  transform: async (config, loc) => ({
    loc,
    lastmod: BLOG_DATES[loc] ?? (loc === '/news' ? NEWEST_POST : undefined),
    alternateRefs: config.alternateRefs ?? [],
  }),
};
