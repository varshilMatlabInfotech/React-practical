import React from "react";
import { IoMdBookmark } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="py-10 w-full h-[7vh] flex justify-center text-xs">
      <div className="bg-gray-800 h-[7vh] w-fit rounded-xl p-1 gap-1 flex justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex justify-center items-center gap-1 rounded-xl p-2 px-3 ${
              isActive ? "bg-gray-600" : "bg-gray-900 text-gray-400"
            }`
          }
        >
          <IoListSharp /> Users
        </NavLink>
        <NavLink
          to="/bookmarked"
          className={({ isActive }) =>
            `flex justify-center items-center gap-1 rounded-xl p-2 px-3 ${
              isActive ? "bg-gray-600" : "bg-gray-900 text-gray-400"
            }`
          }
        >
          <IoMdBookmark /> Bookmarked Users
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
