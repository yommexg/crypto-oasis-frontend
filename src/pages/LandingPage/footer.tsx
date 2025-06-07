import React from "react";
import { SiOpensea } from "react-icons/si";
import { FaDiscord, FaTwitter } from "react-icons/fa";

import icon from "../../assets/icon.png";

const Footer: React.FC = () => {
  return (
    <section className="flex flex-col items-center bg-[#15151B] py-4 px-6">
      <div className="md:w-[700px] lg:w-[850px]">
        <div className="flex justify-between items-center py-4">
          <div className="w-24 md:w-28">
            <img
              src={icon}
              alt="Crypto Oasis"
              className="w-full h-full"
            />
          </div>
          <div className="flex gap-3">
            <SiOpensea
              size={24}
              color="#9CA3AF"
              className="cursor-pointer"
            />
            <FaDiscord
              size={24}
              color="#9CA3AF"
              className="cursor-pointer"
            />
            <FaTwitter
              size={24}
              color="#9CA3AF"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="border-t border-b border-[#292929] flex flex-col gap-6 md:flex-row justify-between items-center pt-2 pb-8">
          <div className="md:max-w-[300px] flex flex-col items-center md:items-baseline">
            <h2 className="text-[#DCDCDC] md:text-lg font-semibold">
              About Crypto Oasis
            </h2>
            <p className="text-[#A6A6A6] text-[9px] md:text-xs my-2 text-center md:text-left">
              Crypto Oasis is a multigaming platform for NFT communities to come
              together, compete, and have fun.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod .
            </p>
            <button
              className="mt-4 py-3 px-5 md:py-3 md:px-10 bg-[#30B943] rounded-md shadow-[#30B943] hover:shadow hover:opacity-70
        transition-shadow duration-300 font-semibold text-white text-[9px] md:text-xs cursor-pointer">
              GET STARTED
            </button>
          </div>
          <div className="flex gap-12 md:gap-16 lg:gap-20">
            <div>
              <h3 className="text-xs md:text-sm font-semibold mb-2">
                Section01
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                About
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                Roadmap
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                Team
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4]">FAQ</p>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-semibold mb-2">
                Section02
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                $CCCoin
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                Game Pass
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4]">NFT</p>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-semibold mb-2">Games</h3>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                Poker
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                Bingo
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4] mb-2">
                Skribbl
              </p>
              <p className="text-[9px] md:text-[11px] text-[#A4A6A4]">Agar</p>
            </div>
          </div>
        </div>
        <div className="py-3 px-2 flex flex-col items-center gap-1 md:flex-row justify-between text-[#A6A6A6] text-[10px] md:text-xs">
          <p>© 2022 Crypto Oasis. All rights reserved.</p>
          <p>Term of Service | Privacy Policy</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
