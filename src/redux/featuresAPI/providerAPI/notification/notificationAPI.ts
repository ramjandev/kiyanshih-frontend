import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  MarkNotificationsReadRequest,
  NotificationParams,
  NotificationsResponse,
} from "./types/allNotification";

const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllNotifications: build.query<NotificationsResponse, NotificationParams>(
      {
        query: () => ({
          url: `/notifications/`,
          method: "GET",
        }),
        providesTags: ["Notifications"],
      },
    ),
    markNotificationsAsRead: build.mutation<any, MarkNotificationsReadRequest>({
      query: (data) => ({
        url: `/notifications/mark_as_read/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} = notificationAPI;
