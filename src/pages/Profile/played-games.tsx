import { useGame } from "../../store";
import { formatDate } from "../../utils/formatDate";

const ProfilePlayedGames: React.FC = () => {
  const { playedGames } = useGame();

  return (
    <div className="px-4 md:px-10 xl:px-24 pt-2 pb-6">
      {playedGames.length === 0 && (
        <div className="text-center p-2 text-xs md:text-base xl:text-lg">
          You have not played any game. Kindly connect your wallet and join your
          favorite game
        </div>
      )}
      {playedGames.map((game) => (
        <>
          <div
            key={game.id + "desktop"}
            className="bg-[#292932] mb-2 pl-4 py-4 md:flex justify-between rounded-md hidden">
            <div className="w-[40%] border-r border-[#4B4C59] flex items-center gap-4">
              <div className="w-20 h-20">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full rounded-md"
                />
              </div>
              <div>
                <p
                  className="bg-[#FF7171] rounded-full text-[10px] text-center font-semibold
               px-2 py-[2px] w-15 capitalize mb-1">
                  {/* {game.status} */}
                  finished
                </p>
                <h2
                  className="font-semibold capitalize truncate whitespace-nowrap 
              overflow-hidden w-[200px] text-sm xl:text-base">
                  {game.title}
                </h2>
              </div>
            </div>
            <div
              className="border-r border-[#4B4C59] w-[20%] flex flex-col 
          items-center justify-center gap-1">
              <p className="text-[#9FA0AF] uppercase font-semibold text-[10px] xl:text-xs">
                Host:
              </p>
              <p
                className="capitalize text-[#DADADA] text-xs xl:text-sm font-semibold
             truncate whitespace-nowrap max-w-2/3">
                {game.creatorName}
              </p>
            </div>
            <div
              className="border-r border-[#4B4C59] w-[20%] flex flex-col 
          items-center justify-center gap-1">
              <p className="text-[#9FA0AF] uppercase font-semibold text-[10px] xl:text-xs">
                Collection:
              </p>
              <p
                className="uppercase text-[#CCE919] text-xs xl:text-sm font-semibold
             truncate whitespace-nowrap max-w-2/3">
                {game.type}
              </p>
            </div>
            <div
              className="border-r border-[#4B4C59] w-[20%] flex flex-col 
          items-center justify-center gap-1">
              <p className="text-[#9FA0AF] uppercase font-semibold text-[10px] xl:text-xs">
                Date:
              </p>
              <p className="text-[#DADADA] text-xs xl:text-sm font-semibold">
                {formatDate(game.startDate.toString())}
              </p>
            </div>
            <div className="w-[20%] flex flex-col items-center justify-center gap-1">
              <p className="text-[#9FA0AF] uppercase font-semibold text-[10px] xl:text-xs">
                Winner:
              </p>
              <p
                className="capitalize text-[#DADADA] text-xs xl:text-sm font-semibold
            truncate whitespace-nowrap max-w-2/3">
                {/* {game.winnerName} */}
                Stamenix
              </p>
            </div>
          </div>

          {/* Mobile Design */}
          <div
            key={game.id + "mobile"}
            className="bg-[#292932] mb-2 px-4 py-4 flex items-center gap-6
             md:hidden rounded-md">
            <div className="w-27 h-27">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p
                className="bg-[#FF7171] rounded-full text-[10px] text-center font-semibold
               px-2 py-[2px] w-15 capitalize mb-1">
                {/* {game.status} */}
                finished
              </p>
              <h2
                className="font-semibold capitalize truncate whitespace-nowrap 
              overflow-hidden w-[80px] text-sm">
                {game.title}
              </h2>

              <div className="flex gap-2">
                <p className="text-[#9FA0AF] font-semibold text-[10px]">
                  Host:
                </p>
                <p
                  className="capitalize text-[#DADADA]  text-xs xl:text-sm font-semibold
                truncate whitespace-nowrap max-w-2/3">
                  {game.creatorName}
                </p>
              </div>

              <div className="flex gap-2">
                <p className="text-[#9FA0AF] font-semibold text-[10px]">
                  Collection:
                </p>
                <p
                  className="uppercase text-[#CCE919] text-xs xl:text-sm font-semibold
                truncate whitespace-nowrap max-w-2/3">
                  {game.type}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-[#9FA0AF] font-semibold text-[10px] xl:text-xs">
                  Date:
                </p>
                <p className="uppercase text-[#DADADA] text-xs xl:text-sm font-semibold">
                  {formatDate(game.startDate.toString())}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-[#9FA0AF] uppercase font-semibold text-[10px] xl:text-xs">
                  Winner:
                </p>
                <p
                  className="capitalize text-[#DADADA] text-xs xl:text-sm font-semibold
                   truncate whitespace-nowrap max-w-2/3">
                  {/* {game.winnerName} */}
                  Stamenix
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ProfilePlayedGames;
