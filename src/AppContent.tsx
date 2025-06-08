import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { CookieFooter, Spinner } from "./components";
import { LandingPage } from "./pages";
import Cookies from "js-cookie";
import {
  Login,
  NewDeviceLogin,
  Register,
  SendVerificationLink,
  TermsOfService,
} from "./modals";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = false;

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("acceptedTerms");
    if (accepted === "true") {
      setAcceptedTerms(true);
    }
    setAppLoading(false);
  }, []);

  useEffect(() => {
    if (
      !acceptedTerms ||
      location.pathname === "/login" ||
      location.pathname === "/send-verification-link" ||
      location.pathname === "/register" ||
      location.pathname === "/new-device-login"
    ) {
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
  }, [acceptedTerms, location.pathname]);

  useEffect(() => {
    const cookieAccepted = Cookies.get("cookiesAccepted");
    if (cookieAccepted === "true") {
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

  if (appLoading) {
    return <Spinner />;
  }

  return (
    <div
      className={`relative font-montserrat ${
        !acceptedCookies ? "pb-24 lg:pb-20" : ""
      }`}>
      <div
        className={`${
          !acceptedTerms ||
          location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname === "/send-verification-link" ||
          location.pathname === "/new-device-login"
            ? "opacity-80 pointer-events-none"
            : ""
        } transition-opacity duration-300`}>
        <div className="bg-[#0e0e13] text-white">
          {!user && <LandingPage />}
          {!acceptedCookies && (
            <CookieFooter handleAcceptCookies={handleAcceptCookies} />
          )}
        </div>
      </div>

      {!acceptedTerms && !user && (
        <TermsOfService onAccept={handleAcceptTerms} />
      )}

      {/* Modal Route */}
      {acceptedTerms && !user && location.pathname === "/login" && (
        <Login
          isOpen={true}
          onClose={() => navigate("/")}
        />
      )}

      {acceptedTerms &&
        !user &&
        location.pathname === "/send-verification-link" && (
          <SendVerificationLink
            isOpen={true}
            onClose={() => navigate("/")}
          />
        )}

      {acceptedTerms && !user && location.pathname === "/register" && (
        <Register
          isOpen={true}
          onClose={() => navigate("/")}
        />
      )}

      {acceptedTerms && !user && location.pathname === "/new-device-login" && (
        <NewDeviceLogin
          isOpen={true}
          onClose={() => navigate("/")}
        />
      )}
    </div>
  );
}

export default AppContent;
