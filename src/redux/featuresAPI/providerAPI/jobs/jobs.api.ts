import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  AvailableJobParams,
  AvailableJobsResponse,
  JobsResponse,
} from "@/redux/types/providerType/availavilJobs.type";

import type {
  BoostCheckoutResponse,
  JobProposal,
  ServiceBoost,
} from "../service/types/services";
import type { JobDetails } from "./types/jobDetails";
import type { SingleJobDetails } from "./types/singleJob";

const providerJobsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query<AvailableJobsResponse, AvailableJobParams>({
      query: (params) => ({
        url: "/provider-dashboard/available-jobs/",
        method: "GET",
        params,
      }),
      providesTags: ["Jobs"],
    }),
    getSingleJobs: build.query<SingleJobDetails, number>({
      query: (id) => ({
        url: `/provider-dashboard/jobs/${id}/`,
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    getMyJobs: build.query<JobsResponse, void>({
      query: () => ({
        url: "/provider-dashboard/my-jobs/",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    JobDetails: build.query<JobDetails, number>({
      query: (id) => ({
        url: `/provider-dashboard/jobs/${id}/`,
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    postingJobs: build.mutation<any, FormData>({
      query: (data) => ({
        url: "/provider-dashboard/services/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    submitProposal: build.mutation<any, { id: number; data: JobProposal }>({
      query: ({ data, id }) => ({
        url: `/provider-dashboard/jobs/${id}/apply/`,
        method: "POST",
        body: data,
      }),
    }),
    serviceBoast: build.mutation<BoostCheckoutResponse, ServiceBoost>({
      query: (data) => ({
        url: `/provider-dashboard/boost/checkout/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetMyJobsQuery,
  usePostingJobsMutation,
  useSubmitProposalMutation,
  useServiceBoastMutation,
  useGetSingleJobsQuery,
  useJobDetailsQuery,
} = providerJobsAPI;
