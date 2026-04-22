import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const roleRedirectMap = {
  admin: "/admin-dashboard",
  provider: "/provider-dashboard",
  normal_user: "/user-dashboard",
} as const;

const ProtectedRoute = () => {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Not logged in
  if (!accessToken || !user) {
    return <Navigate to="/" replace />;
  }

  const redirectPath = roleRedirectMap[user.role];

  // Logged in but accessing another role's area
  if (!location.pathname.startsWith(redirectPath)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
