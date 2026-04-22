import CommonWrapper from "@/common/space/CommonWrapper";
import OverviewProviderDashboard from "@/Dashboard/providerDashboard/pages/OverviewProviderDashboard/OverviewProviderDashboard";
import ProviderTabs from "@/Dashboard/userDashboard/userComponents/userTabs/ProviderTabs";
import { useGetAllStatsQuery } from "@/redux/featuresAPI/providerAPI/overview/overviewStats.api";
import { Outlet, useLocation } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import WelcomeBanner from "./WelcomeBanner";

const ProviderLayout = () => {
  const { data, isLoading } = useGetAllStatsQuery();
  const { pathname } = useLocation();
  const hiddenPaths = [
    "/provider-dashboard/submit-proposal",
    "/provider-dashboard/service-posting",
    "/provider-dashboard/boost/success",
    "/provider-dashboard/boost-service",
    "/provider-dashboard/verification",
  ];

  const hideTabs = hiddenPaths.some((path) => pathname.startsWith(path));

  return (
    <div>
      {<UserNavbar />}

      <CommonWrapper>
        {!hideTabs && <WelcomeBanner name="Charlotte Davis" />}

        {!hideTabs && <ProviderTabs />}
        {!hideTabs && (
          <OverviewProviderDashboard data={data} isLoading={isLoading} />
        )}

        <Outlet />
      </CommonWrapper>
    </div>
  );
};

export default ProviderLayout;
