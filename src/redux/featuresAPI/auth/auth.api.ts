/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { AuthResponse, ProviderPayment } from "@/redux/user.type";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    registerClient: build.mutation({
      query: (data) => ({
        url: "/auth/user/register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/account/login/",
        method: "POST",
        body: data,
      }),
    }),

    //   login: build.mutation<LoginResponse, LoginRequest>({
    //   query: (data) => ({
    //     url: "/accounts/login/",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),

    verifyOTP: build.mutation({
      query: (data) => ({
        url: "/auth/signup-verify-otp/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    updatePassword: build.mutation({
      query: (payload) => ({
        url: "/user/update-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),

    // provider auth endpoints\\
    registerProvider: build.mutation<AuthResponse, any>({
      query: (data) => ({
        url: "/auth/provider/register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    verifyProviderPayment: build.mutation<AuthResponse, ProviderPayment>({
      query: (data) => ({
        url: "/auth/provider/verify-payment/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterClientMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useUpdatePasswordMutation,
  useRegisterProviderMutation,
  useVerifyProviderPaymentMutation,
} = userAPI;
