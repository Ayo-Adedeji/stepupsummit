import React, { useState } from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
   


const Navbar = () => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


  return (
    <nav className="bg-primaryBlue text-[#ffffff] p-3 flex justify-between items-center font-semibold text-lg shadow-lg">
      <div>
        <img className="w-14 " src={StepUPLogo} alt="sus-logo" />
        
      </div>
      

      {/* Sidebar */}
      <div className= {`md:hidden  fixed top-0 left-0 h-full w-64 bg-primaryBlue text-white transform transition-transform duration-300 z-50 ${
     isSidebarOpen ? 'translate-x-0' : '-translate-x-full '}`} >

         <div className="flex flex-col">
             <button onClick={toggleSidebar}>
        <IoMdClose />
        </button>
        <ul className=" flex flex-col gap-6  ">
          <li className="hover:cursor-pointer hover:underline hover:decoration-accentYellow ">
            About
          </li>
          <li className="hover:cursor-pointer hover:underline hover:decoration-accentYellow ">
            Join Us
          </li>
          <li className="hover:cursor-pointer hover:underline hover:decoration-accentYellow ">
            Highlights
          </li>
        </ul>
      </div>
     
      </div>

      <div>
        <ul className="hidden md:flex flex-row gap-6  ">
          <li className="hover:cursor-pointer hover:underline hover:decoration-accentYellow ">
            About
          </li>
          <li className="hover:cursor-pointer hover:underline hover:decoration-accentYellow ">
            Join Us
          </li>
          <li className="hover:cursor-pointer hover:underline hover:decoration-accentYellow ">
            Highlights
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <a className="hidden md:block border-2 border-accentYellow px-5 py-3 rounded-lg bg-accentYellow hover:cursor-wait hover:bg-accentYellowDark text-[#ffffff]">
          Buy Ticket
        </a>
        <button onClick={toggleSidebar}>
      <RxHamburgerMenu className="md:hidden text-4xl " />
      </button>
      </div>
      
    </nav>
  );
};

export default Navbar;
