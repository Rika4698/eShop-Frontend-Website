
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
    // baseUrl: "https://eshop-ecommerce-application.vercel.app/api",
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eshop-ecommerce-application.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "users",
    "category",
    "products",
    "recent-products",
    "coupon",
    "orders",
    "productsCompare",
    "reviews"
  ],
  endpoints: () => ({}),
});
