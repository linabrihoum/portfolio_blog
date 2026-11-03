// next.config.js

const { withContentlayer } = require("next-contentlayer2");
const categoryRedirects = require("./src/utils/categoryRedirects");
const postRedirects = require("./src/utils/postRedirects");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other Next.js configurations can go here
  // output: "export", // Uncomment if needed

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.aceternity.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
    ],
  },

  // The link preview images read their font files at runtime, and the build
  // can't tell on its own, so copy the fonts into those routes' server functions
  outputFileTracingIncludes: {
    "/**/opengraph-image*": ["./src/assets/fonts/*"],
  },

  async redirects() {
    return [...categoryRedirects, ...postRedirects];
  },
};

module.exports = withContentlayer(nextConfig);
