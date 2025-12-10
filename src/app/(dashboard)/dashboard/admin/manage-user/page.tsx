"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import UserRoleSelector from "@/components/ManageUsers/UserRoleSelector";
import UsersTable from "@/components/ManageUsers/UsersTable";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import { UserRole } from "@/types/modal";

const ManageUsersView = () => {
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
    searchTerm: string;
    role: UserRole | " ";
  }>({
    page: 1,
    limit: 10,
    searchTerm: "",
    role: " ", 
  });

  const { page, limit, searchTerm, role } = query;

  const { data, isFetching } = useGetAllTypeUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const filteredUsers = useMemo(() => {
    if (!data || !data.data) return [];

    const term = searchTerm.trim().toLowerCase();

    return data.data.filter((user) => {
      const matchesSearch =
        !term ||
        (user.name?.toLowerCase().includes(term) ?? false) ||
        (user.email?.toLowerCase().includes(term) ?? false) ||
        (user.role?.toLowerCase().includes(term) ?? false);

      const matchesRole = !role || role === " " || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [data, searchTerm, role]);

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  const handleSearchChange = useCallback((newSearchTerm: string) => {
    console.log("Search term changed:", newSearchTerm); 
    setQuery((prev) => ({ ...prev, searchTerm: newSearchTerm, page: 1 }));
  }, []);



  const handleRoleChange = useCallback((newRole: UserRole | " ") => {
    setQuery((prev) => ({ ...prev, role: newRole, page: 1 }));
  }, []);



  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQuery((prev) => ({ ...prev, page: newPage }));
    }
  }, [totalPages]);

  

  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>

      <CardContent>
        <NextSearchBox
          className="mb-4"
          placeholder="Search by email or role"
          onValueChange={handleSearchChange}
        />

        <UserRoleSelector 
          onRoleChange={handleRoleChange} 
          selectedRole={role}
        />

        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <UsersTable
            users={paginatedUsers}
            isLoading={isFetching}
            onDelete={(id) => console.log("Deleted", id)}
          />
        )}

        <div className="flex justify-center mt-4 space-x-2">
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

        <div className="text-center mt-2 text-sm text-gray-500">
          Total Users: {totalUsers}
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

export default ManageUsersView;