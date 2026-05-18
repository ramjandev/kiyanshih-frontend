/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { TServiceBookingPayload } from "@/redux/types/userTypes/bookings.type";
import type { ServiceBookingResponse, SingleBookingDetailResponse } from "@/redux/types/userTypes/userBookings.type";

const userOverviewAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation<any, TServiceBookingPayload>({
      query: (data) => ({
        url: "/provider-dashboard/service-bookings/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings", "ProviderBookings"],
    }),
    getAllBookings: build.query<ServiceBookingResponse, void>({
      query: () => ({
        url: "/user-dashboard/bookings/",
        method: "GET",
      }),
      providesTags: ["Bookings", "ProviderBookings"],
    }),
    getSingleBookingDetails: build.query<SingleBookingDetailResponse, string>({
      query: (id) => ({
        url: `/user-dashboard/bookings/${id}/`,
        method: "GET",
      }),
      providesTags: ["Bookings", "ProviderBookings"],
    }),
  }),
});

export const { 
  useCreateBookingMutation, 
  useGetAllBookingsQuery, 
  useGetSingleBookingDetailsQuery 
} = userOverviewAPI;

