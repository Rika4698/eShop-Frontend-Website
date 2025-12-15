/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";



export const VendorCard = ({ vendor, userData, refetch, followUser, unfollowUser }: any) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUnfollowing, setIsUnfollowing] = useState(false);

  const isFollowingVendor =
    userData?.userData?.role === "CUSTOMER" &&
    vendor.vendor.followers.some((f: any) => f.customerId === userData?.userData?.id);

  const handleFollowVendor = async () => {
    try {
      setIsFollowing(true);
      await followUser({ vendorId: vendor.vendor.id }).unwrap();
      toast.success("You followed successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to follow shop");
      console.error(err);
    } finally {
      setIsFollowing(false);
    }
  };

  const handleUnfollowVendor = async () => {
    try {
      setIsUnfollowing(true);
      await unfollowUser({ vendorId: vendor.vendor.id }).unwrap();
      toast.success("Unfollow successful");
      refetch();
    } catch (err) {
      toast.error("Failed to unfollow shop");
      console.error(err);
    } finally {
      setIsUnfollowing(false);
    }
  };

  const params = new URLSearchParams();
  if (vendor?.vendor?.id) params.append("shop", vendor.vendor.id);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-green-500 transform hover:-translate-y-2">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
          <Image
            width={110}
            height={110}
            className="relative h-28 w-28 rounded-full object-cover border-4 border-gray-200 group-hover:border-green-500 transition-colors"
            src={vendor?.vendor?.logo || "https://via.placeholder.com/110?text=No+Logo"}
            alt={vendor?.vendor?.name || "Vendor"}
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center group-hover:text-green-600 transition-colors">
          {vendor?.vendor?.name || "Unknown Vendor"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{vendor.email}</p>
        <p className="text-base text-gray-700 mt-2 font-semibold">{vendor?.vendor?.shopName || "No shop name"}</p>

        {/* Stats */}
        {vendor?.vendor?._count && (
          <div className="flex gap-4 mt-3 text-sm text-gray-600">
            <span>{vendor.vendor._count.products} Products</span>
            <span>{vendor.vendor._count.followers} Followers</span>
          </div>
        )}

        {/* Follow/Unfollow */}
        {userData?.userData?.role === "CUSTOMER" && (
          <div className="flex justify-center md:justify-start mt-6">
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

        {/* Visit Shop */}
        <Link href={`/shop-page?${params.toString()}`} className="flex-1 w-full mt-3">
          <button className="w-full h-11 px-4 rounded-lg border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transform hover:scale-105 transition-all duration-300">
            Visit Shop
          </button>
        </Link>
      </div>
    </div>
  );
};
