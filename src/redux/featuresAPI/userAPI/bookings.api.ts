/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { TServiceBookingPayload } from "@/redux/types/userTypes/bookings.type";
import type { ServiceBookingResponse } from "@/redux/types/userTypes/userBookings.type";

const userOverviewAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation<any, TServiceBookingPayload>({
      query: (data) => ({
        url: "/provider-dashboard/service-bookings/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    getAllBookings: build.query<ServiceBookingResponse, void>({
      query: () => ({
        url: "/user-dashboard/bookings/",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    // getAllServiceBookings: build.query<BookingResponse, { page?: number; status?: string }>({
    //   query: ({ page = 1, status }) => {
    //     const params = new URLSearchParams();
    //     params.append("page", page.toString());
    //     if (status && status !== "All") {
    //       // Map UI status labels to API expected snake_case values
    //       const apiStatus = status
    //         .toLowerCase()
    //         .replace(/\s+/g, "_")    // "In Progress" -> "in_progress"
    //         .replace(/-/g, "_");      // "In-progress" -> "in_progress"
    //       params.append("status", apiStatus);
    //     }
    //     return {
    //       url: `/provider-dashboard/service-bookings/?${params.toString()}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["Bookings"],
    // }),
    // getBookingDetails: build.query<IServiceResponse, number>({
    //   query: (id) => ({
    //     url: `/provider-dashboard/services/${id}/detail/`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Bookings"],
    // }),
  }),
});

export const {  useCreateBookingMutation, useGetAllBookingsQuery } = userOverviewAPI;








// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { baseAPI } from "@/redux/baseAPI/baseApi";
// import type { IServiceResponse } from "@/redux/types/userTypes/bookingDetails.type";
// import type { BookingResponse, TServiceBookingPayload } from "@/redux/types/userTypes/bookings.type";

// const userOverviewAPI = baseAPI.injectEndpoints({
//   endpoints: (build) => ({
//     createBooking: build.mutation<any, TServiceBookingPayload>({
//       query: (data) => ({
//         url: "/provider-dashboard/service-bookings/create/",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Bookings"],
//     }),
//     getAllBookings: build.query<any, void>({
//       query: () => ({
//         url: "/user-dashboard/job-postings/",
//         method: "GET",
//       }),
//       providesTags: ["Bookings"],
//     }),
//     getAllServiceBookings: build.query<BookingResponse, { page?: number; status?: string }>({
//       query: ({ page = 1, status }) => {
//         const params = new URLSearchParams();
//         params.append("page", page.toString());
//         if (status && status !== "All") {
//           // Map UI status labels to API expected snake_case values
//           const apiStatus = status
//             .toLowerCase()
//             .replace(/\s+/g, "_")    // "In Progress" -> "in_progress"
//             .replace(/-/g, "_");      // "In-progress" -> "in_progress"
//           params.append("status", apiStatus);
//         }
//         return {
//           url: `/provider-dashboard/service-bookings/?${params.toString()}`,
//           method: "GET",
//         };
//       },
//       providesTags: ["Bookings"],
//     }),
//     getBookingDetails: build.query<IServiceResponse, number>({
//       query: (id) => ({
//         url: `/provider-dashboard/services/${id}/detail/`,
//         method: "GET",
//       }),
//       providesTags: ["Bookings"],
//     }),
//   }),
// });

// export const { useGetAllBookingsQuery, useCreateBookingMutation, useGetBookingDetailsQuery, useGetAllServiceBookingsQuery } = userOverviewAPI;
