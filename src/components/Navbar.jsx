import React, { useState } from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";
import { MdPhoneInTalk, MdStarPurple500 } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      // Navigate home first
      navigate("/", { replace: false });
      // Wait a moment for the page to render before scrolling
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  return (
    <nav className="bg-primaryBlue text-white px-6 py-3 flex items-center justify-between font-semibold text-lg shadow-lg">
      <div className="flex items-center">
        <Link to="/">
        <img className="w-16" src={StepUPLogo} alt="sus-logo" />
      </Link>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-primaryBlue text-white transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <button onClick={toggleSidebar}>
            <IoMdClose className="text-5xl mb-3 mt-5" />
          </button>
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                to="/about"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-1 hover:underline hover:decoration-accentYellow"
              >
                <TiInfoLarge /> About
              </Link>
            </li>

            <li
              onClick={() => handleScroll("join")}
              className="flex items-center gap-1 hover:underline hover:decoration-accentYellow"
            >
              <FaUserPlus /> Join Us
            </li>
            <li
              onClick={() => handleScroll("event")}
              className="flex items-center gap-1 hover:underline hover:decoration-accentYellow"
            >
              <FaRegCalendarAlt /> Event
            </li>
            <li
              onClick={() => handleScroll("highlights")}
              className="flex items-center gap-1 hover:underline hover:decoration-accentYellow"
            >
              <MdStarPurple500 /> Highlights
            </li>
            <li
              onClick={() => handleScroll("contact")}
              className="flex items-center gap-1 hover:underline hover:decoration-accentYellow"
            >
              <MdPhoneInTalk /> Contact
            </li>

            <li>
              <Link
                to="/tickets"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-1 border-2 border-accentYellow px-3 py-1 rounded-lg bg-accentYellow hover:bg-accentYellowDark text-white"
              >
                Buy Ticket
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex flex-row gap-6">
          <li>
            <Link
              to="/about"
              className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer"
            >
              <TiInfoLarge className="text-accentYellow" /> About
            </Link>
          </li>
          <li
            onClick={() => handleScroll("join")}
            className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer"
          >
            <FaUserPlus className="text-accentYellow" /> Join Us
          </li>
          <li
            onClick={() => handleScroll("event")}
            className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer"
          >
            <FaRegCalendarAlt className="text-accentYellow" /> Event
          </li>
          <li
            onClick={() => handleScroll("highlights")}
            className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer"
          >
            <MdStarPurple500 className="text-accentYellow" /> Highlights
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleScroll("contact")}
          className="hidden md:block border-2 md:flex items-center gap-1 border-accentYellow px-3 py-1 rounded-lg hover:bg-accentYellowDark text-white"
        >
          <MdPhoneInTalk /> Contact
        </button>
        <Link
          to="/tickets"
          className="hidden md:block border-2 border-accentYellow px-3 py-1 rounded-lg bg-accentYellow hover:bg-accentYellowDark text-white"
        >
          Buy Ticket
        </Link>
        <button onClick={toggleSidebar}>
          <RxHamburgerMenu className="md:hidden text-4xl" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
