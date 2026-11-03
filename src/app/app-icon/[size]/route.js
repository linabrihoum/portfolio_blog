import { notFound } from "next/navigation";
import { APP_ICON_SIZES, appIconResponse } from "@/src/components/og/appIcon";

export const dynamicParams = false;
export const generateStaticParams = () => APP_ICON_SIZES.map((size) => ({ size: String(size) }));

// /app-icon/192 and /app-icon/512, listed in the app manifest
export async function GET(request, { params }) {
  const size = Number((await params).size);
  if (!APP_ICON_SIZES.includes(size)) notFound();
  return appIconResponse(size);
}
