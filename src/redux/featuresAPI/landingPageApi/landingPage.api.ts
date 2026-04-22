import { baseAPI } from "@/redux/baseAPI/baseApi";
import type { CategoriesApiResponse, SingleCategoryApiResponse, SubcategoriesResponse } from "@/redux/types/landingPage/category.type";
import type { ServiceParams, ServicesResponse } from "@/redux/types/landingPage/service.type";


const landingPageAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    featuredServicesGet: build.query<ServicesResponse, ServiceParams>({
      query: (params) => ({
        url: "/search/services/",
        method: "GET",
        params
      }),
      providesTags: ["Services"],
    }),
    featuredServicesSingleGet: build.query<ServicesResponse, number>({
      query: (id: number) => ({
        url: `/search/services/${id}/`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    getAllCatergory: build.query<CategoriesApiResponse, void>({
      query: () => ({
        url: "/search/categories/",
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    getSingleCategory: build.query<SingleCategoryApiResponse, string>({
      query: (slug: string) => ({
        url: `/search/categories/${slug}/`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    getCategorySubcategories: build.query<SubcategoriesResponse, string>({
      query: (slug: string) => ({
        url: `/search/categories/${slug}/subcategories/`,
        method: "GET",
      }),
      providesTags: ["Services"],
    })
  }),
});

export const { useFeaturedServicesGetQuery, useFeaturedServicesSingleGetQuery, useGetAllCatergoryQuery, useGetSingleCategoryQuery, useGetCategorySubcategoriesQuery } = landingPageAPI;
