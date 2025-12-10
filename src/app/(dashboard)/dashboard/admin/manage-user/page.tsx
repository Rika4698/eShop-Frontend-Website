"use client";

import UserRoleSelector from "@/components/ManageUsers/UserRoleSelector";
import UsersTable from "@/components/ManageUsers/UsersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import { useState } from "react";

const MangeUsersView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    role: "",
    searchTerm: "",
  });

  const { page, limit, searchTerm, role } = query;

  const { data, isFetching } = useGetAllTypeUsersQuery({
    page,
    limit,
    searchTerm,
    role,
  });

  const totalUsers = data?.meta?.total || 0; 
  const totalPages = Math.ceil(totalUsers / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQuery((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setQuery((prev) => ({ ...prev, searchTerm: newSearchTerm, page: 1 }));
  };

  const handleRoleChange = (newRole: string) => {
    setQuery((prev) => ({
      ...prev,
      role: newRole.trim() === "" ? "" : newRole,
      page: 1,
    }));
  };

  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Box */}
        <NextSearchBox
          className="mb-4"
          placeholder="e.g. first name, last name or email"
          onValueChange={handleSearchChange}
          debounceTimeOut={500}
        />

        {/* Role Selector */}
        <UserRoleSelector onRoleChange={handleRoleChange} />

        {/* Table */}
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <UsersTable
            users={data?.data || []}
            isLoading={isFetching}
            onDelete={(userId: string) => {
              console.log("User deleted:", userId);
            }}
          />
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border rounded ${
                page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
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
      </CardContent>

      {isFetching && (
        <span className="absolute w-full h-full flex justify-center items-center text-[18px] top-0 left-0 bg-[#ffffffa6]">
          Loading...
        </span>
      )}
    </Card>
  );
};

export default MangeUsersView;
