import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAccount, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Dashboard, Games, Profile, Settings } from "../../pages";
import { Header, Sidebar, Spinner } from "../../components";
import { wagmiConfig } from "../../config/wagmi";
import { useWallet, WalletProvider } from "../../context/Wallet";
import { useGame, useUser } from "../../store";
import CreateGame from "../../modals/Game/Create";

const queryClient = new QueryClient();

function RoutesLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isUserLoading } = useUser();
  const { isGameLoading } = useGame();

  const { walletLoading, setAddress, setActiveWallet } = useWallet();

  const {
    address: wagmiAddress,
    isConnected,
    isDisconnected,
    connector,
  } = useAccount();

  useEffect(() => {
    if (isConnected && wagmiAddress) {
      setAddress(wagmiAddress);
      const walletName = connector?.name;

      if (walletName === "Injected") {
        setActiveWallet("MetaMask");
      } else if (walletName === "Coinbase Wallet") {
        setActiveWallet("Coinbase Wallet");
      } else {
        setActiveWallet("WalletConnect");
      }
    } else if (isDisconnected) {
      setAddress(undefined);
    }
  }, [
    isConnected,
    wagmiAddress,
    setAddress,
    isDisconnected,
    connector,
    setActiveWallet,
  ]);

  return (
    <>
      {(walletLoading || isUserLoading || isGameLoading) && <Spinner />}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/host-games"
          element={<Games />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

function UsersRoutes() {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state?.background;
  const path = location.pathname;
  const navigate = useNavigate();

  return (
    <WalletProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Routes location={background || location}>
            <Route
              path="/*"
              element={
                <div
                  className={`transition-opacity duration-300 ${
                    path === "/create-game"
                      ? "opacity-30 pointer-events-none"
                      : ""
                  }`}>
                  <RoutesLayout />
                </div>
              }
            />
          </Routes>

          {path === "/create-game" && (
            <CreateGame
              isOpen={true}
              onClose={() => navigate(-1)}
            />
          )}
        </QueryClientProvider>
      </WagmiProvider>
    </WalletProvider>
  );
}

export default UsersRoutes;
