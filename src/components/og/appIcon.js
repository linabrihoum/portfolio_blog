import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// PNG copies of src/app/icon.svg for places that don't take SVG icons
// (iPhone and Android home screens). The SVG stays the one source of the design.
export const APP_ICON_SIZES = [192, 512];

export async function appIconResponse(size) {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"), "base64");
  return new ImageResponse(
    (
      // Square and filled to the edges: phones round the corners themselves
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#080717" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- drawn into a PNG, not a browser page */}
        <img src={`data:image/svg+xml;base64,${svg}`} width={size} height={size} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
