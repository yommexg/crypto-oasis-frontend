import { useWallet } from "../../context/Wallet";
import { useAuth, useUser } from "../../store";

const DashboardMock: React.FC = () => {
  const { logout } = useAuth();
  const { user, getUser } = useUser();
  const { address, activeWallet } = useWallet();

  const handleLogout = () => {
    logout();
    getUser();
  };

  return (
    <div className="pt-24 md:pl-20 pb-6 flex flex-col justify-center items-center px-4 h-screen">
      <h1 className="md:text-2xl font-bold text-center">
        Welcome to the Crypto Oasis Pocker Dashboard
      </h1>
      <p className="text-[10px] my-4 md:text-base">
        Hi <span className="capitalize font-bold">{user?.username}</span>, Your
        account is authenticated.
      </p>

      {activeWallet ? (
        <>
          {address ? (
            <p className="text-[10px] my-4 md:text-base text-center">
              Wallet Connected with{" "}
              <span className="font-bold">{activeWallet}</span> at
              <br />{" "}
              <span className="text-green-500 font-bold text-[9px] md:text-sm">
                {address}
              </span>
            </p>
          ) : (
            <p className="text-[10px] my-4 md:text-base">
              No Wallet Address Availiable for{" "}
              <span className="font-bold">{activeWallet}</span>
            </p>
          )}
        </>
      ) : (
        <p className="text-[10px] my-4 md:text-base">No Wallet Connected</p>
      )}

      <button
        onClick={handleLogout}
        className="px-6 mt-2 py-2 bg-[#30B943] rounded-md shadow shadow-[#30B943] hover:shadow-lg hover:opacity-70
              transition-shadow duration-300 font-semibold text-white cursor-pointer">
        Log out
      </button>
    </div>
  );
};

export default DashboardMock;
