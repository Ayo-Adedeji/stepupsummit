import { Mail, Phone } from "lucide-react";

const ContactUs = () => {
  const email = "[Insert Email Address]";
  const phone = "[Insert Phone Number]";

  return (
    <section className="py-16 bg-gradient-to-br from-primaryBluevia-white to-primaryBlue">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold text-primaryprimaryBlue6">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-10">
          For sponsorship inquiries, group registrations, or special arrangements, reach us at:
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Email Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center border-l-4 border-primaryBlue hover:shadow-lg transition">
            <Mail className="w-8 h-8 text-primaryBlue mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Email</h2>
            <a
              href={`mailto:${email}`}
              className="text-primaryBlue font-medium hover:underline break-words"
            >
              {email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center border-l-4 border-green-500 hover:shadow-lg transition">
            <Phone className="w-8 h-8 text-green-600 mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Phone</h2>
            <a
              href={`tel:${phone}`}
              className="text-green-600 font-medium hover:underline break-words"
            >
              {phone}
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-12">
          <p className="text-xl font-bold text-accentYellowDark">
            Step up. <span className="text-primaryBlue">Stand out.</span>{" "}
            <span className="text-green-600">Shape the future.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
