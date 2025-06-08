import { useState } from "react";
import CenteredModal from "../CentralModal";
import { MdOutlineMail } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RxLockClosed } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic
    console.log("Logging in with", { email, password });
  };

  return (
    <CenteredModal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div className="text-center py-2 text-lg md:text-xl font-semibold text-white">
          Login to Your Account
        </div>
      }
      body={
        <div className="px-4 md:px-10 py-4">
          <form
            onSubmit={handleLogin}
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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1 relative">
                <RxLockClosed className="w-5 h-5 text-[#8A939B] absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md pl-12 bg-[#19191E] px-3 py-3 text-[10px] md:text-sm focus:border focus:border-gray-600 text-white focus:black focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-[#8A939B] focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 mt-2 py-2 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:shadow-lg hover:opacity-70
              transition-shadow duration-300 font-semibold text-lg text-white cursor-pointer w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-[10px] md:text-sm text-center text-gray-400 space-y-2">
            <div>
              <span>Don’t have an account? </span>
              <button
                onClick={() => {
                  navigate("/send-verification-link");
                }}
                className="text-[#CCE919] hover:underline">
                Create one
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  // This should open forgot password modal or route
                  console.log("Redirect to forgot password");
                }}
                className="text-[#CCE919] hover:underline">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Login;
