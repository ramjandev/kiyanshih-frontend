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
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
        <div className="w-full flex items-center justify-between">
          <UserSectionHeader
            className="!w-auto !pb-0"
            title="My Jobs"
            subtitle="Tell Us What You Need, We’ll Match You with Providers"
          />
          <button
            onClick={() => navigate("/user-dashboard/job-postings")}
            className="group relative bg-[#1D4ED8] text-white flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap flex-shrink-0 cursor-pointer overflow-hidden border border-transparent"
          >
            {/* Slide-up background */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            {/* Content (Title and Icon) */}
            <div className="relative z-10 flex items-center gap-2 group-hover:text-[#1D4ED8] transition-colors duration-300">
              <Plus className="w-5 h-5 transition-colors duration-300" />
              Post a Job
            </div>
          </button>
        </div>

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
