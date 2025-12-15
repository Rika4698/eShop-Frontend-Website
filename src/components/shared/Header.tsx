"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { FaArrowRightArrowLeft, FaRegUser } from "react-icons/fa6";

import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";


import Loading from "@/app/loading";
import useUserDetails from "@/hooks/useUser";
import { selectCompareProducts } from "@/redux/features/productCompare/compareSlice";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/modal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavSearchProductCard from "../Home/NavSearchCard";
import Cart from "../Navbar/Cart";
import { UserDropDown } from "../Navbar/UserDropDown";
import ProductComparison from "../productComparison/ComparisonModal";

const Header = () => {
    const path = usePathname();

    const { userData, isLoading: userLoading  } = useUserDetails();
    const cartProduct = useAppSelector((state) => state.products.cart);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
      const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const productsForComparison = useAppSelector(selectCompareProducts);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const { data: allProductsResponse, isLoading } = useGetAllProductsQuery(
        {
            searchTerm: debouncedSearchTerm,
        },
        {
            skip: !debouncedSearchTerm,
        }
    );

    // Debounce implementation using setTimeout for search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    console.log(allProductsResponse);

    const handleClickOutside = (event: MouseEvent) => {
        const searchInput = document.querySelector("#search-input");
        const searchDropdown = document.querySelector("#search-dropdown");


        if (
            searchInput &&
            !searchInput.contains(event.target as Node) &&
            searchDropdown &&
            !searchDropdown.contains(event.target as Node)
        ) {
            setSearchTerm("");
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, []);

   const handleMobileMenuClick = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className={path === "/dashboard" ? "hidden" : ""}>
            <div className="lg:px-2 md:px-0 overflow-hidden py-2 lg:py-0">
                <div className="border-b-[1px] pb-2 lg:border-white">
                    <div className="lg:max-w-full lg:mx-auto lg:pr-2 xl:pl-2 xl:pr-6 ">
                        <div className="flex justify-between lg:items-center lg:justify-between gap-16 md:gap-0">
                            <div className=" flex items-center ">
                                <div className="flex lg:gap-12  items-center ">
                                    <div className="flex items-center cursor-pointer ">
                                        <div className=" flex lg:hidden  ">
                                            <DropdownMenu >
                                                <DropdownMenuTrigger
                                                    asChild
                                                    className="border-none "    >
                                                    <Button variant="outline">
                                                        <Menu className="text-gray-600" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56 lg:hidden">
                              
                          <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
                <Link href="/"  className={`text-[14px] uppercase ${path === "/"? "text-green-600 font-semibold" : "text-gray-700"}`}>
                              HOME
                        </Link>
                        </DropdownMenuItem>

                       
                            <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
                     <Link href="/all-product"   className={`text-[14px] uppercase ${path === "/all-product"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>  Products </Link>
              </DropdownMenuItem>

                 <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
                    <Link href="/flashSale" className={`text-[14px] uppercase ${
          path === "/flashSale"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>   Flash Sale      </Link>
                                                            
          </DropdownMenuItem>
           
            <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
                        <Link
                    href="/about-us" className={`text-[14px] uppercase ${path === "/about-us" ? "text-green-600 font-semibold" : "text-gray-700"}`}>
                                 About us
                                                          
                                 </Link>
                             </DropdownMenuItem>




           <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
                        <Link
                    href="/contact" className={`text-[14px] uppercase ${path === "/contact" ? "text-green-600 font-semibold" : "text-gray-700"}`}>
                                 Contact
                                                          
                                 </Link>
                             </DropdownMenuItem>

                 <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
                    <Link href="/news" className={`text-[14px] uppercase ${
          path === "/news"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>   News      </Link>
                                                            
          </DropdownMenuItem>
        <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
         <Link  href="/blog"  className={`text-[14px] uppercase ${
          path === "/blog"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>        Blog  </Link>
                                                         
                 </DropdownMenuItem>

                  <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
         <Link  href="/faq"  className={`text-[14px] uppercase ${
          path === "/faq"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>        FAQ </Link>
                                                         
                 </DropdownMenuItem>


                  <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
         <Link  href="/conditions"  className={`text-[14px] uppercase ${
          path === "/conditions"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>     Terms and Conditions </Link>
                                                         
                 </DropdownMenuItem>


                  <DropdownMenuItem className="lg:hidden"  onClick={handleMobileMenuClick}>
         <Link  href="/policy"  className={`text-[14px] uppercase ${
          path === "/policy"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>       Privacy Policy </Link>
                                                         
                 </DropdownMenuItem>


                  </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
           <div className="flex ">
              <Image src="/logo.png" className="md:w-[72px] w-[50px] pt-2 hidden md:block"
                          width={170} height={50} alt="logo"/>
                 </div>
                      <div>
             <h2 className="md:text-3xl text-[20px] font-bold text-green-800">
                 E<span className="md:text-2xl text-[16px] text-green-500">Shop</span> 
                 </h2>
              <p className="text-[12px] md:text-sm text-gray-400 flex">
                     Online Shopping
                 </p>
                         </div>
                         </div>
                    </div>



              <div className="lg:flex items-center justify-center hidden ml-[150px] xl:ml-[190px] gap-6">
  <div className="relative ">
    <div className="relative search-container">
      <input
        id="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearchOpen(true)}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#f3f4f7] outline-none px-8 py-3 rounded-sm w-[40vw] min-w-[280px] max-w-[800px]"
        type="text"
        placeholder="Search for products name..."
      />

      <div className="absolute right-0 cursor-pointer top-0 bg-[#25a817] px-6 py-3 rounded-r-sm">
        <Search className="text-white" />
      </div>

     
    </div>
  </div>
</div>



                 </div>



   {/* login */}

                <div className="-ml-5 md:ml-0">
              
              <HoverCard>
                  <HoverCardTrigger asChild>
                      <div className="flex justify-center items-center gap-2.5 md:gap-6  px-1 md:py-4">
                     <div>
                   {userLoading ? ( 
                    <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400" /> ) : userData ? ( 
                   <UserDropDown user={userData} /> ) : (
                         <Link href="/login">
                    
                   <div className=" flex  justify-center items-center gap-2 border-2 md:border-4 border-[#0eb313] rounded-lg px-2 py-1.5">
                        
                  <FaRegUser className="hidden md:block hover:text-red-400 font-semibold duration-300" />
                      
                   <div className="font-bold">
                     {" "} Login
                          </div>
                         </div>
                    </Link>      )}
                        </div>

                     <div onClick={() => setOpenWishlist(true) } >
                      <div title="Product Comparison" className="bg-[#d3d0d0] w-[40px] relative h-[40px] flex justify-center items-center rounded-full">
                       
                         <FaArrowRightArrowLeft className="text-[21px] text-gray-500 font-bold" />
                       <span className="bg-[#48a42e] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                      {  productsForComparison.length }
                              </span>
                         </div>
                         </div>

                   <div  onClick={() =>  setOpenCart(true) }  >
                     <div title="My Cart" className="bg-white w-[40px] relative h-[40px] flex justify-center items-center rounded-full">
                        <Image  src="https://i.ibb.co.com/HfVwqKXh/images-1.jpg"  width={30} height={20} alt=""
                            className="text-red-200 rounded-full"/>
                     {cartProduct.length >0 && (<span className="bg-[#35ab39] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                        {  cartProduct.length } </span> )}
                              </div>
                             </div>
                               </div>
                        </HoverCardTrigger>

                         </HoverCard>
                          
                            </div> 
                        </div>

                    </div>
                </div>


                  {/* Search Results Dropdown  */}
                                {isSearchOpen && searchTerm && (
                                    <div
                                        id="search-dropdown"
                                        className=" hidden lg:block absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:ml-[320px] xl:ml-[370px]  top-full mt-0 bg-white shadow-2xl rounded-lg border border-gray-200 w-[40vw] min-w-[280px] max-w-[600px] max-h-[500px] overflow-y-auto z-[150] "
                                        style={{
                                            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                                        }}
                                    >
                                        {isLoading ? (
                                            <div className="p-4">
                                                {Array.from({ length: 3 }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-b-0"
                                                    >
                                                        <div className="w-16 h-16 bg-gray-200 rounded-md animate-pulse" />
                                                        <div className="flex-1">
                                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                                                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : allProductsResponse?.data?.length > 0 ? (
                                            <div>
                                                {allProductsResponse.data.map((singleProduct: IProduct) => (
                                                    <div
                                                        key={singleProduct.id}
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            setIsSearchOpen(false);
                                                        }}
                                                    >
                                                        <NavSearchProductCard singleProduct={singleProduct} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-6 text-center text-gray-500">
                                                <svg
                                                    className="w-12 h-12 mx-auto mb-2 text-gray-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <p className="text-sm">No products found</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Try searching with different keywords
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
            </div>
            {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} />}
            {openWishlist && (
                <ProductComparison
                    setOpenWishlist={setOpenWishlist}
                    openWishlist={openWishlist}
                />
            )}
        </div>
    );
};

export default Header;
