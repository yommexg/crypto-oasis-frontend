import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

import { useUser } from "../../store";
import noProfile from "../../assets/no-profile.png";
import noBanner from "../../assets/no-banner.png";
import { toast } from "react-toastify";

const ProfileSettings: React.FC = () => {
  const { user, updateUserImages, getUser } = useUser();

  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? noProfile);
  const [bannerUrl, setBannerUrl] = useState(user?.bannerUrl ?? noBanner);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.warn("Please select a valid image file.");
        e.target.value = "";
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.warn("Please select a valid image file.");
        e.target.value = "";
        return;
      }
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateUserImage = async () => {
    if (!avatarFile && !bannerFile) {
      toast.warn("No Image Changes Detected");
      return;
    }

    const { status, message } = await updateUserImages(
      avatarFile ?? undefined,
      bannerFile ?? undefined
    );

    if (status === "success") {
      getUser();
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="px-6 py-4 md:h-[calc(100vh-6rem)] overflow-auto scrollbar-hide  md:block">
      <h1 className="font-semibold">Profile Settings</h1>

      {/* Profile Avatar */}
      <div className="mt-6">
        <h3 className="block text-xs font-semibold text-[#F0F2F5]">
          Profile picture (PFP)
        </h3>
        <div className="flex justify-center md:block">
          <div className="w-[150px] h-[150px] md:w-[120px] md:h-[120px] lg:w-[200px] lg:h-[200px] flex mt-4 relative group hover:opacity-60">
            <img
              src={avatarUrl}
              className="w-full h-full rounded-full"
            />
            <button
              onClick={() => avatarInputRef.current?.click()}
              type="button"
              title="Edit Profile Picture"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202029] bg-opacity-60 shadow-lg rounded-full
             p-1.5 text-white w-7 h-7 cursor-pointer transition duration-300 ease-in-out group-hover:bg-[#30B943] group-hover:shadow-xl group-hover:scale-110">
              <FaCamera className="w-full h-full" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              onChange={onAvatarChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="mt-12 md:mt-8">
        <h3 className="block text-xs font-semibold text-[#F0F2F5]">
          Profile Banner
        </h3>

        <div className="h-[100px] md:w-[400px] lg:w-[600px] lg:h-[150px] mt-4 relative group hover:opacity-60">
          <img
            src={bannerUrl}
            className="w-full h-full rounded-sm"
          />
          <button
            onClick={() => bannerInputRef.current?.click()}
            type="button"
            title="Edit Profile Banner"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202029] bg-opacity-60 shadow-lg rounded-full
             p-1.5 text-white w-7 h-7 cursor-pointer transition duration-300 ease-in-out group-hover:bg-[#30B943] group-hover:shadow-xl group-hover:scale-110">
            <FaCamera className="w-full h-full" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={bannerInputRef}
            onChange={onBannerChange}
            className="hidden"
          />
        </div>
        <p className="text-[10px] text-[#A6A6A6] font-semibold mt-2">
          Recommended size 1920 x 220 pixels.
        </p>
      </div>

      <div className="flex justify-end mt-6 mb-2">
        <button
          onClick={handleUpdateUserImage}
          className="px-4 py-2 bg-[#30B943] rounded-lg text-xs shadow shadow-[#30B943] hover:opacity-60 transition-opacity font-semibold text-white cursor-pointer">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
