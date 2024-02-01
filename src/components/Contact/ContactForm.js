"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Regards from "./Regards";

export default function ContactForm() {
  const router = useRouter();

  return (
    <section className="justify-center">
      <div className="dark:text-white text-dark ">
        <Regards />
      </div>
    </section>
  );
}
