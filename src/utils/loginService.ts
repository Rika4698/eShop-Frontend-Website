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
       credentials: "include",
      body: JSON.stringify(remaining),
    });

    const data = await response.json();
    console.log("Register Response:", JSON.stringify(data, null, 2));

    if (!response.ok || !data.success) {
       return { success: false, message: data.message || "Registration failed" };
    }

    const accessToken = data?.data?.accessToken || data.token;
    const refreshToken = data?.data?.refreshToken;

    console.log(" Access Token:", data?.token ? "Found " : "Missing ");
    console.log("Refresh Token:", data?.data?.refreshToken ? "Found " : "Missing ");
        
    if(accessToken){
      await setCookie("clientAccessToken", accessToken, {
      httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    });
  }

   
    if (refreshToken) {
      await setCookie("clientRefreshToken", refreshToken, {
        httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
      });
    } 

  // const token = data.token || data?.data?.accessToken;

  //   if (!token) {
  //     throw new Error("No token returned from server");
  //   }

    return data;

  } catch (error: any) {
     console.error("Registration error:", error);
    return { success: false, message: error.message || "Unexpected error" };
  }
};





export const loginUser = async (userData: Record<string, any>) => {
  try {
    const response = await fetch(`${envData.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
       credentials: "include",
      
      body: JSON.stringify(userData),
    });

     const data = await response.json();
 console.log("Register Response:", JSON.stringify(data, null, 2));

     if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Invalid email or password",
      };
    }
    // const token = data.accessToken || data?.data?.accessToken;

    // if (!token) {
    //   throw new Error("No token returned from server");
    // }

    // console.log(token,data, "hello");
    //   return {
    //     success: true,
    //     token,
    //     data,
    //   };

   
    // console.log("Register Response:", JSON.stringify(data, null, 2));

   if (data.success) {
      const accessToken = data?.data?.accessToken || data?.accessToken;
      const refreshToken = data?.data?.refreshToken;

      console.log("Login successful");
      console.log("Access Token:", accessToken ? "Found" : "Missing");
      console.log("Refresh Token:", refreshToken ? "Found" : "Missing");

      if (accessToken) {
        await setCookie("clientAccessToken", accessToken, {
         httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
        });
      }

      if (refreshToken) {
        await setCookie("clientRefreshToken", refreshToken, {
         httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
        });
      }
    
    return data;
    }
      
console.log(data);
  
  } catch (error: any) {
    console.error("Login error:", error);
     return {
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    };
  }
};





export const logoutService = async () => {
  
 await deleteCookie("clientAccessToken");
  await deleteCookie("clientRefreshToken");
  
};




export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("clientAccessToken")?.value;
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
    const data = await response.json();

    if (!response.ok) {
     return {
        success: false,
        message:
          data?.message ||
          "If the email exists, a reset link has been sent",
      };
    }

    // const result = await response.json();
    // console.log("Response received:", result);
    return data;
  } catch (error: any) {
    console.error("Error in forgotPassword:", error);
      return {
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    };
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