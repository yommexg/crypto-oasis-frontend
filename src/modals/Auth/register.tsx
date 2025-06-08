import { useEffect, useState } from "react";
import CenteredModal from "../CentralModal";
import { RxLockClosed } from "react-icons/rx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "../../components";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isVerified = location.state?.isVerified ?? false;
  const email = location.state?.email;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(true);

  useEffect(() => {
    if (!isVerified) {
      navigate("/");
      return;
    }
    setRegisterLoading(false);
  }, [isVerified, navigate]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    // TODO: Make API call
    console.log("Registering:", { email, username, password });
    navigate("/login"); // or close modal if you prefer
  };

  if (registerLoading) {
    return <Spinner />;
  }

  return (
    <CenteredModal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div className="text-center py-2 text-lg md:text-xl font-semibold text-white">
          Create Your Account
        </div>
      }
      body={
        <div className="px-4 md:px-10 py-4">
          <form
            onSubmit={handleRegister}
            className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white">
                Username
              </label>
              <div className="mt-1 relative">
                <FaUser className="w-5 h-5 text-[#8A939B] absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 bg-[#19191E] px-4 py-3 rounded-md text-white text-[10px] md:text-sm focus:outline-none focus:border focus:border-gray-600"
                  placeholder="yourusername"
                />
              </div>
            </div>

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

            {/* Error */}
            {error && (
              <div className="text-sm text-red-400 text-center">{error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:opacity-80 transition-opacity font-semibold text-white">
              Register
            </button>
          </form>
        </div>
      }
    />
  );
};

export default Register;
