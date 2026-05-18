import React, { useState } from "react";
import verifiedImg from "@/assets/cardImages/verified.svg";
import ReviewDialog from "../ReviewDialog";
import { Link } from "react-router-dom";

// ----- Star Component -----
interface StarProps {
  percent?: number;
  size?: number;
}

const Star: React.FC<StarProps> = ({ percent = 100, size = 16 }) => {
  const orange = "#F59E0B";
  const grey = "#E5E7EB";

  return (
    <span className="inline-block relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} className="block">
        <path
          d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.603L19.335 24 12 19.897 4.665 24 6.25 15.353 0.5 9.75l7.832-1.732L12 .587z"
          fill={grey}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${percent}%`,
          overflow: "hidden",
          height: size,
        }}
      >
        <svg viewBox="0 0 24 24" width={size} height={size} className="block">
          <path
            d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.603L19.335 24 12 19.897 4.665 24 6.25 15.353 0.5 9.75l7.832-1.732L12 .587z"
            fill={orange}
          />
        </svg>
      </div>
    </span>
  );
};

// ----- RatingStars Component -----
interface RatingStarsProps {
  rating?: number;
  size?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating = 0, size = 14 }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const starIndex = i + 1;
    let percent = 0;
    if (rating >= starIndex) percent = 100;
    else if (rating > starIndex - 1 && rating < starIndex) {
      percent = Math.round((rating - (starIndex - 1)) * 100);
    }
    stars.push(<Star key={i} percent={percent} size={size} />);
  }

  return <div className="flex items-center space-x-1">{stars}</div>;
};

// ----- VerifiedBadge Component -----
const VerifiedBadge: React.FC = () => (
  <span className="ml-2 inline-flex items-center justify-center gap-1">
    <img src={verifiedImg} className="w-[14px] h-[14px]" alt="Verified" />
    <span className="text-black text-xs">Verified</span>
  </span>
);

// ----- ServiceCard Component -----
interface ServiceCardProps {
  id: number;
  imageSrc?: string;
  name?: string;
  providerName?: string;
  verified?: boolean;
  locationText?: string;
  startingPrice?: string | number;
  rating?: number;
  reviewCount?: number;
  statusLabel?: React.ReactNode;
  status?: string;
  onViewDetails?: () => void;
  onBookAgain?: () => void;
  onWriteReview?: () => void;
  onStatusClick?: () => void;
  expandedContent?: React.ReactNode;
  isDetailsLoading?: boolean;
  bookingDate?: string;
  timeSlot?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  imageSrc,
  name,
  verified = false,
  locationText,
  startingPrice,
  rating,
  reviewCount,
  statusLabel,
  status,
  onViewDetails,
  onBookAgain,
  onWriteReview,
  onStatusClick,
  expandedContent,
  isDetailsLoading = false,
}) => {
  const s = status?.toLowerCase();

  const showViewDetails = s === "pending" || s === "pending_payment" || s === "completed" || s === "accepted_complete_request" || s === "cancelled";
  const showBookAgain = s === "completed" || s === "accepted_complete_request" || s === "cancelled";
  const showWriteReview = s === "completed" || s === "accepted_complete_request";

  const [openReview, setOpenReview] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch justify-between w-full">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md flex-shrink-0"
            />
          )}

          <div className="min-w-0 flex-1 flex flex-col gap-1">
            {/* Row 1: Title + Verified + Mobile Status */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 min-w-0">
                {/* Using providerName as main title if user implies "Mike Handyman" is provider, 
                     but usually 'name' is service title. The image shows "Mike Handyman service".
                     If that's the service name, good. */}
                <h3 className="text-sm sm:text-base font-semibold text-[#0F172A] truncate">
                  {name}
                </h3>
                {verified && <VerifiedBadge />}
              </div>
              {/* Status Badge for mobile (hidden on md+) */}
              {statusLabel && (
                <div onClick={onStatusClick} className="md:hidden ml-2 flex-shrink-0">
                  {statusLabel}
                </div>
              )}
            </div>

            {/* Row 2: Location */}
            {locationText && (
              <div className="text-xs sm:text-sm text-[#475569]">
                Location: <span className="text-[#0F172A] font-semibold">{locationText.startsWith("-") ? locationText.replace(/^-\s*/, "") : locationText}</span>
              </div>
            )}

            {/* Row 3: Price */}
            {startingPrice && (
              <div className="text-xs sm:text-sm md:text-[15px] text-[#334155] font-medium mt-1">
                Starting : <span className="font-semibold text-[#0F172A]">${startingPrice}</span>
              </div>
            )}

            {/* Row 4: Rating */}
            {rating !== undefined && rating !== null && (
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={rating} size={14} />
                <div className="text-sm text-[#475569] font-medium">
                  {rating.toFixed(1)}{" "}
                  {reviewCount !== undefined && reviewCount !== null && (
                    <span className="text-[#94A3B8] font-normal">({reviewCount} Reviews)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Desktop Status + Buttons */}
        <div className="hidden md:flex flex-col items-end justify-between h-auto min-h-[100px] w-auto flex-shrink-0">

          {/* Status Badge */}
          {statusLabel && (
            <div onClick={onStatusClick}>
              {statusLabel}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col items-end gap-2 mt-auto">
            {showBookAgain && onBookAgain && (
              <div className="flex items-center gap-3 whitespace-nowrap">
                {showViewDetails && onViewDetails && (
                  <button
                    onClick={onViewDetails}
                    disabled={isDetailsLoading}
                    className="text-sm font-medium text-[#475569] hover:underline underline-offset-2 cursor-pointer hover:text-[#0056b3] flex items-center gap-1.5"
                  >
                    {isDetailsLoading && (
                      <svg className="animate-spin h-3.5 w-3.5 text-[#475569]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isDetailsLoading ? "Loading..." : "View Details"}
                  </button>
                )}
                <Link to={`/user-dashboard/book-service/${id}`}>
                  <button
                    className="text-sm font-medium text-[#475569] hover:underline underline-offset-2 cursor-pointer hover:text-[#0056b3]"
                  >
                    Book Again
                  </button>
                </Link>
                {showWriteReview && onWriteReview && (
                  <button
                    onClick={() => {
                      setOpenReview(true);
                      if (onWriteReview) onWriteReview();
                    }}
                    className="text-sm font-medium text-[#007BFF] hover:underline underline-offset-2 cursor-pointer hover:text-[#0056b3]"
                  >
                    Write Review
                  </button>
                )}
              </div>
            )}

            {/* Pending only shows View Details */}
            {!showBookAgain && showViewDetails && onViewDetails && (
              <button
                onClick={onViewDetails}
                disabled={isDetailsLoading}
                className="text-sm font-medium text-[#475569] hover:text-[#0056b3] border-b border-[#94A3B8] hover:border-[#0056b3] pb-0.5 leading-none cursor-pointer flex items-center gap-1.5"
              >
                {isDetailsLoading && (
                  <svg className="animate-spin h-3.5 w-3.5 text-[#475569]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isDetailsLoading ? "Loading..." : "View Details"}
              </button>
            )}

          </div>
        </div>
      </div>

      {expandedContent && (
        <div className="w-full border-t border-slate-100 pt-4 mt-2">
          {expandedContent}
        </div>
      )}

      <ReviewDialog open={openReview} onOpenChange={setOpenReview} />
    </div>
  );
};

export default ServiceCard;
