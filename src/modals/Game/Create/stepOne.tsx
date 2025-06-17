import { CiSearch } from "react-icons/ci";
import { useState } from "react";

import pocker from "../../../assets/games/pocker.png";
import bingo from "../../../assets/games/bingo.jpg";
import agar from "../../../assets/games/agar.jpg";

type GameStepOneProps = {
  gameType: string;
  setGameType: (gameType: string) => void;
  setStep: (step: number) => void;
};

const gameTypeArray = [
  {
    type: "pocker",
    img: pocker,
  },
  {
    type: "agar",
    img: agar,
  },
  {
    type: "bingo",
    img: bingo,
  },
  {
    type: "game 04",
    img: pocker,
  },
  {
    type: "game 05",
    img: agar,
  },
  {
    type: "game 06",
    img: bingo,
  },
  {
    type: "game 07",
    img: pocker,
  },
  {
    type: "game 08",
    img: agar,
  },
  {
    type: "game 09",
    img: bingo,
  },
  {
    type: "game 10",
    img: pocker,
  },
];

const CreateGameStepOne: React.FC<GameStepOneProps> = ({
  gameType,
  setGameType,
  setStep,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = gameTypeArray.filter((item) =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-[10px] md:text-sm">Select Game Type</h2>
      <div className="w-full relative my-2">
        <input
          type="text"
          placeholder="Enter game type ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" w-full rounded-lg border-[#34343F] bg-[#19191E] px-4 py-3 text-[10px] md:text-xs
           text-white focus:border focus:border-gray-600 focus:outline-none"
        />
        <CiSearch className="text-white absolute text-lg right-3 top-3" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 w-full max-h-[250px] overflow-y-auto pr-2">
        {filteredGames.length > 0 ? (
          filteredGames.map((item) => (
            <div
              onClick={() => setGameType(item.type)}
              key={item.type}
              className={`cursor-pointer ${
                gameType === item.type ? "border-2 border-[#30B943]" : ""
              }`}>
              <div className="h-[150px]">
                <img
                  src={item.img}
                  alt={item.type}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="capitalize font-semibold text-sm mt-2">
                {item.type}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-400">No games found</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-[10px] md:text-sm italic">
          Selected Game Type:{" "}
          <span className="text-[#30B943] capitalize font-bold">
            {gameType || "None"}
          </span>
        </p>
        <button
          onClick={() => setStep(2)}
          disabled={!gameType}
          className={`px-4 py-[6px] rounded-md shadow font-semibold text-white transition-all duration-300
          ${
            gameType
              ? "bg-[#30B943] shadow-[#30B943] hover:shadow-lg hover:opacity-70 cursor-pointer"
              : "bg-gray-500 shadow-none cursor-not-allowed"
          }`}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateGameStepOne;
