/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envData from "@/config/envData";
import { cookies } from "next/headers";




export const registerUser = async (userInfo: Record<string, any>) => {
  const { role, ...remaining } = userInfo;
console.log(role,"login");

  try {
    const endpoint =
      role === "CUSTOMER"
        ? `${envData.baseUrl}/users/create-customer`
        : `${envData.baseUrl}/users/create-vendor`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(remaining),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Registration failed");
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data?.token);

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};


export const loginUser = async (userData: Record<string, any>) => {
  try {
    const response = await fetch(`${envData.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await response.json();

    if (data.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};


export const logoutService = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken;
};




export const forgotPassword = async (userEmail: { email: string }) => {
  // console.log(userEmail);
 
  try {
    const response = await fetch(`${envData.baseUrl}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send reset link");
    }

    const result = await response.json();
    console.log("Response received:", result);
    return result;
  } catch (error: any) {
    console.error("Error in forgotPassword:", error);
    throw error;
  }
};





export const resetPassword = async (
  userData: {
    email: string;
    newPassword: string;
  },
  token: string
) => {
  try {
 
    const response = await fetch(`${envData.baseUrl}/auth/reset-password`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to reset password");
    }

    const result = await response.json();
    console.log("Response received:", result);
    return result;
  } catch (error: any) {
    console.error("Error in resetPassword:", error);
    throw error;
  }
};