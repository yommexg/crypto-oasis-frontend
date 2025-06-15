import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import CenteredModal from "../../CentralModal";
import CreateGameStepOne from "./stepOne";
import CreateGameStepTwo from "./stepTwo";
import CreateGameStepThree from "./stepThree";

interface GameProps {
  isOpen: boolean;
  onClose: () => void;
}

const gameCreationProcessArray = ["Select game", "Branding", "General"];

const CreateGame: React.FC<GameProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [gameType, setGameType] = useState("");

  const isCompleted = (index: number) => index < step - 1;
  const isActive = (index: number) => index === step - 1;

  return (
    <div>
      <CenteredModal
        onClose={onClose}
        isOpen={isOpen}
        header={
          <>
            <div className="md:text-lg font-semibold text-white pt-2">
              Create a Game
            </div>

            <div className="flex w-full justify-between px-4 md:px-16 py-2 relative items-center">
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
            {step === 2 && <CreateGameStepTwo />}
            {step === 3 && <CreateGameStepThree />}
          </div>
        }
      />
    </div>
  );
};

export default CreateGame;
