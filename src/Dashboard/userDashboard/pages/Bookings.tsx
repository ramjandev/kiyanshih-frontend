import React, { useState, useMemo } from "react";
import CommonWrapper from "@/common/space/CommonWrapper";
import BookingTabs from "../userComponents/reuseable/BookingTabs";
import ServiceCard from "../userComponents/reuseable/ServiceCard";
import BookingStatusBadge from "../userComponents/reuseable/BookingStatusBadge";
import Pagination from "@/common/custom/Pagination";
import UserServiceDashboard from "../userComponents/UserServiceCard";
import { useGetAllBookingsQuery, useGetSingleBookingDetailsQuery } from "@/redux/featuresAPI/userAPI/bookings.api";
import { Loader2, Calendar, Clock, User, Phone, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface BookingDetailPanelProps {
  bookingId: number;
}

const BookingDetailPanel: React.FC<BookingDetailPanelProps> = ({ bookingId }) => {
  const { data, isLoading, isError } = useGetSingleBookingDetailsQuery(bookingId.toString());

  if (isLoading) {
    return (
      <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-6 flex justify-center items-center gap-2 text-sm text-slate-500 animate-pulse mt-2">
        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        <span>Loading booking details...</span>
      </div>
    );
  }

  if (isError || !data?.booking) {
    return (
      <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 text-sm text-rose-600 flex items-center gap-2 mt-2">
        <AlertCircle className="w-4 h-4" />
        <span>Failed to load detailed booking data.</span>
      </div>
    );
  }

  const { booking } = data;

  return (
    <div className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-4 sm:p-6 mt-2 space-y-6 transition-all duration-300">
      {/* Header / Sub-title */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
        <h4 className="font-bold text-[#0F172A] text-sm sm:text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          Booking Reference #{booking.id}
        </h4>
        <span className="text-xs text-slate-400">
          Created on {new Date(booking.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Provider & Notes Info */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Service Provider</span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden border border-blue-200">
                {booking.provider_profile_picture ? (
                  <img src={booking.provider_profile_picture} alt={booking.provider_name} className="w-full h-full object-cover" />
                ) : (
                  booking.provider_name ? booking.provider_name[0].toUpperCase() : <User className="w-5 h-5" />
                )}
              </div>
              <div>
                <h5 className="font-semibold text-sm text-slate-800">{booking.provider_name || "N/A"}</h5>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {booking.provider_phone || "No phone provided"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">User Notes</span>
            <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100 min-h-[60px]">
              {booking.user_notes || "No custom notes provided for this booking."}
            </p>
          </div>
        </div>

        {/* 2. Schedule & Status Details */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Schedule</span>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-100">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="font-medium">
                  {new Date(booking.booking_date).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-100">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{booking.time_slot}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Verification & Confirmation</span>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              {booking.confirmed_by_user ? (
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirmed by Client</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Pending Client Confirmation</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Pricing Summary (Digital Invoice Style) */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Cost Breakdown</span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>Service Fee</span>
                <span className="font-medium">${Number(booking.service_price).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Platform Fee</span>
                <span className="font-medium">${Number(booking.platform_fee).toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-100 my-2 pt-2 flex items-center justify-between text-sm font-bold text-[#0F172A]">
                <span>Total Amount</span>
                <span className="text-blue-600 text-base">${Number(booking.total_amount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase">Payment Status</span>
              <span className={`font-semibold ${booking.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {booking.payment_status_display}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-right">
              <span className="text-[9px] font-bold text-slate-400 uppercase">Booking Status</span>
              <span className={`font-semibold ${booking.status === 'completed' ? 'text-emerald-600' : booking.status === 'cancelled' ? 'text-rose-600' : 'text-blue-600'}`}>
                {booking.status_display}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BookingCardWrapperProps {
  booking: any;
  isExpanded: boolean;
  onViewDetails: () => void;
  onBookAgain: () => void;
  onWriteReview: () => void;
  onStatusClick: () => void;
}

const BookingCardWrapper: React.FC<BookingCardWrapperProps> = ({
  booking,
  isExpanded,
  onViewDetails,
  onBookAgain,
  onWriteReview,
  onStatusClick,
}) => {
  const { isLoading: isDetailsLoading } = useGetSingleBookingDetailsQuery(
    booking.booking_id.toString(),
    { skip: !isExpanded }
  );

  return (
    <ServiceCard
      id={booking.booking_id}
      imageSrc={booking.service_image}
      name={booking.service_title}
      providerName={booking.provider?.name}
      verified={booking.provider?.provider_profile_verification === "verified"}
      locationText={booking.service_area}
      startingPrice={booking.total_amount}
      rating={booking.service_rating}
      reviewCount={booking.service_reviews_count}
      status={booking.service_status}
      statusLabel={
        <BookingStatusBadge
          status={booking.service_status}
          onClick={onStatusClick}
        />
      }
      onViewDetails={onViewDetails}
      onBookAgain={onBookAgain}
      onWriteReview={onWriteReview}
      isDetailsLoading={isDetailsLoading}
      bookingDate={booking.booking_date}
      timeSlot={booking.time_slot}
      expandedContent={
        isExpanded ? (
          <BookingDetailPanel bookingId={booking.booking_id} />
        ) : undefined
      }
    />
  );
};

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBookingId, setExpandedBookingId] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetAllBookingsQuery(undefined);

  console.log("bookings data", data);

  // Define all status tabs as per design/requirement
  const statusTabs = ["All", "Pending", "Confirmed", "Accepted", "In Progress", "Completed", "Rejected", "Cancelled"];

  // Map status counts from the API response
  const statusCounts = useMemo(() => {
    if (!data?.status_counts) return {};
    return {
      "All": data.status_counts.all,
      "Pending": data.status_counts.pending,
      "Confirmed": data.status_counts.confirmed,
      "Accepted": data.status_counts.accepted,
      "In Progress": data.status_counts.in_progress,
      "Completed": data.status_counts.completed,
      "Rejected": data.status_counts.rejected,
      "Cancelled": data.status_counts.cancelled,
    };
  }, [data]);


  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    if (!data?.results) return [];
    if (activeTab === "All") return data.results;

    // Map UI tab names to API status keys/values
    const tabToStatusMap: Record<string, string[]> = {
      "Pending": ["pending", "pending_payment"],
      "Confirmed": ["confirmed"],
      "Accepted": ["accepted"],
      "In Progress": ["in_progress"],
      "Completed": ["completed"],
      "Rejected": ["rejected"],
      "Cancelled": ["cancelled"],
    };

    const targetStatuses = tabToStatusMap[activeTab] || [activeTab.toLowerCase().replace(" ", "_")];

    return data.results.filter(booking => {
      const bookingStatus = booking.service_status.toLowerCase();
      return targetStatuses.some(status => bookingStatus.includes(status));
    });
  }, [data, activeTab]);

  const handleViewDetails = (id: number) => {
    if (expandedBookingId === id) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(id);
    }
  };

  const handleBookAgain = (id: number) => {
    console.log("Book again service:", id); 
  };

  const handleWriteReview = (id: number) => {
    console.log("Write review for service:", id);
  };

  const handleStatusClick = (id: number, status: string) => {
    console.log("Status clicked for service:", id, "Status:", status);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <CommonWrapper>
      <div>
        <UserServiceDashboard stats={data?.dashboard} />
      </div>
      <div className="py-6">
        <BookingTabs
          title="Booking services"
          description="View All Bookings customers have Done"
          tabs={statusTabs}
          activeTab={activeTab}
          setTab={handleTabChange}
          counts={statusCounts}
        />

        <div className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#007BFF]"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-500">
              Failed to load bookings. Please try again later.
            </div>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCardWrapper
                key={booking.booking_id}
                booking={booking}
                isExpanded={expandedBookingId === booking.booking_id}
                onViewDetails={() => handleViewDetails(booking.booking_id)}
                onBookAgain={() => handleBookAgain(booking.booking_id)}
                onWriteReview={() => handleWriteReview(booking.booking_id)}
                onStatusClick={() => handleStatusClick(booking.booking_id, booking.service_status)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-sm text-gray-500 border border-dashed border-gray-300 rounded-md bg-gray-50">
              {activeTab === "All"
                ? "Don't have any service booking data"
                : `Don't have service booking ${activeTab} data`
              }
            </div>
          )}
        </div>

        {data && data.count > 10 && (
          <div className="mt-8 md:mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.count / 10)}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </CommonWrapper>
  );
};

export default Bookings;
