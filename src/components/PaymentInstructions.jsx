import { useState } from "react";
import { Copy } from "lucide-react";

const PaymentInstructions = () => {
  const [copied, setCopied] = useState("");
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const bankName = "[Insert Bank Name]";
  const accountName = "[Insert Account Name]";
  const accountNumber = "[Insert Account Number]";
  const confirmationEmail = "[Insert Email Address]";

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-primaryprimaryBlue10">
          Payment Instructions
        </h1>

        {/* Local Payments */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            For Local (Nigeria) Payments
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Bank Name:</strong> {bankName}
            </li>
            <li>
              <strong>Account Name:</strong> {accountName}
            </li>
            <li className="flex items-center gap-3">
              <strong>Account Number:</strong> {accountNumber}
              <button
                onClick={() => handleCopy(accountNumber, "account")}
                className="p-2 rounded-full bg-gray-200 hover:bg-green-100 transition"
              >
                <Copy className="w-4 h-4 text-gray-700" />
              </button>
              {copied === "account" && (
                <span className="text-green-600 text-sm">Copied!</span>
              )}
            </li>
          </ul>
        </div>

        {/* International Payments */}
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-primaryBlue mb-8">
          <h2 className="text-xl font-semibold text-primaryBlue mb-4">
            For International Payments
          </h2>
          <p className="text-gray-700 mb-4">
            Pay securely via PayPal or credit card:
          </p>
          <a
            href="[Insert Link]"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full bg-primaryBlue text-white font-semibold shadow hover:bg-blue-800 transition"
          >
            Pay Now
          </a>
        </div>

        {/* Confirmation Instructions */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-2xl p-6 shadow">
          <p className="text-gray-800 flex items-center gap-2 flex-wrap">
            <strong>Once payment is made</strong>, kindly send confirmation to{" "}
            <a
              href={`mailto:${confirmationEmail}`}
              className="text-primaryBlue font-medium underline hover:text-primaryBlue"
            >
              {confirmationEmail}
            </a>
            <button
              onClick={() => handleCopy(confirmationEmail, "email")}
              className="p-2 rounded-full bg-gray-200 hover:bg-yellow-100 transition"
            >
              <Copy className="w-4 h-4 text-gray-700" />
            </button>
            {copied === "email" && (
              <span className="text-green-600 text-sm">Copied!</span>
            )}
          </p>
          <p className="text-gray-700 mt-2">
            with your <strong>Name / Organization</strong> and{" "}
            <strong>Payment Reference</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentInstructions;
