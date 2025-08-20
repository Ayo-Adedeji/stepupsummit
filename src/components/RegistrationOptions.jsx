const RegistrationOptions = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-primaryBlue mb-12">
          Registration Options
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Admission */}
          <div className="border-4 border-primaryBlue rounded-2xl p-6 bg-white shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-4">
              General Admission
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              Access to all summit sessions, networking opportunities, and keynote addresses.
            </p>
            <ul className="text-gray-700 space-y-2 text-center mb-6">
              <li>
                <span className="font-bold">Early Bird:</span> $25 (₦25,000)
              </li>
              <li>
                <span className="font-bold">Regular:</span> $40 (₦40,000)
              </li>
            </ul>
            <div className="text-center">
              <button className="px-6 py-2 border-2 border-primaryBlue text-primaryBlue font-semibold rounded-full hover:bg-primaryBlue hover:text-white transition">
                Buy Ticket
              </button>
            </div>
          </div>

          {/* VIP Access */}
          <div className="border-4 border-amber-500 rounded-2xl p-6 bg-white shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-center text-amber-600 mb-4">
              VIP Access
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              Includes reserved seating, VIP networking lounge, and exclusive access to speakers.
            </p>
            <ul className="text-gray-700 space-y-2 text-center mb-6">
              <li>
                <span className="font-bold">Early Bird:</span> $50 (₦50,000)
              </li>
              <li>
                <span className="font-bold">Regular:</span> $70 (₦70,000)
              </li>
            </ul>
            <div className="text-center">
              <button className="px-6 py-2 border-2 border-amber-500 text-amber-500 font-semibold rounded-full hover:bg-amber-500 hover:text-white transition">
                Buy Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Payment Note */}
        <p className="text-center text-gray-600 mt-6 italic">
          All payments can be made in Naira (₦) or US Dollars ($) through secure online channels.
        </p>
      </div>
    </section>
  );
};

export default RegistrationOptions;
