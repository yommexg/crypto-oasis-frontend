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
      {(walletLoading || isUserLoading) && <Spinner />}
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
