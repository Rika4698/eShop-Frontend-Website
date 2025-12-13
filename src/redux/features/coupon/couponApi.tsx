/* eslint-disable @typescript-eslint/no-explicit-any */

import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => {
        return {
          url: "/coupons/all",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["coupons"],
    }),



    createCoupon: builder.mutation({
      query: (couponInfo) => {
        return {
          url: "/coupons/create-coupon",
          method: "POST",
          body: couponInfo,
        };
      },
      invalidatesTags: ["coupons"],
    }),




    updateCoupon: builder.mutation({
      query: ({ id, couponInfo }) => {
        return {
          url: `/coupons/${id}`,
          method: "PATCH",
          body: couponInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["coupons"],
    }),



    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;