import { APP_ICON_SIZES } from "@/src/components/og/appIcon";
import siteMetadata from "@/src/utils/siteMetaData";

// What phones and browsers use when someone saves the site to their home screen
export default function manifest() {
  return {
    name: siteMetadata.author,
    short_name: siteMetadata.author,
    description: siteMetadata.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080717",
    theme_color: "#080717",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      ...APP_ICON_SIZES.map((size) => ({ src: `/app-icon/${size}`, sizes: `${size}x${size}`, type: "image/png" })),
    ],
  };
}
