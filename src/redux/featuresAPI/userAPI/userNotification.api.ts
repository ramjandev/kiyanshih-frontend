import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { NotificationPreferencesUpdatePayload, NotificationsResponse, NotificationStatsResponse, UnreadNotificationsResponse } from "@/redux/types/userTypes/userNotification.type";

const userNotificationAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    userNotificationCreate: build.mutation<any, { notification_ids: number[] }>({
      query: (data) => ({
        url: "/notifications/mark_as_read/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),
    userNotificationGet: build.query<NotificationsResponse, void>({
      query: () => ({
        url: "/notifications/",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
    userUnreadNotificationGet: build.query<UnreadNotificationsResponse, void>({
      query: () => ({
        url: "/notifications/?is_read=false",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
    userNotificationStatsGet: build.query<NotificationStatsResponse, void>({
      query: () => ({
        url: "/notifications/stats/",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
    updateNotificationPreferences: build.mutation<any, { id: string | number; data: NotificationPreferencesUpdatePayload }>({
      query: ({ id, data }) => ({
        url: `/notification-preferences/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { 
  useUserNotificationGetQuery, 
  useUserUnreadNotificationGetQuery, 
  useUserNotificationStatsGetQuery, 
  useUpdateNotificationPreferencesMutation,
  useUserNotificationCreateMutation
} = userNotificationAPI;
