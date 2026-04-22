import type { TJob } from "@/redux/types/jobsType/jobsPost.type";
import JobCardItem from "./common/JobCard";

interface ProposalsProps {
  jobs?: TJob[];
}

const Proposals: React.FC<ProposalsProps> = ({ jobs = [] }) => {
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
        <p className="text-gray-500">No proposals found.</p>
      )}
    </div>
  );
};

export default Proposals;
