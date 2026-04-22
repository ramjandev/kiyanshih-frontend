import JobCardItem from "./common/JobCard";
import type { TJob } from "@/redux/types/jobsType/jobsPost.type";

interface CompletedProps {
  jobs?: TJob[];
}

const Completed = ({ jobs = [] }: CompletedProps) => {
  // ✅ Only completed jobs
  const completedJobs = jobs.filter(
    (job) => job.status === "completed"
  );

  return (
    <div className="space-y-4">
      {completedJobs.length > 0 ? (
        completedJobs.map((job) => (
          <JobCardItem
            key={job.id}
            job={job}
            setViewProposals={() => {}}
          />
        ))
      ) : (
        <p className="text-gray-500">No completed jobs found.</p>
      )}
    </div>
  );
};

export default Completed;
