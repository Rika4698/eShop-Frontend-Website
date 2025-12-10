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

  }),
   overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetMyProfileQuery,

} = authApi;
