import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAccount, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Dashboard, Games, Profile, Settings } from "../../pages";
import { Header, Sidebar, Spinner } from "../../components";
import { wagmiConfig } from "../../config/wagmi";
import { useWallet, WalletProvider } from "../../context/Wallet";
import { useUser } from "../../store";

const queryClient = new QueryClient();

function RoutesLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isUserLoading } = useUser();

  const { walletLoading, setAddress } = useWallet();

  const {
    address: wagmiAddress,
    isConnected,
    isConnecting,
    isReconnecting,
    isDisconnected,
  } = useAccount();

  useEffect(() => {
    if (isConnected && wagmiAddress) {
      setAddress(wagmiAddress);
    } else if (isDisconnected) {
      setAddress(null);
    }
  }, [isConnected, wagmiAddress, setAddress, isDisconnected]);

  return (
    <>
      {(walletLoading || isUserLoading || isConnecting || isReconnecting) && (
        <Spinner />
      )}
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
  return (
    <WalletProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RoutesLayout />
        </QueryClientProvider>
      </WagmiProvider>
    </WalletProvider>
  );
}

export default UsersRoutes;
