import UserSectionHeader from "../reuseable/UserSectionHeader";
import { GoDotFill } from "react-icons/go";
import { useGetAllMyJobsQuery } from "@/redux/featuresAPI/userAPI/myJobs.api";
import { formatDistanceToNow } from "date-fns";
import CommonLoader from "@/common/CommonLoader";
import { useState } from "react";
import Pagination from "@/common/custom/Pagination";

const RecentActivity = () => {
  const { data: jobsResponse, isLoading: jobsLoading } = useGetAllMyJobsQuery(undefined);

  const jobs = jobsResponse?.results || [];

  // Filter jobs posted in the last 24 hours
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  const recentActivityJobs = jobs.filter(job => 
    new Date(job.created_at) >= twentyFourHoursAgo
  ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(recentActivityJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = recentActivityJobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mb-10">
      <UserSectionHeader
        title="Recent Activity"
        subtitle="View your recent activity"
      />

      <div className="space-y-3">
        {jobsLoading ? (
          <div className="py-10">
            <CommonLoader />
          </div>
        ) : paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <div key={job.id} className="w-full flex flex-col gap-1 border border-border rounded-md p-4 bg-white">
              <div className="flex items-center gap-2 font-medium text-sm text-gray-900">
                <span className="text-[#15803D]">
                  <GoDotFill />
                </span>
                New Job Posted: "{job.title}"
              </div>
              <div className="text-[10px] text-gray-500 ml-5">
                Category: {job.category} • {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-md bg-gray-50">
            <p className="text-sm text-gray-500">No new jobs posted in the last 24 hours.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
