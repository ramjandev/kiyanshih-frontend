import { timeAgo } from "@/help/dateConversion";
import { LuCircleCheckBig } from "react-icons/lu";

import { Calendar, Edit, Eye, FileText, Rocket, Star } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";

interface JobProps {
  id: number;
  title: string;
  image: string;
  location?: string;
  budget?: string;
  isBoosted?: boolean;
  postedTime?: string;
  postedBy?: string;
  status?: string;
  showActions?: boolean;
  views?: number;
  applications?: number;
  bookings?: number;
  rating?: number;
  showSubmit?: boolean;
}

const MiniJobCard: FC<JobProps> = ({
  title,
  image,
  location,
  budget,
  rating,
  isBoosted,
  postedTime,
  status,
  showActions,
  showSubmit,
  views,
  applications,
  bookings,
  postedBy,
  id,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      {/* Responsive flex layout */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div className="w-full sm:w-40 md:w-40 lg:w-40 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-20 sm:h-full rounded-lg object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="grid gap-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  {isBoosted && (
                    <Link
                      className="cursor-pointer"
                      to={`/dashboard/provider-dashboard/boost-Service/${id}`}
                    >
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                        Boost
                      </span>
                    </Link>
                  )}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {location}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  Budget: <span className="text-gray-700">${budget}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {timeAgo(postedTime || "")}
                </p>
                <p className="text-xs text-gray-400 mt-1">{postedBy}</p>
              </div>

              {/* Status + menu */}
              <div className="flex items-center gap-2 self-end sm:self-start">
                {status && (
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          {showActions && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600 mt-3">
              {/* icons */}
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  {views} views
                </span>
                <span className="flex items-center gap-1">
                  <FileText size={16} />
                  {applications} applications
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {bookings} bookings
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  {rating}
                </span>
              </div>

              {/* actions */}
              <div className="flex flex-wrap gap-2">
                {isBoosted ? (
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Rocket size={16} />
                    Boosted
                  </button>
                ) : (
                  <Link
                    to="/provider-dashboard/boost-service"
                    className="cursor-pointer"
                  >
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Rocket size={16} />
                      Boost
                    </button>
                  </Link>
                )}
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            </div>
          )}

          {/* Submit Proposal Section */}
          {showSubmit && (
            <div className="flex flex-col sm:flex-row md:justify-between gap-2 mt-4">
              {status === "" ? (
                <Link to={`/provider-dashboard/submit-proposal/${id}`}>
                  <button className="bg-orange-500 hover:bg-orange-600 w-fit text-white px-6 py-2 rounded-lg text-sm font-medium  cursor-pointer ">
                    Submit Proposal
                  </button>
                </Link>
              ) : (
                <div className="flex gap-1 items-center">
                  <span>
                    <LuCircleCheckBig size={16} className="text-green-500" />
                  </span>
                  <span className="text-green-500">Proposal Submitted</span>
                </div>
              )}
              {/* ----edit details buttons-- */}
              <div className="flex gap-6">
                <Link
                  to="/provider-dashboard/messages"
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex-1 sm:flex-none"
                >
                  Message
                </Link>
                <Link
                  to={`/provider-dashboard/available-job/${id}`}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex-1 sm:flex-none cursor-pointer"
                >
                  Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniJobCard;
