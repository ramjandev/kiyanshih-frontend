import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { TProviderReportStats } from "@/redux/types/providerType/report.type";

const providerReportAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllProviderReports: build.query<TProviderReportStats, void>({
      query: () => ({
        url: "/provider-dashboard/report/",
        method: "GET",
      }),
      providesTags: ["ProviderReports"],
    })
  }),
});

export const {
  useGetAllProviderReportsQuery,
} = providerReportAPI;
 