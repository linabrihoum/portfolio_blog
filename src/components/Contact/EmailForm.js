"use client";
import React from "react";

const EmailForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Replace YOUR_FORMSPREE_ENDPOINT with the actual endpoint from Formspree
    const response = await fetch('https://formspree.io/f/xeqygzvn', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      alert('Thanks for contacting me! I will get back to you soon.');
      e.target.reset(); // Reset the form values after submission
    } else {
      alert('There was an error submitting your form. Please try again.');
    }
  };

  return (
    <section className="w-full md:h-[60vh] flex flex-col md:flex-row justify-between text-dark dark:text-light">
      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">

        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" id="message" rows="4" required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Send
            </button>
          </div>
        </form>
      </div>

    </section>
  );
};

export default EmailForm;
