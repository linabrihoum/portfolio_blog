import { allBlogs } from "@/.contentlayer/generated";
import { alternatesFor } from "@/src/utils/metadata";
import { notFound } from "next/navigation";
import { BlogList } from "@/src/components/Blog/BlogList";
import { Breadcrumbs } from "@/src/components/Blog/Breadcrumbs";
import { CategoryBar } from "@/src/components/Blog/CategoryBar";
import { CometField } from "@/src/components/ui/CometField";
import { Starfield } from "@/src/components/ui/Starfield";
import siteMetadata from "@/src/utils/siteMetaData";
import { CATEGORY_INTROS, getCategories, getPostsInCategory } from "@/src/utils/categories";
import { categoryJsonLd } from "@/src/utils/structuredData";

// Only real categories get a page; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getCategories(allBlogs).map((category) => ({ slug: category.slug }));
}

const findCategory = (categorySlug) => getCategories(allBlogs).find((c) => c.slug === categorySlug);

export async function generateMetadata({ params }) {
  const { slug: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) return {};

  return {
    title: categorySlug === "all" ? "All Blogs" : `${category.name} Blogs`,
    description: CATEGORY_INTROS[categorySlug],
    alternates: alternatesFor(`/categories/${categorySlug}`),
  };
}

const CategoryPage = async ({ params }) => {
  const { slug: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) notFound();

  const posts = getPostsInCategory(allBlogs, categorySlug);
  const intro = CATEGORY_INTROS[categorySlug];
  // Only what the cards and the search box need goes to the browser
  const cards = posts.map(({ url, title, description, tags, publishedAt, image }) => ({
    url,
    title,
    description,
    tags,
    publishedAt,
    image,
  }));

  return (
    <main className="pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryJsonLd(siteMetadata, { slug: categorySlug, name: category.name, intro, posts })),
        }}
      />

      <section className="relative -mt-16 overflow-hidden px-5 sm:px-10 md:px-24 sxl:px-32 pt-28 pb-2">
        <Starfield density={90} twinkle={10} seed={8} />
        <CometField count={6} seed={13} />
        <div className="relative max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blogs", href: "/categories/all" },
              ...(categorySlug === "all" ? [] : [{ label: category.name }]),
            ]}
          />
          <h1 className="mt-5 font-bold capitalize text-4xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-[-0.02em] text-fg-1">
            {categorySlug === "all" ? "All things tech :)" : category.name}
          </h1>
          <p className="mt-4 text-lg md:text-[19px] leading-relaxed text-fg-2 [text-wrap:pretty]">{intro}</p>
        </div>
      </section>

      <BlogList
        posts={cards}
        categoryBar={<CategoryBar categories={getCategories(allBlogs)} current={categorySlug} />}
      />
    </main>
  );
};

export default CategoryPage;
