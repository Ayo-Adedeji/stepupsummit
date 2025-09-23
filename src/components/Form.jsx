import React from 'react'

const Form = () => {
  return (
    <form className="flex justify-center">
      <div className="w-full max-w-6xl mb-10 p-3">
        <h1 className="text-xl font-semibold mb-6">Please fill in your details</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <p>Full Name *</p>
            <input
              className="border rounded-md w-full p-2"
              name="fullName"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <p>Email Address *</p>
            <input
              className="border rounded-md w-full p-2"
              name="email"
              type="email"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <p>Phone Number *</p>
            <input
              className="border rounded-md w-full p-2"
              name="phone"
              type="tel"
              required
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <p>Company Name *</p>
            <input
              className="border rounded-md w-full p-2"
              name="companyName"
              type="text"
              required
            />
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <p>Designation</p>
            <input
              className="border rounded-md w-full p-2"
              name="designation"
              type="text"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <p>Company Website / Social Media URL</p>
            <input
              className="border rounded-md w-full p-2"
              name="companyWebsite"
              type="url"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-primaryBlue text-white font-medium rounded-md hover:bg-accentLightBlue transition"
          >
            Submit Sponsorship Interest
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
