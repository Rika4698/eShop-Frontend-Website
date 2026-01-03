/* eslint-disable react/no-unescaped-entities */

"use client";

import DashboardStats from "@/components/Dashboard/DashboardStats";
import MonthlyChart from "@/components/Dashboard/MonthlyChart";
import OverviewPieChart from "@/components/Dashboard/OverviewPieChart";
import UserDistributionChart from "@/components/Dashboard/UserDistributionChart";
import { useDashboardData } from "@/hooks/useDashboardData";
import { calculateStats, calculateUserDistribution, getMonthlyData } from "@/utils/dashboardHelpers";





const DashboardOverviewView = () => {
    
  const dashboardData = useDashboardData();
  
  if (dashboardData.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  const stats = calculateStats(dashboardData);
  const { adminCount, vendorCount, customerCount } = calculateUserDistribution(dashboardData.usersData);
const monthlyData = getMonthlyData(dashboardData.productsData, dashboardData.ordersData);

  const pieData = [
    { name: "Products", value: stats.totalProducts, color: "#3b82f6" },
    { name: "Orders", value: stats.totalOrders, color: "#10b981" },
    { name: "Reviews", value: stats.totalReviews, color: "#f59e0b" },
    { name: "Categories", value: stats.totalCategories, color: "#8b5cf6" }
  ];

  const userDistribution = [
    { role: "Total Users", count: stats.totalUsers },
    { role: "Admins", count: adminCount },
    { role: "Vendors", count: vendorCount },
    { role: "Customers", count: customerCount }
  ];


  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 relative overflow-hidden">

  <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
  <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-teal-200/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

  <div className="max-w-7xl mx-auto relative z-10">
   
    <div className="mb-8 animate-Down">
      <div className="relative inline-block">
 
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-20 animate-pulse"></div>
        
        <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-2">


            {/* Animated green dot indicator */}
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 ml-6">Welcome back! Here's your business overview</p>
        </div>
      </div>
    </div>



    {/* Stats Cards */}
    <div className="animate-fade" style={{ animationDelay: '0.2s' }}>
      <DashboardStats stats={stats} />
    </div>

    {/* Monthly Chart  */}
    <div className="animate-fade my-8" style={{ animationDelay: '0.4s' }}>
      <div className="relative group">
      
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100">
          <MonthlyChart data={monthlyData} />
        </div>
      </div>
    </div>

    {/* Pie Chart w*/}
    <div className="my-8 animate-fade" style={{ animationDelay: '0.6s' }}>
      <div className="relative group">

        {/* Animated green border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 overflow-hidden">
          {/* Top accent line */}
          <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 animate-shimmer"></div>
          <OverviewPieChart data={pieData} />
        </div>
      </div>
    </div>
    

    {/* User Distribution Chart */}
    <div className="animate-fade" style={{ animationDelay: '0.8s' }}>
      <div className="relative group">
     
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100">
          <UserDistributionChart data={userDistribution} />
        </div>
      </div>
    </div>

    {/* Floating green particles */}
    <div className="fixed top-20 right-10 w-2 h-2 bg-green-400 rounded-full animate-flo opacity-60"></div>
    <div className="fixed top-40 right-32 w-3 h-3 bg-emerald-400 rounded-full animate-flo opacity-40" style={{ animationDelay: '1s' }}></div>
    <div className="fixed bottom-20 left-20 w-2 h-2 bg-teal-400 rounded-full animate-flo opacity-50" style={{ animationDelay: '2s' }}></div>
  </div>


</div>
  );
};

export default DashboardOverviewView;
