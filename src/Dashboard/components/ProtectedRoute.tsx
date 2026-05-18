import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const roleRedirectMap = {
  admin: "/admin-dashboard",
  provider: "/provider-dashboard",
  normal_user: "/user-dashboard",
} as const;

interface ProtectedRouteProps {
  isPublicAuth?: boolean;
}

const ProtectedRoute = ({ isPublicAuth = false }: ProtectedRouteProps) => {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // If this is a public auth page (like login/signup)
  if (isPublicAuth) {
    if (accessToken && user && user.role in roleRedirectMap) {
      const redirectPath = roleRedirectMap[user.role as keyof typeof roleRedirectMap];
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  }

  // Otherwise, this is a protected dashboard page
  if (!accessToken || !user) {
    return <Navigate to="/" replace />;
  }

  const redirectPath = roleRedirectMap[user.role as keyof typeof roleRedirectMap];

  // Logged in but accessing another role's area
  if (redirectPath && !location.pathname.startsWith(redirectPath)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
