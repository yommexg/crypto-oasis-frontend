import { useGame } from "../../store";

const ProfileHostedGames: React.FC = () => {
  const { hostedGames } = useGame();

  return <div>ProfileHostedGames ({hostedGames.length})</div>;
};

export default ProfileHostedGames;
