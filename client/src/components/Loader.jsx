import React from "react";

import { loader } from "../assets";
const Loader = () => {
  return (
    <div className="fixed z-10 inset-0 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img src={loader} alt="" className="h-[100px] w-[100px] object-contain" />
      <p className="mt-[20px] font-bold text-[20px] text-center text-white">
        Transaction in Progress <br /> Please Wait ...
      </p>
    </div>
  );
};

export default Loader;
