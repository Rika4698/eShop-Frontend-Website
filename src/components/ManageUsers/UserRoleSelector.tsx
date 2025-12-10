import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/modal";

import React, { useState } from "react";

interface IProps {
  onRoleChange: (role: UserRole | " ") => void;
}

const UserRoleSelector: React.FC<IProps> = ({ onRoleChange }) => {
  const [roleFilter, setRoleFilter] = useState<UserRole | " ">(" ");

  const handlechange = (value: UserRole) => {
    onRoleChange(value);
    setRoleFilter(value);
  };

  return (
    <div className="mb-4">
      <Select
        onValueChange={(value) => handlechange(value as UserRole)}
        defaultValue=" "
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
