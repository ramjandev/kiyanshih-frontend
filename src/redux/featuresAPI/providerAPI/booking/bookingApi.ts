import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  AllBookingListResponse,
  BookingDetailsResponse,
  BookingStatsResponse,
} from "./types/booking";
import type { BookingRequest } from "./types/work";

const bookingApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllBookingStats: build.query<BookingStatsResponse, void>({
      query: () => ({
        url: `/provider-dashboard/service-bookings/statistics/`,
        method: "GET",
      }),
    }),
    allBookings: build.query<AllBookingListResponse, void>({
      query: () => ({
        url: `/provider-dashboard/service-bookings/pending/`,
        method: "GET",
      }),
      providesTags: ["ProviderBookingsWork"],
    }),
    bookingDetails: build.query<BookingDetailsResponse, number>({
      query: (id) => ({
        url: `/provider-dashboard/service-bookings/${id}/detail/`,
        method: "GET",
      }),
    }),
    startWork: build.mutation<any, { data: BookingRequest; id: number }>({
      query: ({ id, data }) => ({
        url: `/provider-dashboard/service-bookings/${id}/start/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProviderBookingsWork"],
    }),
    completedWork: build.mutation<any, number>({
      query: (id) => ({
        url: `/provider-dashboard/service-bookings/${id}/complete/`,
        method: "POST",
      }),
      invalidatesTags: ["ProviderBookingsWork"],
    }),
    rejectBooking: build.mutation<any, { id: number; data: string }>({
      query: ({ id, data }) => ({
        url: `/provider-dashboard/service-bookings/${id}/reject/`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["ProviderBookingsWork"],
    }),
  }),
});

export const {
  useGetAllBookingStatsQuery,
  useAllBookingsQuery,
  useBookingDetailsQuery,
  useStartWorkMutation,
  useCompletedWorkMutation,
  useRejectBookingMutation,
} = bookingApi;
