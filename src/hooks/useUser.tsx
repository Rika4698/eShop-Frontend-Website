/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
// import { getClientCookie } from "@/lib/clientCookie";

// import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/features/category/authApi";
import { useAppSelector } from "@/redux/hooks";
// import { useEffect, useState } from "react";
// import { useAppSelector } from "@/redux/hooks";
// import { useEffect, useState } from "react";


// function getCookie(name: string): string | null {
//   if (typeof document === "undefined") return null;

//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);

//   if (parts.length === 2) {
//     return parts.pop()?.split(";").shift() || null;
//   }
//   return null;
// }

const useUserDetails = () => {
  const authUser = useAppSelector(selectCurrentUser);
  // const token = useAppSelector(selectCurrentToken);
  // const [isRefetching, setIsRefetching] = useState(false);
//  const [token, setToken] = useState<string | null>(null);
  // undefined = still checking cookie

  //  useEffect(() => {
  //   setToken(getClientCookie("accessToken"));
  // }, []);


  // Only skip query if token is explicitly null
  // const skipQuery = token === null || token === undefined;

  const { data, isLoading, refetch, isFetching, error } = useGetMyProfileQuery(undefined, {
    skip: !authUser, 
  });

  if (error && "status" in error && error.status === 401) {
    return { userData: null };
  }
    


  console.log(data, "user");

  // console.log(token);

  // useEffect(() => {
  //   if (token) {
  //     setIsRefetching(true);
  //     refetch().finally(() => {
  //       setIsRefetching(false);
  //     });
  //   }
  // }, [token]);

  // const effectiveLoading = isLoading || isRefetching;
    // userData: token ? data : null, 

  return { 
  
     userData: authUser ? data ?? null : null,
    isLoading,
    isFetching,
    refetch,
    error,
    };
};

export default useUserDetails;