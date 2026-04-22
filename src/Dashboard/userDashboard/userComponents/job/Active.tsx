// import JobCardItem from "./common/JobCard";
// import { useState } from "react";
// import type { TJob } from "@/redux/types/jobsType/jobsPost.type";

// interface ActiveProps {
//   jobs?: TJob[];
// }

// const Active = ({ jobs = [] }: ActiveProps) => {
//   const [viewProposalsId, setViewProposalsId] = useState<number | null>(null);

//   // ✅ Only OPEN jobs
//   const activeJobs = jobs.filter((job) => job.status === "open");

//   return (
//     <div className="space-y-4">
//       {activeJobs.length > 0 ? (
//         activeJobs.map((job) => (
//           <JobCardItem
//             key={job.id}
//             job={job}
//             viewProposals={viewProposalsId === job.id}
//             setViewProposals={(value) =>
//               setViewProposalsId(value ? job.id : null)
//             }
//             onActionClick={() => alert(`Clicked: ${job.title}`)}
//           />
//         ))
//       ) : (
//         <p className="text-gray-500">No active jobs found.</p>
//       )}
//     </div>
//   );
// };

// export default Active;
