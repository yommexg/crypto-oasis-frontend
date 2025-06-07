import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import discordImg from "../../assets/landing/discord.png";

const faqArray = [
  {
    question: "Do I need an NFT Access Card to play?",
    answer:
      'The $BANANA can be claimed under the tab "My Kongz". Every Kong migration lets you claim a 300 $BANANA airdrop. If you own more than one Kong, migrate all first, so you can claim all $BANANA at once and save on gas fees. Click "CLAIM" and a transaction will pop up in Metamask that needs to be confirmed. Make sure to not cheap out on gas and do not spam the "CLAIM" button! Migrated CyberKongz each yield 10 $BANANA per day that can be claimed at any time.',
  },
  {
    question: "What is a gas fee?",
    answer:
      "A gas fee is a transaction fee paid to blockchain validators to process and confirm operations like minting NFTs, trading, or interacting with smart contracts. The cost depends on network demand and blockchain type (e.g., Ethereum usually has higher fees than Layer 2s or alternatives like Solana).",
  },
  {
    question: "What wallet should I use?",
    answer:
      "The most popular wallet for Web3 and NFTs is MetaMask, which works as a browser extension and mobile app. Other options include Coinbase Wallet, WalletConnect-compatible wallets, and hardware wallets like Ledger for extra security.",
  },
  {
    question: "What happens if I lose my wallet seed phrase?",
    answer:
      "If you lose your seed phrase, you permanently lose access to your wallet and all the assets inside it. No one—not even wallet providers—can recover it for you. Always back it up offline and store it securely in multiple places.",
  },
  {
    question: "What is minting an NFT?",
    answer:
      "Minting an NFT means creating a new digital asset on the blockchain. It involves uploading the asset’s metadata to the blockchain and paying a gas fee. Once minted, the NFT is stored in your wallet and visible on platforms like OpenSea or Magic Eden.",
  },
  {
    question: "Is it safe to click links on Discord or Twitter?",
    answer:
      "No, you should be very cautious. Scammers often use fake links to trick users into connecting their wallet and approving malicious transactions. Only click links from official, verified sources. Always double-check the URL.",
  },
  {
    question: "Can I transfer my NFT to another wallet?",
    answer:
      "Yes, NFTs can be transferred between wallets using your wallet interface or through marketplaces like OpenSea. You’ll need to pay a gas fee for the transaction. Always double-check the destination wallet address before confirming.",
  },
  {
    question: "What is staking in Web3?",
    answer:
      "Staking is locking your tokens or NFTs in a smart contract to earn rewards, such as additional tokens, access to features, or voting power in a DAO. It's often used to incentivize long-term holding and participation in the ecosystem.",
  },
  {
    question: "What is the difference between Ethereum and Polygon?",
    answer:
      "Ethereum is the main Layer 1 blockchain known for security and decentralization, but it's often expensive. Polygon is a Layer 2 scaling solution for Ethereum that offers faster and cheaper transactions while still using Ethereum's security model.",
  },
  {
    question: "Why is my NFT not showing in my wallet?",
    answer:
      "There could be a few reasons: (1) Your wallet may not support that blockchain or NFT standard, (2) metadata hasn't fully loaded yet, or (3) it's simply not displayed by default. Try checking on a blockchain explorer or NFT marketplace using your wallet address.",
  },
  {
    question: "How do I know if a project is legit?",
    answer:
      "Do your own research (DYOR): Check the team’s transparency, the project’s roadmap, community activity, smart contract audits, and whether the project has real use cases. Avoid FOMO and be cautious of projects with unrealistic promises or anonymous teams.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="FAQ"
      className="pt-6 md:pt-16 px-6 md:px-10 flex flex-col items-center mb-16">
      <h1 className="uppercase text-2xl font-bold md:text-3xl text-center mb-8 md:mb-4 text-[#CCE919]">
        faq
      </h1>
      <div className="md:mt-6">
        {faqArray.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={item.question + index}
              onClick={() => toggleAnswer(index)}
              className={`bg-[#17161B] mb-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 lg:w-[850px] ${
                isActive ? "border border-[#CCE919] bg-[#1F1F26]" : ""
              }`}>
              <div className="flex items-center justify-between">
                <h3
                  className={`font-semibold text-xs md:text-base transition-colors ${
                    isActive ? "text-[#CCE919]" : "text-white"
                  }`}>
                  {item.question}
                </h3>
                {isActive ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </div>

              {isActive && (
                <p className="mt-2 text-[9px] md:text-xs mb-6 text-[#A6A6A6] leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#3F3F3F] mt-20 pt-8">
        <div className="bg-[#CCE919] text-black py-5 px-6 rounded-lg flex flex-col gap-6 md:flex-row items-center justify-between lg:w-[850px]">
          <div className="md:w-[450px] mr-16">
            <div className="w-28 mb-2">
              <img
                src={discordImg}
                alt="Discord"
                className="w-full h-full"
              />
            </div>
            <p className="font-bold text-lg md:text-2xl lg:text-3xl mb-3">
              Be part of the community
            </p>
            <p className="text-[10px] md:text-xs lg:text-sm">
              $BANANA can be claimed under the tab "My Kongz". Every Kong
              migration lets you claim a 300 $BANANA airdrop.
            </p>
          </div>
          <button className="bg-black font-extrabold text-white text-[10px] md:text-xs lg:text-sm text-center rounded-md px-5 py-3 cursor-pointer">
            Join Discord Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
