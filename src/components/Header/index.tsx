import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

import { FaArrowLeft } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import { useActiveAccount } from "thirdweb/react";

import icon from "../../assets/logo.png";
import noProfile from "../../assets/no-profile.png";
import { useUser } from "../../store";
import HeaderWalletConnect from "./wallet-connect";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  const account = useActiveAccount();
  const { user } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateGameClick = () => {
    navigate("/create-game", {
      state: { background: location },
    });
  };

  return (
    <nav className="flex justify-between items-center fixed top-0 z-40 gap-[50px] lg:gap-32 left-0 right-0 p-4 bg-[#0e0e13] shadow-md">
      {!mobileSearchVisible && account?.address && (
        <div className="absolute right-2 -bottom-6 md:-bottom-4 bg-[#30B943] px-2 md:px-4 py-1 rounded-md font-bold text-[10px] md:text-xs">
          {`${account?.address.slice(0, 6)}...${account?.address.slice(-6)}`}
        </div>
      )}
      <div className="flex items-center gap-4">
        <FiMenu
          size={24}
          className="md:hidden text-white cursor-pointer"
          onClick={onMenuClick}
        />
        <div className="w-10 md:w-14">
          <img
            src={icon}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="hidden md:block w-full max-w-1/2  relative">
        <input
          type="text"
          placeholder="Search..."
          className=" w-full rounded-md border-[#34343F] bg-[#19191E] px-4 py-3 text-[10px] md:text-sm text-white focus:border focus:border-gray-600 focus:outline-none"
        />
        <CiSearch className="text-white absolute text-lg right-4 top-3" />
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="md:hidden">
          <CiSearch
            size={22}
            color="#ffffff"
            className="cursor-pointer"
            onClick={() => setMobileSearchVisible((prev) => !prev)}
          />
        </div>

        {account?.address && (
          <div
            onClick={handleCreateGameClick}
            className="flex items-center gap-2 bg-[#30B9B1] px-2 md:px-4 cursor-pointer py-1 md:py-[6px] 
            rounded-sm md:rounded-full hover:opacity-70 font-semibold md:w-[160px]">
            <IoCreateOutline className="text-xl" />
            <p className="text-xs hidden md:block">Create a game</p>
          </div>
        )}

        <div className="flex items-center bg-[#262831] pr-[2px] py-[2px] gap-[2px] rounded-full cursor-pointer">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full">
            <img
              src={user?.avatarUrl ? user?.avatarUrl : noProfile}
              className="w-full h-full rounded-full"
            />
          </div>
          <MdOutlineKeyboardArrowDown className="text-sm" />
        </div>

        <HeaderWalletConnect />
      </div>
      <AnimatePresence>
        {mobileSearchVisible && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bg-[#0e0e13] z-50 p-4 flex items-center gap-3">
            <FaArrowLeft
              size={24}
              color="#ffffff"
              className="cursor-pointer"
              onClick={() => setMobileSearchVisible(false)}
            />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border-[#34343F] bg-[#19191E] px-4 py-3 
              text-sm text-white focus:border focus:border-gray-600 focus:outline-none"
            />
            <CiSearch
              size={28}
              color="#ffffff"
              className="cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
