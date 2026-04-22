import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryAPI,
  tagTypes: [
    "Auth",
    "Overview",
    "userProfile",
    "JobsPost",
    "Bookings",
    "PaymentHistory",
    "Settings",
    "OverviewStats",
    "Jobs",
    "ProviderBookings",
    "ProviderReports",
    "Services",
    "ProviderDashboard",
    "bookingInfo",
    "ProviderInfo",
    "ProviderServices",
    "Category",
    "userManagement",
    "businessManagement",
    "awaiting",
    "ProviderSettings",
    "ProviderBookingsWork",
    "Documents",
    "ChatProvider",
    "Message",
    "Search",
    "Notifications",
    "AdminNotifications",
  ],
  endpoints: () => ({}),
});
