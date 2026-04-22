// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { baseAPI } from "@/redux/baseAPI/baseApi";
// import type { 
//   PaginatedConversationsResponse, 
//   TMessage,
//   PaginatedMessagesResponse 
// } from "@/redux/types/messageType/message.type";

// const messageAPI = baseAPI.injectEndpoints({
//   endpoints: (build) => ({
//     messageSend: build.mutation<any, TMessage>({
//       query: (data) => ({
//         url: "/chat/messages/send/",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Message"],
//     }),
//     allProvidersThreadsGet: build.query<PaginatedConversationsResponse, void>({
//       query: () => ({
//         url: "/chat/threads/",
//         method: "GET",
//       }),
//       providesTags: ["Message"],
//     }),
//     getThreadMessages: build.query<PaginatedMessagesResponse, string>({
//       query: (threadId) => ({
//         url: `/chat/threads/${threadId}/messages/`,
//         method: "GET",
//       }),
//       providesTags: ["Message"],
//     }),
//   }),
// });

// export const { 
//   useMessageSendMutation, 
//   useAllProvidersThreadsGetQuery,
//   useGetThreadMessagesQuery,
//   useLazyGetThreadMessagesQuery 
// } = messageAPI;



/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { PaginatedConversationsResponse, TMessage } from "@/redux/types/messageType/message.type";

const messageAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        messageSend: build.mutation<any, TMessage>({
            query: (data) => ({
                url: "/chat/messages/send/",
                method: "POST",  
                body: data,
            }),
            invalidatesTags: ["Message"],
        }),
        allProvidersThreadsGet: build.query<PaginatedConversationsResponse, void>({
            query: () => ({
                url: "/chat/threads/",
                method: "GET",
            }),
            providesTags: ["Message"],
        }),
    }),
});

export const { useMessageSendMutation, useAllProvidersThreadsGetQuery } = messageAPI;