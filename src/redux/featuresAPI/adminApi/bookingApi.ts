import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  BookingListResponse,
  BookingParams,
  DashboardData,
} from "./types/booking";

const bookingApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getBookingApi: build.query<BookingListResponse, BookingParams>({
      query: (params) => ({
        url: "/admin-dashboard/bookings/",
        method: "GET",
        params,
      }),
      providesTags: ["bookingInfo"],
    }),

    downloadPDF: build.query<Blob, void>({
      query: () => ({
        url: "/admin-dashboard/bookings/1/download/",
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
    getAnalytics: build.query<DashboardData, void>({
      query: () => ({
        url: "/admin-dashboard/analytics/",
        method: "GET",
      }),
    }),
    paymentRelease: build.mutation<any, number>({
      query: (id) => ({
        url: `/admin-dashboard/payments/${id}/release/`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetBookingApiQuery,
  useDownloadPDFQuery,
  useLazyDownloadPDFQuery,
  useGetAnalyticsQuery,
  usePaymentReleaseMutation,
} = bookingApi;
