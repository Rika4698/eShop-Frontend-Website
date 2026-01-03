import StatCard from "./StatCard";
import { Users, Package, ShoppingCart, Star, Tag, Store, FolderTree } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalCategories: number;
    totalProducts: number;
    totalOrders: number;
    totalReviews: number;
    totalCoupons: number;
    totalShops: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <StatCard 
        icon={Users} 
        title="Total Users" 
        value={stats.totalUsers}
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
        borColor="border-blue-500"
      />
      <StatCard 
        icon={FolderTree} 
        title="Total Categories" 
        value={stats.totalCategories}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
        borColor="border-purple-500"
      />
      <StatCard 
        icon={Package} 
        title="Total Products" 
        value={stats.totalProducts}
        bgColor="bg-green-100"
        iconColor="text-green-600"
        borColor="border-green-500"
      />
      <StatCard 
        icon={ShoppingCart} 
        title="Total Orders" 
        value={stats.totalOrders}
        bgColor="bg-orange-100"
        iconColor="text-orange-600"
        borColor="border-orange-500"
      />
      <StatCard 
        icon={Star} 
        title="Total Reviews" 
        value={stats.totalReviews}
        bgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        borColor="border-yellow-500"
      />
      <StatCard 
        icon={Tag} 
        title="Total Coupons" 
        value={stats.totalCoupons}
        bgColor="bg-pink-100"
        iconColor="text-pink-600"
        borColor="border-pink-500"
      />
      <StatCard 
        icon={Store} 
        title="Total Shops" 
        value={stats.totalShops}
        bgColor="bg-indigo-100"
        iconColor="text-indigo-600"
        borColor="border-indigo-500"
      />
    </div>
  );
};

export default DashboardStats;
