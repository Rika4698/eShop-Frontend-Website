import { TMeta, TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { IUser } from "@/types/modal";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

 getAllTypeUsers: builder.query<{ data: IUser[]; meta: TMeta }, void>({
      query: () => ({ url: "/users/all" }), // fixed URL
      transformResponse: (response: TResponseRedux<IUser[]>) => ({
        data: response.data || [],
        meta: response.meta || { total: 0, page: 1, limit: 10, totalPage: 1 },
      }),
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


  singleVendorStatusUpdated: builder.mutation({
    query: ({ vendorId, isDeleted }) => ({
      url: `/users/update-vendor-status/${vendorId}`,
      method: "PATCH",
      body: { isDeleted },  
    }),
    invalidatesTags: ["users"],
  }),


    updateVendor: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/update-vendor",
        method: "PATCH",
        body: vendorInfo,
      }),
      invalidatesTags: ["users"],
    }),


    deleteUser: builder.mutation({
    query: (userId) => ({
      url: `/users/${userId}`, 
      method: "DELETE",
      
    }),
  
    invalidatesTags: ["users"],
  }),
  



  }),
  
});

export const {
useGetAllTypeUsersQuery, 
useUpdateUserStatusMutation,
useDeleteUserMutation,
useSingleVendorStatusUpdatedMutation,
useUpdateVendorMutation,

} = userApi;
