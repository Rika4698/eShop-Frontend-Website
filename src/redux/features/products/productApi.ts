/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable prefer-const */
import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types/global";
import { IProduct } from "@/types/modal";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products/create-product",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["products"],
    }),
    

    getAllProducts: builder.query({
      query: (queryObj) => {
        const {
          flashSale,
          page,
          limit,
          searchTerm,
          minPrice,
          maxPrice,
          category,
          sort,
          vendorId,
        } = queryObj || {};

        let url = "/products/all-product";
        let params = new URLSearchParams();

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (category) {
          params.append("category", category);
        }
        if (vendorId) {
          params.append("vendorId", vendorId);
        }
        if (flashSale !== undefined) {
          params.append("flashSale", flashSale);
        }
        if (minPrice > 500 || maxPrice < 7000) {
          params.append("minPrice", minPrice);
          params.append("maxPrice", maxPrice);
        }
        if (sort) {
          if (sort === "desc") {
            params.append("sortBy", "price");
            params.append("sortOrder", "desc");
          } else {
            params.append("sortBy", "price");
            params.append("sortOrder", "asc");
          }
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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "products" as const,
                id,
              })),
              { type: "products", id: "LIST" },
            ]
          : [{ type: "products", id: "LIST" }],
    }),

    getSingleProduct: builder.query({
      query: (id) => {
        let url = `/products/${id}`;
        return {
          url,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: (result, error, id) => [{ type: "products", id }],
    }),


    getRecentViewProducts: builder.query({
      query: () => {
        return {
          url: "/recent-products/all",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["recent-products"],
    }),




      addRecentProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/recent-products/create",
          method: "POST",
          body: productInfo,
        };
      },
      transformResponse: (response: TResponseRedux<IProduct[]>) => {
        return response.data;
      },
      invalidatesTags: ["recent-products"],
    }),



    updateProduct: builder.mutation({
      query: ({ payload, productId }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "products", id: productId },
        { type: "products", id: "LIST" },
      ],
    }),

    duplicateProduct: builder.mutation<{ data: IProduct }, string>({
      query: (productId) => ({
        url: `/products/duplicate/${productId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),


     deleteRecentProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/recent-products",
          method: "DELETE",
          body: productInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["recent-products"],
    }),


    deleteProduct: builder.mutation<{ data: IProduct }, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "products", id: productId },
        { type: "products", id: "LIST" },
      ],
    }),



  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDuplicateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useAddRecentProductMutation,
  useGetRecentViewProductsQuery,
  useDeleteRecentProductMutation,
} = productApi;