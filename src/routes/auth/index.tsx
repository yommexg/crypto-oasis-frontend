import { useLocation, useNavigate } from "react-router-dom";
import { getAuthModalComponent, isAuthModalPath } from "../../modals/Auth";

function AuthRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const AuthModalComponent = isAuthModalPath(path)
    ? getAuthModalComponent(path)
    : null;

  if (!AuthModalComponent) return null;

  return (
    <AuthModalComponent
      isOpen={true}
      onClose={() => navigate("/")}
    />
  );
}

export default AuthRoutes;
