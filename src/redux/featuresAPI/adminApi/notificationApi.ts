import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  CreateNotificationPayload,
  NotificationListResponse,
  NotificationParams,
  UserProfile,
} from "./types/notification";

const notificationApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<UserProfile, void>({
      query: () => ({
        url: `/auth/me/`,
        method: "GET",
      }),
    }),
    getAllNotifications: build.query<NotificationListResponse, void>({
      query: () => ({
        url: `/admin/notifications/`,
        method: "GET",
      }),
      providesTags: ["AdminNotifications"],
    }),
    getSingleNotifications: build.query<
      NotificationListResponse,
      NotificationParams
    >({
      query: (params) => ({
        url: `/admin/notifications/`,
        method: "GET",
        params,
      }),
      providesTags: ["AdminNotifications"],
    }),
    markAsRead: build.mutation<any, CreateNotificationPayload>({
      query: (data) => ({
        url: `/admin/notifications/send_bulk/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["AdminNotifications"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetSingleNotificationsQuery,
  useMarkAsReadMutation,
  useGetProfileQuery,
} = notificationApi;
