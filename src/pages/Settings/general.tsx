import { useState } from "react";
import { FaDiscord, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiEditFill } from "react-icons/ri";

import { useUser } from "../../store";

const GeneralSettings: React.FC = () => {
  const { user } = useUser();

  const [username, setUsername] = useState(user?.username ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [xUrl, setXUrl] = useState(user?.XUrl ?? "");
  const [discordUrl, setDiscordUrl] = useState(user?.discordUrl ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(user?.websiteUrl ?? "");

  return (
    <div className="px-6 py-4 md:h-[calc(100vh-6rem)] overflow-auto scrollbar-hide">
      <h1 className="font-semibold">General Settings</h1>
      <div className="space-y-6 my-6">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold text-[#F0F2F5]">
            *Display name (required)
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="md:w-[450px] lg:w-[600px] bg-[#19191E] px-4 py-3 rounded-lg text-white text-[10px] md:text-xs border
               border-[#34343F] focus:outline-none focus:border focus:border-[#30B943]"
              placeholder="Enter Game Name"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold text-[#F0F2F5]">
            Bio (optional)
          </label>
          <div className="mt-2">
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              className="w-full min-h-[150px] bg-[#19191E] px-4 py-3 rounded-lg text-white text-[10px] md:text-xs border
               border-[#34343F] focus:outline-none focus:border focus:border-[#30B943]"
              placeholder="Enter Not More than 300 words including spaces"
            />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xs font-semibold text-[#F0F2F5]">
            Social media links: (optional)
          </h2>

          {/* Twitter */}
          <div className="mt-2 relative">
            <FaXTwitter className="w-4 h-4 text-white absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              id="xUrl"
              value={xUrl}
              onChange={(e) => setXUrl(e.target.value)}
              required
              className="w-full pl-12 bg-[#19191E] px-4 py-3 rounded-lg text-white text-[10px] md:text-xs border
               border-[#34343F] focus:outline-none focus:border focus:border-[#30B943]"
              placeholder="Enter X URL"
            />
            <RiEditFill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9FA0AF80] w-4 h-4" />
          </div>

          {/* Discord */}
          <div className="mt-2 relative">
            <FaDiscord className="w-4 h-4 text-white absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              id="discordUrl"
              value={discordUrl}
              onChange={(e) => setDiscordUrl(e.target.value)}
              required
              className="w-full pl-12 bg-[#19191E] px-4 py-3 rounded-lg text-white text-[10px] md:text-xs border
               border-[#34343F] focus:outline-none focus:border focus:border-[#30B943]"
              placeholder="Enter Discord URL"
            />
            <RiEditFill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9FA0AF80] w-4 h-4" />
          </div>

          {/* Website */}
          <div className="mt-2 relative">
            <FaGlobe className="w-4 h-4 text-white absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              id="WebsiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              required
              className="w-full pl-12 bg-[#19191E] px-4 py-3 rounded-lg text-white text-[10px] md:text-xs border
               border-[#34343F] focus:outline-none focus:border focus:border-[#30B943]"
              placeholder="Enter Website URL"
            />
            <RiEditFill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9FA0AF80] w-4 h-4" />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-[#30B943] rounded-lg text-xs shadow shadow-[#30B943] hover:opacity-60 transition-opacity font-semibold text-white cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
