import React from "react";

const SponsorVerify = () => {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
  const reference = params.get("reference");

  if (status === "success")
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-green-600">
            ✅ Sponsorship Payment Received
          </h2>
          <p className="text-gray-700 mb-4">
            Thank you for partnering with Step-Up Summit 3.0!
          </p>
          {reference && (
            <p className="text-sm text-gray-500">
              Reference: <span className="font-mono font-semibold">{reference}</span>
            </p>
          )}
          <p className="mt-4 text-gray-600">
            Our team will reach out within 24–48 hours to finalize your
            sponsorship benefits and logistics.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-3 font-heading font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Back to Home
          </a>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-yellow-600">
          ⏳ Payment Pending
        </h2>
        <p className="text-gray-700">
          If your payment was successful, you will receive a confirmation email
          shortly. If you have any questions, contact us at{" "}
          <a href="mailto:stepupsummit@gmail.com" className="text-brand-blue underline">
            stepupsummit@gmail.com
          </a>
          .
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-3 font-heading font-semibold text-brand-dark transition hover:bg-brand-gold-light"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default SponsorVerify;
