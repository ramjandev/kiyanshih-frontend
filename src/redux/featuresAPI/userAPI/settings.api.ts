/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { TUserSettings, ChangePasswordPayload, ChangePasswordResponse, DeleteAccountPayload, DeleteAccountResponse, UserSettingsResponse, UserSettings } from "@/redux/types/userTypes/userSettings.type";

const userSettingsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllSettings: build.query<TUserSettings, void>({
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
        method: "DELETE", // Reverting to DELETE to see if it makes a difference, but keeping body
        body: payload,
      }),
      invalidatesTags: ["Settings"],
    }),
    updateNotificationSettings: build.mutation<UserSettingsResponse, UserSettings>({
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
