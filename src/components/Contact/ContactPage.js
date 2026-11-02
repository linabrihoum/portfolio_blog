"use client";
import React, { useRef, useState } from "react";
import siteMetadata from "@/src/utils/siteMetaData";
import { CONTACT_FIELDS, CONTACT_MAX_LENGTH, validateContact, validateContactField } from "@/src/utils/contact";
import { Button } from "../Elements/Button";

// Nearly solid dark purple over the Vortex. No backdrop blur: the browser has to
// re-blur the moving particles behind the whole card every frame, which pushed
// Contact past the lag limit once the card held the full form.
const CARD =
  "relative z-10 flex w-full max-w-[900px] flex-col items-center rounded-lg border border-[var(--border-subtle)] bg-[rgba(20,17,55,.9)] px-5 py-8 shadow-[0_20px_60px_rgba(5,4,15,.6)] sm:px-10 sm:py-12";

const FIELD =
  "mt-3 w-full border-0 border-b-2 border-fg-3 bg-transparent px-0 py-2 text-xl text-fg-1 transition-colors duration-200 placeholder:text-fg-3 focus:border-[var(--cyan-500)] focus:outline-none focus:ring-0";

// The message box grows with what's typed (CSS caps it at half the screen, then it scrolls).
const fitToContent = (textarea) => {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const IS_MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const label = (field) => `${field.charAt(0).toUpperCase() + field.slice(1)}*`;

// All three fields on one card with a single Submit. Every field is checked on
// submit; the message is only sent once they all pass.
const ContactPage = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot: hidden from people, filled in by bots
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Once a field has shown an error, re-check it as it's corrected
    if (errors[name]) setErrors({ ...errors, [name]: validateContactField(name, value) });
  };

  const sendMessage = async () => {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Contact request failed with status ${response.status}`);
      }
      setStatus("sent"); // thank-you screen, only after a real send
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = validateContact(formData);
    setErrors(found);
    const firstInvalid = CONTACT_FIELDS.find((field) => found[field]);
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }
    await sendMessage();
  };

  // Enter in name or email moves to the next field; in the message it's a new
  // line, and Ctrl/⌘ + Enter sends.
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (e.ctrlKey || e.metaKey) {
      handleSubmit(e);
    } else if (e.target.tagName === "INPUT") {
      e.preventDefault();
      const next = CONTACT_FIELDS[CONTACT_FIELDS.indexOf(e.target.name) + 1];
      formRef.current?.elements[next]?.focus();
    }
  };

  if (status === "sent") {
    return (
      <div className={CARD}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--indigo-300)]">Thank you for reaching out, {formData.name}!</h1>
          <p className="mt-3 text-lg text-[var(--text-body)]">We will be in touch soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={CARD}>
      <div className="w-full max-w-[670px]">
        <h1 className="text-3xl font-bold text-[var(--indigo-300)]">Contact Me!</h1>
        <p className="mt-3 text-lg leading-relaxed text-[var(--text-body)]">
          Thank you for your interest in reaching out! Have a question or want to collaborate? I&apos;m always excited
          to connect with fellow tech enthusiasts and professionals. Fill out the form and let&apos;s create something
          amazing together!
        </p>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate className="mt-8 grid gap-6">
          {CONTACT_FIELDS.map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-xl font-medium text-[var(--indigo-300)]">
                {label(field)}
              </label>
              {field === "message" ? (
                <>
                  <textarea
                    ref={fitToContent}
                    name={field}
                    id={field}
                    rows={6}
                    value={formData[field]}
                    onChange={(e) => {
                      handleInputChange(e);
                      fitToContent(e.target);
                    }}
                    aria-invalid={Boolean(errors[field])}
                    className={`${FIELD} max-h-[50vh] resize-none overflow-y-auto leading-relaxed`}
                    placeholder="Type your answer here..."
                  />
                  <p
                    className={`mt-1 text-right text-sm ${
                      formData.message.length > CONTACT_MAX_LENGTH.message ? "text-[var(--danger)]" : "text-fg-3"
                    }`}
                  >
                    {formData.message.length} / {CONTACT_MAX_LENGTH.message}
                  </p>
                </>
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors[field])}
                  autoComplete={field === "email" ? "email" : "name"}
                  className={FIELD}
                  placeholder="Type your answer here..."
                />
              )}
              {errors[field] && <p className="mt-2 text-sm text-[var(--danger)]">{errors[field]}</p>}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={status === "sending"} className="disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Submit"}
            </Button>
            {/* Phones have no shortcut keys, so the hint is desktop only */}
            <span className="ml-2 hidden text-sm text-fg-3 sm:inline">{IS_MAC ? "⌘" : "Ctrl"} + Enter to send</span>
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-[var(--danger)]">
              Sorry, your message couldn&apos;t be sent. Please try again, or email me at{" "}
              <a href={`mailto:${siteMetadata.email}`} className="underline">
                {siteMetadata.email}
              </a>
              .
            </p>
          )}

          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
