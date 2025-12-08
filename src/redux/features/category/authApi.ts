/* eslint-disable @typescript-eslint/no-explicit-any */

import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    getMyProfile: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          userData: response.data,
        };
      },
      providesTags: ["users"],
    }),

  }),
});

export const {
  
  useGetMyProfileQuery,

} = authApi;
