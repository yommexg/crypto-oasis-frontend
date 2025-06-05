import { useState } from "react";

import icon from "../../assets/icon.png";
import { LuUserRound } from "react-icons/lu";
import { PiWalletFill } from "react-icons/pi";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Who we are");

  return (
    <div className="flex justify-between items-center fixed top-0 z-40 left-0 right-0 p-4 bg-[#0e0e13] shadow-md">
      <div className="flex items-center gap-12">
        <div className="w-24 md:w-32">
          <img
            src={icon}
            className="w-full h-full"
          />
        </div>
        <div className="hidden md:flex flex-wrap justify-center gap-y-2 items-center gap-x-6 lg:gap-x-10 font-semibold">
          {["Who we are", "Features", "Roadmap", "Team", "FAQ"].map((tab) => (
            <div
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "Who we are") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  const section = document.getElementById(tab);
                  if (section) {
                    const yOffset = -100;
                    const y =
                      section.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }
              }}
              className={`cursor-pointer pb-2 ${
                activeTab === tab
                  ? "border-b-3 border-[#CCE919] "
                  : "text-[#A4A6A4]"
              }`}>
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <LuUserRound
          size={40}
          color="#8A939B"
          className="bg-[#262831] p-2 rounded-full cursor-pointer"
        />
        <PiWalletFill
          size={40}
          color="#8A939B"
          className="bg-[#262831] p-2 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
