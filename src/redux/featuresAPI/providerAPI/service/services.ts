import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { AvailableJobParams } from "@/redux/types/providerType/availavilJobs.type";
import type { ServiceResponse } from "./types/services";

const providerServices = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getServiceForProvider: build.query<ServiceResponse, AvailableJobParams>({
      query: (params) => ({
        url: "/services/",
        method: "GET",
        params,
      }),
      providesTags: ["ProviderServices"],
    }),
  }),
});

export const { useGetServiceForProviderQuery } = providerServices;
