
import { NavItem } from "@/types/modal";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiShop, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";

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
  
];


