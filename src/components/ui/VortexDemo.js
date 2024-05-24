import React from "react";
import { Vortex } from "./Vortex";
import ContactPage from "../Contact/ContactPage";

export function VortexDemo() {
  return (
    <div className="relative w-full mx-auto rounded-md  h-full overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <ContactPage />
      </Vortex>
    </div>
  );
}
