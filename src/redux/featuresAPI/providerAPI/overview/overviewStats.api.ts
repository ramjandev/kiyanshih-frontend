import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { TProviderOverviewStats } from "@/redux/types/providerType/overviewStats.type";

const providerOverviewStatsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllStats: build.query<TProviderOverviewStats, void>({
      query: () => ({
        url: "/provider-dashboard/overview/",
        method: "GET",
      }),
      providesTags: ["OverviewStats"],
    }),
  }),
});

export const { useGetAllStatsQuery } = providerOverviewStatsAPI;
