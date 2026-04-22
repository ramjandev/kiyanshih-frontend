/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import type { TProviderOverviewStats } from "@/redux/types/providerType/overviewStats.type";
import MiniJobCard from "./MiniJobCard";

interface JobsDashboardProps {
  data?: TProviderOverviewStats;
  isLoading: boolean;
}
const JobsDashboard: React.FC<JobsDashboardProps> = ({ data, isLoading }) => {
  const activeService = data?.active_services || [];
  const recentBookings = data?.recent_service_bookings || [];
  const availableJobs = data?.available_jobs || [];

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Active services
              </h2>
              <p className="text-sm text-gray-600">
                View all your currently active job postings
              </p>
            </div>
            {activeService.length > 0 && (
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-lg cursor-pointer hover:underline">
                View All ({activeService.length})
              </button>
            )}
          </div>

          {isLoading ? (
            <DashboardCardSkeleton />
          ) : activeService.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">No active jobs at the moment</p>
            </div>
          ) : (
            activeService.map((job) => (
              <MiniJobCard
                id={job.id}
                key={job.id}
                title={job.job_title}
                image={job.image || "https://placehold.co/80x80/png?text=Job"}
                location={job.location}
                budget={job.budget}
                views={job.views}
                applications={job.applications}
                bookings={job.bookings}
                rating={job.rating}
                status={job.status}
                postedTime={job.location}
                showActions
                isBoosted
              />
            ))
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Bookings
              </h2>
              <p className="text-sm text-gray-600">
                View latest bookings of your job postings
              </p>
            </div>
            {recentBookings.length > 0 && (
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-lg cursor-pointer hover:underline">
                View All ({recentBookings.length})
              </button>
            )}
          </div>

          {isLoading ? (
            <DashboardCardSkeleton />
          ) : recentBookings.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">No recent bookings</p>
            </div>
          ) : (
            recentBookings.map((job) => (
              <MiniJobCard
                id={job.id}
                key={job.id}
                title={job.service_title}
                image={
                  job.service_image || "https://placehold.co/80x80/png?text=Job"
                }
                location={job.status}
                budget={job.amount}
                status={job.status}
                postedBy={job.user_name}
                postedTime={job.created_at}
              />
            ))
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Available jobs
              </h2>
              <p className="text-sm text-gray-600">
                View All jobs customers have posted
              </p>
            </div>
            {availableJobs.length > 0 && (
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-lg cursor-pointer hover:underline">
                View All ({availableJobs.length})
              </button>
            )}
          </div>

          {isLoading ? (
            <DashboardCardSkeleton />
          ) : availableJobs.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">No available jobs at the moment</p>
            </div>
          ) : (
            availableJobs.map((job) => (
              <MiniJobCard
                id={job.id}
                key={job.id}
                title={job.title}
                image={
                  job.image_url || "https://placehold.co/80x80/png?text=Job"
                }
                budget={job.budget}
                status={job.application_status || ""}
                postedBy={job.client_name}
                showSubmit
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsDashboard;
