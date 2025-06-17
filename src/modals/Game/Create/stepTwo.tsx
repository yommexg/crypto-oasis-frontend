import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { PiPencilLine } from "react-icons/pi";
import { toast } from "react-toastify";

type GameStepTwoProps = {
  gameTitle: string;
  setGameTitle: (gameTitle: string) => void;
  setStep: (step: number) => void;
  gameNFTImageFile: File | null;
  setGameNFTImageFile: (image: File) => void;
  imagePreview: string | null;
  setImagePreview: (imageURL: string) => void;
};

const CreateGameStepTwo: React.FC<GameStepTwoProps> = ({
  gameTitle,
  setGameTitle,
  gameNFTImageFile,
  setGameNFTImageFile,
  imagePreview,
  setImagePreview,
  setStep,
}) => {
  const nftImgInputRef = useRef<HTMLInputElement>(null);

  const onNFTImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.warn("Please select a valid image file.");
        e.target.value = "";
        return;
      }
      setGameNFTImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-[10px] md:text-sm">Game Title</h2>
      <div className="w-full relative my-2">
        <input
          type="text"
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
          placeholder="Enter Title ..."
          className=" w-full rounded-lg border-[#34343F] bg-[#19191E] px-4 py-3 text-[10px] md:text-xs
               text-white focus:border focus:border-gray-600 focus:outline-none"
        />
        <PiPencilLine className="text-[#9FA0AF80] absolute text-lg right-3 top-3" />
      </div>
      <div className="flex justify-center py-4 relative">
        {imagePreview ? (
          <div className="h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
            <img
              src={imagePreview}
              alt="NFT Preview"
              className="object-cover w-full h-full rounded-4xl"
            />
            <p
              onClick={() => nftImgInputRef.current?.click()}
              className="text-[8px] md:text-[11px] text-center mt-2 text-[#CCE919] hover:underline font-bold">
              Click here to change <br /> Selected NFT
            </p>
          </div>
        ) : (
          <>
            <div
              onClick={() => nftImgInputRef.current?.click()}
              className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] bg-[#19191E] border border-[#4B4B54] border-dashed 
        rounded-4xl flex flex-col justify-center items-center cursor-pointer hover:opacity-65">
              <div className="w-10 h-10 md:h-16 md:w-16 rounded-full border-3 border-[#30B9B1] flex items-center justify-center">
                <FaPlus className="text-white text-lg" />
              </div>
              <p className="absolute bottom-10 md:bottom-12 text-[8px] md:text-[10px] font-semibold text-center">
                Click to choose <br />
                your NFT
              </p>
            </div>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          ref={nftImgInputRef}
          onChange={onNFTImageChange}
          className="hidden"
        />
      </div>
      <div className="flex justify-end gap-4 mt-10 py-2 border-t border-[#31323E] pt-2">
        <button
          onClick={() => setStep(1)}
          className="px-4 py-2 bg-[#444553] rounded-md shadow shadow-[#444553] hover:shadow-lg hover:opacity-70
              transition-shadow duration-300 font-semibold text-white cursor-pointer text-[10px] md:text-sm">
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!gameTitle || !gameNFTImageFile}
          className={`px-4 py-2 rounded-md shadow font-semibold text-white transition-all duration-300 text-[10px] md:text-sm
          ${
            gameTitle && gameNFTImageFile
              ? "bg-[#30B943] shadow-[#30B943] hover:shadow-lg hover:opacity-70 cursor-pointer"
              : "bg-gray-500 shadow-none cursor-not-allowed"
          }`}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateGameStepTwo;
