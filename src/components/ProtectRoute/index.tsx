import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { ACCESS_TOKEN, ROUTES } from "../../utils/constants";
import { getValueFromLocalStorage } from "../../utils/handler";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = getValueFromLocalStorage(ACCESS_TOKEN);

  if (!token) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectRoute;
