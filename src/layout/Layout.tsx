import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const { pathname } = useLocation();

  const hidePaths = [
    "/login",
    "/client-signup",
    "/provider-signup",
    "/success",
    "/booking/success",
    "/payment/success",
  ];

  const shouldShowNavbar =
    !hidePaths.includes(pathname) &&
    pathname !== "/admin-dashboard" &&
    !pathname.startsWith("/admin-dashboard/");

  return (
    <div>
      <main>
        {shouldShowNavbar && <Navbar />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
