"use client";

import  { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { registerUser } from "@/utils/loginService";

export type TSignUp = {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: string;
  shopName?: string;
  logo?: string;
  description?: string;
};

export default function Registration() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("CUSTOMER");
  const [isRegistering, setIsRegistering] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUp>();

  // useEffect(() => {
  //   if (isLogInSuccess) {
  //     const target = redirect || "/";
  //     router.push(target);
  //   }
  // }, [isLogInSuccess, redirect, router]);




  const handleSignUp: SubmitHandler<TSignUp> = async (data) => {
    setIsRegistering(true);
    console.log(data);

    const signUpData = {
      ...data,
      role,
      ...(role === "VENDOR" && {
        shopName: data.shopName,
        logo: data.logo ? data.logo[0] : null,
        description: data.description,
      }),
    };

    try {
      const res = await registerUser(signUpData);

      if (res.success && typeof res.token === 'string') {
        const user = verifyToken(res.token) as TUser; 
        dispatch(setUser({ user: user, token: res.token }));

        // setIsLogInSuccess(true);
        toast.success("Account created successfully!", { duration: 3000 });
        const redirect = searchParams.get("redirect");
  
        let targetRoute = "/";
        if (redirect && redirect !== "/login") {
          targetRoute = redirect;
        }
  
        router.replace(targetRoute);
         router.refresh(); 

      } else {
        toast.error("Failed to create account. Invalid token.");
        setIsRegistering(false);
      }
    } catch (error: unknown) {
      console.log(error);
      toast.dismiss();
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      setIsRegistering(false);
    }
  };


   


  return (
    <>
    {isRegistering && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6 bg-white p-10 rounded-2xl shadow-2xl animate-fadeIn">
            
            {/* Animated Spinner */}
            <div className="relative w-20 h-20">
              {/* Outer ring */}
              <div className="absolute inset-0 border-[6px] border-green-200 rounded-full"></div>
              
              {/* Spinning ring */}
              <div className="absolute inset-0 border-[6px] border-green-600 rounded-full border-t-transparent animate-spin"></div>
              
              {/* Center pulse dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Loading Text */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">
                Creating your account...
              </h3>
              <p className="text-sm text-gray-600">
                Setting up your profile and preferences
              </p>
            </div>

            {/* Animated Dots */}
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      )}

      
  <div
  className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-green-300 via-sky-200 to-blue-300 relative"
>

  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>


  <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 rounded-2xl p-8 my-6">
    <h1 className="text-center text-2xl md:text-3xl font-extrabold text-white mb-6 drop-shadow">
      Create Your Account
    </h1>

    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
   
      <div>
        <label className="block text-white mb-1" htmlFor="name">Username *</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          {...register("name", { required: "Username is required" })}
          className="w-full px-4 py-2 rounded-lg bg-white/70 border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-white mb-1" htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          className="w-full px-4 py-2 rounded-lg bg-white/70 border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="relative">
        <label className="block text-white mb-1" htmlFor="password">Password *</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Must be at least 8 characters" },
          })}
          className="w-full px-4 py-2 rounded-lg bg-white/70 border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[38px] right-4 text-gray-700 cursor-pointer"
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </span>

        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* Vendor Button */}
      <div>
        <label className="block text-white mb-1">Are you a Vendor?</label>
        <button
          type="button"
          onClick={() => setRole("VENDOR")}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            role === "VENDOR"
              ? "bg-blue-600"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Become a Vendor
        </button>
      </div>

      {/* Vendor Fields */}
      {role === "VENDOR" && (
        <div className="space-y-4">

          <div>
            <label className="block text-white mb-1" htmlFor="shopName">
              Shop Name *
            </label>
            <input
              type="text"
              id="shopName"
              {...register("shopName", { required: "Shop Name is required" })}
              className="w-full px-4 py-2 rounded-lg bg-white/70 border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.shopName && (
              <p className="text-red-500 text-sm">{errors.shopName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white mb-1">Shop Description *</label>
            <textarea
              {...register("description", {
                required: "Shop Description is required",
              })}
              className="w-full px-4 py-2 rounded-lg bg-white/70 border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 text-white rounded-lg font-semibold transition ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>

    <p className="text-center text-white mt-4">
      Already have an account?{" "}
      <Link  href={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-blue-800 hover:underline">Login</Link>
    </p>
  </div>
</div>
</>

);

};
