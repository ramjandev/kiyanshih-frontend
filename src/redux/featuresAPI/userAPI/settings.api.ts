/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { ChangePasswordPayload, ChangePasswordResponse, DeleteAccountPayload, DeleteAccountResponse, UserSettingsResponse, Settings } from "@/redux/types/userTypes/userSettings.type";

const userSettingsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllSettings: build.query<UserSettingsResponse, void>({
      query: () => ({
        url: "/user-dashboard/settings/",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
    getNotificationSettings: build.query<UserSettingsResponse, void>({
      query: () => ({
        url: "/user-dashboard/settings/",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
    passwordUpdate: build.mutation<ChangePasswordResponse, ChangePasswordPayload>({
      query: (payload) => ({
        url: "/user-dashboard/settings/security/update-password/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Settings"],
    }),
    deleteAccount: build.mutation<DeleteAccountResponse, DeleteAccountPayload>({
      query: (payload) => ({
        url: "/user-dashboard/settings/security/delete-account/",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Settings"],
    }),
    updateNotificationSettings: build.mutation<UserSettingsResponse, Partial<Settings>>({
      query: (payload) => ({
        url: "/user-dashboard/settings/update/",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetAllSettingsQuery,
  useGetNotificationSettingsQuery,
  usePasswordUpdateMutation,
  useDeleteAccountMutation,
  useUpdateNotificationSettingsMutation
} = userSettingsAPI;
