/* eslint-disable react/no-unescaped-entities */
"use client";

import useUserDetails from "@/hooks/useUser";
import { useUnfollowUserMutation } from "@/redux/features/users/userApi";
import { IFollow, IVendor } from "@/types/modal";
import Image from "next/image";
import { toast } from "sonner";

const FavoriteShops = () => {
  const { userData, isLoading } = useUserDetails();
  const [unfollowUser] = useUnfollowUserMutation();

  const handleUnfollowVendor = async (vendor: IVendor) => {
    const vendorInfo = {
      vendorId: vendor.id,
    };

    await toast.promise(unfollowUser(vendorInfo).unwrap(), {
      loading: "Unfollowing...",
      success: `You unfollowed ${vendor?.shopName}`,
      error: "Failed to unfollow shop",
    });
  };

  return (
    <div className="">
      <div className="w-full mx-auto">
        <h1 className="text-4xl text-center text-black font-semibold mb-8">
          My Favorite Shops
        </h1>

        <div>
          {isLoading ? (
            <div className="flex justify-center items-center text-black text-2xl">
              Loading...
            </div>
          ) : (
            <div>
              {userData?.userData?.following?.length > 0 ? (
                <div className="overflow-x-auto  rounded-lg shadow-lg">
                  <table className="min-w-full table-auto text-black">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-2 text-left">Logo</th>
                        <th className="px-4 py-2 text-left">Shop Name</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData?.userData?.following?.map(
                        (singleFollow: IFollow) => (
                          <tr key={singleFollow?.id} className="border-b border-gray-700">
                            <td className="px-4 py-2">
                              <Image
                                className="object-cover h-16 w-16 rounded-full"
                                src={singleFollow?.vendor?.logo || "/BannerImg.JPG"}
                                alt="Shop Logo"
                                width={64}
                                height={64}
                              />
                            </td>
                            <td className="px-4 py-2">{singleFollow?.vendor?.shopName}</td>
                            <td className="px-4 py-2 text-sm text-gray-400">
                              {singleFollow?.vendor?.description}
                            </td>
                            <td className="px-4 py-2">
                              <button
                                onClick={() =>
                                  handleUnfollowVendor(singleFollow?.vendor)
                                }
                                className="px-4 py-2 text-lg font-semibold text-black border rounded-lg transition-colors duration-300 bg-red-500 hover:bg-red-700"
                              >
                                Unfollow
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <Image
                    src="/logo.png"
                    alt="No Shops"
                    width={120}
                    height={120}
                  />
                  <p className="text-2xl text-center text-black mt-4">
                    You haven't followed any shops yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteShops;
