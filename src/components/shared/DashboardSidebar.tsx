"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { SetStateAction, useEffect } from "react";
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

  const handleLogout = () => {
    dispatch(logout());
  
    logoutService();


    toast.success("Logged out successfully", { duration: 3000 });
// Redirect to /home after logout
router.push("/login");
  };

  return (
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
          className="w-[90%] mx-auto bg-[#1eb500] hover:bg-[#39ad4e]"
        >
          Logout
        </Button>
      </div>
      </div>

    
    </aside>
  );
}
