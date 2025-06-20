import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import CenteredModal from "../../CentralModal";
import CreateGameStepOne from "./stepOne";
import CreateGameStepTwo from "./stepTwo";
import CreateGameStepThree from "./stepThree";
import { useGame, useUser } from "../../../store";
import { toast } from "react-toastify";

interface GameProps {
  isOpen: boolean;
  onClose: () => void;
}

const gameCreationProcessArray = ["Select game", "Branding", "General"];

const CreateGame: React.FC<GameProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const [gameType, setGameType] = useState("");

  const [gameTitle, setGameTitle] = useState("");
  const [gameNFTImageFile, setGameNFTImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [maxNumOfPlayers, setMaxNumOfPlayers] = useState(10);
  const [gamePrivacy, setGamePrivacy] = useState("Public");
  const [spectatorMode, setSpectatorMode] = useState(false);
  const [playDate, setPlayDate] = useState<string>("");

  const isCompleted = (index: number) => index < step - 1;
  const isActive = (index: number) => index === step - 1;

  const { createGame } = useGame();
  const { getUser } = useUser();

  const handleCreateGame = async () => {
    if (gameNFTImageFile) {
      const res = await createGame(
        gameTitle,
        gameType,
        maxNumOfPlayers,
        gamePrivacy,
        spectatorMode,
        playDate,
        gameNFTImageFile
      );

      const { message, status } = res;

      if (status === "success") {
        getUser();
        toast.success(message);
        setStep(4);
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div>
      <CenteredModal
        onClose={onClose}
        isOpen={isOpen}
        header={
          <>
            <div className="text-lg font-semibold text-white pt-2">
              Create a Game
            </div>

            <div className="flex w-full justify-between px-4 md:px-16 py-8 md:py-2 relative items-center">
              {gameCreationProcessArray.map((label, index) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 relative">
                  <div
                    className={`w-5 h-5 md:w-6 md:h-6 z-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold ${
                      isCompleted(index)
                        ? "bg-[#30B943] text-white border"
                        : isActive(index)
                        ? "bg-[#30B943] text-white"
                        : "bg-[#55576A]"
                    }`}>
                    {isCompleted(index) ? <FaCheck /> : index + 1}
                  </div>

                  {index < gameCreationProcessArray.length - 1 && (
                    <div
                      className={`absolute top-3 left-full w-[60px] md:w-[170px] h-0.5 border-b-2  transform -translate-y-1/2 z-0
                        ${
                          isCompleted(index)
                            ? "border-[#30B943]"
                            : "border-dashed border-[#55576A]"
                        }
                        `}
                    />
                  )}

                  <p
                    className={`text-[10px]  ${
                      isCompleted(index)
                        ? "text-white font-semibold"
                        : "text-[#9FA0AF]"
                    }`}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </>
        }
        body={
          <div className="py-2 px-8">
            {step === 1 && (
              <CreateGameStepOne
                gameType={gameType}
                setGameType={setGameType}
                setStep={setStep}
              />
            )}
            {step === 2 && (
              <CreateGameStepTwo
                gameTitle={gameTitle}
                setGameTitle={setGameTitle}
                setStep={setStep}
                gameNFTImageFile={gameNFTImageFile}
                setGameNFTImageFile={setGameNFTImageFile}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            )}
            {step === 3 && (
              <CreateGameStepThree
                maxNumOfPlayers={maxNumOfPlayers}
                setMaxNumOfPlayers={setMaxNumOfPlayers}
                setStep={setStep}
                gamePrivacy={gamePrivacy}
                setGamePrivacy={setGamePrivacy}
                spectatorMode={spectatorMode}
                setSpectatorMode={setSpectatorMode}
                playDate={playDate}
                setPlayDate={setPlayDate}
                handleCreateGame={handleCreateGame}
              />
            )}

            {step === 4 && (
              <div className="text-center text-white py-10">
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                  Game Created Successfully!
                </h2>
                <button
                  className="mt-4 px-6 py-2 bg-[#30B943] text-white rounded cursor-pointer"
                  onClick={onClose}>
                  Close
                </button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default CreateGame;
