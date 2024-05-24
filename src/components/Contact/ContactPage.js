import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [formStarted, setFormStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const steps = ["name", "email", "message"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (field) => {
    let error = "";
    switch (field) {
      case "name":
      case "message":
        if (!formData[field]) error = `${field} is a required field`;
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData[field]) error = "Email is a required field";
        else if (!emailRegex.test(formData[field]))
          error = "Must be a valid email address";
        break;
      default:
        break;
    }
    return error;
  };

  const validateCurrentStep = () => {
    const currentField = steps[currentStep];
    const error = validateField(currentField);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === steps.length) {
      // Submit the form
      setSubmitted(true);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "YOUR_ACCESS_KEY_HERE",
            ...formData,
          }),
        });
        const result = await response.json();
        setSubmitSuccess(result.success);
        setCurrentStep((prev) => prev + 1); // Move to thank you step
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitSuccess(false);
      }
    } else {
      nextStep();
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
              want to collaborate? I'm always excited to connect with fellow
              tech enthusiasts and professionals. Fill out the form and let's
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
                      index <= currentStep || submitted
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
                    className="px-4 py-2 text-xl font-medium text-white bg-black rounded-md shadow hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
