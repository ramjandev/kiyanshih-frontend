import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CommonSpace from "@/common/space/CommonSpace";
import UserSectionHeader from "../reuseable/UserSectionHeader";
import JobCardItem from "../job/common/JobCard";
import CommonLoader from "@/common/CommonLoader";

import type { TJobListResponse } from "@/redux/types/jobsType/jobsPost.type";

interface MyJobProps {
  jobs?: TJobListResponse;
  isLoading?: boolean;
}

const JOBS_PER_PAGE = 3;

const MyJob = ({ jobs, isLoading }: MyJobProps) => {

  const navigate = useNavigate();

  const jobList = jobs?.results || [];

  const [viewingJobId, setViewingJobId] = useState<number | null>(null);

  // Filter only jobs with proposals for the Overview page
  // If using API data, we need to filter. If using mock data (which I curated to have proposals), filter is still safe.
  const proposalJobs = jobList.filter(job => job.status === "open" && ((job.applications_count && job.applications_count > 0) || (job.proposals_count && Number(job.proposals_count) > 0)));
  const visibleJobs = proposalJobs.slice(0, JOBS_PER_PAGE);

  const handleSeeAll = () => {
    navigate("/user-dashboard/my-jobs");
  };

  return (
    <CommonSpace>
      <UserSectionHeader
        title="My Jobs"
        subtitle="View all your currently active job postings"
        text="See All"
        onTextClick={handleSeeAll}
      />

      {isLoading ? (
        <CommonLoader />
      ) : (
        <div className="space-y-4">
          {visibleJobs.length > 0 ? (
            visibleJobs.map((job) => (
              <JobCardItem
                key={job.id}
                job={job}
                viewProposals={viewingJobId === job.id}
                setViewProposals={(show) =>
                  setViewingJobId(show ? job.id : null)
                }
                showActions={true}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-8 border border-dashed border-gray-300 rounded-md bg-gray-50">
              No active job proposals found.
            </p>
          )}
        </div>
      )}
    </CommonSpace>
  );
};

export default MyJob;
