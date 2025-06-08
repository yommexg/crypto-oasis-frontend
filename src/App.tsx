import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./AppContent";
import { VerifyEmail } from "./modals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />
        <Route
          path="*"
          element={<AppContent />}
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
