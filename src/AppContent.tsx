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
import { useAuthStore } from "./store/useAuthStore";
import { useUserStore } from "./store/useUserStore";
import UsersRoutes from "./pages/Users";

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

  const { isAuthLoading } = useAuthStore();
  const { isUserLoading, user, setUser, getUser } = useUserStore();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const path = location.pathname;

  const isAuthModalPath = (path: string): path is ModalPath =>
    path in authModalRoutes;

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

  const AuthModalComponent = isAuthModalPath(path)
    ? authModalRoutes[path]
    : null;

  return (
    <div
      className={`relative font-montserrat bg-[#0e0e13] text-white${
        !acceptedCookies ? "pb-24 lg:pb-20" : ""
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
        {acceptedTerms && !user && AuthModalComponent && (
          <AuthModalComponent
            isOpen={true}
            onClose={() => navigate("/")}
          />
        )}

        {acceptedTerms && user && <UsersRoutes />}
      </>
    </div>
  );
}

export default AppContent;
