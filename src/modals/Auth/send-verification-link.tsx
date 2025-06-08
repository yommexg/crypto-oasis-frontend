import { useState } from "react";
import CenteredModal from "../CentralModal";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface SendVerificationLinkProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendVerificationLink: React.FC<SendVerificationLinkProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSendVerificationLink = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <CenteredModal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div className="text-center py-2 text-lg md:text-xl font-semibold text-white">
          Create Account
        </div>
      }
      body={
        <div className="px-4 md:px-10 py-4">
          <form
            onSubmit={handleSendVerificationLink}
            className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1 relative">
                <MdOutlineMail className="w-5 h-5 text-[#8A939B] rounded-full absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className=" w-full pl-12 rounded-md  bg-[#19191E] px-4 py-3 text-[10px] md:text-sm text-white focus:border focus:border-gray-600 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 mt-2 py-2 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:shadow-lg hover:opacity-70
              transition-shadow duration-300 font-semibold text-white cursor-pointer w-full">
              Send Verification Link
            </button>
          </form>

          <div className="mt-6 text-[10px] md:text-sm text-center text-gray-400 space-y-2">
            <div>
              <span>Already have an account? </span>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="text-[#CCE919] hover:underline">
                Login
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SendVerificationLink;
