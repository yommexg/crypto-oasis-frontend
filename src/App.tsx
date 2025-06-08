import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./AppContent";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<AppContent />}
        />
      </Routes>
    </Router>
  );
}

export default App;
