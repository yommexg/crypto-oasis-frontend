import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CenteredModal from "../CentralModal";
import { Spinner } from "../../components";
import { useAuth, useUser } from "../../store";

interface NewDeviceLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const OTP_LENGTH = 6;

const NewDeviceLogin: React.FC<NewDeviceLoginProps> = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [newDeviceLoginLoading, setNewDeviceLoginLoading] = useState(true);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const navigate = useNavigate();

  const { newDevicelogin } = useAuth();
  const { getUser } = useUser();

  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/");
      return;
    }
    setNewDeviceLoginLoading(false);
  }, [email, navigate]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (!email || fullOtp.length < OTP_LENGTH) {
      toast.warn("Please enter the complete OTP.");
      return;
    }

    const { message, status } = await newDevicelogin(email, fullOtp);

    if (status === "success") {
      toast.success(message);
      getUser();
      navigate("/");
    } else {
      toast.error(message);
    }
  };

  if (newDeviceLoginLoading) {
    return <Spinner />;
  }

  return (
    <CenteredModal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div className="text-center py-2 text-lg md:text-xl font-semibold text-white">
          New Device Login
        </div>
      }
      body={
        <div className="px-4 md:px-10 py-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-6">
            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-white">
                Enter OTP
              </label>
              <div className="mt-2 flex space-x-2 justify-center">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-10 h-12 md:w-12 md:h-14 text-center rounded-md bg-[#19191E] text-white text-lg md:text-xl focus:border focus:border-gray-600 focus:outline-none"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="px-6 mt-2 py-2 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:shadow-lg hover:opacity-70 transition-shadow duration-300 font-semibold text-white cursor-pointer w-full">
              Verify & Sign In
            </button>
          </form>

          <div className="mt-6 text-[10px] md:text-sm text-center text-gray-400">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-[#CCE919] hover:underline">
              Didn’t receive code? , Go back to login
            </button>
          </div>
        </div>
      }
    />
  );
};

export default NewDeviceLogin;
