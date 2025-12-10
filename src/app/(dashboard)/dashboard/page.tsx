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
    if (userData?.userData?.role === "CUSTOMER") {
      router.replace("/");
    } else {
      router.replace(`/dashboard/${userData?.userData?.role?.toLowerCase()}`);
    }
  }, [userData?.userData, router, token]);
  return <div></div>;
};

export default DashboardRoot;
