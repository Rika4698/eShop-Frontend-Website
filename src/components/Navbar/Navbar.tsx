"use client";

import { BiMenuAltLeft } from "react-icons/bi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/modal";


import NavbarLink from "./NavbarLink";
import { useState } from "react";




const Navbar = () => {
 const path = usePathname();
  const router = useRouter();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { data: allCategories, } = useGetAllCategoriesQuery(undefined);
  const Home = [
    {
      title: "About Us",
      path: "/about-us",
    
    },
  ];
  const Pages = [
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "FAQ",
      path: "/faq",
    },
    {
      title: "Terms and Conditions",
      path: "/conditions",
    },
    {
      title: "Privacy Policy",
      path: "/policy",
    },
  ];

   const handleCategoryClick = (categoryName: string) => {
    router.push(`/all-products?category=${categoryName}`);
    setCategoryOpen(false); // Close dropdown
  };
  
  
  return (
    <div className={path === "/dashboard" ? "hidden" : ""}>
      <div className={`lg:flex hidden items-center justify-between lg:max-w-full lg:mx-auto bg-white lg:px-4 xl:px-8  py-2 `}>
        <div>
          <Select open={categoryOpen} onOpenChange={setCategoryOpen} >
            <SelectTrigger className="w-[220px] px-4 bg-[#1c9d29] text-white font-bold rounded-sm">
            <BiMenuAltLeft
              size={30}  className="text-white font-bold"/>
              <SelectValue placeholder="ALL CATEGORIES" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>CATEGORIES</SelectLabel>
                {allCategories?.map((category: ICategory) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {category.name}
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex md:flex-wrap items-center gap-2 text-[18px]">
        <NavbarLink name={"HOME"} Home={Home} link={"/"} path={path} />
          <Link
            href="/all-products"
            className={path === "/all-products" ? "bg-gray-200 text-green-700 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 hover:text-green-700 flex text-gray-700 items-center gap-2 px-[15px]  py-[5px] uppercase rounded-md">
              <span>
               
              </span>{" "}
           PRODUCTS
            </button>
          </Link>
          <Link
            href="/flashSale"
            className={path === "/flashSale" ? "bg-gray-200 text-green-700 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 hover:text-green-700 flex text-gray-700 items-center gap-2 px-[15px] py-[5px]  uppercase rounded-md">
              <span>
               
              </span>{" "}
           Flash Sale
            </button>
          </Link>
          <NavbarLink name={"Pages"} Home={Pages} link={"/"} path={path} />
          <Link
            href="/news"
            className={path === "/news" ? "bg-gray-200 text-green-700 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 hover:text-green-700 text-gray-700  px-[15px] py-[5px]  uppercase rounded-md">
              News
            </button>
          </Link>

          <Link
            href="/blog"
            className={path === "/blog" ? "bg-gray-200 text-green-700 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 hover:text-green-700 px-[15px] text-gray-700 py-[5px] uppercase rounded-md">
              Blog
            </button>
          </Link>
   
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
