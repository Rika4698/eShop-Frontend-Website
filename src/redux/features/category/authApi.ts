/* eslint-disable @typescript-eslint/no-explicit-any */


import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
   
   getMyProfile: builder.query<{ userData: any }, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => ({
        userData: response.data, 
      }),
      providesTags: ["users"],
    }),

    getSingleVendor: builder.query({
      query: (id: string) => {
        return {
          url: `/users/get-vendor/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["users"],
    }),


    getSingleCustomer: builder.query({
      query: (email: string) => {
        return {
          url: `/users/get-customer/${email}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["users"],
    }),


    changePassword: builder.mutation({
      query: (passwordInfo) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: passwordInfo,
        };
      },
      invalidatesTags: ["users"],
    }),


    forgotPassword: builder.mutation({
      query: (userData) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: userData,
        };
      },
      invalidatesTags: ["users"],
    }),

  }),
   overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetMyProfileQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useGetSingleCustomerQuery,
  useGetSingleVendorQuery,

} = authApi;
