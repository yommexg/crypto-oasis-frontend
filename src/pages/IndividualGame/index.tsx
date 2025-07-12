import { useParams } from "react-router-dom";

const IndividualGame: React.FC = () => {
  const { gameId } = useParams();

  return (
    <div className="pt-24 md:pl-20 pb-6 flex flex-col justify-center items-center px-4 h-screen">
      <h1 className="md:text-2xl font-bold text-center">
        Welcome to the Yommex Genesis Pocker IndividualGame {gameId}
      </h1>
      <p className="text-[10px] my-4 md:text-base">
        This is the IndividualGame Section
      </p>
    </div>
  );
};

export default IndividualGame;
