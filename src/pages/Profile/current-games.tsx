import { useNavigate } from "react-router-dom";
import { useGame } from "../../store";
import { toast } from "react-toastify";

const ProfileCurrentGames: React.FC = () => {
  const navigate = useNavigate();
  const { currentGames, getIndividualGameData } = useGame();

  const handleGameClick = async (gameId: string) => {
    const { status } = await getIndividualGameData(gameId);
    if (status === "success") {
      navigate(`/game/${gameId}`);
    } else {
      toast.error("Failed to fetch Game Data");
    }
  };

  return (
    <div className="px-4 md:px-10 xl:px-24 py-10">
      <h2 className="font-semibold text-xs md:text-base mb-2">Current Games</h2>
      {currentGames.length <= 0 && (
        <div className="py-2 text-[9px] md:text-xs">
          You have no Open or Hosting game
        </div>
      )}
      <div className="flex gap-4 md:gap-8 overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-[#444553] scrollbar-hide">
        {currentGames.map((game) => (
          <div
            key={game.id}
            className="bg-[#292932] p-4 rounded-md">
            <div className="flex gap-4">
              <div className="w-20 h-20 md:w-24 md:h-24">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full rounded-md"
                />
              </div>
              <div>
                <div className="flex">
                  <h3
                    className={`text-[10px] md:text-xs capitalize font-semibold px-3 py-[2px] rounded-md ${
                      game.status === "hosting"
                        ? "bg-[#E9A219]"
                        : "bg-[#30B943]"
                    }`}>
                    {game.status}
                  </h3>
                </div>

                <h2 className="font-semibold my-2 capitalize max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-xs md:text-base">
                  {game.title}
                </h2>

                <div className="flex gap-4 md:gap-8">
                  <div>
                    <h3 className="text-[8px] md:text-[11px] text-[#9FA0AF] font-semibold uppercase">
                      Host:
                    </h3>
                    <p className="capitalize text-[10px] md:text-sm text-[#DADADA] font-semibold">
                      {game.creatorName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[8px] md:text-[11px] text-[#9FA0AF] font-semibold uppercase">
                      Collection:
                    </h3>
                    <p className="uppercase text-[10px] md:text-sm text-[#DADADA] font-semibold">
                      {game.type}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[8px] md:text-[11px] text-[#9FA0AF] font-semibold uppercase">
                      players:
                    </h3>
                    <p className="capitalize text-[10px] md:text-sm text-[#DADADA] font-semibold">
                      {game.playersCount} / {game.maxNumOfPlayers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleGameClick(game.id)}
                className="bg-[#444553] text-xs md:text-base border-2 border-[#64677C] w-full mt-2 md:mt-4 font-semibold py-1 
              rounded-lg cursor-pointer transition-opacity hover:opacity-40">
                {game.status === "hosting" ? "Go to dashboard" : "Continue"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCurrentGames;
