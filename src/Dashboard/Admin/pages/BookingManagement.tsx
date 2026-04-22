import Pagination from "@/common/custom/Pagination";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useGetBookingApiQuery } from "@/redux/featuresAPI/adminApi/bookingApi";
import { useEffect, useState } from "react";
import SearchFilter from "../common/SearchFilter";

import LoadingStatus from "@/common/custom/LoadingStatus";
import { useDebounce } from "@/help/useDebounce";
import type { BookingStatus } from "@/redux/featuresAPI/adminApi/types/booking";
import DashboardTopSection from "../common/DashboardTopSection";
import SharedTable from "../components/booking/SharedTable";
import Tablist from "../components/booking/Tablist";

const DefaultTabs: BookingStatus[] = [
  "All Bookings",
  "Pending",
  "Accepted",
  "Rejected",
  "In-Progress",
  "Completed",
  "Cancelled",
];

const BookingManagement = () => {
  const [tab, setTab] = useState<BookingStatus>("All Bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch bookings
  const { data, isLoading } = useGetBookingApiQuery(
    tab === "All Bookings" ? {} : { status: tab },
    { refetchOnMountOrArgChange: true }
  );

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [tab, searchTerm]);

  const bookings = data?.data ?? [];

  // Filter bookings by search term (case-insensitive)
  const filteredBookings = bookings.filter((b) => {
    const term = debouncedSearchTerm.toLowerCase();
    return (
      b.customer_info?.name?.toLowerCase().includes(term) ||
      b.customer_info.email?.toLowerCase().includes(term) ||
      b.customer_info.phone?.toLowerCase().includes(term) ||
      b.status?.toLowerCase().includes(term) ||
      b.provider_info?.name?.toLowerCase().includes(term) ||
      b.provider_info.email?.toLowerCase().includes(term) ||
      b.provider_info.phone?.toLowerCase().includes(term)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  // Counts for tabs
  const counts = {
    "All Bookings": data?.counts?.all_bookings ?? 0,
    Pending: data?.counts?.pending ?? 0,
    Accepted: data?.counts?.accepted ?? 0,
    Rejected: data?.counts?.rejected ?? 0,
    "In-Progress": data?.counts?.in_progress ?? 0,
    Completed: data?.counts?.completed ?? 0,
    Cancelled: data?.counts?.cancelled ?? 0,
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
      <DashboardTopSection
        title="All Bookings"
        description="Stay updated on customer bookings and provider responses."
      />

      <Tablist<BookingStatus>
        tabs={DefaultTabs}
        activeTab={tab}
        setTab={setTab}
        counts={counts}
      />

      <CommonBorderWrapper className="!p-10 !border-0">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <LoadingStatus
          isLoading={isLoading}
          items={paginatedBookings}
          itemName="bookings"
        />

        <div className="pt-5">
          {!isLoading && paginatedBookings.length > 0 && (
            <SharedTable bookings={paginatedBookings} />
          )}
        </div>

        {paginatedBookings.length > 0 && (
          <div className="w-full flex items-center justify-center lg:justify-end mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </CommonBorderWrapper>
    </div>
  );
};

export default BookingManagement;
