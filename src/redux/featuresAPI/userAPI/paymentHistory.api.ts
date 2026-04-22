/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { TransactionListResponse } from "@/redux/types/userTypes/userSettings.type";

const userOverviewAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // ✅ FIXED
    getAllPaymentHistory: build.query<TransactionListResponse, { search?: string; from_date?: string; to_date?: string } | void>({
      query: (params) => ({
        url: "/user-dashboard/payment-history/",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["PaymentHistory"],
    })
  }),
});

export const { useGetAllPaymentHistoryQuery } = userOverviewAPI;
