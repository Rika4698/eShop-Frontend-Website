/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { loginUser } from "@/utils/loginService";
import { getDefaultDashboardRoute, UserRole } from "@/lib/auth-utils";

export type TLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogInSuccess, setIsLogInSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<TLogin>();

  // useEffect(() => {
  //   if (isLogInSuccess) {
  //     const target = redirect || "/";
  //     router.push(target);
  //   }
  // }, [isLogInSuccess, redirect, router]);

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
 setIsLoading(true);
  const loadingToast = toast.loading("Logging in...");

  try {
    const res = await loginUser(data);

    if (res.success) {
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.dismiss(loadingToast);
      toast.success("Logged in successfully");

      const redirect = searchParams.get("redirect");

      let targetRoute = "/";
      if (redirect && redirect !== "/login") {
        targetRoute = redirect;
      }

      router.replace(targetRoute);
    }
  } catch (error: any) {
    toast.dismiss(loadingToast);
    toast.error(error?.message || "Login failed");
    setIsLoading(false);
  }
  };

 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-green-300 via-sky-200 to-blue-300 relative">
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl my-6">
        <div className="flex justify-center mb-6 ">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="logo"
              height={80}
              width={80}
              className="flex"
            />
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center text-white drop-shadow-md mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-white/80 mb-6">
          Login to your account
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-white/90">Email *</label>
            <input
              type="text"
              {...register("email", { required: "Email is required",  pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                } })}
              className="w-full p-3 mt-1 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-200 outline-none text-black "
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium text-white/90">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required", minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                } })}
              className="w-full p-3 mt-1 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-200 outline-none text-black "
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-12 right-4 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <Eye size={20} className="text-white/70" />
              ) : (
                <EyeOff size={20} className="text-white/70" />
              )}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-end mb-2">
            <Link href={"/forgot-password"} className="text-sm text-white/80 hover:text-blue-700 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-white/80 mt-6">
          Don't have an account?{" "}
          <Link href={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-green-800 font-medium hover:underline">
            Register
          </Link>
        </p>

      
      </div>
    </div>
  );
}
