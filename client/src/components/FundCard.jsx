import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";
import { useStateContext } from "../context";
const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  const { address } = useStateContext();
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt=""
        className="w-full h-[200px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-semibold text-[16px] text-white text-left leading-[20px] truncate">
            {title}
          </h3>
          <p className="font-normal text-[12px] text-[#808191] text-left leading-[18px] truncate mt-[5px]">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-normal text-[12px] text-[#808191] leading-[18px] sm:max-w-[120px] truncate">
              Raised of {target} ETH
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-normal text-[12px] text-[#808191] leading-[18px] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[12px] mt-[20px]">
          <div className="h-[30px] w-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className=" h-1/2 w-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-normal text-[12px] text-[#808191] truncate ">
            by{"  "}
            <span className="pl-2 text-[#b2b3bd] ">
              {address ? (owner === address ? " You" : owner) : owner}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
