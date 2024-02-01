/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {};

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;

module.exports = {
  nextConfig,
  env: {
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  },
};

module.exports = withContentlayer({ ...nextConfig });
