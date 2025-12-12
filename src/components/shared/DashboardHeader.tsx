import { ISideBarState } from "@/app/(dashboard)/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserDetails from "@/hooks/useUser";


import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";

const DashboardHeader: React.FC<ISideBarState> = ({ setIsOpen }) => {
  const { userData } = useUserDetails();
  
//   console.log(userData?.userData?.role,"userData");
  return (
  <div className="w-full h-[77px] flex items-center justify-between px-4 md:px-6 border-b shrink-0">
   
      <div className="flex items-center gap-2 md:gap-4">
 
        <Button
          className="flex lg:hidden p-2"
          onClick={() => setIsOpen(true)}
          variant={"ghost"}
        >
          <IoMenu className="text-xl" />
        </Button>

     
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src="/logo.png"
            alt="logo"
            className="w-12 h-12"
          />
          <div className="flex flex-col leading-none">
            <h2 className="text-xl font-bold text-green-800">
              E<span className="text-green-500 text-lg">Shop</span>
            </h2>
            <p className="text-xs text-gray-400">Online Shopping</p>
          </div>
        </Link>
      </div>

      {/* Right Side*/}
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer w-10 h-10">
              <AvatarImage
                src={
                  userData?.userData?.image  || userData?.userData?.logo ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="user avatar"
              />
              <AvatarFallback>
                <p className="text-muted-foreground uppercase">
                  {userData?.userData?.name?.charAt(0)}
                </p>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
             <div className="flex flex-col items-start p-2 mb-2">
              <p className="font-semibold text-gray-800">
                {userData?.userData?.name || "User Name"}
              </p>
              <p className="text-sm text-gray-500">
                {userData?.userData?.email || "user@example.com"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"}>Back to Home</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
