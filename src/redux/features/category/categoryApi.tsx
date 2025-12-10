/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createCategory: builder.mutation({
      query: (newCategory) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: newCategory, 
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
     
      invalidatesTags: ["category"],
    }),



        getAllCategories: builder.query({
      query: () => {
        return {
          url: "/category/all-category",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["category"],
    }),


    
    updateCategory: builder.mutation({
      query: ({ categoryId, formData }) => ({
        url: `/category/update-category/${categoryId}`,
        method: "PATCH",
        body: formData, 
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      invalidatesTags: ["category"], 
    }),


     deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      invalidatesTags: ["category"], 
    }),

    
  }),
});

export const {
 
 useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  
} = categoryApi;
