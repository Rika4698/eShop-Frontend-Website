"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useUserDetails from "@/hooks/useUser";
import { useChangePasswordMutation } from "@/redux/features/category/authApi";
import { toast } from "sonner";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/products/productSlice";
import { clearCoupon } from "@/redux/features/coupon/couponSlice";
import { logoutService } from "@/utils/loginService";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { baseApi } from "@/redux/api/baseApi";

interface IFormInputs {
  email: string;
  oldPassword: string;
  newPassword: string;
}

const Security = () => {
  const { userData, isLoading } = useUserDetails();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    defaultValues: {
      email: userData?.userData?.email || "",
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleLogoutAndRedirect = async () => {
    // Clear Redux state
     dispatch(logout());
        dispatch(clearCart());
        dispatch(clearCoupon());
        dispatch(baseApi.util.resetApiState());
        
        // Clear cookies
        await logoutService();
        
        // Redirect to login
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  };

  
  const handlePasswordChange = async (data: IFormInputs) => {
    const passwordInfo = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      await changePassword(passwordInfo).unwrap();
      
      toast.success("Password changed successfully! Redirecting to login...", {
        duration: 2000,
      });

      // Reset form
      reset();

      // Wait 2 seconds then logout and redirect
      setTimeout(() => {
        handleLogoutAndRedirect();
      }, 2000);
      
    } catch (error: unknown) {
      const typedError = error as { data?: { message?: string }; message?: string };
      const errorMessage = 
        typedError?.data?.message || 
        typedError?.message || 
        "Failed to change password";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Security Settings
          </h2>
          <p className="text-gray-600">
            Update your password to keep your account secure
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit(handlePasswordChange)} className="p-6 md:p-8">
              {/* Info Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Password Security Tips
                    </p>
                    <ul className="text-xs text-blue-700 mt-1 space-y-1">
                      <li>• Use at least 8 characters</li>
                      <li>• Avoid using personal information for secure password</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    readOnly
                    {...register("email")}
                    className="pl-10 bg-gray-50 border-gray-300"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your email cannot be changed
                </p>
              </div>

              {/* Old Password Field */}
              <div className="mb-6">
                <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    {...register("oldPassword", {
                      required: "Current password is required",
                    })}
                    className="pl-10 pr-12 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showOldPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.oldPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password Field */}
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      validate: (value, formValues) => {
                        if (value === formValues.oldPassword) {
                          return "New password must be different from current password";
                        }
                        return true;
                      },
                    })}
                    className="pl-10 pr-12 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Warning Box */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-800">
                    <strong>Important:</strong> After changing your password, you will be automatically logged out and redirected to the login page for security purposes.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isChangingPassword}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isChangingPassword ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Changing Password...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" />
                    <span>Change Password</span>
                  </div>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Security;