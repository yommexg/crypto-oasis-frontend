import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { VerifyEmail } from "./modals";
import AppContent from "./AppContent";
import { FingerprintProvider } from "./context/Fingerprint";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <FingerprintProvider>
              <AppContent />
            </FingerprintProvider>
          }
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
    </Router>
  );
}

export default App;
