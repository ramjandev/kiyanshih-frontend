import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { CategoriesResponse, SubCategoryResponse } from "./types/category";
import type { AdminActionResponse, ProviderParams } from "./types/provider";
import type { UsersResponse } from "./types/user";

const categoriesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<CategoriesResponse, ProviderParams>({
      query: (params) => ({
        url: "/admin-dashboard/categories/",
        method: "GET",
        params,
      }),
      providesTags: ["Category"],
    }),
    getSingleCategory: build.query<SubCategoryResponse, number>({
      query: (id) => ({
        url: `/admin-dashboard/categories/${id}/`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    postCategory: build.mutation<AdminActionResponse, FormData>({
      query: (data) => ({
        url: "/admin-dashboard/categories/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: build.mutation<
      AdminActionResponse,
      { id: number; data: FormData }
    >({
      query: ({ data, id }) => ({
        url: `/admin-dashboard/categories/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation<AdminActionResponse, number>({
      query: (id) => ({
        url: `/admin-dashboard/categories/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    getUserData: build.query<UsersResponse, ProviderParams>({
      query: (params) => ({
        url: "/admin-dashboard/users/",
        method: "GET",
        params,
      }),
      providesTags: ["userManagement"],
    }),
  }),
});

export const {
  usePostCategoryMutation,
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useGetUserDataQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
