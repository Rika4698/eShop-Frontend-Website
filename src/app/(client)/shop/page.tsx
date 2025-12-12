/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useCallback, useState } from "react";

const Shop = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch ALL users without any query params
  const { data, isFetching } = useGetAllTypeUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Frontend filtering - only vendors
  const filteredVendors = useMemo(() => {
    if (!data?.data) return [];

    const term = searchTerm.trim().toLowerCase();

    return data.data.filter((user: any) => {
      // First check if user is a VENDOR
      if (user?.role !== "VENDOR") return false;

      // Then check search term
      if (!term) return true;

      const matchesSearch =
        user?.name?.toLowerCase().includes(term) ||
        user?.email?.toLowerCase().includes(term) ||
        user?.vendor?.shopName?.toLowerCase().includes(term);

      return matchesSearch;
    });
  }, [data, searchTerm]);

  // Frontend pagination
  const totalVendors = filteredVendors.length;
  const totalPages = Math.ceil(totalVendors / limit);
  const paginatedVendors = useMemo(() => {
    return filteredVendors.slice((page - 1) * limit, page * limit);
  }, [filteredVendors, page, limit]);

  // Search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1); // Reset to first page when search changes
  }, []);

  // Pagination handler
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  return (
    <div className="p-5">
      {/* Header Section */}
      <div
        className="w-full md:h-[300px] h-[200px] rounded-[18px] mt-5 relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/portrait-young-woman-with-arms-raised-standing-against-yellow-background_1048944-8617235.jpg?w=1060')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-1/2 left-[20%] md:left-[40%] transform -translate-y-1/2 text-white font-bold text-5xl drop-shadow-lg">
          All Shops
        </div>
      </div>

      {/* Search Box */}
      <div className="max-w-md mx-auto mt-6">
        <input
          type="text"
          placeholder="Search shops, vendor name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Results Count */}
      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {paginatedVendors.length} of {totalVendors} shops
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 border-t pt-5">
        {isFetching ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700">Loading vendors...</span>
            </div>
          </div>
        ) : paginatedVendors?.length ? (
          paginatedVendors.map((vendor: any) => {
            const params = new URLSearchParams();
            if (vendor?.vendor?.id) params.append("shop", vendor.vendor.id);

            return (
              <div
                key={vendor.id}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative mb-4">
                  <Image
                    width={110}
                    height={110}
                    className="h-[110px] w-[110px] rounded-full object-cover border-4 border-gray-200"
                    src={
                      vendor?.vendor?.logo ||
                      "https://via.placeholder.com/110?text=No+Logo"
                    }
                    alt={vendor.name || "Vendor"}
                  />
                </div>

                <h1 className="text-xl font-semibold text-gray-700 text-center">
                  {vendor.name}
                </h1>
                <p className="text-sm text-gray-500">{vendor.email}</p>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  {vendor.vendor?.shopName || "No shop name"}
                </p>

                <div className="flex gap-3 mt-4">
                  <button className="h-11 px-5 rounded bg-green-600 text-white hover:bg-green-700 transition-colors">
                    Follow
                  </button>

                  <Link href={`/shop-page?${params.toString()}`}>
                    <button className="h-11 px-5 rounded border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                      Visit Shop
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-lg text-gray-500">No vendors found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-green-600 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => {
            let pageNum: number;
            
            if (totalPages <= 5) {
              pageNum = idx + 1;
            } else if (page <= 3) {
              pageNum = idx + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + idx;
            } else {
              pageNum = page - 2 + idx;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded transition-colors ${
                  page === pageNum
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;