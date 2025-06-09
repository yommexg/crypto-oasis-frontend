import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RxLockClosed } from "react-icons/rx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import CenteredModal from "../CentralModal";
import { Spinner } from "../../components";
import { useAuth } from "../../store";

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const { resetPassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      navigate("/");
      return;
    }
    setResetPasswordLoading(false);
  }, [email, navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warn("Password does not match");
      return;
    }

    const { message, status } = await resetPassword(email, password);

    if (status === "success") {
      toast.success(message);
      navigate("/login", { replace: true });
    } else {
      toast.error(message);
    }
  };

  if (resetPasswordLoading) {
    return <Spinner />;
  }

  return (
    <CenteredModal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div className="text-center py-2 text-lg md:text-xl font-semibold text-white">
          Reset Password
        </div>
      }
      body={
        <div className="px-4 md:px-10 py-4">
          <form
            onSubmit={handleResetPassword}
            className="space-y-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1 relative">
                <RxLockClosed className="w-5 h-5 text-[#8A939B] absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-10 bg-[#19191E] px-4 py-3 rounded-md text-white text-[10px] md:text-sm focus:outline-none focus:border focus:border-gray-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-[#8A939B]">
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <RxLockClosed className="w-5 h-5 text-[#8A939B] absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-10 bg-[#19191E] px-4 py-3 rounded-md text-white text-[10px] md:text-sm focus:outline-none focus:border focus:border-gray-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-[#8A939B]">
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:opacity-80 transition-opacity font-semibold text-white">
              Reset
            </button>
          </form>
        </div>
      }
    />
  );
};

export default ResetPassword;
