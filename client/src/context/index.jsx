import { createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xafAff1fE4162b2128c8cfe90cbceeB7c4c432EEb"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const getCampaigns = async () => {
    try {
      const data = await contract.call("getCampaigns");
      if (data.length > 0) {
        const parsedCampaigns = data.map((campaign, index) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: index,
        }));
        return parsedCampaigns;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId.toString(), {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (id) => {
    try {
      const donations = await contract.call("getDonators", [id]);
      const numOfDonations = donations[0].length;
      const parsedDonations = [];
      for (let i = 0; i < numOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donationAmount: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }
      return parsedDonations;
    } catch (e) {
      console.log(e);
    }
  };

  const getUserCampaigns = async (address) => {
    const data = await getCampaigns();
    if (data) {
      const userCampaigns = data.filter(
        (campaign) => campaign.owner === address
      );
      return userCampaigns;
    }
  };
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        createCampaign: publishCampaign,
        connect,
        getCampaigns,
        getDonations,
        donate,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
