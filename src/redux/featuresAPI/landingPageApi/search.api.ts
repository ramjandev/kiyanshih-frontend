import { baseAPI } from "@/redux/baseAPI/baseApi";

type SearchParams = {
    q?: string;
    lat?: number;
    lon?: number;
    max_distance?: number;
    min_rating?: number;
    keyword?: string;
    page?: number;
    limit?: number;
};

const searchAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        featuredServicesSearchGet: build.query<any, SearchParams>({
            query: (params) => ({
                url: "/search/",
                method: "GET",
                params,
            }),
            providesTags: ["Search"],
        }),
        searchServices: build.query<any, SearchParams>({
            query: (params) => ({
                url: "/search/",
                method: "GET",
                params,
            }),
            providesTags: ["Search"],
        }),
    }),
});

export const { useFeaturedServicesSearchGetQuery, useSearchServicesQuery } = searchAPI;
