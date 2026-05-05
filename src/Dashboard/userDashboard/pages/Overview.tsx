import CommonWrapper from "@/common/space/CommonWrapper";
import PopularServices from "../userComponents/overview/PopularServices";
import OverviewCardSection from "../userComponents/overview/OverviewCardSection";
import MyJob from "../userComponents/overview/MyJob";
import RecentActivity from "../userComponents/overview/RecentActivity";
import { useUserOverviewGetQuery } from "@/redux/featuresAPI/userAPI/overview.api";
import Loader from "@/common/Loader";

const Overview = () => {
  const { data: overviewCardStats, isLoading } = useUserOverviewGetQuery(undefined);
  // console.log("overview data", overviewCardStats);
  

  if (isLoading || !overviewCardStats) {
    return <Loader size={64} color="border-blue-600" />;
  }

  return (
    <CommonWrapper>
      <OverviewCardSection overviewCardStats={overviewCardStats} />
      <PopularServices />
      <MyJob />
      <RecentActivity />
    </CommonWrapper>
  );
};

export default Overview;