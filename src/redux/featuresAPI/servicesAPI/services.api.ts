
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { PaginatedProviderServicesResponse, ServiceDetailsResponse } from "@/redux/types/services/allServices.type";

const servicesAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getAllServices: build.query<PaginatedProviderServicesResponse, Record<string, unknown> | void>({
            query: (params) => ({
                url: "/services/",
                method: "GET",
                params: params || undefined,
            }),
            providesTags: ["Services"],
        }),
        getSingleServices: build.query<ServiceDetailsResponse, number>({
            query: (id) => ({
                url: `/provider-dashboard/services/${id}/detail/`,
                method: "GET",
            }),
            providesTags: ["Services"],
        }),
    }),
});

export const {
    useGetAllServicesQuery,
    useGetSingleServicesQuery,
} = servicesAPI;
