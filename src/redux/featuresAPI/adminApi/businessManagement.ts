import type { ReleasedPaymentsResponse } from "@/Dashboard/Admin/pages/payment/relased";
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  SubscriptionDetailsResponse,
  SubscriptionResponse,
  TransactionsResponse,
} from "./types/business";
import type {
  PaymentAwaitingResponse,
  PaymentStatisticsResponse,
} from "./types/payment";
import type { ProviderParams } from "./types/provider";
import type {
  PaymentDetailsResponse,
  PaymentReleaseBeforeResponse,
} from "./types/reundAndRelease";

const businessApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptions: build.query<SubscriptionResponse, ProviderParams>({
      query: (params) => ({
        url: "/admin-dashboard/subscription/",
        method: "GET",
        providesTags: ["businessManagement"],
        params,
      }),
    }),
    getSubscriptionDetails: build.query<SubscriptionDetailsResponse, number>({
      query: (id) => ({
        url: `/admin-dashboard/subscription/${id}/`,
        method: "GET",
        providesTags: ["businessManagement"],
      }),
    }),
    getTransactions: build.query<TransactionsResponse, ProviderParams>({
      query: (params) => ({
        url: "/admin-dashboard/transactions/",
        method: "GET",
        params,
      }),
    }),
    getPaymentStatus: build.query<PaymentStatisticsResponse, void>({
      query: () => ({
        url: "/admin-dashboard/payments/stats/",
        method: "GET",
      }),
    }),
    getPaymentAwaitingRelease: build.query<
      PaymentAwaitingResponse,
      ProviderParams
    >({
      query: (params) => ({
        url: "/admin-dashboard/payments/awaiting-release/",
        method: "GET",
        params,
      }),
      providesTags: ["awaiting"],
    }),
    getPaymentRelease: build.query<ReleasedPaymentsResponse, ProviderParams>({
      query: () => ({
        url: "/admin-dashboard/payments/released/",
        method: "GET",
      }),
    }),
    getPaymentReviewForRelease: build.query<
      PaymentReleaseBeforeResponse,
      number
    >({
      query: (id) => ({
        url: `/admin-dashboard/payments/${id}/review-for-release/`,
        method: "GET",
      }),
    }),
    getPaymentReviewForRefund: build.query<PaymentDetailsResponse, number>({
      query: (id) => ({
        url: `/admin-dashboard/payments/${id}/review-for-refund/`,
        method: "GET",
      }),
    }),
    paymentRelease: build.mutation<
      any,
      { id: number; data: { admin_notes: string } }
    >({
      query: ({ id, data }) => ({
        url: `/admin-dashboard/payments/${id}/release/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["awaiting"],
    }),
    paymentRefund: build.mutation<
      any,
      { id: number; data: { admin_notes: string } }
    >({
      query: ({ id, data }) => ({
        url: `/admin-dashboard/payments/${id}/refund/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["awaiting"],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionDetailsQuery,
  useGetTransactionsQuery,
  useGetPaymentStatusQuery,
  useGetPaymentAwaitingReleaseQuery,
  useGetPaymentReleaseQuery,
  useGetPaymentReviewForReleaseQuery,
  useGetPaymentReviewForRefundQuery,
  usePaymentReleaseMutation,
  usePaymentRefundMutation,
} = businessApi;
