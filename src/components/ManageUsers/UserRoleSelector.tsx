"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/modal";
import React from "react";

interface IProps {
  onRoleChange: (role: UserRole | null) => void;
  selectedRole?: UserRole | null;
}

const UserRoleSelector: React.FC<IProps> = ({
  onRoleChange,
  selectedRole ,
}) => {
  return (
    <div className="mb-4">
      <Select
        value={selectedRole ?? "all"} // Use value instead of defaultValue for controlled component
        onValueChange={(value) => onRoleChange(value === "all" ? null : (value as UserRole))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="CUSTOMER">Customer</SelectItem>
          <SelectItem value="VENDOR">Vendor</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserRoleSelector;