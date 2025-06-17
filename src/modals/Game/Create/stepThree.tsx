import { FaCircle, FaRegCircle } from "react-icons/fa";

type GameStepThreeProps = {
  maxNumOfPlayers: number;
  setMaxNumOfPlayers: (num: number) => void;
  setStep: (step: number) => void;
  gamePrivacy: string;
  setGamePrivacy: (privacy: string) => void;
  playDate: string;
  setPlayDate: (privacy: string) => void;
  spectatorMode: boolean;
  setSpectatorMode: (mode: boolean) => void;
  handleCreateGame: () => void;
};

const numberOfPlayersArray = [10, 20, 50, 100, 200, 500];

const privacyType = ["Public", "Private"];

const CreateGameStepThree: React.FC<GameStepThreeProps> = ({
  maxNumOfPlayers,
  setMaxNumOfPlayers,
  setStep,
  gamePrivacy,
  setGamePrivacy,
  spectatorMode,
  setSpectatorMode,
  playDate,
  setPlayDate,
  handleCreateGame,
}) => {
  return (
    <div className="mb-4">
      <h1 className="font-bold">Game Specification</h1>

      <div className="mt-5">
        <h3 className="text-xs">Number of Players</h3>
        <div className="flex flex-wrap mt-2 gap-x-6 gap-y-2 text-[10px] md:text-xs">
          {numberOfPlayersArray.map((num) => (
            <div
              key={num}
              className="flex items-center gap-1">
              {maxNumOfPlayers === num ? (
                <FaCircle className="text-[#30B943]" />
              ) : (
                <FaRegCircle
                  className="cursor-pointer"
                  onClick={() => setMaxNumOfPlayers(num)}
                />
              )}
              <p>{num}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xs">Privacy</h3>
        <div className="flex mt-2 gap-6 text-[10px] md:text-xs">
          {privacyType.map((privacy) => (
            <div
              key={privacy}
              className="flex items-center gap-1">
              {gamePrivacy === privacy ? (
                <FaCircle className="text-[#30B943]" />
              ) : (
                <FaRegCircle
                  className="cursor-pointer"
                  onClick={() => setGamePrivacy(privacy)}
                />
              )}
              <p>{privacy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xs">Spectator mode:</h3>
        <div
          className={`w-10 h-5 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300 mt-2 ${
            spectatorMode ? "bg-[#30B943]" : "bg-gray-500"
          }`}
          onClick={() => setSpectatorMode(!spectatorMode)}>
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              spectatorMode ? "translate-x-5" : "translate-x-0"
            }`}></div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xs">When to play:</h3>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={playDate}
            onChange={(e) => setPlayDate(e.target.value)}
            className="border border-[#4B4B54] text-white text-xs rounded px-3 py-2 cursor-pointer focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-10 py-2 border-t border-[#31323E] pt-2">
        <button
          onClick={() => setStep(2)}
          className="px-4 py-2 bg-[#444553] rounded-md shadow shadow-[#444553] hover:shadow-lg hover:opacity-70
              transition-shadow duration-300 font-semibold text-white cursor-pointer text-[10px] md:text-sm">
          Back
        </button>
        <button
          onClick={handleCreateGame}
          disabled={!playDate}
          className={`px-4 py-2 rounded-md shadow font-semibold text-white transition-all duration-300 text-[10px] md:text-sm
          ${
            playDate
              ? "bg-[#30B943] shadow-[#30B943] hover:shadow-lg hover:opacity-70 cursor-pointer"
              : "bg-gray-500 shadow-none cursor-not-allowed"
          }`}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGameStepThree;
