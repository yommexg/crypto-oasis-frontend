import { useAuth, useUser } from "../../store";
import Header from "./Heaader";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const { user, getUser } = useUser();

  const handleLogout = () => {
    logout();
    getUser();
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center px-4">
      <Header />

      <h1 className="md:text-2xl font-bold text-center">
        Welcome to the Crypto Oasis Pocker Dashboard
      </h1>
      <p className="text-[10px] my-4 md:text-base">
        Hi <span className="capitalize font-bold">{user?.username}</span>, Your
        account is authenticated.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 mt-2 py-2 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:shadow-lg hover:opacity-70
              transition-shadow duration-300 font-semibold text-white cursor-pointer">
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
