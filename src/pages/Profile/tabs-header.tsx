type ProfileHeaderTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const ProfileTabsHeader: React.FC<ProfileHeaderTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="px-4 md:px-10 xl:px-24 py-4">
      <div className="border-b border-[#31323E] flex gap-8 font-semibold text-xs md:text-base">
        <h2
          onClick={() => setActiveTab("hosted")}
          className={`cursor-pointer pb-2  ${
            activeTab === "hosted" ? "border-b-[3px] border-[#CCE919]" : ""
          }`}>
          Hosted Games
        </h2>
        <h2
          onClick={() => setActiveTab("played")}
          className={`cursor-pointer pb-2  ${
            activeTab === "played" ? "border-b-[3px] border-[#CCE919]" : ""
          }`}>
          Played Games
        </h2>
      </div>
    </div>
  );
};

export default ProfileTabsHeader;
