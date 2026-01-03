/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

       createReview: builder.mutation({
            query: (reviewInfo) => {
                return {
                    url: "/reviews/create-review",
                    method: "POST",
                    body: reviewInfo,
                };
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data;
            },
            invalidatesTags: ["reviews","orders"],
        }),

        
        getAllReviews: builder.query({
    query: (queryObj) => {
        const { page, limit, vendorId, productId } = queryObj || {};

        let url = "/reviews/all-review";
        let params = new URLSearchParams();

        if (vendorId) {
            params.append("vendorId", vendorId);
        }

        if (productId) {
            params.append("productId", productId);
        }

        if (page && limit) {
            params.append("page", page.toString());
            params.append("limit", limit.toString());
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        return {
            url,
            method: "GET",
        };
    },
    transformResponse: (response: TResponseRedux<any>) => {
        // Handle nested data structure
        return {
            data: response.data?.data || response.data || [],
            meta: response.data?.meta || response.meta || {
                total: 0,
                page: 1,
                limit: 10,
                totalPage: 1,
            },
        };
    },
    providesTags: ["reviews"],
}),



       getReviewsById: builder.query({
            query: (productId) => {
                return {
                    url: `/reviews?productId=${productId}`,
                    method: "GET",
                };
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data;
            },
            providesTags: ["reviews"],
        }),

        createReply: builder.mutation({
            query: (replyInfo) => {
                return {
                    url: "/reviews/create-reply",
                    method: "POST",
                    body: replyInfo,
                };
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return response.data;
            },
            invalidatesTags: ["reviews"], 
        }),



    }),
});




export const {
 
    useGetAllReviewsQuery,
    useCreateReviewMutation,
    useGetReviewsByIdQuery,
    useCreateReplyMutation,
} = reviewApi;
