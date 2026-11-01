// next.config.js

const { withContentlayer } = require("next-contentlayer2");
const categoryRedirects = require("./src/utils/categoryRedirects");

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
    return categoryRedirects;
  },

  // Uncomment and set your environment variables if needed
  // env: {
  //   MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  // },
};

module.exports = withContentlayer(nextConfig);
