import React, { useState, useMemo } from "react";
import CommonWrapper from "@/common/space/CommonWrapper";
import BookingTabs from "../userComponents/reuseable/BookingTabs";
import ServiceCard from "../userComponents/reuseable/ServiceCard";
import BookingStatusBadge from "../userComponents/reuseable/BookingStatusBadge";
import Pagination from "@/common/custom/Pagination";
import UserServiceDashboard from "../userComponents/UserServiceCard";
import { useGetAllBookingsQuery } from "@/redux/featuresAPI/userAPI/bookings.api";

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

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
              <ServiceCard
                id={booking.booking_id}
                key={booking.booking_id}
                imageSrc={booking.service_image}
                name={booking.service_title}
                providerName={booking.provider.name}
                verified={booking.provider.provider_profile_verification === "verified"}
                locationText={booking.service_area}
                startingPrice={booking.total_amount}
                rating={booking.service_rating}
                reviewCount={booking.service_reviews_count}
                status={booking.service_status}
                statusLabel={
                  <BookingStatusBadge
                    status={booking.service_status}
                    onClick={() => handleStatusClick(booking.booking_id, booking.service_status)}
                  />
                }
                onViewDetails={() => handleViewDetails(booking.booking_id)}
                onBookAgain={() => handleBookAgain(booking.booking_id)}
                onWriteReview={() => handleWriteReview(booking.booking_id)}
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