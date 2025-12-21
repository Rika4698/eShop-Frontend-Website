/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import Sidebar from "@/components/shared/DashboardSidebar";


import React, { SetStateAction,  useState } from "react";


import { useAppSelector } from "@/redux/hooks";

export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const { user,  token } = useAppSelector((state) => state.auth);

  return (
    <div className="w-full h-dvh flex flex-col items-start justify-start">
      <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-[calc(100%-70px)] flex items-start justify-start">
        <Sidebar isOpen={isOpen} setIsopen={setIsOpen} />
        <div className="h-full w-full overflow-auto smoothBar p-[16px] lg:p-[43px]  bg-[#f3f3f3]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
