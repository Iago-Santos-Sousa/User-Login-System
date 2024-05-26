import React from "react";

import userLogo from "../assets/user-check-icon.svg";

const Header = () => {
  return (
    <div className="w-full bg-prymaryBlue py-4 flex justify-between items-center px-8">
      <div className="logo-img w-[80px] h-[80px]">
        <img src={userLogo} alt="user-logo" className="w-full h-full" />
      </div>

      <nav className="navbar">
        <div>
          <ul className="flex gap-6 text-white">
            <li className="">
              <a href="">Home</a>
            </li>
            <li className="">
              <a href="">Details</a>
            </li>
            <li className="">
              <a href="">Log out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
