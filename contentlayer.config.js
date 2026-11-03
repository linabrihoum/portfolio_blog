import { makeSource, defineDocumentType } from "contentlayer2/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { extractHeadings } from "./src/utils/toc.js";

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: false,
    },
    publishedAt: {
      type: "date",
      required: true,
    },
    image: {
      type: "image",
      required: false,
    },
    isPublished: {
      type: "boolean",
      default: true,
    },
    author: {
      type: "string",
      default: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    // Optional "Key takeaways" box at the top of a post: about 3 one-sentence bullets
    takeaways: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    toc: {
      type: "json",
      resolve: (doc) => extractHeadings(doc.body.raw),
    },
  },
}));

const codeOptions = {
  theme: "github-dark",
};

export default makeSource({
  /* options */
  contentDirPath: "content",
  documentTypes: [Blog],
  // TODO: Check remarkgfm and rehype for markdown x shortcuts
  // Video 2:42:00
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [rehypePrettyCode, codeOptions],
    ],
  },
});
