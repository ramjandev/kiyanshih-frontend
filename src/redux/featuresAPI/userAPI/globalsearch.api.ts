/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { GlobalSearchQueryParams } from "@/redux/types/globalSearchType/globalSearch.type";

const globalSearchAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getGlobalSearch: build.query<any, GlobalSearchQueryParams>({
      query: (params) => ({
        url: "/search",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetGlobalSearchQuery } = globalSearchAPI;
