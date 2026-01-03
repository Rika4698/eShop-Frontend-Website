"use client";

import DashboardHeader from "@/components/shared/DashboardHeader";
import Sidebar from "@/components/shared/DashboardSidebar";
import React, { SetStateAction, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import useUserDetails from "@/hooks/useUser";

export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { token } = useAppSelector((state) => state.auth);

  const { userData, isLoading } = useUserDetails();


  if (isLoading || !token) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-dvh flex flex-col">
      <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="w-full h-[calc(100%-60px)] flex">
        <Sidebar isOpen={isOpen} setIsopen={setIsOpen} />

        <div className="flex-1 overflow-auto bg-[#f3f3f3] p-4 lg:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
