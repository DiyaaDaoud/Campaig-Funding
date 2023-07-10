import React, { useState } from "react";
import { money } from "../assets";
import { checkIfImage } from "../utils";
import { useNavigate } from "react-router-dom";
import { CustomButton, FormField, Loader } from "../components";
import { useStateContext } from "../context";
import { ethers } from "ethers";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldsChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        try {
          await createCampaign({
            ...form,
            target: ethers.utils.parseUnits(form.target, 18),
          });
          setIsLoading(false);
          navigate("/");
        } catch (e) {
          setIsLoading(false);
          navigate("/create-campaign");
          console.log(e);
        }
      } else {
        alert("Provide valid Image url!");
        setForm({ ...form, image: "" });
      }
    });
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 ">
      {isLoading && <Loader />}
      <div className="flex items-center justify-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => {
              handleFormFieldsChange("name", e);
            }}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => {
              handleFormFieldsChange("title", e);
            }}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write Your Story"
          isTextArea
          value={form.description}
          handleChange={(e) => {
            handleFormFieldsChange("description", e);
          }}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="monry"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.5"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldsChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldsChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Cmapign Image *"
          placeholder="Place image url of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldsChange("image", e)}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit New Campaign"
            styles="bg-[#1bc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
