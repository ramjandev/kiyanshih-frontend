import { useState, useMemo } from "react";
import CommonSpace from "@/common/space/CommonSpace";
import CommonWrapper from "@/common/space/CommonWrapper";
import UserSectionHeader from "../userComponents/reuseable/UserSectionHeader";
import CurveSearch from "@/components/service/CurveSearch";
import Tablist from "@/Dashboard/Admin/components/booking/Tablist";
import Pagination from "@/common/custom/Pagination";
import Loader from "@/common/Loader";
import { useGetAllMyJobsQuery } from "@/redux/featuresAPI/userAPI/myJobs.api";
import AllJobs from "../userComponents/job/AllJobs";
import type { TJob } from "@/redux/types/jobsType/jobsPost.type";

export type JobsStatus =
  | "All Jobs"
  | "Active"
  | "Proposals"
  | "In-Progress"
  | "Completed"
  | "Cancelled";

const JOBS_PER_PAGE = 6;

const Job = () => {
  const { data, isLoading } = useGetAllMyJobsQuery(undefined);
  const [tab, setTab] = useState<JobsStatus>("All Jobs");
  const [currentPage, setCurrentPage] = useState(1);

  const allJobs: TJob[] = data?.results || [];
  console.log("alll jsobs get here", allJobs);
  // 🔹 Filter jobs
  const filteredJobs = useMemo(() => {
    switch (tab) {
      case "Active":
        // Show all open jobs
        return allJobs.filter((j) => j.status === "open");

      case "Proposals":
        // Show jobs with proposals AND must be OPEN
        return allJobs.filter(
          (j) =>
            j.status === "open" &&
            ((j.applications_count && j.applications_count > 0) ||
              (j.proposals_count && Number(j.proposals_count) > 0))
        );

      case "In-Progress":
        return allJobs.filter((j) => j.status === "in_progress");

      case "Completed":
        return allJobs.filter((j) => j.status === "completed");

      case "Cancelled":
        return allJobs.filter((j) => j.status === "cancelled");

      default:
        return allJobs;
    }
  }, [allJobs, tab]);

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  );

  const handleTabChange = (value: JobsStatus) => {
    setTab(value);
    setCurrentPage(1);
  };

  // 🔹 Counts
  const counts = {
    "All Jobs": allJobs.length,
    Active: allJobs.filter((j) => j.status === "open").length,
    Proposals: allJobs.filter(
      (j) =>
        j.status === "open" &&
        ((j.applications_count && j.applications_count > 0) ||
          (j.proposals_count && Number(j.proposals_count) > 0))
    ).length,
    "In-Progress": allJobs.filter((j) => j.status === "in_progress").length,
    Completed: allJobs.filter((j) => j.status === "completed").length,
    Cancelled: allJobs.filter((j) => j.status === "cancelled").length,
  };

  const JobsTabs: JobsStatus[] = [
    "All Jobs",
    "Active",
    "Proposals",
    "In-Progress",
    "Completed",
    "Cancelled",
  ];

  if (isLoading) {
    return <Loader size={64} color="border-blue-600" />;
  }

  return (
    <CommonWrapper>
      <CommonSpace className="flex-col !gap-6 !items-start">
        <UserSectionHeader
          title="My Jobs"
          subtitle="Tell Us What You Need, We’ll Match You with Providers"
          button="Post a Job"
          buttonLink="/user-dashboard/job-postings"
        />

        <CurveSearch className="!max-w-[340px] !w-full" />
      </CommonSpace>

      <div className="py-6">
        <Tablist
          tabs={JobsTabs}
          activeTab={tab}
          setTab={handleTabChange}
          counts={counts}
        />
      </div>

      <AllJobs jobs={paginatedJobs} activeTab={tab} showActions={tab === "Active" || tab === "Proposals"} />

      {totalPages > 1 && (
        <div className="py-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </CommonWrapper>
  );
};

export default Job;
