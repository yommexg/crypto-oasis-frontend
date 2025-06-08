import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./AppContent";
import { VerifyEmail } from "./modals";

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
    </Router>
  );
}

export default App;
