import { useState } from "react";

import icon from "../assets/icon.png";
import { LuUserRound } from "react-icons/lu";
import { PiWalletFill } from "react-icons/pi";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Who we are");

  const user = false;

  return (
    <>
      {!user && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12">
            <div className="w-32">
              <img
                src={icon}
                className="w-full h-full"
              />
            </div>
            <div className="flex items-center gap-10 font-semibold">
              {["Who we are", "Features", "Roadmap", "Team", "FAQ"].map(
                (tab) => (
                  <div
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer pb-3 ${
                      activeTab === tab
                        ? "border-b-3 border-[#CCE919] "
                        : "text-[#A4A6A4]"
                    }`}>
                    {tab}
                  </div>
                )
              )}
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
      )}

      {/* Authenticated Header */}
      {user && <div>Auth User Header</div>}
    </>
  );
};

export default Header;
