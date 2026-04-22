import React, { useState, useMemo } from "react";
import CommonWrapper from "@/common/space/CommonWrapper";
import BookingTabs from "../userComponents/reuseable/BookingTabs";
import ServiceCard from "../userComponents/reuseable/ServiceCard";
import BookingStatusBadge from "../userComponents/reuseable/BookingStatusBadge";
import Pagination from "@/common/custom/Pagination";
import UserServiceDashboard from "../userComponents/UserServiceCard";
import { useGetAllServiceBookingsQuery } from "@/redux/featuresAPI/userAPI/bookings.api";
import { useUserOverviewGetQuery } from "@/redux/featuresAPI/userAPI/overview.api";

// Helper function to normalize status from API to tab label
const normalizeStatus = (apiStatus: string): string => {
  // Handle special case first
  if (apiStatus === "accepted_complete_request") return "Completed";

  // Convert snake_case or kebab-case to Title Case
  const normalized = apiStatus
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return normalized;
};

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch ALL bookings without status filter
  const { data, isLoading, isError } = useGetAllServiceBookingsQuery({
    page: currentPage,
    // Don't pass status - fetch all data
  }, { refetchOnMountOrArgChange: true });

  const { data: statsData } = useUserOverviewGetQuery(undefined);

  console.log("bookings data", data);

  // Define all status tabs as per design/requirement
  const statusTabs = ["All", "Pending", "Confirmed", "Accepted", "In Progress", "Completed", "Rejected"];

  // Calculate counts dynamically from the fetched data
  const statusCounts: Record<string, number> = useMemo(() => {
    const counts: Record<string, number> = {
      "All": data?.pagination.total_items || 0,
    };

    // Initialize all tabs with 0
    statusTabs.forEach(tab => {
      if (tab !== "All") counts[tab] = 0;
    });

    // Count each status from results
    data?.results.forEach(booking => {
      const status = normalizeStatus(booking.status);
      if (counts[status] !== undefined) {
        counts[status] = (counts[status] || 0) + 1;
      }
    });

    return counts;
  }, [data]);


  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    if (!data?.results) return [];
    if (activeTab === "All") return data.results;

    return data.results.filter(booking => {
      const normalizedStatus = normalizeStatus(booking.status);
      return normalizedStatus === activeTab;
    });
  }, [data, activeTab]);

  const handleViewDetails = (id: number) => {
    console.log("View details for service:", id);
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
        <UserServiceDashboard stats={statsData} />
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
              <ServiceCard
                id={booking.id}
                key={booking.id}
                imageSrc={booking.service_image}
                name={booking.service_title}
                providerName={booking.provider_name}
                verified={true}
                locationText="Remote"
                startingPrice={booking.total_amount}
                rating={5.0}
                reviewCount={0}
                status={booking.status}
                statusLabel={
                  <BookingStatusBadge
                    status={booking.status}
                    onClick={() => handleStatusClick(booking.id, booking.status)}
                  />
                }
                onViewDetails={() => handleViewDetails(booking.id)}
                onBookAgain={() => handleBookAgain(booking.id)}
                onWriteReview={() => handleWriteReview(booking.id)}
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

        {data && data.pagination.total_pages > 1 && (
          <div className="mt-8 md:mt-12">
            <Pagination
              currentPage={data.pagination.current_page}
              totalPages={data.pagination.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </CommonWrapper>
  );
};

export default Bookings;





// import React, { useState, useMemo } from "react";
// import CommonWrapper from "@/common/space/CommonWrapper";
// import { serviceCardData, type ServiceStatus } from "@/lib/serviceCardData";
// import BookingTabs from "../userComponents/reuseable/BookingTabs";
// import ServiceCard from "../userComponents/reuseable/ServiceCard";
// import BookingStatusBadge from "../userComponents/reuseable/BookingStatusBadge";
// import Pagination from "@/common/custom/Pagination";

// const Bookings: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<ServiceStatus>("Pending");

//   // Define all status tabs
//   const statusTabs: ServiceStatus[] = [
//     "Pending",
//     "Accepted",
//     "Rejected",
//     "In-progress",
//     "Completed",
//   ];

//   // Calculate counts for each status
//   const statusCounts = useMemo(() => {
//     const counts: Partial<Record<ServiceStatus, number>> = {};
//     statusTabs.forEach((status) => {
//       counts[status] = serviceCardData.filter(
//         (item) => item.statusLabel === status
//       ).length;
//     });
//     return counts;
//   }, []); // Add dependency

//   // Filter data based on active tab - CRITICAL FIX
//   const filteredData = useMemo(() => {
//     return serviceCardData.filter((item) => item.statusLabel === activeTab);
//   }, []); // Add both dependencies

//   const handleViewDetails = (id: number) => {
//     console.log("View details for service:", id);
//     // Add your navigation logic here
//   };

//   const handleStatusClick = (id: number, status: ServiceStatus) => {
//     console.log("Status clicked for service:", id, "Status:", status);
//     // Add your status click logic here
//   };

//   return (
//     <CommonWrapper>
//       <div className="py-6">
//         <BookingTabs
//           title="Booking services"
//           description="View  All Bookings customers have Done"
//           tabs={statusTabs}
//           activeTab={activeTab}
//           setTab={setActiveTab}
//           counts={statusCounts}
//         />

//         <div className="space-y-4 mt-6">
//           {filteredData.length > 0 ? (
//             filteredData.map((service) => (
//               <ServiceCard
//                 key={service.id}
//                 imageSrc={service.imageSrc}
//                 name={service.name}
//                 verified={service.verified}
//                 locationText={service.location}
//                 startingPrice={service.startingPrice}
//                 rating={service.rating}
//                 reviewCount={service.reviewCount}
//                 statusLabel={
//                   <BookingStatusBadge
//                     status={service.statusLabel}
//                     onClick={() => handleStatusClick(service.id, service.statusLabel)}
//                   />
//                 }
//                 onViewDetails={() => handleViewDetails(service.id)}
//               />
//             ))
//           ) : (
//             <div className="text-center py-12 text-gray-500">
//               No bookings found with status: {activeTab}
//             </div>
//           )}
//         </div>
//         <div className="mt-8 md:mt-12">
//             <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
//         </div>
//       </div>
//     </CommonWrapper>
//   );
// };

// export default Bookings;