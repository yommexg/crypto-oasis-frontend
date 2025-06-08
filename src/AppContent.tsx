import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { CookieFooter, Spinner } from "./components";
import { LandingPage } from "./pages";
import {
  Login,
  NewDeviceLogin,
  Register,
  ResetPassword,
  SendForgetOTP,
  SendVerificationLink,
  TermsOfService,
  VerifyForgetOTP,
} from "./modals";

const authModalRoutes = {
  "/login": Login,
  "/send-verification-link": SendVerificationLink,
  "/register": Register,
  "/new-device-login": NewDeviceLogin,
  "/send-forget-otp": SendForgetOTP,
  "/verify-forget-otp": VerifyForgetOTP,
  "/reset-password": ResetPassword,
} as const;

type ModalPath = keyof typeof authModalRoutes;

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const user = false;
  const path = location.pathname;

  const isAuthModalPath = (path: string): path is ModalPath =>
    path in authModalRoutes;

  useEffect(() => {
    if (localStorage.getItem("acceptedTerms") === "true") {
      setAcceptedTerms(true);
    }
    setAppLoading(false);
  }, []);

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

  const AuthModalComponent = isAuthModalPath(path)
    ? authModalRoutes[path]
    : null;

  return (
    <div
      className={`relative font-montserrat ${
        !acceptedCookies ? "pb-24 lg:pb-20" : ""
      }`}>
      <div
        className={`transition-opacity duration-300 ${
          !acceptedTerms || isAuthModalPath(path)
            ? "opacity-80 pointer-events-none"
            : ""
        }`}>
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

      {acceptedTerms && !user && AuthModalComponent && (
        <AuthModalComponent
          isOpen={true}
          onClose={() => navigate("/")}
        />
      )}
    </div>
  );
}

export default AppContent;
