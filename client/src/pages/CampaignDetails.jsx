import React, { useEffect, useState } from "react";
import { thirdweb } from "../assets";
import { calculateBarPercentage, daysLeft } from "../utils";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
const CampaignDetails = () => {
  const { state } = useLocation();
  const { address, contract, getDonations, donate, getUserCampaigns } =
    useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [ownerCampignsCount, setOwnerCampignsCount] = useState();
  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    if (state.pId === undefined) return;
    const data = await getDonations(state.pId);
    if (data) {
      setDonators(data);
    }
  };
  const handleDonate = async () => {
    if (state.pId === undefined) return;
    setIsLoading(true);
    await donate(state.pId, amount);
    setIsLoading(false);
  };
  const updateOwnerCampaignsCount = async () => {
    const userCampaigns = await getUserCampaigns(state.owner);
    if (userCampaigns) {
      setOwnerCampignsCount(userCampaigns.length);
    }
  };
  useEffect(() => {
    fetchDonators();
    updateOwnerCampaignsCount();
  }, [contract, address, state]);
  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[50px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total #Donations" value={donators.length} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className=" font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
              <div>
                <h4 className="font-semibold text-[14px] text-white break-all">
                  {address
                    ? address === state.owner
                      ? "You"
                      : state.owner
                    : state.owner}
                </h4>
                <p className="mt-[4px] font-normal text-[12px] text-[#808191]">
                  {ownerCampignsCount} Campaigns
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className=" font-semibold text-[18px] text-white uppercase">
              Story
            </h4>
            <div className="mt-[20px]">
              <p className="mt-[4px] font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>
          <div>
            <h4 className=" font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                      {index + 1}. {item.donator}{" "}
                    </p>
                    <p className="font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                      {item.donationAmount} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p className="mt-[4px] font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet! Be the first one.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          {/* <h4 className=" font-semibold text-[18px] text-white uppercase">
            Fund
          </h4> */}
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH amount"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[50px] outline-none border-[1px] border-[#3a3a43] text-white bg-transparent text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></input>
              <div className="my-[20px] p-4 bg-[#131318] rounded-[10px]">
                <h4 className="font-semibold text-white text-[16px] leading-[22px]">
                  Back it beacuse you believe in it
                </h4>
                <p className=" mt-[20px] font-normal text-[#808191] leading-[22px]">
                  Support the project for no rewards, just because it speaks to
                  you{" "}
                </p>
              </div>
              <CustomButton
                btnType={"button"}
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd] "
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
