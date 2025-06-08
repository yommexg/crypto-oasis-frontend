import { useEffect, useState } from "react";

import icon from "../../assets/icon.png";
import { LuUserRound } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const sectionsArray = ["Who we are", "Features", "Roadmap", "Team", "FAQ"];

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Who we are");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = 110;
      let found = false;

      for (let i = sectionsArray.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionsArray[i]);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top < offset) {
            setActiveTab(sectionsArray[i]);
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setActiveTab(sectionsArray[0]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Who we are") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(tab);
      if (section) {
        const yOffset = -100;
        const y =
          section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex justify-between items-center fixed top-0 z-40 left-0 right-0 p-4 bg-[#0e0e13] shadow-md">
      <div className="flex items-center md:gap-8 lg:gap-12">
        <div className="w-24 md:w-32">
          <img
            src={icon}
            className="w-full h-full"
          />
        </div>
        <div className="hidden md:flex flex-wrap justify-center gap-y-2 items-center gap-x-6 lg:gap-x-10 font-semibold text-sm lg:text-base">
          {sectionsArray.map((tab) => (
            <div
              key={tab}
              onClick={() => scrollToSection(tab)}
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
          onClick={() => navigate("/login")}
        />
        {/* <PiWalletFill
          size={40}
          color="#8A939B"
          className="bg-[#262831] p-2 rounded-full cursor-pointer"
        /> */}
      </div>
    </div>
  );
};

export default Header;
