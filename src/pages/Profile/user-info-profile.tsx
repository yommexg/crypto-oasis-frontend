import { useUser } from "../../store";
import noProfile from "../../assets/no-profile.png";
import noBanner from "../../assets/no-banner.png";
import { FaDiscord, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ProfileInfo: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="relative h-[250px] md:h-[300px]">
      <div className="w-full h-[150px] md:h-[200px]">
        <img
          src={user?.bannerUrl ?? noBanner}
          className="w-full h-full object-cover object-left-top"
        />
      </div>
      <div className="absolute left-1/2 -bottom-8 md:-bottom-16 z-10 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 md:w-30 md:h-30 border-4 border-[#202129] bg-white  rounded-full overflow-hidden">
          <img
            src={user?.avatarUrl ?? noProfile}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-center capitalize text-lg md:text-xl mt-1 font-bold">
          {user?.username}
        </h1>
      </div>

      <div className="flex flex-row gap-2 md:gap-4 justify-end pr-8 md:pr-[15%] pt-4">
        {user?.discordUrl && (
          <a
            href={user.discordUrl}
            target="_blank"
            rel="noopener noreferrer">
            <FaDiscord className="w-4 h-4 md:w-6 md:h-6 text-[#9FA0AF] bg-[#2A2B35] p-1 cursor-pointer border border-[#66697E] rounded-sm" />
          </a>
        )}

        {user?.XUrl && (
          <a
            href={user.XUrl}
            target="_blank"
            rel="noopener noreferrer">
            <FaXTwitter className="w-4 h-4 md:w-6 md:h-6 text-[#9FA0AF] bg-[#2A2B35] p-1 cursor-pointer border border-[#66697E] rounded-sm" />
          </a>
        )}

        {user?.websiteUrl && (
          <a
            href={user.websiteUrl}
            target="_blank"
            rel="noopener noreferrer">
            <FaGlobe className="w-4 h-4 md:w-6 md:h-6 text-[#9FA0AF] bg-[#2A2B35] p-1 cursor-pointer border border-[#66697E] rounded-sm" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
