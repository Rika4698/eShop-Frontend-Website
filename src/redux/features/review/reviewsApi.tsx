/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
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
    }),
});




export const {
 
    useGetAllReviewsQuery,
} = reviewApi;
