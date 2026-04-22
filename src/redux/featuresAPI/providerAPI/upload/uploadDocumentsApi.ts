import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  BackgroundCheckPaymentType,
  CheckoutSessionResponse,
} from "./types/document";

const uploadDocumentsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getVerificationData: build.query<BackgroundCheckPaymentType, void>({
      query: () => ({
        url: `/verification/provider/verification/payment-info/`,
        method: "GET",
      }),
      providesTags: ["Documents"],
    }),
    postPersonalData: build.mutation<any, FormData>({
      query: (data) => ({
        url: `/verification/provider/verification/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Documents"],
    }),
    checkoutForPlan: build.mutation<CheckoutSessionResponse, void>({
      query: (data) => ({
        url: `/verification/provider/verification/payment/`,
        method: "POST",
        body: data,
      }),
    }),
    verifyCheckoutForPlan: build.mutation<any, { session_id: string }>({
      query: (session_id) => ({
        url: `/verification/provider/verification/payment/verify/`,
        method: "POST",
        body: session_id,
      }),
    }),
  }),
});

export const {
  useGetVerificationDataQuery,
  usePostPersonalDataMutation,
  useCheckoutForPlanMutation,
  useVerifyCheckoutForPlanMutation,
} = uploadDocumentsApi;
