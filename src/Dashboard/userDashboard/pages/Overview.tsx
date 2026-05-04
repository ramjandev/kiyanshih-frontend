import CommonWrapper from "@/common/space/CommonWrapper";
import PopularServices from "../userComponents/overview/PopularServices";
import OverviewCardSection from "../userComponents/overview/OverviewCardSection";
import MyJob from "../userComponents/overview/MyJob";
import RecentActivity from "../userComponents/overview/RecentActivity";
import { useUserOverviewGetQuery } from "@/redux/featuresAPI/userAPI/overview.api";
import Loader from "@/common/Loader";
import { useGetAllMyJobsQuery } from "@/redux/featuresAPI/userAPI/myJobs.api";

const Overview = () => {
  const { data: overviewCardStats, isLoading } = useUserOverviewGetQuery(undefined);
  const { data: jobs, isLoading: isMyJobsLoading } = useGetAllMyJobsQuery(undefined);
  console.log("overview data", overviewCardStats);
  

  if (isLoading) {
    return <Loader size={64} color="border-blue-600" />;
  }

  return (
    <CommonWrapper>
      <OverviewCardSection overviewCardStats={overviewCardStats} />
      <PopularServices />
      <MyJob jobs={jobs} isLoading={isMyJobsLoading} />
      <RecentActivity />
    </CommonWrapper>
  );
};

export default Overview;