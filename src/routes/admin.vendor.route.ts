import { NavItem } from "@/types/modal";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiShop, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";
import { FaRegRectangleList } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineReviews, MdReviews } from "react-icons/md";


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