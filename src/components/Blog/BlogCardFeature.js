import Image from "next/image";
import Link from "next/link";
import { slug } from "github-slugger";
import Tag from "../Elements/Tag";
import { postImageSrc } from "@/src/utils";

// Large featured post: full-bleed image, dark fade, topic pill and title on top.
export function BlogCardFeature({ blog }) {
  return (
    <div className="group relative h-[320px] sm:h-[400px] md:h-[460px] overflow-hidden rounded-xl bg-space-800">
      <Image
        src={postImageSrc(blog)}
        placeholder="blur"
        blurDataURL={blog.image.blurhashDataUrl}
        alt={blog.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 1280px) 100vw, 1152px"
      />
      <div className="absolute inset-0 z-[1] bg-[image:var(--gradient-scrim)]" />
      <div className="absolute inset-x-0 bottom-0 z-[2] p-6 md:p-10">
        <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} size="sm" />
        <Link href={blog.url} className="mt-4 block">
          <h2 className="text-xl md:text-2xl font-bold capitalize leading-snug text-[var(--star)]">
            <span className="bg-[linear-gradient(90deg,#6344F5,#AE48FF)] bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_6px]">
              {blog.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
