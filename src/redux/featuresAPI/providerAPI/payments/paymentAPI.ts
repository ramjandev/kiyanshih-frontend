import { baseAPI } from "@/redux/baseAPI/baseApi";
import type {
  ChangePasswordPayload,
  DeleteAccountPayload,
  SettingsForProvider,
  SettingsResponse,
} from "../jobs/types/settings";
import type { EarningsResponse, HistoryResponse } from "./types/payment";
import type {
  TransactionParams,
  TransactionsEarningsResponse,
  TransactionsResponse,
} from "./types/transaction";

const paymentAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getEarning: build.query<EarningsResponse, void>({
      query: () => ({
        url: `/provider-dashboard/payments/earnings/`,
        method: "GET",
      }),
    }),
    getHistory: build.query<HistoryResponse, TransactionParams>({
      query: (params) => ({
        url: `/provider-dashboard/payments/history/`,
        method: "GET",
        params,
      }),
    }),
    getTransactionForProvider: build.query<
      TransactionsResponse,
      TransactionParams
    >({
      query: (params) => ({
        url: `/provider-dashboard/payments/transactions/`,
        method: "GET",
        params,
      }),
    }),
    getStateForTransaction: build.query<TransactionsEarningsResponse, void>({
      query: () => ({
        url: `/provider-dashboard/payments/earnings-breakdown/`,
        method: "GET",
      }),
    }),
    getSetting: build.query<SettingsResponse, void>({
      query: () => ({
        url: `/provider-dashboard/settings/`,
        method: "GET",
      }),
      providesTags: ["ProviderSettings"],
    }),
    updateSetting: build.mutation<any, Partial<SettingsForProvider>>({
      query: (data) => ({
        url: `/provider-dashboard/settings/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ProviderSettings"],
    }),
    updatedPassword: build.mutation<any, ChangePasswordPayload>({
      query: (data) => ({
        url: `/provider-dashboard/settings/security/update-password/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProviderSettings"],
    }),
    deleteAccount: build.mutation<any, DeleteAccountPayload>({
      query: (data) => ({
        url: `/provider-dashboard/settings/security/delete-account/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProviderSettings"],
    }),
  }),
});

export const {
  useGetEarningQuery,
  useGetHistoryQuery,
  useGetTransactionForProviderQuery,
  useGetStateForTransactionQuery,
  useGetSettingQuery,
  useUpdatedPasswordMutation,
  useDeleteAccountMutation,
  useUpdateSettingMutation,
} = paymentAPI;
