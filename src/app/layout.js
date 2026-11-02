import "./globals.css";
import { alternatesFor } from "@/src/utils/metadata";
import { cx } from "@/src/utils";
import { Inter, Manrope } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import { HideOnContact } from "../components/Footer/HideOnContact";
import siteMetadata from "../utils/siteMetaData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  // Lets browsers and feed readers find the RSS feed from any page
  alternates: alternatesFor(),
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    // "dark" is permanent: the site is dark only, and pages that aren't
    // redesigned yet still rely on their dark: styles.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cx("dark", inter.variable, manrope.variable)}
    >
      <body className="font-mr">
        <Header />
        {children}
        <HideOnContact>
          <Footer />
        </HideOnContact>
      </body>
    </html>
  );
}
