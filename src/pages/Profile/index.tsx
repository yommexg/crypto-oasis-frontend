import { useState } from "react";

import ProfileCurrentGames from "./current-games";
import ProfileInfo from "./user-info-profile";
import ProfileTabsHeader from "./tabs-header";
import ProfileHostedGames from "./hosted-games";
import ProfilePlayedGames from "./played-games";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("hosted");

  return (
    <div className="md:pl-20 min-h-screen">
      <ProfileInfo />
      <ProfileCurrentGames />
      <ProfileTabsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "hosted" && <ProfileHostedGames />}
      {activeTab === "played" && <ProfilePlayedGames />}
    </div>
  );
};

export default Profile;
