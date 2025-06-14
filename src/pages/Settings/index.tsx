import { useState } from "react";
import GeneralSettings from "./general";
import SidebarSettings from "./sidebar";
import ProfileSettings from "./profile";

const Settings: React.FC = () => {
  const [activeSettingsTab, setactiveSettingsTab] = useState("general");

  return (
    <div className="pt-10 md:pt-24 md:pl-20 flex flex-col md:flex-row">
      <SidebarSettings
        setactiveSettingsTab={setactiveSettingsTab}
        activeSettingsTab={activeSettingsTab}
      />
      {activeSettingsTab === "general" && <GeneralSettings />}
      {activeSettingsTab === "profile" && <ProfileSettings />}
    </div>
  );
};

export default Settings;
