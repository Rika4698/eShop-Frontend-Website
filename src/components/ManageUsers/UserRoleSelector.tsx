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
  onRoleChange: (role: UserRole | " ") => void;
  selectedRole?: UserRole | " ";
}

const UserRoleSelector: React.FC<IProps> = ({
  onRoleChange,
  selectedRole = " ",
}) => {
  return (
    <div className="mb-4">
      <Select
        value={selectedRole} // Use value instead of defaultValue for controlled component
        onValueChange={(value) => onRoleChange(value as UserRole | " ")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=" ">All</SelectItem>
          <SelectItem value="CUSTOMER">Customer</SelectItem>
          <SelectItem value="VENDOR">Vendor</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserRoleSelector;