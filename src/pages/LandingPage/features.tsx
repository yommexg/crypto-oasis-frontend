import React from "react";

import featureImg1 from "../../assets/landing/feature1.png";
import featureImg2 from "../../assets/landing/feature2.jpg";
import { useNavigate } from "react-router-dom";

const featureArray = [
  {
    img: featureImg1,
    title1: "Make your game ",
    title2: "unique!",
    desc: "Yommex Genesis is a multigaming platform for NFT communities to come together, compete, and have fun.",
  },
  {
    img: featureImg2,
    title1: "Tournaments for ",
    title2: "everyone!",
    desc: "Whatever your objective, our tournaments are created for you to enjoy and progress in, no matter your skill or experience.",
  },
];

const Features: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="Features"
      className="pt-6 md:pt-10 px-6 md:px-10">
      <h1 className="uppercase text-2xl font-bold md:text-3xl text-center mb-8 md:mb-4">
        Features
      </h1>
      <div className="">
        {featureArray.map((item, index) => (
          <div
            key={item.title1}
            className={`flex flex-col-reverse md:flex-row items-center justify-center md:gap-20 mb-12 md:mb-8 ${
              index === 1 ? "md:flex-row-reverse" : ""
            }`}>
            <div className="md:w-[450px]">
              <img
                src={item.img}
                alt={item.title1}
                className="w-full h-full"
              />
            </div>
            <div className="md:w-[250px]">
              <h2
                className={`font-bold text-xl  md:text-3xl ${
                  index === 1 ? "text-right md:text-left" : ""
                }`}>
                {item.title1}
                <span className="text-[#CCE919]">{item.title2}</span>
              </h2>
              <p
                className={`text-[10px] md:text-sm text-[#A6A6A6] my-2 md:my-4 ${
                  index === 1 ? "text-right md:text-left" : ""
                }`}>
                {item.desc}
              </p>

              <button
                onClick={() => navigate("/login")}
                className="hidden md:block px-4 py-3 bg-[#30B943] rounded-md shadow-lg shadow-[#30B943] hover:shadow hover:opacity-70 transition-shadow duration-300 font-semibold text-white text-xs cursor-pointer">
                GET STARTED
              </button>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate("/login")}
            className="md:hidden px-6 py-3 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:shadow-lg hover:opacity-70
        transition-shadow duration-300 font-semibold text-white text-[9px] cursor-pointer">
            GET STARTED
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
