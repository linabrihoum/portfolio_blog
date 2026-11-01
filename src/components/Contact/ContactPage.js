import React, { useState, useEffect } from "react";
import siteMetadata from "@/src/utils/siteMetaData";
import { CONTACT_FIELDS, validateContactField } from "@/src/utils/contact";

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
    if (e.key === "Enter") {
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
    <div className="relative flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative flex flex-col items-center justify-center w-full max-w-screen-md px-5 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md z-10">
        {!formStarted ? (
          <div className="text-center w-full max-w-lg">
            <h1 className="text-3xl font-bold text-indigo-800">Contact Me!</h1>
            <p className="mt-3 text-lg text-neutral-500">
              Thank you for your interest in reaching out! Have a question or
              want to collaborate? I&apos;m always excited to connect with fellow
              tech enthusiasts and professionals. Fill out the form and let&apos;s
              create something amazing together!
            </p>
            <div className="mt-5">
              <button
                onClick={() => setFormStarted(true)}
                className="px-4 py-3 text-xl font-bold text-white bg-black rounded-md shadow hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
              >
                Start
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-5">
              <div className="flex items-stretch gap-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`w-full h-3 rounded ${
                      index <= currentStep
                        ? "bg-purple-500"
                        : "border border-purple-500"
                    }`}
                  ></div>
                ))}
                {currentStep === steps.length && (
                  <div className="w-full h-3 rounded bg-purple-500"></div>
                )}
              </div>
            </div>

            {currentStep < steps.length ? (
              <div className="mb-5">
                {steps.map(
                  (field, index) =>
                    currentStep === index && (
                      <div key={field}>
                        <label
                          htmlFor={field}
                          className="block text-xl font-medium text-indigo-800"
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}*
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          id={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          className="w-full mt-3 text-xl font-normal border-0 border-b-2 border-neutral-400 focus:border-black focus:outline-none focus:ring-0 placeholder:text-neutral-300"
                          placeholder="Type your answer here..."
                        />
                        {errors[field] && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-indigo-800">
                  Thank you for reaching out, {formData.name}!
                </h2>
                <p className="mt-3 text-lg text-neutral-500">
                  We will be in touch soon.
                </p>
              </div>
            )}

            {currentStep < steps.length && (
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="px-4 py-2 text-xl font-medium text-white bg-black rounded-md shadow hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
                  >
                    Previous
                  </button>
                )}
                {currentStep < steps.length - 1 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 text-xl font-medium text-white bg-black rounded-md shadow hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
                  >
                    Next
                  </button>
                )}
                {currentStep === steps.length - 1 && (
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="px-4 py-2 text-xl font-medium text-white bg-black rounded-md shadow hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Submit"}
                  </button>
                )}
              </div>
            )}

            {status === "error" && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                Sorry, your message couldn&apos;t be sent. Please try again, or
                email me at{" "}
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
    </div>
  );
};

export default ContactPage;
