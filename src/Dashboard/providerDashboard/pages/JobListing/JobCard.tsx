import { timeAgo } from "@/help/dateConversion";
import type { ServiceItem } from "@/redux/featuresAPI/providerAPI/service/types/services";
import { Calendar, Eye, FileText, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: ServiceItem;
}
const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 mx-w-5xl">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-40 md:w-48 lg:w-56 h-40 flex-shrink-0">
          <img
            src={job.images?.[0]?.image_url || "/default-image.png"}
            alt={job.provider_name || "Service Image"}
            className="w-full h-40 sm:h-full rounded-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="grid gap-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900">
                    {job.job_title}
                  </h3>
                  {job.base_price && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      Boost
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  {job.service_area}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  Budget:
                  <span className="text-gray-700">{job.base_price}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {timeAgo(job.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-start">
                {job.status && (
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      job.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {job.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600 mt-3">
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {job.views_count} views
              </span>
              <span className="flex items-center gap-1">
                <FileText size={16} />
                {job.availability_count} applications
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {job.availability_count} bookings
              </span>
              <span className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                {job.total_reviews}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.id ? (
                <Link
                  to={`/provider-dashboard/boost-service/${job.id}`}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Rocket size={16} /> Boosted
                </Link>
              ) : (
                <Link to={`/provider-dashboard/boost-service/${job.id}`}>
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Rocket size={16} /> Boost
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
