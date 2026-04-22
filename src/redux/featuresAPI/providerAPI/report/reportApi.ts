import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { ProviderReportStats } from "./types/report";

const reportApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    providerReport: build.query<ProviderReportStats, void>({
      query: () => ({
        url: "/provider-dashboard/report/",
        method: "GET",
      }),
    }),
  }),
});

export const { useProviderReportQuery } = reportApi;
