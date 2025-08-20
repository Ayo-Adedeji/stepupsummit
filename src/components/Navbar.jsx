import React, { useState } from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";
import { MdPhoneInTalk, MdStarPurple500 } from "react-icons/md";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
          

          {/* Scrollable sections on Home */}
          <li>
            <a href="/#join" className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
              <FaUserPlus className="text-accentYellow" /> Join Us
            </a>
          </li>
          <li>
            <a href="/#event" className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
              <FaRegCalendarAlt className="text-accentYellow" /> Event
            </a>
          </li>
          <li>
            <a href="/#highlights" className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
              <MdStarPurple500 className="text-accentYellow" /> Highlights
            </a>
          </li>
        
        </ul>
      </div>

      {/* Right side: Contact + Buy Tickets for Desktop */}
      <div className="hidden md:flex items-center gap-3">
        <a href="/#contact" className="border-2 flex items-center gap-1 border-accentYellow px-3 py-1 rounded-lg hover:bg-accentYellowDark text-white">
          <MdPhoneInTalk /> Contact
        </a>
        <a href="/tickets" className="border-2 border-accentYellow px-3 py-1 rounded-lg bg-accentYellow hover:bg-accentYellowDark text-white">
          Buy Tickets
        </a>
      </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden flex items-center gap-3">
        <button onClick={toggleSidebar}>
          <RxHamburgerMenu className="text-4xl" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-primaryBlue text-white transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col items-center text-center">
          <button onClick={toggleSidebar}>
            <IoMdClose className="text-5xl mb-3 mt-5" />
          </button>
          <ul className="flex flex-col gap-6">
            <li>
              <a href="/about" onClick={toggleSidebar} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
                <TiInfoLarge /> About
              </a>
            </li>
            
            <li>
              <a href="/#join" onClick={toggleSidebar} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
                <FaUserPlus /> Join Us
              </a>
            </li>
            <li>
              <a href="/#event" onClick={toggleSidebar} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
                <FaRegCalendarAlt /> Event
              </a>
            </li>
            <li>
              <a href="/#highlights" onClick={toggleSidebar} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
                <MdStarPurple500 /> Highlights
              </a>
            </li>
            <li>
              <a href="/#contact" onClick={toggleSidebar} className="flex items-center gap-1 hover:underline hover:decoration-accentYellow">
                <MdPhoneInTalk /> Contact
              </a>
            </li>
            <li>
              <a href="/tickets" onClick={toggleSidebar} className="flex items-center gap-1 border-2 border-accentYellow px-3 py-1 rounded-lg bg-accentYellow hover:bg-accentYellowDark text-white">
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
