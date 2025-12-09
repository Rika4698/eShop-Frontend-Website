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

  const { register, handleSubmit, formState: { errors } } = useForm<TLogin>();

  useEffect(() => {
    if (isLogInSuccess) {
      const target = redirect || "/";
      router.push(target);
    }
  }, [isLogInSuccess, redirect, router]);

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Loading...");
    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.dismiss();
        const user = verifyToken(res.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));

        setIsLogInSuccess(true);
        toast.success("Logged in successfully", { duration: 3000 });
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  const handleClickLogin = (email: string, password: string) => {
    handleLogin({ email, password });
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
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 mt-1 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-200 outline-none text-black placeholder-white/70"
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
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 mt-1 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-200 outline-none text-black placeholder-white/70"
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
            <Link href={"/forgot-password"} className="text-sm text-white/80 hover:text-white">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white/80 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-green-800 font-medium hover:underline">
            Register
          </Link>
        </p>

      
      </div>
    </div>
  );
}
