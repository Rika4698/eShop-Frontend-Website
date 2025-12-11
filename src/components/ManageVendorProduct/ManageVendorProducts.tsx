"use client";

import Loading from "@/app/loading";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import ProductTable from "@/components/ManageProducts/ProductTable";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import useUserDetails from "@/hooks/useUser";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

const ManageVendorProducts = () => {
  const { userData: vendorData, isFetching: userFetching } = useUserDetails();
  const { data: categories, isLoading: categoryLoading } = useGetAllCategoriesQuery(undefined);
  
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  // Fetch products directly from product API with vendorId filter
  const { data: productsData, isLoading: productsLoading, refetch } = useGetAllProductsQuery({
    vendorId: vendorData?.userData?.id,
    page: currentPage,
    limit: dataPerPage,
  }, {
    skip: !vendorData?.userData?.id, // Skip query if vendorId is not available
    refetchOnMountOrArgChange: true, // Refetch on mount or when args change
  });

  // Page Change Handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const products = productsData?.data || [];
  const totalProducts = productsData?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  const isLoading = userFetching || categoryLoading || productsLoading;

  if (isLoading && !products.length) {
    return <Loading />;
  }

  return (
    <div>
      {/* Heading */}
      <DashboardHeading
        title="Manage Products"
        description="Create a new product and add it to your store"
        className="mb-[20px]"
      />

      {/* Create Product Button */}
      <div className="w-full h-full flex items-center justify-end gap-[5px] mb-[23px]">
        <Link
          href="/dashboard/vendor/create-product"
          className="inline-block bg-[#71b40d] text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 hover:bg-[#416815]"
        >
          Create Product <PenIcon className="inline-block ml-2" />
        </Link>
      </div>

      {/* Product Table */}
      <ProductTable 
        products={products} 
        categories={categories || []} 
        isLoading={productsLoading} 
      />

      {/* Pagination */}
      {totalProducts > 0 && (
        <div className="flex justify-center items-center mt-8">
          <div className="flex items-center space-x-2">
            {/* Left Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all duration-300 text-white 
              ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-[#80b500]"}`}
            >
              {"<"}
            </button>
            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full transition-all duration-300 
                ${currentPage === index + 1 ? "bg-[#80b500] text-white" : "bg-gray-200 text-rose-600 hover:bg-[#80b500] hover:text-white"}`}
              >
                {index + 1}
              </button>
            ))}
            {/* Right Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all duration-300 text-white 
              ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-[#80b500]"}`}
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVendorProducts;