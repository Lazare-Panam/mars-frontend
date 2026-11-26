import { fitDescription } from "@/lib/seoDescription";
import { blogs } from "../data/blog";
import BlogPost from "../components/BlogPost";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const SITE_NAME = "Kronox Valves";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  const title = blog.seoTitle ?? blog.title.split(":")[0].trim();
  // Keep the brand suffix only if the full title still fits ~65 characters.
  const branded = `${title} | ${SITE_NAME}`;
  const fullTitle = blog.titleOverride ?? (branded.length <= 65 ? branded : title);
  const description = fitDescription(blog.metaDescription ?? blog.excerpt);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: "article",
      title: fullTitle,
      description,
      url: `/news/${slug}`,
      images: [{ url: blog.heroImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [blog.heroImage],
    },
  };
}

// "September 29, 2026" -> "2026-09-29"; undefined if the date can't be parsed.
function isoDate(date: string): string | undefined {
  const d = new Date(`${date} UTC`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

function buildJsonLd(blog: (typeof blogs)[number], slug: string) {
  const url = `${SITE_URL}/news/${slug}`;
  const published = isoDate(blog.date);
  const graph: object[] = [
    ...(blog.jsonLd ?? []),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: blog.title,
      description: blog.metaDescription ?? blog.excerpt,
      image: [blog.heroImage],
      ...(published ? { datePublished: published, dateModified: published } : {}),
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: url,
      keywords: blog.tags.join(", "),
      articleSection: blog.category,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news` },
        { "@type": "ListItem", position: 3, name: blog.title, item: url },
      ],
    },
  ];
  if (blog.faq && blog.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/news/${slug}#faqpage`,
      mainEntity: blog.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return notFound();
  const jsonLd = buildJsonLd(blog, slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BlogPost
        blog={blog}
        // The next 3 posts in order (wrapping round), so every post ends up
        // linked from three others, not only from /news.
        related={[1, 2, 3]
          .map((step) => blogs[(blogs.indexOf(blog) + step) % blogs.length])
          .filter((b) => b.slug !== blog.slug)
          .map((b) => ({ slug: b.slug, title: b.title, category: b.category, heroImage: b.heroImage, date: b.date }))}
      />
    </>
  );
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}
