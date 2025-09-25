import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const News = () => {
  const [status, setStatus] = useState(""); // success | error | invalid | loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const emailInput = form.querySelector("#mce-EMAIL");

    // ✅ Custom email validation with regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value)) {
      setStatus("invalid");
      return;
    }

    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: form.method,
        body: formData,
        mode: "no-cors",
      });

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="flex flex-col items-center md:flex-row justify-between p-6">
      {/* Left content */}
      <div className="hidden md:block px-6">
        <h1 className="text-4xl font-extrabold mb-10 text-accentLightBlue">
          #SUS2025
        </h1>
        <p className="font-bold md:text-sm text-lg">GO BEYOND THE WEBSITE</p>
        <p className="mb-4">
          Follow our development and <br /> achievements in these links.
        </p>

        {/* Social icons */}
        <div className="flex gap-2 text-2xl text-accentLightBlue">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaSquareInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Contact info */}
      <div className="hidden lg:block lg:ml-40">
        <p className="font-bold">REACH US AT</p>
        <a href="mailto:hello@gmail.com" className="text-accentLightBlue font-medium">
          hello@gmail.com
        </a>
      </div>

      {/* Mailchimp Form */}
      <form
        action="https://stepupsummit.us17.list-manage.com/subscribe/post?u=33d61143ecf6edaf3b3e6e394&amp;id=41bc8ca659&amp;f_id=00da94e0f0"
        method="post"
        target="_blank"
        noValidate
        onSubmit={handleSubmit}
        className="bg-accentLightBlue w-full max-w-md p-6 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-3 text-white">
          BEYOND A <br /> NEWSLETTER
        </h1>
        <p className="text-white mb-4">
          Sign in to our newsletter to know the latest news.
        </p>

        <input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          required
          placeholder="Enter your email"
          className={`w-full p-3 rounded-lg outline-none text-gray-900
            ${status === "invalid" ? "border-2 border-red-500" : "border border-white"}`}
        />

        {/* Anti-bot hidden input */}
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input
            type="text"
            name="b_33d61143ecf6edaf3b3e6e394_41bc8ca659"
            tabIndex="-1"
            value=""
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full mt-5 py-3 rounded-lg bg-white text-accentLightBlue font-semibold hover:bg-accentDarkBlue hover:text-white transition-all duration-300"
        >
          {status === "loading" ? "Signing up..." : "SIGN ME UP"}
        </button>

        {/* Feedback messages */}
        {status === "invalid" && (
          <p className="mt-4 text-yellow-200 font-medium">
            ⚠️ Enter a valid email address.
          </p>
        )}
        {status === "success" && (
          <p className="mt-4 text-green-200 font-medium">
            🎉 Thanks for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-200 font-medium">
            ❌ Oops, something went wrong. Try again.
          </p>
        )}
      </form>
    </section>
  );
};

export default News;
