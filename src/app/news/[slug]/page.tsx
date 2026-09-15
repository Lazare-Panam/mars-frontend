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

function buildJsonLd(blog: (typeof blogs)[number], slug: string) {
  const graph = [...(blog.jsonLd ?? [])];
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
  if (graph.length === 0) return null;
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
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <BlogPost blog={blog} />
    </>
  );
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}
