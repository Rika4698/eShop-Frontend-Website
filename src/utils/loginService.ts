/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envData from "@/config/envData";
import { deleteCookie, setCookie } from "@/lib/tokenHandlers";
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
    // console.log("Register Response:", JSON.stringify(data, null, 2));

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Registration failed");
    }

    const accessToken = data?.data?.accessToken || data.token;
    const refreshToken = data?.data?.refreshToken;

    // console.log(" Access Token:", data?.token ? "Found " : "Missing ");
    // console.log("Refresh Token:", data?.data?.refreshToken ? "Found " : "Missing ");
        
    if(accessToken){
      await setCookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  }

   
    if (refreshToken) {
      await setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

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
    // console.log("Register Response:", JSON.stringify(data, null, 2));

    if (data.success) {
        await setCookie("accessToken", data?.data?.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      await setCookie("refreshToken", data?.data?.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      }); 
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};





export const logoutService = async () => {
  
 await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  
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