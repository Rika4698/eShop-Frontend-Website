"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/hooks";
import useUserDetails from "@/hooks/useUser";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

const DashboardRoot = () => {
  const router = useRouter();
  const { userData } = useUserDetails();
  const token = useAppSelector(selectCurrentToken);
  
  useEffect(() => {
    if (!userData?.userData || !token) {
      router.push("/login");
      Cookies.set("redirect", "/dashboard");
      return;
    }

    const userRole = userData?.userData?.role;
    
    // Redirect based on role
    if (userRole === "CUSTOMER") {
      router.replace("/dashboard/customer");
    } else if (userRole === "VENDOR") {
      router.replace("/dashboard/vendor");
    } else if (userRole === "ADMIN") {
      router.replace("/dashboard/admin");
    } else {
      // Fallback for any other role
      router.replace(`/dashboard/${userRole?.toLowerCase()}`);
    }
  }, [userData?.userData, router, token]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
};

export default DashboardRoot;