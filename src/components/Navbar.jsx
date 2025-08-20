import React, { useState } from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";
import { MdPhoneInTalk, MdStarPurple500 } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleScroll = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  const handleContactClick = () => {
    // Always navigate to tickets and scroll to contact there
    navigate("/tickets", { replace: false, state: { scrollTo: "contact" } });
    setIsSidebarOpen(false);
  };

  return (
    <nav className="bg-primaryBlue text-white px-6 py-3 flex items-center justify-between font-semibold text-lg shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/">
          <img className="w-16" src={StepUPLogo} alt="sus-logo" />
        </a>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex flex-row gap-6">
          <li>
            <a href="/about" className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
              <TiInfoLarge className="text-accentYellow" /> About
            </a>
          </li>
          <li onClick={() => handleScroll("join")} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer">
            <FaUserPlus className="text-accentYellow" /> Join Us
          </li>
          <li onClick={() => handleScroll("event")} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer">
            <FaRegCalendarAlt className="text-accentYellow" /> Event
          </li>
          <li onClick={() => handleScroll("highlights")} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer">
            <MdStarPurple500 className="text-accentYellow" /> Highlights
          </li>
        </ul>
      </div>

      {/* Right buttons */}
      <div className="flex items-center gap-3">
        <a href="/tickets#contact"
          // onClick={handleContactClick}
          className="hidden md:flex border-2 items-center gap-1 border-accentYellow px-3 py-1 rounded-lg hover:bg-accentYellowDark text-white"
        >
          <MdPhoneInTalk /> Contact
        </a>
        <a
          href="/tickets"
          className="hidden md:flex border-2 border-accentYellow px-3 py-1 rounded-lg bg-accentYellow hover:bg-accentYellowDark text-white"
        >
          Buy Tickets
        </a>

        {/* Mobile Hamburger */}
        <button onClick={toggleSidebar} className="md:hidden">
          <RxHamburgerMenu className="text-4xl" />
        </button>
      </div>

      {/* Mobile Sidebar */}
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
              <a href="/about" className="flex items-center gap-1 hover:underline hover:decoration-accentYellow" onClick={toggleSidebar}>
                <TiInfoLarge /> About
              </a>
            </li>
            <li onClick={() => handleScroll("join")} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer">
              <FaUserPlus /> Join Us
            </li>
            <li onClick={() => handleScroll("event")} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer">
              <FaRegCalendarAlt /> Event
            </li>
            <li onClick={() => handleScroll("highlights")} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer">
              <MdStarPurple500 /> Highlights
            </li>
            <li className="flex items-center gap-1 hover:underline hover:decoration-accentYellow cursor-pointer">
              <a href="/tickets#contact">
              <MdPhoneInTalk /> Contact
              </a>
            </li>
            <li>
              <a href="/tickets" className="flex items-center gap-1 border-2 border-accentYellow px-3 py-1 rounded-lg bg-accentYellow hover:bg-accentYellowDark text-white" onClick={toggleSidebar}>
                Buy Tickets
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
