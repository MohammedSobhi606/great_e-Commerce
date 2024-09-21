import React from "react";
import { assets } from "../assets/assets";
import { useDispatch } from "react-redux";
import { setToken } from "../Store/States";
function Navbar() {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center mt-1 px-2 py-3">
      <div className="logo cursor-pointer  w-20 md:w-32  ">
        {" "}
        <img src={assets.logo} alt="" />
      </div>
      <button
        onClick={() => dispatch(setToken(""))}
        className="rounded-full px-5 py-1 bg-slate-500 text-lg text-white"
      >
        logout
      </button>
    </div>
  );
}

export default Navbar;
