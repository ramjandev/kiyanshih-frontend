import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { TProviderProfile } from "@/redux/types/providerType/providerProfile.type";

const providerProfileAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query<TProviderProfile, void>({
      query: () => ({
        url: "/provider-dashboard/profile/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    })
  }),
});

export const {
  useGetProfileDataQuery
} = providerProfileAPI;
