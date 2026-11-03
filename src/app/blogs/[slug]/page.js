import { allBlogs } from "contentlayer/generated";
import { alternatesFor } from "@/src/utils/metadata";
import { slug } from "github-slugger";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/src/components/Blog/ArticleHero";
import { AuthorCard } from "@/src/components/Blog/AuthorCard";
import { BlogMetaBar } from "@/src/components/Blog/BlogMetaBar";
import { Breadcrumbs } from "@/src/components/Blog/Breadcrumbs";
import { KeyTakeaways } from "@/src/components/Blog/KeyTakeaways";
import { PostNav } from "@/src/components/Blog/PostNav";
import { ReadingProgress } from "@/src/components/Blog/ReadingProgress";
import { RelatedPosts } from "@/src/components/Blog/RelatedPosts";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import { TableOfContents } from "@/src/components/Blog/TableOfContents";
import { postImageSrc } from "@/src/utils";
import { getAdjacentPosts, getRelatedPosts } from "@/src/utils/posts";
import siteMetadata from "@/src/utils/siteMetaData";
import { blogPostingJsonLd } from "@/src/utils/structuredData";

export const dynamicParams = false;

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }));
}

const findPost = (blogSlug) => allBlogs.find((blog) => blog._raw.flattenedPath === blogSlug);
const imageUrl = (blog) => siteMetadata.siteUrl + postImageSrc(blog);

export async function generateMetadata({ params }) {
  const { slug: blogSlug } = await params;
  const blog = findPost(blogSlug);
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.description,
    alternates: alternatesFor(blog.url),
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: new Date(blog.publishedAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
      authors: [blog.author || siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug: blogSlug } = await params;
  const blog = findPost(blogSlug);
  if (!blog) notFound();

  const category = { name: blog.tags[0], slug: slug(blog.tags[0]) };
  const { previous, next } = getAdjacentPosts(allBlogs, blog);
  const jsonLd = blogPostingJsonLd(siteMetadata, blog, {
    categoryName: category.name,
    categorySlug: category.slug,
    imageUrl: imageUrl(blog),
  });

  return (
    <article id="article" className="pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress targetId="article" />
      <ArticleHero blog={blog} />

      <div className="relative z-[2] mx-5 sm:mx-10 -mt-7">
        <BlogMetaBar blog={blog} />
      </div>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 pt-7">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/categories/all" },
            { label: category.name, href: `/categories/${category.slug}` },
            { label: blog.title },
          ]}
        />
      </div>

      <div className="mx-auto grid max-w-[1200px] items-start gap-10 lg:gap-16 px-5 sm:px-10 pt-8 lg:grid-cols-[minmax(220px,3fr)_minmax(0,8fr)]">
        <aside className="hidden lg:block lg:sticky lg:top-[88px]">
          <TableOfContents items={blog.toc} />
        </aside>
        <div className="min-w-0">
          <div className="mb-8 lg:hidden">
            <TableOfContents items={blog.toc} compact />
          </div>
          <div className="max-w-[68ch]">
            <KeyTakeaways items={blog.takeaways} />
          </div>
          <RenderMdx blog={blog} />
          <div className="mt-14 grid max-w-[68ch] gap-6">
            <AuthorCard />
            <PostNav previous={previous} next={next} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1200px] px-5 sm:px-10">
        <RelatedPosts posts={getRelatedPosts(allBlogs, blog)} />
      </div>
    </article>
  );
}
