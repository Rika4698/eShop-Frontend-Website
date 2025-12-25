import { TMeta, TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { IUser } from "@/types/modal";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

 getAllTypeUsers: builder.query<{ data: IUser[]; meta: TMeta }, void>({
      query: () => ({ url: "/users/all" }), 
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

    updateCustomer: builder.mutation({
      query: (customerInfo) => ({
        url: "/users/update-customer",
        method: "PATCH",
        body: customerInfo,
      }),
      invalidatesTags: ["users"],
    }),


     updateAdmin: builder.mutation({
      query: (customerInfo) => ({
        url: "/users/update-admin",
        method: "PATCH",
        body: customerInfo,
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


     followUser: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/follow",
        method: "POST",
        body: vendorInfo,
      }),
      transformResponse: (response: TResponseRedux<IUser[]>) => {
        return response.data;
      },
      invalidatesTags: ["users"],
    }),


    unfollowUser: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/unfollow",
        method: "DELETE",
        body: vendorInfo,
      }),
      transformResponse: (response: TResponseRedux<IUser[]>) => {
        return response.data;
      },
      invalidatesTags: ["users"],
    }),

     getPublicVendors: builder.query({
      query: (params) => ({
        url: '/users/vendors/all',
        method: 'GET',
        params: params, 
      }),
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
useFollowUserMutation,
useUnfollowUserMutation,
useUpdateCustomerMutation,
useGetPublicVendorsQuery,
useUpdateAdminMutation,

} = userApi;
