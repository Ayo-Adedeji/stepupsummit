import React, { useState } from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";
import { MdPhoneInTalk, MdStarPurple500 } from "react-icons/md";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-primaryBlue text-white px-6 py-3 flex items-center justify-between font-semibold text-lg shadow-lg">
      <div className="flex items-center">
        <img className="w-16" src={StepUPLogo} alt="sus-logo" />
      </div>

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
            <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
              <TiInfoLarge /> About
            </li>
            <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
              <FaUserPlus /> Join Us
            </li>
            <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
              <FaRegCalendarAlt /> Event
            </li>
            <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
              <MdStarPurple500 /> Highlights
            </li>
            <a className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
              <MdPhoneInTalk /> Contact
            </a>
          </ul>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <ul className="flex flex-row gap-6">
          <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
            <TiInfoLarge className="text-accentYellow" /> About
          </li>
          <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
            <FaUserPlus className="text-accentYellow" /> Join Us
          </li>
          <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
            <FaRegCalendarAlt className="text-accentYellow" /> Event
          </li>
          <li className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-accentYellow">
            <MdStarPurple500 className="text-accentYellow" /> Highlights
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <a className="hidden md:block border-2 md:flex items-center gap-1 border-accentYellow px-3 py-1 rounded-lg hover:cursor-pointer hover:bg-accentYellowDark text-white">
          <MdPhoneInTalk /> Contact
        </a>
        <a className="hidden md:block border-2 border-accentYellow px-3 py-1 rounded-lg bg-accentYellow hover:cursor-pointer hover:bg-accentYellowDark text-white">
          Buy Ticket
        </a>
        <button onClick={toggleSidebar}>
          <RxHamburgerMenu className="md:hidden text-4xl" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
