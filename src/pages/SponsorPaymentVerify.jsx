import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SponsorPaymentVerify = () => {
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [sponsorData, setSponsorData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");

    if (!reference) {
      setStatus("error");
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    fetch(`${baseUrl}/api/sponsorship/verify/${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSponsorData(data);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-[#0B1F5C] flex flex-col items-center justify-center text-white text-center px-5">
        <svg
          className="h-12 w-12 animate-spin text-[#FFC107] mb-6"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <h2 className="text-2xl font-bold font-heading text-[#FFC107]">
          Confirming your sponsorship...
        </h2>
        <p className="mt-3 text-blue-200 text-sm">
          Please wait, do not close this page.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-20">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 max-w-md w-full shadow-lg">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold font-heading text-red-700 mb-3">
              We could not confirm your payment
            </h2>
            <p className="text-gray-600 mb-6">
              If you were charged, please contact us and we will resolve it
              within 24 hours.
            </p>
            <div className="bg-white rounded-xl p-4 text-left space-y-2 text-sm text-gray-700 border border-red-100">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:stepupsummit@gmail.com" className="text-[#0B1F5C] underline">
                  stepupsummit@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Phone:</span> 08143567953
              </p>
            </div>
            <Link
              to="/sponsors"
              className="mt-6 inline-block rounded-full bg-[#0B1F5C] px-8 py-3 font-heading font-semibold text-white transition hover:bg-[#1a3470]"
            >
              Back to Sponsors
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // success
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-20">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10 max-w-md w-full shadow-lg">
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-bold font-heading text-green-700 mb-2">
            Sponsorship Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for partnering with Step-Up Summit 3.0. Our team will
            reach out within 24 hours to finalize your sponsorship benefits.
          </p>

          {sponsorData && (
            <div className="bg-white rounded-xl p-4 text-left space-y-2 text-sm text-gray-700 border border-green-100 mb-6">
              {sponsorData.name && (
                <p><span className="font-semibold">Name:</span> {sponsorData.name}</p>
              )}
              {sponsorData.packageSelected && (
                <p><span className="font-semibold">Package:</span> {sponsorData.packageSelected}</p>
              )}
              {sponsorData.reference && (
                <p><span className="font-semibold">Reference:</span> {sponsorData.reference}</p>
              )}
              {sponsorData.amount && (
                <p><span className="font-semibold">Amount Paid:</span> ₦{Number(sponsorData.amount).toLocaleString()}</p>
              )}
            </div>
          )}

          <p className="text-sm text-gray-500 mb-6">
            Check your email for a confirmation and next steps.
          </p>

          <Link
            to="/"
            className="rounded-full bg-[#0B1F5C] px-6 py-3 font-heading font-semibold text-white transition hover:bg-[#1a3470]"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SponsorPaymentVerify;
