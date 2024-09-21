import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="inline-flex gap-2 items-center mb-3 uppercase">
      <h1 className="text-gray-500 ">
        {text1} <span className="text-gray-700 font-medium">{text2}</span>{" "}
      </h1>

      <p className="w-8 md:w-11 h-0.5 bg-zinc-700 "></p>

      <hr />
      <br />
    </div>
  );
}

export default Title;
