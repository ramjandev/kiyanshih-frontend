import { useState } from "react";
import JobCardItem from "./common/JobCard";
import type { TJob } from "@/redux/types/jobsType/jobsPost.type";

interface AllJobsProps {
  jobs: TJob[];
  activeTab?: string;
  showActions?: boolean;
}

const AllJobs: React.FC<AllJobsProps> = ({ jobs, activeTab, showActions }) => {
  const [viewingJobId, setViewingJobId] = useState<number | null>(null);

  return (
    <div className="space-y-4 mb-4 md:mb-6">
      {activeTab === "Proposals" && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Proposals by Job Posting
          </h2>
          <p className="text-slate-500 text-sm">
            View all proposals organized by your job postings
          </p>
        </div>
      )}

      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCardItem
            key={job.id}
            job={job}
            viewProposals={viewingJobId === job.id}
            setViewProposals={(show) => setViewingJobId(show ? job.id : null)}
            showActions={showActions}
          />
        ))
      ) : (
        <div className="text-sm text-gray-500 text-center py-8 border border-dashed border-gray-300 rounded-md bg-gray-50 mt-6 md:mt-10">
          No jobs found in this category.
        </div>
      )}
    </div>
  );
};

export default AllJobs;
