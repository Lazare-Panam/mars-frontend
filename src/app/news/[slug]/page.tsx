import { blogs } from "../data/blog";
import BlogPost from "../components/BlogPost";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
  return {
    title: `${title} | ${SITE_NAME}`,
    description: blog.metaDescription ?? blog.excerpt,
    alternates: { canonical: `/news/${slug}` },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return notFound();
  return (
    <>
      {blog.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blog.jsonLd).replace(/</g, "\\u003c"),
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
