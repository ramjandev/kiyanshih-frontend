import { Outlet, useLocation } from "react-router-dom";
import UserTabs from "@/Dashboard/userDashboard/userComponents/userTabs/UserTabs";
import UserNavbar from "./UserNavbar";

const UserLayout = () => {
  const location = useLocation();
  const { pathname } = location;

  // Hide both nav and tabs for booking checkout
  const hideNavAndTabs = pathname.startsWith("/user-dashboard/booking-checkout");

  // Hide only tabs for profile and job details pages
  const hideTabs = hideNavAndTabs ||
    pathname.startsWith("/user-dashboard/profile") ||
    pathname.includes("/user-dashboard/my-jobs/");

  return (
    <div>
      {!hideNavAndTabs && <UserNavbar />}
      {!hideTabs && <UserTabs />}
      <Outlet />
    </div>
  );
};

export default UserLayout;
