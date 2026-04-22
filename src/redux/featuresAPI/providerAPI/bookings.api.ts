/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";

const providerBookingsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllProviderBookings: build.query<any, void>({
      query: () => ({
        url: "/provider-dashboard/bookings/",
        method: "GET",
      }),
      providesTags: ["ProviderBookings"],
    }),
    getSingleProviderBookings: build.query<any, void>({
      query: (id) => ({
        url: `/provider-dashboard/bookings/${id}/`,
        method: "GET",
      }),
      providesTags: ["ProviderBookings"],
    })
  }),
});

export const { useGetAllProviderBookingsQuery, useGetSingleProviderBookingsQuery } = providerBookingsAPI;
