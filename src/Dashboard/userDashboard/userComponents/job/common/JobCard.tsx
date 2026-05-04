import { MapPin, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/help/dateConversion";
import type { TJob } from "@/redux/types/jobsType/jobsPost.type";
import JobProposals from "../JobProposals";
import { useNavigate } from "react-router-dom";

interface JobCardItemProps {
  job: TJob;
  viewProposals?: boolean;
  setViewProposals: React.Dispatch<React.SetStateAction<boolean>>;
  onActionClick?: () => void;
  showActions?: boolean;
}

const JobCardItem: React.FC<JobCardItemProps> = ({
  job,
  viewProposals,
  setViewProposals,
  onActionClick,
  showActions = true,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      navigate(`/user-dashboard/my-jobs/${job.id}`);
    }
  };

  const status = job.status;
  const proposalCountDisplay = job.proposals_count || (job.applications_count ? `${String(job.applications_count).padStart(2, "0")} Proposals` : "00 Proposals");
  const proposalCountNumber = job.applications_count || 0;

  // Status Styles Mapping
  const statusStyles: Record<string, { text: string; bg: string; border: string }> = {
    open: {
      text: "text-[#EA580C]",
      bg: "bg-[#FFF7ED]",
      border: "border-[#FED7AA]",
    },
    assigned: {
      text: "text-[#7C3AED]",
      bg: "bg-[#F5F3FF]",
      border: "border-[#DDD6FE]",
    },
    in_progress: {
      text: "text-[#CA8A04]",
      bg: "bg-[#FEFCE8]",
      border: "border-[#FDE68A]",
    },
    completed: {
      text: "text-[#16A34A]",
      bg: "bg-[#F0FDF4]",
      border: "border-[#BBF7D0]",
    },
    cancelled: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    // Default fallback
    default: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    }
  };

  const style = statusStyles[status] || statusStyles.default;
  const statusLabel = job.status_display === "Open" ? "Active" : (job.status_display || status);

  // Determine Badge content
  let badgeContent = statusLabel;

  const badge = (
    <span className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-full border ${style.text} ${style.bg} ${style.border} capitalize`}>
      {badgeContent}
    </span>
  );

  // Determine Button
  let actionButton = null;

  if (viewProposals) {
    actionButton = (
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:bg-gray-100 rounded-full w-10 h-10 cursor-pointer flex items-center justify-center relative z-20"
        onClick={(e) => {
          e.stopPropagation();
          setViewProposals(false);
        }}
      >
        <ChevronUp className="w-6 h-6 pointer-events-none" />
      </Button>
    );
  } else {
    if ((status === "completed" || status === "assigned" || status === "in_progress" || status === "cancelled") && showActions) {
      actionButton = (
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold cursor-pointer relative z-20"
          onClick={(e) => {
            e.stopPropagation();
            setViewProposals(true);
          }}
        >
          View Details
        </Button>
      );
    } else if (status === "open" && proposalCountNumber > 0 && showActions) {
      actionButton = (
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 hover:bg-gray-50 bg-white cursor-pointer px-4 relative z-20"
          onClick={(e) => {
            e.stopPropagation();
            setViewProposals(true);
          }}
        >
          View Proposal
        </Button>
      );
    } else if (status === "open") {
      actionButton = (
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold cursor-pointer relative z-20"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          View Details
        </Button>
      );
    }
  }


  return (
    <div className="bg-white rounded-[10px] border border-gray-200 p-4 transition-shadow hover:shadow-sm">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={
              job.image_url ||
              "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=300&q=80"
            }
            alt={job.title}
            className="w-24 h-24 md:w-32 md:h-24 rounded-[10px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex justify-between h-full">
            <div>
              <h3 className="text-sm md:text-base font-medium text-black mb-1">
                {job.title}
              </h3>
              <div className="flex items-center text-[#716E6E] text-sm mb-2">
                <MapPin className="w-4.5 h-4.5 mr-2 text-[#00A896]" />
                {job.location || "Location, State"}
              </div>
              <div className="text-sm md:text-base font-medium text-black">
                <span className="mr-1">Budget :</span>
                {job.budget_display || `$${Number(job.budget).toFixed(2)}`}
              </div>
              <div className="text-xs text-[#716E6E] mt-1 flex flex-wrap gap-x-3 gap-y-1">
                <span>
                  Posted{" "}
                  {(() => {
                    const timeString = timeAgo(job.created_at);
                    if (
                      timeString === "Just now" ||
                      timeString.includes("hour") ||
                      timeString.includes("day")
                    ) {
                      return timeString;
                    }
                    return job.time_posted || timeString;
                  })()}
                </span>
                {proposalCountNumber > 0 && (
                  <span className="flex items-center">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mr-2" />
                    {proposalCountDisplay}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end justify-between min-w-[120px] relative z-10">
              {badge}
              {actionButton}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Proposals View */}
      {viewProposals && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <JobProposals job={job} setViewProposals={setViewProposals} showActions={showActions} />
        </div>
      )}
    </div>
  );
};

export default JobCardItem;
