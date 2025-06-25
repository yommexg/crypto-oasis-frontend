import ProfileCurrentGames from "./current-games";
import ProfileInfo from "./user-info-profile";

const Profile: React.FC = () => {
  return (
    <div className="md:pl-20 min-h-screen">
      <ProfileInfo />
      <ProfileCurrentGames />
    </div>
  );
};

export default Profile;
