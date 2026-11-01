"use client";
import React from "react";
import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import { CodeFrame } from "./mdx/CodeFrame";
import { Callout } from "./mdx/Callout";
import { Figure } from "./mdx/Figure";

// rehype-pretty-code wraps every code block in <div data-rehype-pretty-code-fragment>;
// those get the CodeFrame header. Any other div renders as usual.
const MdxDiv = (props) =>
  props["data-rehype-pretty-code-fragment"] !== undefined ? <CodeFrame {...props} /> : <div {...props} />;

const mdxComponents = {
  Image,
  Callout,
  Figure,
  div: MdxDiv,
};

// Post body, styled by .post-prose in globals.css (Tailwind typography recolored
// with the Comet tokens: 18px Inter, 68-character lines).
const RenderMdx = ({ blog }) => {
  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <div className="post-prose prose prose-lg prose-invert">
      {/* useMDXComponent memoizes the component per post, so it isn't recreated on every render */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <MDXContent components={mdxComponents} />
    </div>
  );
};

export default RenderMdx;
