import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../../pages";

function UsersRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default UsersRoutes;
