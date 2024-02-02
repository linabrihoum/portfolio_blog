"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Regards from "./Regards";
import TransitionEffect from "../Home/TransitionEffect";

export default function ContactForm() {
  const router = useRouter();

  return (
    <>
      <TransitionEffect />
      <section className="justify-center">
        <div className="dark:text-white text-dark ">
          <Regards />
        </div>
      </section>
    </>
  );
}
