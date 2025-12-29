/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { resetPassword } from "@/utils/loginService";

interface FormValues {
  newPassword: string;
}

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email")!;
  const resetToken = searchParams.get("token")!;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    toast.loading("Resetting Password...");

    const userData = { email, newPassword: data.newPassword };

    try {
      const response = await resetPassword(userData, resetToken);
      toast.dismiss();
      if (response?.success) {
        toast.success("Password reset successful!", {
          duration: 6000,
        });
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-green-100 border border-green-600 rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <div className="flex justify-center items-center">
            <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
              <Image src="/logo.png" alt="logo" width={80} height={80} />
            </Link>
          </div>
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Change Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue={email || ""}
                readOnly
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-white border rounded-md focus:ring-gray-300 focus:border-gray-400"
              />
            </div>
            <div className="pb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="block w-full px-4 py-2 mt-1 text-gray-900 bg-white border rounded-md focus:ring-gray-300 focus:border-gray-400"
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            <div className="flex justify-center items-center mb-10">
              <button
                type="submit"
                className="relative h-10 w-full origin-top transform rounded-lg border-2 border-green-800 text-green-800 before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-green-700 uppercase font-bold"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
