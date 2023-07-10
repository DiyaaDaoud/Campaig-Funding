import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  const fetchCamapigns = async () => {
    if (contract) {
      setIsLoading(true);
      const data = await getCampaigns();
      if (data) setCampaigns(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCamapigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
