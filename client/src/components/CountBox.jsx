import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col  items-center w-[150px]">
      <div className="items-center justify-center bg-[#1c1c24] rounded-t-[12px] w-full text-center">
        <h4 className="text-white font-bold text-[30px] p-3">{value}</h4>
      </div>
      <div className="items-center justify-center bg-[#28282e] rounded-b-[12px] w-full text-center ">
        <p className="font-normal text-[16px] text-[#808191]  px-3 py-2">
          {title}
        </p>
      </div>
    </div>
  );
};

export default CountBox;
