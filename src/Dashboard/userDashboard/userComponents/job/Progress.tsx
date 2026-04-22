import type { TJob } from "@/redux/types/jobsType/jobsPost.type";
import JobCardItem from "./common/JobCard";

interface ProgressProps {
  jobs?: TJob[];
}

const Progress: React.FC<ProgressProps> = ({ jobs = [] }) => {
  return (
    <div className="space-y-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCardItem
            key={job.id}
            job={job}
            setViewProposals={() => {}}
          />
        ))
      ) : (
        <p className="text-gray-500">No in-progress jobs found.</p>
      )}
    </div>
  );
};

export default Progress;
