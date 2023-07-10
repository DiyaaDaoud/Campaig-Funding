import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
  useRoutes,
} from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${isActive && isActive === name && "bg-[#2c2f32]"} ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt=""
      className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
    ></img>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const current = useLocation();
  const [isActive, setIsActive] = useState("dashboard");
  useEffect(() => {
    navlinks.map((link) => {
      if (current.pathname === link.link && !link.disabled)
        setIsActive(link.name);
    });
  }, [current]);
  return (
    <div className="flex justify-between flex-col items-center sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] mt-12 py-4">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((navlink, index) => (
            <Icon
              key={index}
              {...navlink}
              isActive={isActive}
              handleClick={() => {
                if (!navlink.disabled) {
                  setIsActive(navlink.name);
                  navigate(navlink.link);
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
