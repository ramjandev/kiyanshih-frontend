import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import Spinner from "@/common/custom/Spinner";
import Tablist from "@/Dashboard/Admin/components/booking/Tablist";
import {
  useAllBookingsQuery,
  useBookingDetailsQuery,
  useGetAllBookingStatsQuery,
  useStartWorkMutation,
} from "@/redux/featuresAPI/providerAPI/booking/bookingApi";
import { skipToken } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import BookingDetailsModal from "./BookingDetailsModal";
import BookingStateForProvider from "./BookingStateForProvider";
import ProviderBookingCard from "./ProviderBookingCard";

type BookingStatus =
  | "All Bookings"
  | "Confirmed"
  | "Review Request"
  | "Rejected"
  | "In Progress"
  | "Completed";

const BookingServiceDashboard: React.FC = () => {
  const { data: allBookingsStats, isLoading: isLoadingStats } =
    useGetAllBookingStatsQuery();
  const { data, isLoading } = useAllBookingsQuery();

  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );

  const allBookings = data?.bookings || [];

  const [tab, setTab] = useState<BookingStatus>("All Bookings");
  const loading = new Array(4).fill(null);

  const counts: Record<BookingStatus, number> = {
    "All Bookings": allBookings.length, // Total count
    Confirmed: allBookings.filter((b) => b.status_display === "Confirmed")
      .length,
    "In Progress": allBookings.filter((b) => b.status_display === "In Progress")
      .length,
    Rejected: allBookings.filter((b) => b.status_display === "Rejected").length,
    "Review Request": allBookings.filter(
      (b) => b.status_display === "Review Request",
    ).length,
    Completed: allBookings.filter((b) => b.status_display === "Completed")
      .length,
  };
  const DefaultTabs: BookingStatus[] = [
    "All Bookings",
    "Confirmed",
    "In Progress",
    "Rejected",
    "Review Request",
    "Completed",
  ];
  const filteredBookings = tab
    ? allBookings.filter((booking) => {
        if (tab === "Confirmed") {
          return booking.status_display === "Confirmed";
        }
        if (tab === "Rejected") {
          return booking.status_display === "Rejected";
        }
        if (tab === "In Progress") {
          return booking.status_display === "In Progress";
        }
        if (tab === "Completed") {
          return booking.status_display === "Completed";
        }
        return true;
      })
    : allBookings;

  const { data: bookingDetails, isLoading: isLoadingDetails } =
    useBookingDetailsQuery(selectedBookingId ?? skipToken, {
      refetchOnMountOrArgChange: true,
    });
  // start and complete task
  const [startWork, { isLoading: isLoadingStartWork }] = useStartWorkMutation();
  const handleStartWork = async (bookingId: number) => {
    const booking = allBookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const payload = {
      service_id: bookingId,
      booking_date: booking.booking_date,
      time_slot: booking.time_slot,
    };

    const res = await startWork({
      id: bookingId,
      data: payload,
    }).unwrap();

    toast.success(res?.message || "Work started successfully");
  };

  return (
    <div className="pb-8">
      <div className="">
        {isLoadingStats ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading.map((_, index) => (
              <DashboardCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <BookingStateForProvider
            pending={allBookingsStats?.statistics.pending_requests || 0}
            confirmed={allBookingsStats?.statistics.confirmed_bookings || 0}
            completed={allBookingsStats?.statistics.completed_services || 0}
            revenue={allBookingsStats?.statistics.total_revenue || "0"}
          />
        )}

        {/* Booking Service Section */}
        <div className="bg-white ">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              Booking service
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              View All Bookings customers have Done
            </p>
          </div>

          <Tablist<BookingStatus>
            tabs={DefaultTabs}
            activeTab={tab}
            setTab={setTab}
            counts={counts}
          />
          {isLoading ? (
            <DashboardCardSkeleton />
          ) : (
            <ProviderBookingCard
              activeTab={tab}
              allBookings={filteredBookings}
              setSelectedBookingId={setSelectedBookingId}
              onAccept={handleStartWork}
              isLoadingStartWork={isLoadingStartWork}
            />
          )}
        </div>
      </div>

      {isLoadingDetails ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50">
          <Spinner />
        </div>
      ) : (
        selectedBookingId &&
        bookingDetails && (
          <BookingDetailsModal
            data={bookingDetails}
            onClose={() => setSelectedBookingId(null)}
            onAccept={handleStartWork}
          />
        )
      )}
    </div>
  );
};

export default BookingServiceDashboard;
