import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import Pagination from "@/common/custom/Pagination";
import Tablist from "@/Dashboard/Admin/components/booking/Tablist";
import { useGetAllJobsQuery } from "@/redux/featuresAPI/providerAPI/jobs/jobs.api";
import { useState } from "react";
import MiniJobCard from "../JobDashboard/MiniJobCard";

type TabType = "all" | "pending" | "accepted" | "rejected";

const AvailableJobs = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllJobsQuery(
    { page },
    { refetchOnMountOrArgChange: true },
  );
  const isLoadingList = new Array(5).fill(null);
  const [tab, setTab] = useState<TabType>("all");

  const availableJob =
    data?.results.filter((job) => {
      switch (tab) {
        case "all":
          return true;
        case "pending":
          return job.application_status === "pending";
        case "accepted":
          return job.application_status === "accepted";
        case "rejected":
          return job.application_status === "rejected";
        default:
          return false;
      }
    }) ?? [];

  const counts = data?.counts;

  const tabDefinitions: { key: TabType; label: string }[] = [
    { key: "all", label: "All Jobs" },
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Accepted" },
    { key: "rejected", label: "Rejected" },
  ];
  return (
    <div className="">
      <div className="pb-5">
        <Tablist
          tabs={tabDefinitions.map((tab) => tab.key)}
          activeTab={tab}
          setTab={setTab}
          counts={counts}
        />
      </div>
      {isLoading ? (
        isLoadingList.map((_, index) => <DashboardCardSkeleton key={index} />)
      ) : availableJob.length === 0 ? (
        <div className="py-5">No Jobs Available</div>
      ) : (
        availableJob.map((job) => (
          <MiniJobCard
            key={job.id}
            id={job.id}
            title={job.title}
            location={job.title}
            budget={job.budget}
            postedBy={job.client_name}
            image={job.image_url || ""}
            status={job.application_status || ""}
            showSubmit
          />
        ))
      )}
      <div className="py-5">
        {availableJob.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={data?.pagination.total_pages || 1}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AvailableJobs;
