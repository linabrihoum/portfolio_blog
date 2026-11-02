"use client";
import React, { useState, useEffect } from "react";
import siteMetadata from "@/src/utils/siteMetaData";
import { CONTACT_FIELDS, CONTACT_MAX_LENGTH, validateContactField } from "@/src/utils/contact";
import { Button } from "../Elements/Button";

// Frosted glass over the Vortex: see-through dark purple with a blur.
const CARD =
  "relative z-10 flex w-full max-w-[900px] flex-col items-center rounded-lg border border-[var(--border-subtle)] bg-[rgba(20,17,55,.72)] px-5 py-8 shadow-[0_20px_60px_rgba(5,4,15,.6)] [backdrop-filter:var(--glass-blur)] sm:px-10 sm:py-12";

const FIELD =
  "mt-3 w-full border-0 border-b-2 border-fg-3 bg-transparent px-0 py-2 text-xl text-fg-1 transition-colors duration-200 placeholder:text-fg-3 focus:border-[var(--cyan-500)] focus:outline-none focus:ring-0";

// The message box grows with what's typed (CSS caps it at half the screen, then it scrolls).
const fitToContent = (textarea) => {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const IS_MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const ContactPage = () => {
  const [formStarted, setFormStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot: hidden from people, filled in by bots
  });
  const [errors, setErrors] = useState({});

  const steps = CONTACT_FIELDS;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateCurrentStep = () => {
    const currentField = steps[currentStep];
    const error = validateContactField(currentField, formData[currentField]);
    setErrors({
      ...errors,
      [currentField]: error,
    });
    return !error;
  };

  const nextStep = () => {
    if (validateCurrentStep()) setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
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
      setStatus("idle");
      setCurrentStep(steps.length); // thank-you screen, only after a real send
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep >= steps.length || status === "sending") return;
    if (currentStep < steps.length - 1) {
      nextStep();
    } else if (validateCurrentStep()) {
      await sendMessage();
    }
  };

  const handleKeyDown = (e) => {
    // In the message box, Enter is a new line; Ctrl/⌘ + Enter sends.
    const inMessageBox = e.target?.tagName === "TEXTAREA";
    if (e.key === "Enter" && (!inMessageBox || e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, formData]);

  return (
    <div className={CARD}>
      {!formStarted ? (
        <div className="w-full max-w-xl text-center">
          <h1 className="text-3xl font-bold text-[var(--indigo-300)]">Contact Me!</h1>
          <p className="mt-3 text-lg leading-relaxed text-[var(--text-body)]">
            Thank you for your interest in reaching out! Have a question or want to collaborate? I&apos;m always
            excited to connect with fellow tech enthusiasts and professionals. Fill out the form and let&apos;s create
            something amazing together!
          </p>
          <div className="mt-5">
            <Button size="lg" onClick={() => setFormStarted(true)}>
              Start
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-[670px]">
          {/* One segment per field; filled segments glow indigo → violet */}
          <div className="mb-5 flex items-stretch gap-2" aria-hidden="true">
            {steps.map((step, index) => (
              <div
                key={step}
                data-filled={index <= currentStep || undefined}
                className={`h-3 w-full rounded transition-[background-color,box-shadow] duration-300 ${
                  index <= currentStep
                    ? "bg-[linear-gradient(90deg,#6344F5,#AE48FF)] shadow-[0_0_10px_rgba(174,72,255,.5)]"
                    : "border border-[#AE48FF]"
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length ? (
            <div className="mb-5">
              {steps.map(
                (field, index) =>
                  currentStep === index && (
                    <div key={field}>
                      <label htmlFor={field} className="block text-xl font-medium text-[var(--indigo-300)]">
                        {field.charAt(0).toUpperCase() + field.slice(1)}*
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
                          className={FIELD}
                          placeholder="Type your answer here..."
                        />
                      )}
                      {errors[field] && <p className="mt-2 text-sm text-[var(--danger)]">{errors[field]}</p>}
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--indigo-300)]">
                Thank you for reaching out, {formData.name}!
              </h2>
              <p className="mt-3 text-lg text-[var(--text-body)]">We will be in touch soon.</p>
            </div>
          )}

          {currentStep < steps.length && (
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={previousStep}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && <Button onClick={nextStep}>Next</Button>}
              {currentStep === steps.length - 1 && (
                <>
                  <Button type="submit" disabled={status === "sending"} className="disabled:opacity-60">
                    {status === "sending" ? "Sending..." : "Submit"}
                  </Button>
                  {/* Phones have no shortcut keys, so the hint is desktop only */}
                  <span className="ml-2 hidden text-sm text-fg-3 sm:inline">{IS_MAC ? "⌘" : "Ctrl"} + Enter to send</span>
                </>
              )}
            </div>
          )}

          {status === "error" && (
            <p role="alert" className="mt-3 text-sm text-[var(--danger)]">
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
      )}
    </div>
  );
};

export default ContactPage;
