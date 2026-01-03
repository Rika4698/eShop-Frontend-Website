/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFollowUserMutation, useGetPublicVendorsQuery, useUnfollowUserMutation } from "@/redux/features/users/userApi";
import Image from "next/image";
import Link from "next/link";
import {VendorCard} from "@/components/Home/vendorCard"
import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import useUserDetails from "@/hooks/useUser";

const Shop = () => {
  const searchParams = useSearchParams();
  const { userData } = useUserDetails();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
    const categoryId = searchParams.get("categoryId");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fetch public vendors with backend pagination and search
  const { data, isFetching, refetch  } = useGetPublicVendorsQuery({
    page,
    limit: 6,
    searchTerm: debouncedSearch,
    categoryId: categoryId && categoryId !== "null" ? categoryId : undefined,
  });
console.log(data,"dd");


  const vendors = data?.data || [];
  console.log(vendors);
  const meta = data?.meta || { total: 0, page: 1, limit: 6, totalPage: 0 };

  const { data: allCategories } = useGetAllCategoriesQuery(undefined);



  const categoryName =
    categoryId && allCategories?.find((c: any) => c.id === categoryId)?.name;
      const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  // Debounced search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1); // Reset to first page
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Pagination handler
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= meta.totalPage) {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [meta.totalPage]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Banner */}
        <div
          className="w-full h-[200px] md:h-[300px] rounded-2xl mt-5 relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/portrait-young-woman-with-arms-raised-standing-against-yellow-background_1048944-8617235.jpg?w=1060')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute top-1/2 left-32 md:left-9 transform -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 text-center md:text-left">
            <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl mb-2">
                {categoryName ? `"${categoryName}" Shops` : "All Shops"}
            </h1>
            <p className="text-white/90 text-sm md:text-base drop-shadow-lg">
              Discover amazing vendors and their products
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search shops, vendor name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border transition-all"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 bg-gray-100 inline-block px-4 py-2 rounded-full">
            Showing {" "}
            {/* <span className="font-semibold text-green-600">{}</span> of{" "} */}
            <span className="font-semibold text-green-600">{vendors.length}</span> shops
          </p>
        </div>

        {/* Vendor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {isFetching ? (
            // Loading Skeleton
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex gap-3 w-full">
                    <div className="h-11 bg-gray-200 rounded flex-1"></div>
                    <div className="h-11 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            ))
          ) : vendors.length > 0 ? 
          
         vendors.map((vendor: any) => <VendorCard key={vendor.id} vendor={vendor} userData={userData} refetch={refetch} followUser={followUser} unfollowUser={unfollowUser} />)
         : (
            // Empty State
            <div className="col-span-full flex flex-col justify-center items-center h-64">
              <svg
                className="w-24 h-24 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-xl text-gray-500 mb-2">No vendors found</p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setDebouncedSearch("");
                  }}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {meta.totalPage > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(meta.totalPage, 5) }, (_, idx) => {
              let pageNum: number;

              if (meta.totalPage <= 5) {
                pageNum = idx + 1;
              } else if (page <= 3) {
                pageNum = idx + 1;
              } else if (page >= meta.totalPage - 2) {
                pageNum = meta.totalPage - 4 + idx;
              } else {
                pageNum = page - 2 + idx;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    page === pageNum
                      ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-green-500"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={page === meta.totalPage}
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;