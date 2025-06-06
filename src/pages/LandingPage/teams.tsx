import React from "react";

import dont from "../../assets/landing/teams/dont.png";
import gath from "../../assets/landing/teams/gath.png";
import nikk from "../../assets/landing/teams/nikk.png";
import pro from "../../assets/landing/teams/pro.png";
import stam from "../../assets/landing/teams/stam.png";
import thecupcake from "../../assets/landing/teams/thecupcake.png";

const teamArray = [
  {
    name: "nikkic",
    role: "Co-Founder",
    img: nikk,
  },
  {
    name: "TheCUPCAKE",
    role: "Co-Founder",
    img: thecupcake,
  },
  {
    name: "Gartherly",
    role: "Co-Founder",
    img: gath,
  },
  {
    name: "Stamenix",
    role: "Designer",
    img: stam,
  },
  {
    name: "Dontfeedthewolf",
    role: "Jack of all Trades",
    img: dont,
  },
  {
    name: "TifeBadass",
    role: "Developer",
    img: pro,
  },
];

const Teams: React.FC = () => {
  return (
    <section
      className="bg-[#15151B] pt-6 md:pt-14 px-6 md:px-10 pb-10 md:pb-24"
      id="Team">
      <div className="flex flex-col items-center">
        <h1 className="uppercase text-xl font-bold md:text-3xl text-center mb-2 md:mb-4">
          Meet the team
        </h1>
        <p className="text-[#A6A6A6] text-[9px] md:text-sm leading-relaxed text-center md:w-[500px]">
          Crypto Oasis is a multigaming platform for NFT communities to come
          together, compete, and have fun.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 mt-10">
        {teamArray.map((mem, index) => (
          <div
            key={mem.name + index}
            className="flex flex-col items-center text-center">
            <div className="w-24 md:w-32 lg:w-44 mb-4">
              <img
                src={mem.img}
                alt={mem.name}
                className="w-full h-full rounded-full"
              />
            </div>
            <h2 className="text-[#CCE919] uppercase font-bold text-[10px] md:text-lg">
              {mem.name}
            </h2>
            <p className="text-[8px] md:text-xs">{mem.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teams;
