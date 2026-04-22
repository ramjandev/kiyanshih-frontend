import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  AdminActionPayload,
  AdminActionResponse,
  ProviderDetailsResponse,
  ProviderParams,
  ProvidersResponse,
} from "./types/provider";

const providerApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllProviders: build.query<ProvidersResponse, ProviderParams>({
      query: (params) => ({
        url: "/admin-dashboard/providers/",
        method: "GET",
        params,
      }),
      providesTags: ["ProviderInfo"],
    }),

    getSingleProvider: build.query<ProviderDetailsResponse, number>({
      query: (id) => ({
        url: `/admin-dashboard/providers/${id}/`,
        method: "GET",
      }),
      providesTags: ["ProviderInfo"],
    }),
    approveProvider: build.mutation<
      AdminActionResponse,
      { id: number; data: AdminActionPayload }
    >({
      query: ({ id, data }) => ({
        url: `/admin-dashboard/background-check/${id}/verify/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProviderInfo"],
    }),
  }),
});

export const {
  useGetAllProvidersQuery,
  useGetSingleProviderQuery,
  useApproveProviderMutation,
} = providerApi;
