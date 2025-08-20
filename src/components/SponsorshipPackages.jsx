import { FaMedal, FaGem, FaCrown, FaStar } from "react-icons/fa";

const SponsorshipPackages = () => {
  const packages = {
    bronze: {
      title: "Bronze Sponsor",
      price: "$500 (₦500,000)",
      benefits: [
        "Logo on summit website and brochure",
        "Recognition in opening remarks",
      ],
      color:
        "border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white",
      icon: <FaMedal className="text-orange-500 text-3xl" />,
    },
    silver: {
      title: "Silver Sponsor",
      price: "$1,000 (₦1,000,000)",
      benefits: [
        "All Bronze benefits",
        "Social media mentions before and during the event",
        "Logo on banners and event backdrops",
      ],
      color:
        "border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white",
      icon: <FaStar className="text-gray-400 text-3xl" />,
    },
    gold: {
      title: "Gold Sponsor",
      price: "$2,500 (₦2,500,000)",
      benefits: [
        "All Silver benefits",
        "Premium logo placement across platforms",
        "Speaking opportunity during a breakout session",
      ],
      color:
        "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white",
      icon: <FaCrown className="text-yellow-500 text-3xl" />,
    },
    platinum: {
      title: "Platinum Sponsor",
      price: "$5,000 (₦5,000,000)",
      benefits: [
        "All Gold benefits",
        "Prominent logo placement on main stage backdrop",
        "Featured partner spotlight in press release",
        "Complimentary VIP passes (5)",
      ],
      color:
        "border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white",
      icon: <FaGem className="text-primaryBlue text-3xl" />,
    },
  };

  const scrollToPayment = () => {
    const section = document.getElementById("payment-instructions");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const PackageCard = ({ title, price, benefits, color, icon, highlight }) => (
    <div
      className={`relative border-4 rounded-2xl p-6 bg-white shadow-lg flex flex-col justify-between transition transform hover:-translate-y-2 ${
        highlight ? "scale-105 z-10" : ""
      } ${color.split(" ")[0]}`}
    >
      {highlight && (
        <div className="absolute -top-4 -right-8 -translate-x-1/2">
          <span className="relative px-2 py-1 bg-primaryBlue text-white text-xs font-bold rounded-full">
            ⭐ Recommended
          </span>
        </div>
      )}
      <div className="text-center mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-center mb-2">{title}</h2>
      <p className="text-center font-bold text-lg mb-4">{price}</p>
      <ul className="text-gray-700 space-y-2 mb-6 text-sm">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2 text-primaryBlue">✔</span> {benefit}
          </li>
        ))}
      </ul>
      <div className="text-center">
        <button
          onClick={scrollToPayment}
          className={`px-5 py-2 border-2 rounded-full font-semibold transition ${color}`}
        >
          Become a Sponsor
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-primaryBlue mb-6">
          Sponsorship Packages
        </h1>
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Join us in empowering the next generation while positioning your brand
          at the forefront of innovation and leadership.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PackageCard {...packages.bronze} />
          <PackageCard {...packages.silver} />

          {/* Platinum with Recommended badge */}
          <div className="lg:row-span-2 flex justify-center relative group">
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-400 via-primaryBlue to-indigo-500 opacity-30 blur-3xl rounded-3xl transition duration-500 group-hover:opacity-50"></div>
            <PackageCard {...packages.platinum} highlight />
          </div>

          <PackageCard {...packages.gold} />
        </div>
      </div>
    </section>
  );
};

export default SponsorshipPackages;
