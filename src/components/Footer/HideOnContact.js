"use client";
import { usePathname } from "next/navigation";

// The design shows no footer on Contact: the Vortex fills the screen there.
// (Its stars and comets also made the Vortex's redraws slower.)
export function HideOnContact({ children }) {
  return usePathname() === "/contact" ? null : children;
}
