import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  const fetchYourCamapigns = async () => {
    if (contract) {
      setIsLoading(true);
      const data = await getCampaigns();
      if (data) {
        const yourCampaigns = data.filter(
          (campaign) => campaign.owner === address
        );

        setCampaigns(yourCampaigns);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchYourCamapigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
