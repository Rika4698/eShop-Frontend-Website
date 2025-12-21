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
            invalidatesTags: ["reviews"],
        }),

        
        getAllReviews: builder.query({
            query: (queryObj) => {
                const { page, limit, vendorId } = queryObj || {};

                let url = "/reviews/all-review";
                let params = new URLSearchParams();

                if (vendorId) {
                    params.append("vendorId", vendorId);
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
            transformResponse: (response: TResponseRedux<any>) => response.data,
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
