import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

import { CookieFooter, Spinner } from "./components";
import { LandingPage } from "./pages";

import { TermsOfService } from "./modals";
import { isAuthModalPath } from "./modals/Auth";

import { useAuth, useGame, useUser } from "./store";
import { AuthRoutes, UserRoutes } from "./routes";
import { useFingerPrint } from "./context/Fingerprint";
import { getFingerprint } from "./config/fingerprint";
import { useLoadUserData } from "./utils/loadUserData";

function AppContent() {
  const location = useLocation();

  const { isAuthLoading, accessToken } = useAuth();
  const { isUserLoading, user } = useUser();
  const { isGameLoading } = useGame();

  const { setFingerprint } = useFingerPrint();

  const loadUserData = useLoadUserData();

  // const user = true;

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const hasFetched = useRef(false);

  const path = location.pathname;

  useEffect(() => {
    getFingerprint().then(setFingerprint);
  }, [setFingerprint]);

  useEffect(() => {
    const terms = localStorage.getItem("acceptedTerms") === "true";
    const cookies = Cookies.get("cookiesAccepted") === "true";

    setAcceptedTerms(terms);
    setAcceptedCookies(cookies);
  }, []);

  useEffect(() => {
    if (!hasFetched.current && accessToken) {
      loadUserData();
      hasFetched.current = true;
    }
    setAppLoading(false);
  }, [loadUserData, accessToken]);

  useEffect(() => {
    if (!acceptedTerms || isAuthModalPath(path) || path === "/create-game") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [acceptedTerms, path]);

  const handleAcceptCookies = () => {
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
    setAcceptedCookies(true);
  };

  const handleAcceptTerms = () => {
    localStorage.setItem("acceptedTerms", "true");
    setAcceptedTerms(true);
  };

  if (appLoading) return <Spinner bg="bg-[#0e0e13]" />;

  return (
    <div
      className={`relative font-montserrat bg-[#0e0e13] text-white ${
        !acceptedCookies ? " pb-24 lg:pb-20" : ""
      }`}>
      {!acceptedTerms && <TermsOfService onAccept={handleAcceptTerms} />}

      {!acceptedCookies && (
        <CookieFooter handleAcceptCookies={handleAcceptCookies} />
      )}

      <div
        className={`transition-opacity duration-300 ${
          !acceptedTerms || isAuthModalPath(path)
            ? "opacity-10 pointer-events-none"
            : ""
        }`}>
        {!user && <LandingPage />}
      </div>

      <>
        {(isAuthLoading || isUserLoading || isGameLoading) && <Spinner />}
        {acceptedTerms && !user && <AuthRoutes />}

        {user && (
          <div className="bg-[#202029]">
            <UserRoutes />
          </div>
        )}
      </>
    </div>
  );
}

export default AppContent;
