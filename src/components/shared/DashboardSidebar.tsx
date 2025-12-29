"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DashboardNav } from "./DashboardNav";
import { adminLinks,  customerLinks,  vendorLinks } from "@/routes/admin.vendor.route";
import { useAppDispatch } from "@/redux/hooks";
import { logoutService } from "@/utils/loginService";
import useUserDetails from "@/hooks/useUser";
import { toast } from "sonner";
import { X } from "lucide-react"; 

import { logout } from "@/redux/features/auth/authSlice";

import { useRouter } from "next/navigation";
type SidebarProps = {
  className?: string;
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function Sidebar({
  className,
  isOpen,
  setIsopen,
}: SidebarProps) {
  const { userData } = useUserDetails();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
console.log(userData,"userData");

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const screen = window.screen.width;

    
      if (screen > 1024) {
        return;
      }


      if (target.closest(".sidebar") || target.closest(".menuBTn")) {
        return;
      }

      setIsopen(false);
    };

   
    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsopen]);


  const toggleStyle = {
    left: isOpen ? "277px" : "10px",
    rotate: isOpen ? "0deg" : "180deg",
  };

  const handleCloseBar = () => {
    if (window.screen.width < 1024) setIsopen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true); // Start loading
    const pathname = window.location.pathname;

    try {
      // Clear Redux state
      dispatch(logout());

      // Call logout service to clear cookies
      await logoutService(window.location.pathname);

      toast.success("Logged out successfully", { duration: 2000 });

      // Small delay to show success message
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect to login with current path
      window.location.href = `/login?redirect=${pathname}`;
    } catch (error) {
      console.error("Logout error:", error);
      // toast.error("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <>
    {isLoggingOut && (
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
                Logging out...
              </h3>
              <p className="text-sm text-gray-600">
                Please wait while we securely end your session
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

      
    <aside
      style={{
        transition: "0.3s",
        width: isOpen ? "287px" : "0px",
        display: "flex",
      }}
      className={cn(
        `fixed top-0 left-0 h-full border-r bg-white transition-[width] duration-500
        flex flex-col gap-[20px] justify-between pb-[20px] 
        sidebar z-[30] shrink-0
        lg:relative lg:w-72 lg:block `,
        className
      )}
    >


         {/* Cross icon for mobile/md */}
      {isOpen && (
        <X
          className="absolute top-4 right-4 z-50 cursor-pointer text-3xl text-white bg-[#00b512] rounded-full p-1 lg:hidden"
          onClick={() => setIsopen(false)}
        />
      )}

      {/* Toggle Arrow (mobile only) */}
      <ArrowLeft
        className={cn(
          "fixed z-20 top-[15%] cursor-pointer rounded-full border bg-[#00b512] text-white text-3xl lg:flex hidden"
        )}
        style={{
          transition: "0.3s",
          ...toggleStyle,
        }}
        onClick={() => setIsopen(!isOpen)}
      />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-12">
        <div className="px-3 space-y-4" onClick={handleCloseBar}>
          <DashboardNav
            navLinks={
              userData
                ? (userData?.userData?.role === "ADMIN"
                  ? adminLinks: (userData?.userData?.role === "VENDOR" ? vendorLinks: customerLinks)) : []
            }
          />
        </div>
          {/* Logout Button */}
      <div className="px-4 py-10">
         <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-[90%] mx-auto bg-[#1eb500] hover:bg-[#39ad4e] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging out...
                </span>
              ) : (
                "Logout"
              )}
            </Button>
        
      </div>
      </div>

    
    </aside>

    </>
  );
}
