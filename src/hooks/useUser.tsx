/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/features/category/authApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const useUserDetails = () => {
  const token = useAppSelector(selectCurrentToken);
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, isLoading, refetch, isFetching } = useGetMyProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      setIsRefetching(true);
      refetch().finally(() => {
        setIsRefetching(false);
      });
    }
  }, [token, refetch]);

  const effectiveLoading = isLoading || isRefetching;

  return { userData: data || null, isLoading: effectiveLoading,isFetching, };
};

export default useUserDetails;