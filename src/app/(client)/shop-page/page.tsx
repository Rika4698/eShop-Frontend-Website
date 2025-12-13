/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import Loading from "@/app/loading";
import HomePageProductCard from "@/components/HomePage/HomePageProductCard";
import useUserDetails from "@/hooks/useUser";
import { useGetSingleCustomerQuery, useGetSingleVendorQuery } from "@/redux/features/category/authApi";
import { useFollowUserMutation, useUnfollowUserMutation } from "@/redux/features/users/userApi";
import { IFollow, IProduct } from "@/types/modal";
import { Pagination } from "@nextui-org/pagination";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FaUserFriends, FaStore } from "react-icons/fa";
import { toast } from "sonner";
import { MapPin, Package, UserCheck, UserPlus } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const Views = () => {
  const searchParams = useSearchParams();
  const vendorId = searchParams.get("shop") || "";   
  const { userData } = useUserDetails();

  const email = userData?.userData?.email || "";    

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;

  const { data: singleVendor, isLoading, refetch: refetchVendor } = useGetSingleVendorQuery(vendorId, {
    skip: !vendorId,
  });

  const { data: singleCustomer, refetch: refetchCustomer } = useGetSingleCustomerQuery(email, {
    skip: !email,
  });

   const { data: categories = [] } =
    useGetAllCategoriesQuery(undefined);

  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowing }] = useUnfollowUserMutation();

    const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat: any) => {
      map[cat.id] = cat.name;
    });
    return map;
  }, [categories]);

  // const startIndex = (currentPage - 1) * dataPerPage;
  // const endIndex = startIndex + dataPerPage;

  // const paginatedProducts = singleVendor?.products?.slice(startIndex, endIndex) || [];
  // console.log(paginatedProducts,"pro");
  // const totalProducts = singleVendor?.products?.length || 0;
  // const totalPages = Math.ceil(totalProducts / dataPerPage);


   const products: IProduct[] = singleVendor?.products || [];
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  // Check if customer is following this vendor
  const isFollowingVendor = singleCustomer?.following?.some(
    (follow: IFollow) => follow.vendorId === vendorId
  );
  // console.log(singleCustomer.following);
  // console.log(isFollowingVendor,"ccc");

  const handleFollowVendor = async () => {
    try {
      await followUser({ vendorId: singleVendor?.id }).unwrap();
      toast.success("You followed successfully");
      
      // Refetch both queries to update UI immediately
      refetchVendor();
      refetchCustomer();
    } catch (error) {
      toast.error("Failed to follow shop");
      console.error(error);
    }
  };

  const handleUnfollowVendor = async () => {
    try {
      await unfollowUser({ vendorId: singleVendor?.id }).unwrap();
      toast.success("Unfollow successful");
      
      // Refetch both queries to update UI immediately
      refetchVendor();
      refetchCustomer();
    } catch (error) {
      toast.error("Failed to unfollow shop");
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Shop Header Section */}
      <div 
        className="relative bg-cover bg-center py-8 md:py-12 lg:py-16"
        style={{
          backgroundImage: 'url("https://i.ibb.co.com/G7HdNwJ/bNr.jpg")',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Shop Info Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                  {/* Shop Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-green-500 overflow-hidden bg-gray-100 shadow-lg">
                      <Image 
                        className="w-full h-full object-cover" 
                        src={singleVendor?.logo || "https://i.pinimg.com/originals/d9/4e/34/d94e34a2679cbfcc38c8d8d7a58b5503.jpg"} 
                        alt="shop" 
                        width={112} 
                        height={112}
                      /> 
                    </div>
                  </div>

                  {/* Shop Info */}
                  <div className="flex-1 text-center md:text-left min-w-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 break-words">
                      {singleVendor?.shopName || "Shop Name"}
                    </h1>
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">
                      {singleVendor?.description || "No description available."}
                    </p>

                    {/* Shop Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                      <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <FaUserFriends className="text-green-600 text-lg sm:text-xl" />
                          <div className="text-left">
                            <p className="text-xs text-gray-600">Followers</p>
                            <p className="text-base sm:text-lg font-bold text-gray-800">
                              {singleVendor?.followers?.length || 0}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Package className="text-blue-600 text-lg sm:text-xl" />
                          <div className="text-left">
                            <p className="text-xs text-gray-600">Products</p>
                            <p className="text-base sm:text-lg font-bold text-gray-800">
                              {totalProducts}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-2 sm:p-3 col-span-2 sm:col-span-1">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <FaStore className="text-purple-600 text-lg sm:text-xl" />
                          <div className="text-left">
                            <p className="text-xs text-gray-600">Owner</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                              {singleVendor?.name || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Follow/Unfollow Button  */}
                    {userData?.userData?.role === "CUSTOMER" && (
                      <div className="flex justify-center md:justify-start">
                        {isFollowingVendor ? (
                          <button
                            onClick={handleUnfollowVendor}
                            disabled={isUnfollowing}
                            className="flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUnfollowing ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                <span className="text-sm sm:text-base">Unfollowing...</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-5 h-5" />
                                <span className="text-sm sm:text-base">Unfollow</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={handleFollowVendor}
                            disabled={isFollowing}
                            className="flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isFollowing ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                <span className="text-sm sm:text-base">Following...</span>
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-5 h-5" />
                                <span className="text-sm sm:text-base">Follow Shop</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Shop Products
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Browse {totalProducts} products from this shop
          </p>
        </div>

        {/* Products Grid */}
        {totalProducts === 0 ? (
          <div className="text-center py-12 md:py-20">
            <Package className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              This shop hasn't added any products yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {paginatedProducts.map((product: IProduct) => (
                <div key={product.id}>
                  <HomePageProductCard singleProduct={product} categoryName={
                    categoryMap[product.categoryId || ""] ||
                    "Unknown Category"
                  } />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 md:mt-12">
                <Pagination
                  total={totalPages}
                  page={currentPage}
                  onChange={setCurrentPage}
                  showControls
                  color="success"
                  size="lg"
                  className="gap-2"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Views;