import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { GetAllJobs, JobProposalResponse, PaymentVerifiedResponse, StripeCheckoutResponse, TCreateJobPostResponse, TJobListResponse } from "@/redux/types/jobsType/jobsPost.type";

const userOverviewAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createJobPost: build.mutation<TCreateJobPostResponse, { data: FormData }>({
      query: ({ data }) => ({
        url: "/user-dashboard/job-postings/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["JobsPost", "ProviderBookings", "Bookings"],
    }),
    updateJobPost: build.mutation<TCreateJobPostResponse, { id: string | number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/user-dashboard/job-postings/${id}/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["JobsPost", "ProviderBookings", "Bookings"],
    }),
    getAllJobsPost: build.query<GetAllJobs, void>({
      query: () => ({
        url: "/user-dashboard/job-postings/",
        method: "GET",
      }),
      providesTags: ["JobsPost"],
    }),

    getAllMyJobs: build.query<TJobListResponse, void>({
      query: () => ({
        url: "/user-dashboard/my-jobs/",
        method: "GET",
      }),
      providesTags: ["JobsPost", "ProviderBookings", "Bookings"],
    }),

    getMyJobPostById: build.query({
      query: (id) => ({
        url: `/user-dashboard/job-postings/${id}/`,
        method: "GET",
      }),
      providesTags: ["JobsPost"],
    }),
    // proposals get api by id 
    getMyJobPostProposalsById: build.query<JobProposalResponse, number | string>({
      query: (id) => ({
        url: `/user-dashboard/job-postings/${id}/proposals/`,
        method: "GET",
      }),
      providesTags: ["JobsPost" , "ProviderBookings", "Bookings"],
    }),
    proposalsAccept: build.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/user-dashboard/proposals/${id}/accept/`,
        method: "POST",
      }),
      invalidatesTags: ["JobsPost" , "ProviderBookings", "Bookings"],
    }),
    proposalsAcceptCheckout: build.mutation<{ data: StripeCheckoutResponse }, { id: number }>({
      query: ({ id }) => ({
        url: `/user-dashboard/accept-proposal/${id}/checkout/`,
        method: "POST",
      }),
      invalidatesTags: ["JobsPost" , "ProviderBookings", "Bookings"],
    }),
    proposalsAcceptCheckoutVerify: build.mutation<PaymentVerifiedResponse, { session_id: string }>({
      query: (data) => ({
        url: `/user-dashboard/accept-proposal/verify-payment/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["JobsPost" , "ProviderBookings", "Bookings"],
    }),
    proposalsReject: build.mutation({
      query: ({ id }) => ({
        url: `/user-dashboard/proposals/${id}/reject/`,
        method: "POST",
      }),
      invalidatesTags: ["JobsPost" , "ProviderBookings", "Bookings"],
    }),
  }),
});

export const {
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
  useGetAllJobsPostQuery,
  useGetAllMyJobsQuery,
  useGetMyJobPostByIdQuery,
  useGetMyJobPostProposalsByIdQuery,
  useLazyGetMyJobPostProposalsByIdQuery,
  useProposalsAcceptMutation,
  useProposalsAcceptCheckoutMutation,
  useProposalsRejectMutation,
  useProposalsAcceptCheckoutVerifyMutation,
} = userOverviewAPI;
