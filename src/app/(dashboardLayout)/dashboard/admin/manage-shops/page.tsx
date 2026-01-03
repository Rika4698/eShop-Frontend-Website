"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import ShopsTable from "@/components/MangeShops/ShopsTable";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import { IVendor } from "@/types/modal";

interface IQuery {
  page: number;
  limit: number;
  searchTerm: string;
  role: "VENDOR";
  
}

const MangeShop = () => {
  const [query, setQuery] = useState<IQuery>({
    page: 1,
    limit: 10,
    searchTerm: "",
    role: "VENDOR",
   
  });

  const { page, limit, searchTerm, role } = query;

  const { data, isFetching } = useGetAllTypeUsersQuery({
      page,
      limit,
      searchTerm,
      role,
      
    }, {
    refetchOnMountOrArgChange: true,
  });

  // Filter vendors frontend
  // const filteredVendors = useMemo(() => {
  //   if (!data?.data) return [];
  //   const term = searchTerm.trim().toLowerCase();

  //   return data.data.filter(
  //     (user) =>
  //       user.role === "VENDOR" &&
  //       (!term ||
  //         (user.name?.toLowerCase().includes(term) ?? false) ||
  //         (user.email?.toLowerCase().includes(term) ?? false))
  //   );
  // }, [data, searchTerm]);
const vendors = data?.data || [];
  const totalVendors = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalVendors / limit);

  // Handlers
   const handleSearchChange = useCallback((value?: string) => {
     setQuery((prev) => ({
       ...prev,
       searchTerm: value ?? "",
       page: 1,
     }));
   }, []);


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setQuery((prev) => ({ ...prev, page }));
    }
  };

  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>Shop Management</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Search Box */}
        <NextSearchBox
          placeholder="Search by name or email"
          onValueChange={handleSearchChange}
          className="mb-4"
        />

        {/* Shops Table */}
        <ShopsTable
          shops={vendors as unknown as IVendor[]}
          isLoading={isFetching}
          onDelete={(id) => console.log("Deleted", id)}
        />

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 border rounded ${
                page === idx + 1
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Total Vendors */}
        <div className="text-center mt-2 text-sm text-gray-500">
          Total Vendors: {totalVendors}
        </div>
      </CardContent>

      {/* Loading Overlay */}
      {isFetching && (
        <span className="absolute w-full h-full flex justify-center items-center text-[18px] top-0 left-0 bg-[#ffffffa6]">
          Loading...
        </span>
      )}
    </Card>
  );
};

export default MangeShop;
