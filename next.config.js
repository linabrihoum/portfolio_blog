/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other Next.js configurations can go here
  // output: "export", // Uncomment if needed

  images: {
    domains: ["assets.aceternity.com"],
  },

  // Uncomment and set your environment variables if needed
  // env: {
  //   MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  // },
};

module.exports = withContentlayer(nextConfig);

