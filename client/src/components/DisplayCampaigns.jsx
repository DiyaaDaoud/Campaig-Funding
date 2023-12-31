import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-semibold text-[18px] text-white text-left">
        {title} {!isLoading && <span>({campaigns.length})</span>}
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            className="w-[100px] h-[100px] object-contain"
            src={loader}
            alt=""
          ></img>
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-semibold text-[14px] leading-[30px] text-[#818183]">
            There are no Campaigns for now!
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
