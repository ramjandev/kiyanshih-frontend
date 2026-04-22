import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { GetAllJobs } from "@/redux/types/jobsType/jobsPost.type";

const userOverviewAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    userOverviewGet: build.query({
      query: () => ({
        url: "/user-dashboard/overview/",
        method: "GET",
      }),
      providesTags: ["Overview"],
    }),
    getAllJobsPost: build.query({
      query: () => ({
        url: "/user-dashboard/job-postings/",
        method: "GET",
      }),
      providesTags: ["JobsPost"],
    }),
    getAllMyJobs: build.query <GetAllJobs, void> ({
      query: () => ({
        url: "/user-dashboard/my-jobs/",
        method: "GET",
      }),
      providesTags: ["JobsPost"],
    }),
  }),
});

export const { useUserOverviewGetQuery } = userOverviewAPI;
