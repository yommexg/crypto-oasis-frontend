import React from "react";

import mock from "../../assets/landing/mock.png";

const WhoWeAre: React.FC = () => {
  return (
    <section className="relative pt-28 md:pt-16 overflow-hidden">
      {/* Hero Section */}
      <div className="px-4 md:pt-14 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight animate-fade-in-up">
          MultiGaming Platform for <br />
          <span className="text-[#CCE919]">NFT Communities</span>
        </h1>
        <p className="mt-4 text-[#A6A6A6] max-w-lg mx-auto text-xs md:text-base">
          Crypto Oasis is a multigaming platform for NFT communities to come
          together, compete, and have fun.
        </p>
        <button
          className="mt-6 py-3 px-5 md:py-4 md:px-10 bg-[#30B943] rounded-md shadow-lg shadow-[#30B943] hover:shadow hover:opacity-70
        transition-shadow duration-300 font-semibold text-white text-[9px] md:text-sm cursor-pointer">
          GET STARTED
        </button>
      </div>

      <div className="mt-6">
        <img
          src={mock}
          className="w-full h-full"
        />
      </div>

      <div className="bg-[#202029] py-10 md:py-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg md:text-2xl font-bold mb-4">WHO WE ARE</h2>
          <p className="text-[#9FA0AF] text-[9px] md:text-base leading-relaxed">
            Crypto Oasis is a{" "}
            <span className="font-extrabold">
              multigaming platform for NFT communities
            </span>{" "}
            to come together, compete, and have fun. A big driving factor at
            Crypto Oasis is to help projects in the NFT space by providing
            marketing and exposure through{" "}
            <span className="font-extrabold">branded games</span>,{" "}
            <span className="font-extrabold">collabing tournament style</span>,
            and bringing back added value to everyone with the{" "}
            <span className="font-extrabold">$CCCoin</span> and access to The
            Lab.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
