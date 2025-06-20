import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CenteredModal from "../CentralModal";
import { Spinner } from "../../components";
import { useAuth } from "../../store";

const RESEND_TIMEOUT = 120;
const RESEND_STORAGE_KEY = "otpResendTimestamp";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

interface VerifyForgetOTPProps {
  isOpen: boolean;
  onClose: () => void;
}

const OTP_LENGTH = 6;

const VerifyForgetOTP: React.FC<VerifyForgetOTPProps> = ({
  isOpen,
  onClose,
}) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const [verifyForgetOTPLoading, setVerifyForgetOTPLoading] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);

  const location = useLocation();
  const email = location.state?.email;

  const { sendForgetOTP, verifyForgetOTP } = useAuth();

  useEffect(() => {
    if (!email) {
      navigate("/");
      return;
    }
    setVerifyForgetOTPLoading(false);
  }, [email, navigate]);

  useEffect(() => {
    const savedTimestamp = localStorage.getItem(RESEND_STORAGE_KEY);

    if (savedTimestamp) {
      const secondsLeft = Math.floor(
        (parseInt(savedTimestamp) - Date.now()) / 1000
      );

      if (secondsLeft > 0) {
        setResendCooldown(secondsLeft);
        return;
      } else {
        localStorage.removeItem(RESEND_STORAGE_KEY);
      }
    }

    const newExpiry = Date.now() + RESEND_TIMEOUT * 1000;
    localStorage.setItem(RESEND_STORAGE_KEY, newExpiry.toString());
    setResendCooldown(RESEND_TIMEOUT);
  }, []);

  useEffect(() => {
    let timer: number;

    if (resendCooldown > 0) {
      timer = window.setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            localStorage.removeItem(RESEND_STORAGE_KEY);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResendOTP = async () => {
    if (!email || resendCooldown > 0) return;

    const { message, status } = await sendForgetOTP(email);

    if (status === "success") {
      toast.success(message);
      const expiry = Date.now() + RESEND_TIMEOUT * 1000;
      localStorage.setItem(RESEND_STORAGE_KEY, expiry.toString());
      setResendCooldown(RESEND_TIMEOUT);
    } else {
      toast.error(message);
    }
  };

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
    const { message, status } = await verifyForgetOTP(email, fullOtp);

    if (status === "success") {
      navigate("/reset-password", { state: { email }, replace: true });
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  if (verifyForgetOTPLoading) {
    return <Spinner />;
  }

  return (
    <CenteredModal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div className="text-center py-2 text-lg md:text-xl font-semibold text-white">
          Forget Password OTP
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
                    className="w-10 h-12 md:w-12 md:h-14 text-center rounded-md bg-[#19191E] text-white text-lg md:text-xl 
                    focus:border focus:border-gray-600 focus:outline-none"
                    onPaste={(e) => {
                      const paste = e.clipboardData
                        .getData("text")
                        .replace(/\D/g, "");
                      if (paste.length === OTP_LENGTH) {
                        const newOtp = paste.split("").slice(0, OTP_LENGTH);
                        setOtp(newOtp);
                        inputRefs.current[OTP_LENGTH - 1]?.focus();
                      }
                      e.preventDefault();
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="px-6 mt-2 py-2 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:shadow-lg hover:opacity-70 transition-shadow duration-300 font-semibold text-white cursor-pointer w-full">
              Verify OTP
            </button>
          </form>

          <div className="mt-6 text-[10px] md:text-sm text-center text-gray-400">
            <button
              onClick={handleResendOTP}
              disabled={resendCooldown > 0}
              className={`${
                resendCooldown > 0
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-[#CCE919] hover:underline"
              }`}>
              {resendCooldown > 0
                ? `Resend available in ${formatTime(resendCooldown)}`
                : "Didn’t receive code? Resend"}
            </button>
          </div>
        </div>
      }
    />
  );
};

export default VerifyForgetOTP;
