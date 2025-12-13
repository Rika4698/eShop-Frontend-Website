"use client";

import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBillWave, FaChartLine, FaStar, FaTruck } from "react-icons/fa";
import { TrendingUp, Package, ShoppingBag, DollarSign } from "lucide-react";
import Link from "next/link";

const WelcomePage = () => {
  const stats = [
    {
      title: "Total Products",
      value: "0",
      icon: FaBox,
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-600",
      link: "/dashboard/vendor/products",
    },
    {
      title: "Pending Orders",
      value: "0",
      icon: FaShoppingCart,
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600",
      link: "/dashboard/vendor/orders",
    },
    {
      title: "Total Customers",
      value: "0",
      icon: FaUsers,
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600",
      link: "/dashboard/vendor/customers",
    },
    {
      title: "Revenue",
      value: "$0",
      icon: FaMoneyBillWave,
      color: "bg-green-500",
      gradient: "from-green-400 to-green-600",
      link: "/dashboard/vendor/revenue",
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
      title: "View Orders",
      description: "Check pending and completed orders",
      icon: ShoppingBag,
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      link: "/dashboard/vendor/orders",
    },
    {
      title: "Sales Analytics",
      description: "Track your sales performance",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      link: "/dashboard/vendor/analytics",
    },
    {
      title: "Manage Shipping",
      description: "Update shipping and delivery",
      icon: FaTruck,
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      link: "/dashboard/vendor/shipping",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-lg">
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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <FaStar className="text-2xl sm:text-3xl text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Hello, Vendor! 👋
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  href={action.link}
                  className="group block"
                >
                  <div className={`${action.color} rounded-xl p-6 transition-all duration-300 shadow-md hover:shadow-xl border border-transparent hover:border-current`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="text-2xl sm:text-3xl" />
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        {action.title}
                      </h4>
                      <p className="text-xs sm:text-sm opacity-80">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
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
                href="/dashboard/vendor/orders"
                className="text-green-600 hover:text-green-700 text-sm font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <FaShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">No recent orders</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Orders will appear here when customers make purchases
              </p>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Performance Overview
              </h3>
              <Link 
                href="/dashboard/vendor/analytics"
                className="text-green-600 hover:text-green-700 text-sm font-semibold"
              >
                View Analytics →
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Total Sales</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">$0</p>
                  </div>
                </div>
                <span className="text-green-600 text-xs sm:text-sm font-semibold">+0%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">New Customers</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">0</p>
                  </div>
                </div>
                <span className="text-green-600 text-xs sm:text-sm font-semibold">+0%</span>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <DollarSign className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Average Order</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">0</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs sm:text-sm font-semibold">--</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 text-center py-6 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Vendor Dashboard. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Made with for vendors
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
