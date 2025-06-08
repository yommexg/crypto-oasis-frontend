import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { CookieFooter, Spinner } from "./components";
import { LandingPage } from "./pages";

import { TermsOfService } from "./modals";
import { isAuthModalPath } from "./modals/Auth";

import { useAuth, useUser } from "./store";

import { AuthRoutes, UserRoutes } from "./routes";

function AppContent() {
  const location = useLocation();

  const { isAuthLoading } = useAuth();
  const { isUserLoading, user, setUser, getUser } = useUser();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const path = location.pathname;

  useEffect(() => {
    if (localStorage.getItem("acceptedTerms") === "true") {
      setAcceptedTerms(true);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res) {
        setUser(res);
      }
    };

    fetchUser();
    setAppLoading(false);
  }, [getUser, setUser]);

  useEffect(() => {
    if (!acceptedTerms || isAuthModalPath(path)) {
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

  useEffect(() => {
    if (Cookies.get("cookiesAccepted") === "true") {
      setAcceptedCookies(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
    setAcceptedCookies(true);
  };

  const handleAcceptTerms = () => {
    localStorage.setItem("acceptedTerms", "true");
    setAcceptedTerms(true);
  };

  if (appLoading) return <Spinner />;

  return (
    <div
      className={`relative font-montserrat bg-[#0e0e13] text-white${
        !acceptedCookies ? " pb-24 lg:pb-20" : ""
      }`}>
      <div
        className={`transition-opacity duration-300 ${
          !acceptedTerms || isAuthModalPath(path)
            ? "opacity-30 pointer-events-none"
            : ""
        }`}>
        {!user && <LandingPage />}
        {!acceptedCookies && (
          <CookieFooter handleAcceptCookies={handleAcceptCookies} />
        )}
      </div>

      {!acceptedTerms && !user && (
        <TermsOfService onAccept={handleAcceptTerms} />
      )}

      <>
        {(isAuthLoading || isUserLoading) && <Spinner />}

        {acceptedTerms && !user && <AuthRoutes />}

        {acceptedTerms && user && <UserRoutes />}
      </>
    </div>
  );
}

export default AppContent;
