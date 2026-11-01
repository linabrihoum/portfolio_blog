import { sortBlogs } from "@/src/utils";
import { BlogCard } from "../Blog/BlogCard";
import { BlogCardFeature } from "../Blog/BlogCardFeature";
import { SectionHeading } from "../Elements/SectionHeading";
import { ParallaxLayer } from "../ui/ParallaxLayer";
import { Reveal } from "../ui/Reveal";
import { Starfield } from "../ui/Starfield";

// Newest published post first: 1 featured card + 6 grid cards.
export const pickRecentPosts = (blogs) => {
  const [featured, ...rest] = sortBlogs(blogs.filter((blog) => blog.isPublished));
  return { featured, grid: rest.slice(0, 6) };
};

const RecentPosts = ({ blogs }) => {
  const { featured, grid } = pickRecentPosts(blogs);

  return (
    <section id="recent" className="relative overflow-hidden pt-24 pb-8">
      <ParallaxLayer speed={0.12}>
        <Starfield density={70} twinkle={8} seed={19} />
      </ParallaxLayer>
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-10 md:px-16">
        <Reveal>
          <SectionHeading align="split" title="Recent Blog Posts" linkLabel="view all" linkHref="/categories/all" />
        </Reveal>
        {featured && (
          <Reveal delay={0.1} className="mt-12">
            <BlogCardFeature blog={featured} />
          </Reveal>
        )}
        <div className="mt-16 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-16">
          {grid.map((blog, index) => (
            <Reveal key={blog._id} delay={(index % 3) * 0.12}>
              <article>
                <BlogCard blog={blog} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
