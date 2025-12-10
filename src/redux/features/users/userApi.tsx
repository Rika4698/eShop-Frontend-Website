import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { IUser } from "@/types/modal";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

     getAllTypeUsers: builder.query({
      query: () => {
          return {
              url: `/users/all`,
          };
      },
      transformResponse: (response: TResponseRedux<IUser[]>) => {
          return {
              data: response.data,
              meta: response.meta,
          };
      },

      providesTags: ["users"],
  }),

  updateUserStatus: builder.mutation({
    query: ({ userId, status }: { userId: string; status: string }) => ({
      url: `/users/${userId}/status`,
      method: "PATCH",
      body: { status },
    }),
    invalidatesTags: ["users"],
  }),


    deleteUser: builder.mutation({
    query: (userId) => ({
      url: `/users/${userId}`, 
      method: "DELETE",
      body: { userId }
    }),
  
    invalidatesTags: ["users"],
  }),
  



  }),
  
});

export const {
useGetAllTypeUsersQuery, 
useUpdateUserStatusMutation,
useDeleteUserMutation,

} = userApi;
