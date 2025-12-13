/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    getAllOrders: builder.query({
      query: (queryObj) => {
        const { page, limit, customerId, vendorId } = queryObj || {};

        let url = "/orders/all-order";
        let params = new URLSearchParams();

        if (vendorId) {
          params.append("vendorId", vendorId);
        }

        if (customerId) {
          params.append("customerId", customerId);
        }

        if (page && limit) {
          params.append("page", page);
          params.append("limit", limit);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["orders"],
    }),


     placeOrder: builder.mutation({
      query: (orderInfo) => {
        return {
          url: "/orders/create-order",
          method: "POST",
          body: orderInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["orders"],
    }),

    getOrderByTransaction: builder.query({
  query: (transactionId) => ({
    url: `/orders/transaction/${transactionId}`,
    method: "GET",
  }),
  transformResponse: (response: TResponseRedux<any>) => {
    return response.data;
  },
  providesTags: ["orders"],
}),


  }),
});


export const { 

useGetAllOrdersQuery,
usePlaceOrderMutation,
useGetOrderByTransactionQuery,

 } = orderApi;