import { useEffect, useState } from "react";

import { Header, Spinner } from "./components";
import { TermsOfService } from "./pages";

function App() {
  const user = false;

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("acceptedTerms");
    if (accepted === "true") {
      setAcceptedTerms(true);
    }

    setAppLoading(false);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true");
    setAcceptedTerms(true);
  };

  if (appLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative">
      <div
        className={`${
          !acceptedTerms && !user ? "opacity-70 pointer-events-none" : ""
        } transition-opacity duration-300`}>
        <div className="bg-[#0e0e13] text-white min-h-screen p-4">
          <Header />
          {/* Main content goes here */}
        </div>
      </div>

      {!acceptedTerms && !user && <TermsOfService onAccept={handleAccept} />}
    </div>
  );
}

export default App;
