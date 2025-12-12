import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCoupon } from "@/redux/features/coupon/couponSlice";
import { clearCart } from "@/redux/features/products/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { logoutService } from "@/utils/loginService";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
interface UserDropDownProps {
    user: {
        userData: {
            role: string;
            image?: string;
            logo?:string;
        };
    };
}
export function UserDropDown({ user }: UserDropDownProps) {
    const dispatch = useAppDispatch();

    const users = user?.userData;

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearCoupon());
        logoutService();

        toast.success("Logged out successfully", { duration: 3000 });
    };

    // console.log(user?.role,"role");
    // console.log(users);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="center p-[5px] rounded-full cursor-pointer">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                            alt="profile"
                            src={
                                users?.image || users?.logo ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            width={80}
                            height={80}
                            className="w-full h-full object-cover "
                        />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {users && users.role !== "CUSTOMER" ? (
                        <Link
                            href={`/dashboard/${user?.userData?.role?.toLowerCase()}`}
                            className="cursor-pointer"
                        >
                            <DropdownMenuItem>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </DropdownMenuItem>
                        </Link>
                    ) : (
                        <>
                            <Link href={"/profile"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link
                                href="/profile/settings"
                                className="cursor-pointer"
                            >
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />

                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </Link>
                        </>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
