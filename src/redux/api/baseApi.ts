
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
import envData from "@/config/envData";


// function getCookie(name:string):string | null {
//   if(typeof document === "undefined")
//     return null;

//   const value = `;${document.cookie}`;
//   const parts = value.split(`;${name}=`);

//   if(parts.length === 2){
//     return parts.pop()?.split(";").shift() || null;
//   }
//   return null;
// }


    
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envData.baseUrl,
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set("authorization", `${token}`);
    //   }

    //   return headers;
    // },
    // prepareHeaders:(headers)=>{
    //   const token = getCookie("accessToken");
    //    console.log("🔑 Token from cookie:", token ? "Found ✅" : "Missing ❌");
    //   console.log("🔑 Token preview:", token ? token.substring(0, 30) + "..." : "null");
      
    //   if(token){
    //   headers.set("Authorization", token);
    //   console.log("✅ Authorization header set");
    // }
    // return headers;
    // },

    
  }),

  tagTypes: [
    "users",
    "category",
    "products",
    "recent-products",
    "coupons",
    "orders",
    "productsCompare",
    "reviews"
  ],
  endpoints: () => ({}),
});
