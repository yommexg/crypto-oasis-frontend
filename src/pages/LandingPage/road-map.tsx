import React from "react";

const roadMapArray = [
  {
    id: "01",
    title: "Beta",
    date: "Q2 2023",
    desc: [
      "Beta will be a soft launch between 2-3 select communities to test the yommexgenesis.io site.",
    ],
  },

  {
    id: "02",
    title: "Launch",
    date: "Q2 2023",
    desc: [
      "Discord is open for all (will be closed once NFT launches and only holders will remain)",
      "yommexgenesis.io will officially launched for all communities in the space.",
      "They’ll be able to play b1. Within their community or 2. Community vs community.",
      "Branding capabilities",
    ],
  },

  {
    id: "03",
    title: "nft",
    date: "Q2 2023",
    desc: [
      "The NFT is a Membership Pass only. NO PFP style.",
      "3 types of rarity. Common Pass / Rare Pass / Ultra Rare Pass",
    ],
  },

  {
    id: "04",
    title: "$CCCoin AIRDROP",
    date: "Q3 2023",
    desc: [
      "Membership passes will be “staked” to earn $CCCoin",
      "$CCCoin can be used within the gaming ecosystem as either prizes, to play certain games (blackjack, slots, etc)",
    ],
  },

  {
    id: "05",
    title: "nft",
    date: "Q2 2023",
    desc: [
      "This will be a “shop” on the yommexgenesis.io website.",
      "The shop will be populated with:",
      "Items/NFTs bought with secondary sales from the NFTs.",
      "WL spots provided by communities",
      "Merchandise (provided by communities or merch)",
    ],
  },
];

const RoadMap: React.FC = () => {
  return (
    <section
      className="pt-14 md:pt-10 px-6 md:px-10"
      id="Roadmap">
      <h1 className="uppercase text-2xl font-bold md:text-3xl text-center mb-8 md:mb-14">
        Roadmap
      </h1>
      <div className="px-4 md:px-20">
        {roadMapArray.map((item) => {
          return (
            <div
              key={item.id}
              className="border-b border-t lg:h-[200px] border-[#292929] flex justify-between py-2 pb-6">
              <div className="flex flex-row md:gap-8 lg:gap-28">
                <h1 className="text-lg md:text-4xl lg:text-8xl font-chakra-petch font-bold w-10 lg:w-20 text-[#CCE919]">
                  {item.id}
                </h1>
                <div>
                  <h3 className="w-20 md:w-full text-[10px] md:text-lg lg:text-xl uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[9px] md:text-xs text-[#A4A6A4]">
                    {item.date}
                  </p>
                </div>
              </div>
              <div className="w-[150px] md:w-[250px] lg:w-[350px] text-[8px] md:text-sm text-[#A6A6A6]">
                {item.desc.map((des) => {
                  let modifiedText = des;

                  if (item.id === "03") {
                    modifiedText = modifiedText
                      .replace(
                        "Common Pass",
                        `<span class='text-[#CCE919] font-semibold'>Common Pass</span>`
                      )
                      .replace(
                        "Rare Pass",
                        `<span class='text-orange-400 font-semibold'>Rare Pass</span>`
                      )
                      .replace(
                        "Ultra Rare Pass",
                        `<span class='text-red-600 font-semibold'>Ultra Rare Pass</span>`
                      );
                  }

                  if (item.id === "04") {
                    modifiedText = modifiedText.replace(
                      /\$CCCoin/g,
                      `<strong class='font-extrabold'>$CCCoin</strong>`
                    );
                  }

                  if (item.id === "05") {
                    modifiedText = modifiedText.replace(
                      /([“"'])shop([”"'])/gi,
                      `<strong class='font-extrabold'>$1shop$2</strong>`
                    );
                  }

                  return (
                    <li
                      key={des}
                      className="mb-1"
                      dangerouslySetInnerHTML={{ __html: modifiedText }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RoadMap;
