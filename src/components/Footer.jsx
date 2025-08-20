import React from "react";
import StepUPLogo from "../assets/StepUPLogo.png";

const Footer = () => {
  return (
    <footer className=" bg-accentDarkBlue bg-[50vh]">
      <div className="w-[80%] mx-auto sm:p-4 p-10 items-center flex flex-col sm:flex-row lg:flex-row justify-between">
        <div>
          <img src={StepUPLogo} alt="suslogo" className="w-32 h-32" />
        </div>

        <div className="flex gap-10 md:gap-20 text-[#ffffff] sm:flex-row sm:gap-6 lg:gap-36  lg:flex-row">
          <div>
            {/* <h1 className="">#stepupsummit2025</h1> */}
            <h1 className="text-lg mb-5 mt-6">About Us</h1>
            <ul className="space-y-1">
              <li>Mission</li>
              <li>Theme</li>
              <li>Newsletter</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg mb-5 mt-6">Support</h1>
            <ul className="space-y-1">
              <li>Contact</li>
              <li>Refund Policy</li>
              <li>Partners</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg mb-5 mt-6">Social</h1>
            <ul className="space-y-1">
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-t-white w-[85%] mx-auto flex flex-col sm:flex-row justify-center items-center sm:gap-28 text-[#ffffff]  ">
        <p className="mt-5 mb-5">Copyright Stepupsummit</p>
        <p className="mt-5 mb-5">designed by CodeOfSolomon</p>
        <p className="mt-5 mb-5">#stepupsummit2025</p>
      </div>
    </footer>
  );
};

export default Footer;
