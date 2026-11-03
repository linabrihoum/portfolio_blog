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

  async redirects() {
    return [...categoryRedirects, ...postRedirects];
  },
};

module.exports = withContentlayer(nextConfig);
