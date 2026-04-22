import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import Pagination from "@/common/custom/Pagination";
import { useGetServiceForProviderQuery } from "@/redux/featuresAPI/providerAPI/service/services";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";

const loading = new Array(10).fill(null);
const JobsListing = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetServiceForProviderQuery({
    page,
    page_size: 5,
  });
  const activeJobs = data?.results || [];

  return (
    <div className="mx-w-7xl mx-auto space-y-8 pt-2">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Active services</h2>
            <p className="text-sm text-gray-600">
              View all your currently active job postings
            </p>
          </div>
          <ButtonWithIcon icon={Plus} className="">
            <Link to="/provider-dashboard/service-posting"> New Listing</Link>
          </ButtonWithIcon>
        </div>
        {isLoading ? (
          loading.map((_, i) => <DashboardCardSkeleton key={i} />)
        ) : activeJobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No active jobs at the moment</p>
          </div>
        ) : (
          activeJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
      {activeJobs.length > 0 && (
        <div className="pb-5">
          <Pagination
            currentPage={page}
            totalPages={data?.pagination.total_pages || 1}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default JobsListing;
