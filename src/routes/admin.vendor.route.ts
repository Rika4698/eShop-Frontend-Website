import { NavItem } from "@/types/modal";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiShop, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";
import { FaRegRectangleList } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineReviews, MdReviews } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine, RiUserSettingsLine } from "react-icons/ri";
import { BiDollar } from "react-icons/bi";

export const adminLinks: NavItem[] = [
   {
    href: "/dashboard/admin",
    Icon: GrServices,
    title: "Dashboard",
  },
  {
    href: "/dashboard/admin/manage-user",
    Icon: CiViewList,
    title: "Manage Users",
  },
    {
    href: "/dashboard/admin/manage-categories",
    Icon: BsFileEarmarkPost,
    title: "Manage Categories",
  },
  {
    href: "/dashboard/admin/manage-shops",
    Icon: CiShop,
    title: "Manage Shops",
  },
  {
    href: "/dashboard/admin/transactions",
    Icon: BiDollar,
    title: "Transactions",
  },
  {
    href: "/dashboard/admin/all-reviews",
    Icon: MdReviews,
    title: "Reviews",
  },
   {
    href: "/dashboard/admin/coupon",
    Icon: BiDollar,
    title: "Coupon",
  },
  {
    href: "/dashboard/admin/admin-profile",
    title: "Admin Profile",
    Icon: CiUser,
  }
  
  
];


export const vendorLinks: NavItem[] = [
  {
    href: "/dashboard/vendor",
    Icon: GrServices,
    title: "Vendor Dashboard",
  },
  {
    href: "/dashboard/vendor/manage-products",
    Icon: FaRegRectangleList,
    title: "Manage Products",
  },
   {
    href: "/dashboard/vendor/update-shop",
    Icon: GrServices,
    title: "Update Shop",
  },
   {
    href: "/dashboard/vendor/manage-orders",
    Icon: LiaShippingFastSolid,
    title: "Manage Orders",
  },
   {
    href: "/dashboard/vendor/manage-reviews",
    Icon: MdOutlineReviews,
    title: "Manage Reviews",
  },


];


export const customerLinks: NavItem[] = [
  {
    href: "/dashboard/customer",
    title: "User Profile",
    Icon: CiUser,
  },
  {
    href: "/dashboard/customer/settings",
    title: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/dashboard/customer/my-orders",
    title: "My Orders",
    Icon: RiLockPasswordLine,
  },
  {
    href: "/dashboard/customer/followed-shop",
    title: "Favourite Shop",
    Icon: RiLockPasswordLine,
  },
];
