import PaymentForm from "./PaymentForm";
import useScrollAnimation from "./useScrollAnimation";
import { useEffect } from "react";




const RegistrationOptions = () => {
  const [textRef, textVisible] = useScrollAnimation();

  useEffect(() => {
  if (window.fbq) {
    window.fbq("track", "ViewContent");
  }
}, []);

     const scrollToPayment = () => {
    const section = document.getElementById("payment-instructions");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h1 ref={textRef} className={`text-3xl font-bold text-center text-primaryBlue mb-12 ${textVisible? "animate-fadeInUp" : "animate-fadeOutDown"}`}>
          Get Your Ticket
        </h1>
        <p className="text-center mb-10 font-semibold">PRICE PLAN</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Admission */}
          <div ref={textRef} className={`border-4 border-primaryBlue rounded-2xl p-6 bg-white shadow hover:shadow-lg transition ${textVisible? "animate-slideInLeft" : "animate-slideOutRight"}`}>
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-4">
              General Admission
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              Access to all summit sessions, networking opportunities, and keynote addresses.
            </p>
            <ul className="text-gray-700 space-y-2 text-center mb-6">
              <li>
                <span className="font-bold">Student:</span> ₦2000
              </li>
              <li>
                <span className="font-bold">Regular:</span> ₦5000
              </li>
              <li>
                <span className="font-bold">Premium:</span> ₦10000
              </li>
            </ul>
            <div className="text-center">
              <button onClick={scrollToPayment} className="px-6 py-2 border-2 border-primaryBlue text-primaryBlue font-semibold rounded-full hover:bg-primaryBlue hover:text-white transition">
                Buy Ticket
              </button>
            </div>
          </div>

          {/* VIP Access */}
          <div ref={textRef} className={`border-4 border-amber-500 rounded-2xl p-6 bg-white shadow hover:shadow-lg transition ${textVisible? "animate-slideInRight" : "animate-slideOutLeft"}`}>
            <h2 className="text-xl font-semibold text-center text-amber-600 mb-4">
              VIP Access
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              Includes reserved seating, VIP networking lounge, and exclusive access to speakers.
            </p>
            <ul className="text-gray-700 space-y-2 text-center mb-6">
              <li>
                <span className="font-bold">VIP:</span> ₦20,000
              </li>
              <li>
                <span className="font-bold">VVIP:</span> ₦50,000
              </li>
            </ul>
            <div className="text-center">
              <button onClick={scrollToPayment} className="px-6 py-2 border-2 border-amber-500 text-amber-500 font-semibold rounded-full hover:bg-amber-500 hover:text-white transition">
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
      
      <PaymentForm/>
    </section>
  
  );
};

export default RegistrationOptions;
