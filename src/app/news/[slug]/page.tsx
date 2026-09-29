import { blogs } from "../data/blog";
import BlogPost from "../components/BlogPost";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const SITE_NAME = "MARS Valvenok";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  const title = blog.seoTitle ?? blog.title.split(":")[0].trim();
  const fullTitle = blog.titleOverride ?? `${title} | ${SITE_NAME}`;
  const description = blog.metaDescription ?? blog.excerpt;
  return {
    title: blog.titleOverride ? { absolute: fullTitle } : fullTitle,
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
      <BlogPost blog={blog} />
    </>
  );
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}
