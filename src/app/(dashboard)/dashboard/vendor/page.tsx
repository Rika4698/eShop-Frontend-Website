/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { FaBox, FaShoppingCart, FaUsers, FaStar, FaChartLine, FaTruck } from "react-icons/fa";
import { TrendingUp, Package, ShoppingBag, MessageSquare, Store } from "lucide-react";
import Link from "next/link";
import useUserDetails from "@/hooks/useUser";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewsApi";




interface VendorStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  totalReviews: number;
  averageRating: number;
}

const WelcomePage = () => {
  const { userData, isLoading: userLoading } = useUserDetails();

 
  const { data: productsData, isLoading: productsLoading } = useGetAllProductsQuery(
    {
      page: 1,
      limit: 10000,
      vendorId: userData?.userData?.id,
    },
    { skip: !userData?.userData?.id }
  );


  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery(
    {
      page: 1,
      limit: 10000,
      vendorId: userData?.userData?.id,
    },
    { skip: !userData?.userData?.id }
  );

 
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery(
    {
      page: 1,
      limit: 10000,
      vendorId: userData?.userData?.id,
    },
    { skip: !userData?.userData?.id }
  );

  
  const isLoading = userLoading || productsLoading || ordersLoading || reviewsLoading || !userData?.userData?.id;




  const vendorStats = useMemo<VendorStats>(() => {
    // Total Products
    const totalProducts = productsData?.meta?.total || 0;

    // Total Orders
    const totalOrders = ordersData?.meta?.total || 0;

    // Total Revenue 
    const totalRevenue = ordersData?.data?.reduce(
      (sum: number, order: any) => sum + (order.totalPrice || 0),
      0
    ) || 0;

    // Unique Customers 
    const uniqueCustomers = new Set(
      ordersData?.data?.map((order: any) => order.customerId) || []
    );


    const totalCustomers = uniqueCustomers.size;

    // Total Reviews
    const totalReviews = reviewsData?.length || 0;

    // Average Rating
    const averageRating = totalReviews > 0
      ? (reviewsData?.reduce((sum: number, review: any) => sum + review.rating, 0) || 0) / totalReviews
      : 0;

    return {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      totalReviews,
      averageRating,
    };
  }, [productsData, ordersData, reviewsData]);

  const stats = [
    {
      title: "Total Products",
      value: vendorStats.totalProducts.toString(),
      icon: FaBox,
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-600",
      link: "/dashboard/vendor/products",
    },
    {
      title: "Total Orders",
      value: vendorStats.totalOrders.toString(),
      icon: FaShoppingCart,
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600",
      link: "/dashboard/vendor/orders",
    },
    {
      title: "Total Customers",
      value: vendorStats.totalCustomers.toString(),
      icon: FaUsers,
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600",
      link: "/dashboard/vendor/orders",
    },
    {
      title: "Total Reviews",
      value: vendorStats.totalReviews.toString(),
      icon: FaStar,
      color: "bg-yellow-500",
      gradient: "from-yellow-400 to-yellow-600",
      link: "/dashboard/vendor/reviews",
    },
  ];

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create and list a new product",
      icon: Package,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      link: "/dashboard/vendor/products/add",
    },
    {
      title: "View Products",
      description: "Manage your product inventory",
      icon: ShoppingBag,
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      link: "/dashboard/vendor/products",
    },
    {
      title: "View Orders",
      description: "Check pending and completed orders",
      icon: FaShoppingCart,
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      link: "/dashboard/vendor/orders",
    },
    {
      title: "Manage Reviews",
      description: "Respond to customer reviews",
      icon: MessageSquare,
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      link: "/dashboard/vendor/reviews",
    },
    
  ];

  // Get recent orders 
  const recentOrders = useMemo(() => {
    return ordersData?.data?.slice(0, 5) || [];
  }, [ordersData]);

  return (
    <div className="min-h-screen  overflow-x-hidden">
      {isLoading ? (
         <>
         
          {/* Header Skeleton */}
          <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-lg">
            <div className="container mx-auto">
              <div className="h-8 sm:h-10 bg-white/20 rounded w-3/4 sm:w-1/2 animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded w-1/2 sm:w-1/3 mt-2 animate-pulse"></div>
            </div>
          </header>

          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {/* Welcome Card Skeleton */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 lg:mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-300 rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="mb-6 sm:mb-8">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-full mb-4"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                          </div>
                        </div>
                        <div className="w-20">
                          <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
          

          {/* Footer Skeleton */}
          <footer className="bg-white border-t border-gray-200 text-center py-6 mt-12">
            <div className="container mx-auto px-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto animate-pulse"></div>
            </div>
          </footer>
        </>
      ) : (
        <>
          {/* Header */}
          <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-lg rounded-md">
            <div className="container mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Welcome to Your Vendor Dashboard
              </h1>
              <p className="text-green-100 mt-2 text-sm sm:text-base">
                Manage your store, track performance, and grow your business
              </p>
            </div>
          </header>

      {/* Main Content */}
      <main className="container mx-auto  py-6 sm:py-8 lg:py-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <FaStar className="text-2xl sm:text-3xl text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Hello, {userData?.userData?.name || "Vendor"}! 👋
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            This is your central hub where you can manage your products, orders, and customers efficiently. 
            Get insights into your business performance and make data-driven decisions to grow your store.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12 p-4 border bg-green-100 rounded-lg">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                href={stat.link}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-white transform hover:scale-105 cursor-pointer`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Icon className="text-2xl sm:text-3xl" />
                    </div>
                    <TrendingUp className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium opacity-90 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {stat.value}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                 
                  className="group block "
                >
                  <div className={`${action.color} rounded-xl p-6 transition-all duration-300 shadow-md hover:shadow-xl border border-transparent hover:border-current`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="text-2xl sm:text-3xl" />
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg mb-2 whitespace-nowrap">
                        {action.title}
                      </h4>
                      <h3 className="text-xs sm:text-sm opacity-80  w-40 ">
                        {action.description}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Recent Orders
              </h3>
              <Link 
                href="/dashboard/vendor/manage-orders"
                className="text-green-600 hover:text-green-700 text-sm font-semibold"
              >
                View All →
              </Link>
            </div>
            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FaShoppingCart className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {order.customer?.name || "Customer"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.orderDetails?.length || 0} items
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">
                        {order.totalPrice?.toFixed(2)} TK
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <FaShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-sm sm:text-base">No recent orders</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Orders will appear here when customers make purchases
                </p>
              </div>
            )}
          </div>

          {/* Performance Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Performance Overview
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Total Revenue</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">
                      {vendorStats.totalRevenue.toFixed(2)} TK
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaStar className="text-yellow-600" />
                  </div>
                  <div className="">
                    <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">
                      {vendorStats.averageRating.toFixed(1)}/5.0
                    </p>
                  </div>
                </div>
                <span className="text-yellow-600 text-xs sm:text-sm font-semibold">
                  ★ {vendorStats.totalReviews} reviews
                </span>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaShoppingCart className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Average Order</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">
                      {vendorStats.totalOrders > 0
                        ? (vendorStats.totalRevenue / vendorStats.totalOrders).toFixed(2)
                        : "0.00"}{" "}
                      TK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 text-center py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Vendor Dashboard. All rights reserved.
          </p>
         
        </div>
      </footer>
        </>
      )}
    </div>
  );
};

export default WelcomePage;