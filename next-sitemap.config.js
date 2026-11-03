const siteMetadata = require("./src/utils/siteMetaData");

module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
  // Pages only: these are files Next serves from src/app, not pages to index
  exclude: ["/apple-icon*", "/icon.svg", "/app-icon/*", "*/opengraph-image*", "/manifest.webmanifest", "/feed.xml"],
};
