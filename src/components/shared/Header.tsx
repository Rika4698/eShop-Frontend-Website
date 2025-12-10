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
// import { selectCompareProducts } from "@/redux/features/productCompare/compareSlice";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
// import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/modal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavSearchProductCard from "../Home/NavSearchCard";
// import Cart from "../Navbar/Cart";
import { UserDropDown } from "../Navbar/UserDropDown";
import ProductComparison from "../productComparison/ComparisonModal";

const Header = () => {
    const path = usePathname();

    const { userData } = useUserDetails();
    // const cartProduct = useAppSelector((state) => state.products.cart);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    // const productsForComparison = useAppSelector(selectCompareProducts);
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

        if (searchInput && !searchInput.contains(event.target as Node)) {
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

    return (
        <div className={path === "/dashboard" ? "hidden" : ""}>
            <div className="lg:px-2 md:px-0 overflow-hidden py-2 lg:py-0">
                <div className="border-b-[1px] pb-2">
                    <div className="lg:container lg:mx-auto">
                        <div className="flex justify-between lg:items-center lg:justify-between gap-16 md:gap-0">
                            <div className="flex items-center ">
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
                               <DropdownMenuSeparator />
                          <DropdownMenuItem className="lg:hidden">
                <Link href="/"  className={`text-[14px] uppercase ${path === "/"? "text-green-600 font-semibold" : "text-gray-700"}`}>
                              HOME
                        </Link>
                        </DropdownMenuItem>

                       
                            <DropdownMenuItem className="lg:hidden">
                     <Link href="/all-product"   className={`text-[14px] uppercase ${path === "/all-product"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>  Products </Link>
              </DropdownMenuItem>

                 <DropdownMenuItem className="lg:hidden">
                    <Link href="/flashSale" className={`text-[14px] uppercase ${
          path === "/flashSale"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>   Flash Sale      </Link>
                                                            
          </DropdownMenuItem>
           
            <DropdownMenuItem className="lg:hidden">
                        <Link
                    href="/about-us" className={`text-[14px] uppercase ${path === "/about-us" ? "text-green-600 font-semibold" : "text-gray-700"}`}>
                                 About us
                                                          
                                 </Link>
                             </DropdownMenuItem>




           <DropdownMenuItem className="lg:hidden">
                        <Link
                    href="/contact" className={`text-[14px] uppercase ${path === "/contact" ? "text-green-600 font-semibold" : "text-gray-700"}`}>
                                 Contact
                                                          
                                 </Link>
                             </DropdownMenuItem>

                 <DropdownMenuItem className="lg:hidden">
                    <Link href="/news" className={`text-[14px] uppercase ${
          path === "/news"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>   News      </Link>
                                                            
          </DropdownMenuItem>
        <DropdownMenuItem>
         <Link  href="/blog"  className={`text-[14px] uppercase ${
          path === "/blog"
            ? "text-green-600 font-semibold"
            : "text-gray-700"
        }`}>        Blog  </Link>
                                                         
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



                        <div className="lg:flex  items-center hidden ml-[100px] gap-6">
                          <div>
                     <div className="relative search-container">
                         <input  id="search-input"
                          value={searchTerm}
                          onChange={(e) =>
                      setSearchTerm( e.target.value)}
               onFocus={() =>setIsSearchOpen(true) }
         onClick={(e) =>  e.stopPropagation() } // Prevent click from propagating
                     className="bg-[#f3f4f7] outline-none px-8 py-3 rounded-md md:w-[440px] xl:w-[600px]"
                   type="text"
                  placeholder="Search for products..."/>

             <div className="absolute right-0 cursor-pointer -top-0 bg-[#80b500] px-6 py-3"> <Search className="text-white " />
            </div>
              {isSearchOpen && ( <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-10">
                   <div className="grid grid-cols-1 gap-1 justify-center items-center">
           {isLoading ? Array.from({   length: 3, }).map((_, index ) => (
              <div key={ index } > 
                <Loading />
                </div>  ) ): allProductsResponse?.data?.map( ( singleProduct: IProduct ) => (
                 <div key={singleProduct.id }  >
                      <NavSearchProductCard
                         singleProduct={singleProduct }/>
                 </div> ) )}
                          </div>
                         </div>   )}
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
                   {isLoading ? ( 
                    <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400" /> ) : userData ? ( 
                   <UserDropDown user={userData} /> ) : (
                         <Link href="/login">
                    
                   <div className=" flex  justify-center items-center gap-2 border-2 md:border-4 border-[#80b500] rounded-lg px-2 py-1.5">
                        
                  <FaRegUser className="hidden md:block hover:text-red-400 font-semibold duration-300" />
                      
                   <div className="font-bold">
                     {" "} Login
                          </div>
                         </div>
                    </Link>      )}
                        </div>

                     <div onClick={() => setOpenWishlist(true) } >
                      <div title="Product Comparison" className="bg-[#170f0d] w-[40px] relative h-[40px] flex justify-center items-center rounded-full">
                       
                         <FaArrowRightArrowLeft className="text-[21px] text-gray-500 font-bold" />
                       <span className="bg-[#7fad39] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                      {/* {  productsForComparison.length } */}
                              </span>
                         </div>
                         </div>

                   <div  onClick={() =>  setOpenCart(true) }  >
                     <div title="My Cart" className="bg-[#fff1ee] w-[40px] relative h-[40px] flex justify-center items-center rounded-full">
                        <Image  src="https://goatmoves.com/assets/images/static/cart.svg"  width={20} height={10} alt=""
                            className="text-red-200"/>
                     {/* {cartProduct.length >0 && (<span className="bg-[#7fad39] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                        {  cartProduct.length } </span> )} */}
                              </div>
                             </div>
                               </div>
                        </HoverCardTrigger>

                         </HoverCard>
                          
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
            {/* {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} />}
            {openWishlist && (
                <ProductComparison
                    setOpenWishlist={setOpenWishlist}
                    openWishlist={openWishlist}
                />
            )} */}
        </div>
    );
};

export default Header;
