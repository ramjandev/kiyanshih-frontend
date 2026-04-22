import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  ConversationListResponse,
  CountResponse,
  SendMessagePayload,
  StripeCheckoutResponse,
} from "./types/message";
import type { Proposal } from "./types/proposal";
import type { MessageListResponse } from "./types/singleUser";

const messageAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllUserForChat: build.query<ConversationListResponse, void>({
      query: () => ({
        url: `/chat/threads/`,
        method: "GET",
      }),
      providesTags: ["ChatProvider"],
    }),
    getSingleUserForChat: build.query<MessageListResponse, number>({
      query: (id) => ({
        url: `/chat/threads/${id}/messages/`,
        method: "GET",
      }),
      providesTags: ["ChatProvider"],
    }),
    getUnreadMessage: build.query<CountResponse, void>({
      query: () => ({
        url: `/chat/unread-count/`,
        method: "GET",
      }),
      providesTags: ["ChatProvider"],
    }),
    sendMessageToUser: build.mutation<any, SendMessagePayload>({
      query: (data) => ({
        url: `/chat/messages/send/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChatProvider"],
    }),
    creteCustomProposal: build.mutation<any, Proposal>({
      query: (data) => ({
        url: `/provider-dashboard/negotiations/create-proposal/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChatProvider"],
    }),
    acceptCustomProposal: build.mutation<any, number>({
      query: (id) => ({
        url: `/user-dashboard/negotiations/proposals/${id}/accept/`,
        method: "POST",
      }),
    }),
    rejectCustomProposal: build.mutation<any, number>({
      query: (id) => ({
        url: `/user-dashboard/negotiations/proposals/${id}/reject/`,
        method: "POST",
      }),
    }),
    postPaymentCustomProposal: build.mutation<StripeCheckoutResponse, number>({
      query: (id) => ({
        url: `/user-dashboard/accept-proposal/${id}/checkout/`,
        method: "POST",
      }),
    }),
    verifyPaymentCustomProposal: build.mutation<any, { session_id: string }>({
      query: (data) => ({
        url: `/user-dashboard/accept-proposal/verify-payment/`,
        method: "POST",
        body: data,
      }),
    }),
    registerFCM: build.mutation<any, { token: string; device_type: string }>({
      query: (data) => ({
        url: `/chat/fcm/register/`,
        method: "POST",
        body: data,
      }),
    }),
    unRegisterFCM: build.mutation<any, { token: string }>({
      query: (data) => ({
        url: `/chat/fcm/register/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUserForChatQuery,
  useGetSingleUserForChatQuery,
  useGetUnreadMessageQuery,
  useSendMessageToUserMutation,
  useCreteCustomProposalMutation,
  useAcceptCustomProposalMutation,
  useRejectCustomProposalMutation,
  usePostPaymentCustomProposalMutation,
  useVerifyPaymentCustomProposalMutation,
  useRegisterFCMMutation,
  useUnRegisterFCMMutation,
} = messageAPI;
export default messageAPI;
