import React from "react";
import { assets } from "../assets/assets";
function Hero() {
  return (
    <div className="border border-gray-400 flex flex-col sm:flex-row">
      {/* hero left */}
      <div className="w-full sm:w-1/2 border-gray-400 flex items-center justify-center">
        <div className="text-gray-400">
          <div className="flex items-center gap-2 ">
            <p className="w-8 md:w-11 h-0.5 bg-zinc-700 "></p>
            <p className="uppercase font-medium text-sm md:text-base">
              our bestseller
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-relaxed text-gray-900">
            Latest Arrival
          </h1>
          <div className="flex items-center gap-2 ">
            <p className="uppercase font-medium text-sm md:text-base">
              shop now
            </p>
            <p className="w-8 md:w-11 h-0.5 bg-zinc-700 "></p>
          </div>
        </div>
      </div>
      {/* ero right */}
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
    </div>
  );
}

export default Hero;
