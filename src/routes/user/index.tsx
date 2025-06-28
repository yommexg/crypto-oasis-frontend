import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ThirdwebProvider, useIsAutoConnecting } from "thirdweb/react";

import { Dashboard, Games, Profile, Settings } from "../../pages";
import { Header, Sidebar, Spinner } from "../../components";
import { useGame, useUser } from "../../store";
import CreateGame from "../../modals/Game/Create";

function RoutesLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isWalletLoading = useIsAutoConnecting();

  return (
    <>
      {isWalletLoading && <Spinner />}
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

  const { isUserLoading } = useUser();
  const { isGameLoading } = useGame();

  return (
    <ThirdwebProvider>
      {(isUserLoading || isGameLoading) && <Spinner />}

      <Routes location={background || location}>
        <Route
          path="/*"
          element={
            <div
              className={`transition-opacity duration-300 ${
                path === "/create-game" ? "opacity-30 pointer-events-none" : ""
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
    </ThirdwebProvider>
  );
}

export default UsersRoutes;
