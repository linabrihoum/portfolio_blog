import Image from "next/image";
import { slug } from "github-slugger";
import Tag from "../Elements/Tag";
import { postImageSrc } from "@/src/utils";

// Top of a post: the cover image under a dark fade, with the topic pill and title.
export function ArticleHero({ blog }) {
  return (
    <div className="relative -mt-16 h-[64vh] min-h-[360px] w-full overflow-hidden bg-space-950 text-center">
      <Image
        src={postImageSrc(blog)}
        placeholder="blur"
        blurDataURL={blog.image.blurhashDataUrl}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,23,.55),rgba(8,7,23,.7)_60%,var(--surface-page))]" />
      <div className="absolute left-1/2 top-1/2 z-[1] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-5">
        <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />
        <h1 className="mt-6 w-full md:w-5/6 font-bold capitalize text-3xl md:text-4xl lg:text-5xl leading-snug lg:leading-normal text-[var(--star)] [text-wrap:balance]">
          {blog.title}
        </h1>
      </div>
    </div>
  );
}
