import { useGetAllStatsQuery } from "@/redux/featuresAPI/providerAPI/overview/overviewStats.api";
import JobsDashboard from "./JobDashboard/JobsDashboard";

const OverviewPage = () => {
  const { data, isLoading } = useGetAllStatsQuery();

  return <JobsDashboard data={data} isLoading={isLoading} />;
};

export default OverviewPage;
