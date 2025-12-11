/* eslint-disable prefer-const */

import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    getAllOrders: builder.query({
      query: (queryObj) => {
        const { page, limit, customerId, vendorId } = queryObj || {};

        let url = "/orders";
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
  }),
});


export const { 

useGetAllOrdersQuery

 } = orderApi;