import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setShowbar, setToken } from "../Store/States";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function Navbar() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartCount, token } = useSelector((state) => state.states);
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={`/`}>
        {" "}
        <img src={assets.logo} alt="logo" className="w-32" />
      </Link>
      {/* ----------- */}
      <ul className="hidden sm:flex sm:gap-5 text-sm text-gray-600">
        <NavLink to="/" className="flex flex-col gap-1 items-center ">
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? "font-bold ease-in-out border-b-2 border-spacing-1 border-pink-300  duration-100 text-pink-400 uppercase"
                  : ""
              }
            >
              Home
            </p>
          )}
        </NavLink>
        <NavLink to="/collection" className="flex flex-col gap-1 items-center ">
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? "font-bold ease-in-out border-b-2 border-spacing-1 border-pink-300  duration-100 text-pink-400 uppercase"
                  : ""
              }
            >
              Collection
            </p>
          )}
        </NavLink>
        <NavLink to="/about" className="flex flex-col gap-1 items-center ">
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? "font-bold ease-in-out border-b-2 border-spacing-1 border-pink-300  duration-100 text-pink-400 uppercase"
                  : ""
              }
            >
              About
            </p>
          )}
        </NavLink>
        <NavLink to="/contact" className="flex flex-col gap-1 items-center ">
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? "font-bold ease-in-out border-b-2 border-spacing-1 border-pink-300  duration-100 text-pink-400 uppercase"
                  : ""
              }
            >
              Contact
            </p>
          )}
        </NavLink>
      </ul>
      {/* ------------- */}
      <div className="flex gap-6 items-center ">
        <img
          src={assets.search_icon}
          onClick={() => dispatch(setShowbar(true))}
          alt=""
          className="w-6 cursor-pointer"
        />
        <div className="group relative shrink-0 ">
          <Link to={token ? null : "/login"}>
            {" "}
            <img
              src={assets.profile_icon}
              className="w-6 cursor-pointer "
              alt=""
            />
          </Link>
          {token && (
            <div className="hidden absolute right-0 dropdown-menu pt-4  group-hover:block rounded-md ">
              <ul className=" flex py-3 px-6 gap-0 flex-col list-disc   text-gray-500 rounded-md w-36 shadow-md bg-slate-100">
                <li className="cursor-pointer hover:bg-slate-300 rounded-lg px-1 hover:text-black">
                  My Profile
                </li>
                <li
                  onClick={() => {
                    navigate("/orders");
                  }}
                  className="cursor-pointer hover:bg-slate-300 rounded-lg px-1 hover:text-black"
                >
                  Orders
                </li>
                <li
                  onClick={() => {
                    dispatch(setToken(""));
                    navigate("/");
                    toast.warning("logged out");
                  }}
                  className="cursor-pointer hover:bg-slate-300 rounded-lg px-1 hover:text-black"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <span className="absolute -bottom-1 -right-1/2 text-sm text-center text-white font-normal bg-black rounded-full w-5 h-4  leading-4">
            {cartCount}
          </span>
        </Link>
        <img
          src={assets.menu_icon}
          alt=""
          className="w-6 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>
      {/* ---SIDEBAR-phone------- */}
      <div
        className={`absolute top-0 right-0 h-screen bg-white ease-in-out transition-all overflow-hidden ${
          visible ? "w-[80%]" : "w-0"
        }`}
      >
        <div className="flex flex-col gap-4 items-center py-12 px-4">
          <div className="flex gap-2 self-end cursor-pointer ">
            <img src={assets.logo} alt="logo" className="w-32" />

            <img
              onClick={() => setVisible(false)}
              src={assets.dropdown_icon}
              alt=""
              className="w-6 h-6 p-1 cursor-pointer active:translate-x-2 transition-all  bg-zinc-950 rounded-full"
            />
          </div>
          <ul className="flex flex-col gap-3 list-disc text-sm text-gray-600">
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className=" text-center   border-b"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className=" text-center  border-b "
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className=" text-center   border-b"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className=" text-center  border-b "
            >
              Contact
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
