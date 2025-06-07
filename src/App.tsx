import { useEffect, useState } from "react";

import { CookieFooter, Spinner } from "./components";
import { LandingPage } from "./pages";
import Cookies from "js-cookie";
import { Login, TermsOfService } from "./modals";

function App() {
  const user = false;

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("acceptedTerms");
    if (accepted === "true") {
      setAcceptedTerms(true);
    }

    setAppLoading(false);
  }, []);

  useEffect(() => {
    if (!acceptedTerms || showModal) {
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
  }, [acceptedTerms, showModal]);

  useEffect(() => {
    const cookieAccepted = Cookies.get("cookiesAccepted");
    if (cookieAccepted === "true") {
      setAcceptedCookies(true);
    }
  }, []);

  const handleAcceptCookies = (value: boolean) => {
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
    setAcceptedCookies(value);
  };

  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true");
    setAcceptedTerms(true);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
          !acceptedTerms || showModal ? "opacity-70 pointer-events-none" : ""
        } transition-opacity duration-300`}>
        <div className="bg-[#0e0e13] text-white">
          {!user && (
            <>
              <LandingPage handleShowModal={handleShowModal} />
            </>
          )}
          {!acceptedCookies && (
            <CookieFooter handleAcceptCookies={handleAcceptCookies} />
          )}
        </div>
      </div>
      {!acceptedTerms && !user && <TermsOfService onAccept={handleAccept} />}
      {acceptedTerms && !user && (
        <Login
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
