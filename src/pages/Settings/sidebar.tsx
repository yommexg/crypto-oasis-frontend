import { FiUser } from "react-icons/fi";
import { IoIosAperture } from "react-icons/io";

import { useUser } from "../../store";
import noProfile from "../../assets/no-profile.png";

type SidebarSettingsProps = {
  activeSettingsTab: string;
  setactiveSettingsTab: (tab: string) => void;
};

const sidebarSettingsArray = [
  {
    name: "General",
    icon: <FiUser />,
    tab: "general",
  },
  {
    name: "Profile",
    icon: <IoIosAperture />,
    tab: "profile",
  },
];

const SidebarSettings: React.FC<SidebarSettingsProps> = ({
  activeSettingsTab,
  setactiveSettingsTab,
}) => {
  const { user } = useUser();

  return (
    <div className="md:w-1/4 md:h-screen fixed w-[100vw] z-20 bg-[#202029] md:flex md:justify-end px-4 py-4 border-b md:border-b-0 md:border-r border-[#31323E]">
      <div className="flex items-center flex-col">
        <div className="w-24 h-24 md:block md:w-24 md:h-24">
          <img
            src={user?.avatarUrl ? user?.avatarUrl : noProfile}
            className="w-full h-full rounded-full"
          />
        </div>
        <h2 className="md:block mt-2 capitalize font-semibold">
          {user?.username ?? "User"}
        </h2>
        <div className="mt-4 flex flex-row md:flex-col gap-8 md:gap-2">
          {sidebarSettingsArray.map(({ name, icon, tab }) => (
            <div
              key={tab}
              onClick={() => {
                setactiveSettingsTab(tab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded md:w-[150px] lg:w-[250px] text-sm cursor-pointer
                ${
                  activeSettingsTab === tab
                    ? "bg-[#35353F] text-white"
                    : "hover:bg-[#69696e]"
                }`}>
              {icon}
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarSettings;
