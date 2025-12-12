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
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { toast } from "sonner";

const Views = () => {
 const searchParams = useSearchParams();
  const vendorId = searchParams.get("shop") || "";   
  const { userData } = useUserDetails();

  const email = userData?.userData?.email || "";    

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;

  const { data: singleVendor, isLoading } = useGetSingleVendorQuery(vendorId, {
    skip: !vendorId,
  });

  const { data: singleCustomer } = useGetSingleCustomerQuery(email, {
    skip: !email,
  });

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

  const paginatedProducts = singleVendor?.products?.slice(startIndex, endIndex) || [];
  const totalProducts = singleVendor?.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  const handleFollowVendor = async () => {
    await toast.promise(
      followUser({ vendorId: singleVendor?.id }).unwrap(),
      {
        loading: "Following...",
        success: "You followed successfully",
        error: "Failed to follow shop",
      }
    );
  };

  const handleUnfollowVendor = async () => {
    await toast.promise(
      unfollowUser({ vendorId: singleVendor?.id }).unwrap(),
      {
        loading: "Unfollowing...",
        success: "Unfollow successful",
        error: "Failed to unfollow shop",
      }
    );
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pb-14">
          <div className="p-8 flex flex-row px-72 justify-start items-center bg-cover bg-center rounded-lg"
          style={{
              backgroundImage:
                'url("https://i.ibb.co.com/G7HdNwJ/bNr.jpg")',
              height: '400px', 
            }}
          >
            <div className="mb-6 space-y-4 text-center">
              <div className="flex justify-center items-center bg-white gap-8 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg shadow-xl">
                <div className="flex justify-center items-center rounded-full">
            <Image className="rounded-full" src={singleVendor?.logo || "https://i.pinimg.com/originals/d9/4e/34/d94e34a2679cbfcc38c8d8d7a58b5503.jpg"} alt="shop" width={70} height={70} /> 
                </div>
                <div className="flex flex-col justify-center items-start text-center md:text-left">
                  <h2 className="text-2xl font-bold text-black">{singleVendor?.shopName || "Shop Name"}</h2>
                  <p className="text-black/90 text-lg max-w-lg mt-2">{singleVendor?.description || "No description available."}</p>
                  <p className="text-black/90 text-lg max-w-lg mt-2">{singleVendor?.name || "No description available."}</p>
                  <div className="text-black/70 text-lg flex items-center justify-center md:justify-start gap-2 mt-3">
                    <FaUserFriends className="text-xl" />
                    <span>{singleVendor?.followers?.length || 0} Followers</span>
                  </div>
                </div>
              </div>

              {userData?.userData?.role === "CUSTOMER" &&
                !singleCustomer?.follows?.some((follow: IFollow) => follow.vendorId === vendorId) ? (
                <button
                  onClick={handleFollowVendor}
                  className="relative h-12 w-36 rounded-lg border-2 border-white text-primary  hover:bg-[#7fad39] hover:text-white font-bold px-5 py-2 shadow-lg transition duration-300"
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={handleUnfollowVendor}
                  className="relative h-12 w-36 rounded-lg border-2 border-white text-red-500  hover:bg-[#7fad39] hover:text-white font-bold px-5 py-2 shadow-lg transition duration-300"
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>

          {/* Shop Product Part */}
          <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-3">
            {isLoading
              ? Array.from({ length: dataPerPage }).map((_, index) => (
                  <div key={index}>
                    <Loading />
                  </div>
                ))
              : paginatedProducts.map((singleProduct: IProduct) => (
                  <div key={singleProduct.id}>
                    <HomePageProductCard singleProduct={singleProduct} />
                  </div>
                ))}
          </div>

         
         
         
        </div>
      )}
    </div>
  );
};

export default Views;
