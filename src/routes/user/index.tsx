import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Dashboard, Games, Profile, Settings } from "../../pages";
import { Header, Sidebar } from "../../components";
import { wagmiConfig } from "../../config/wagmi";

const queryClient = new QueryClient();

function UsersRoutes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default UsersRoutes;
