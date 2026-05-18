import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { UserProfile, UserProfileResponse } from "@/redux/types/userTypes/userProfile.type";

const userProfileAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        // socialPostForum: build.mutation({
        //   query: (data) => ({
        //     url: "/social-post/forum/post",
        //     method: "POST",
        //     body: data,
        //   }),
        //   invalidatesTags: ["Overview"],
        // }),
        userProfileGet: build.query<UserProfile, void>({
            query: () => ({
                url: "/auth/me/",
                method: "GET",
            }),
            providesTags: ["userProfile"],
        }),
        // singleForumGet: build.query({
        //   query: (id) => ({
        //     url: `/social-post/forum/get-single/${id}`,
        //     method: "GET",
        //   }),
        //   providesTags: ["Overview"],
        // }),
        userProfileUpdate: build.mutation<UserProfileResponse, FormData | { body: any }>({
            query: (data) => ({
                url: "/user-dashboard/profile/update/",
                method: "PUT",
                body: data instanceof FormData ? data : data.body,
            }),
            invalidatesTags: ["userProfile"],
        }),
        deletePaymentMethods: build.mutation({
            query: ({ id }) => ({
                url: `/user-dashboard/settings/payment-methods/${id}/delete/`,
                method: "DELETE",
            }),
            invalidatesTags: ["PaymentHistory"],
        }),
        setDefaultPaymentMethod: build.mutation({
            query: ({ id, body }) => ({
                url: `/user-dashboard/settings/payment-methods/${id}/update/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["PaymentHistory"],
        }),

    }),
});

export const { useUserProfileGetQuery, useUserProfileUpdateMutation, useDeletePaymentMethodsMutation, useSetDefaultPaymentMethodMutation } = userProfileAPI;
