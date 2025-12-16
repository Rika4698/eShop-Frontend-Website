"use client";

import { useEffect, useState, useCallback } from "react";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import Loading from "@/app/loading";
import { IProduct } from "@/types/modal";
import HomePageProductCard from "./HomePageProductCard";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

const HomeProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4);

  const [queryObj, setQueryObj] = useState({
    flashSale: false,
    page: 1,
    limit: 4,
  });

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(queryObj);

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update dataPerPage on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newDataPerPage = 4;

      if (width >= 1280) newDataPerPage = 8;
      else if (width >= 768) newDataPerPage = 6;

      requestAnimationFrame(() => setDataPerPage(newDataPerPage));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update queryObj whenever currentPage or dataPerPage changes
  useEffect(() => {
    const newQueryObj = {
      flashSale: false,
      page: currentPage,
      limit: dataPerPage,
    };
    requestAnimationFrame(() => setQueryObj(newQueryObj));
  }, [currentPage, dataPerPage]);

  // Refetch data when queryObj changes
  useEffect(() => {
    refetch();
  }, [queryObj, refetch]);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisAfter = 3;
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 max-w-7xl mx-auto ">
      {/* Header Section */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Latest Products
            </h2>
            <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-[#18b500] to-[#48ad39] rounded-full"></div>
          </div>
          
          {/* Product Count */}
          {allProductsResponse?.meta?.total && (
            <div className="flex items-center gap-2 bg-[#18b500]/10 px-4 py-2 rounded-lg">
              <Package className="w-5 h-5 text-[#18b500]" />
              <span className="text-sm sm:text-base font-semibold text-gray-700">
                {allProductsResponse.meta.total} Products Available
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <Loading />
              </div>
            ))
          : allProductsResponse?.data?.length > 0 
          ? allProductsResponse.data.map((singleProduct: IProduct) => (
              <div 
                key={singleProduct.id} 
                className="transform transition-all duration-300 hover:scale-105"
              >
                <HomePageProductCard singleProduct={singleProduct} />
              </div>
            ))
          : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16">
              <Package className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-500 text-sm sm:text-base text-center">
                Check back later for new products
              </p>
            </div>
          )}
      </div>

      {/* Pagination - Now visible on all devices */}
      {allProductsResponse?.data?.length > 0 && totalPages > 1 && (
        <div className="mt-8 sm:mt-10 md:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Page Info */}
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing page <span className="font-semibold text-[#18b500]">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2 order-1 sm:order-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                  flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg
                  transition-all duration-300 font-medium
                  ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#18b500] hover:text-[#18b500] hover:shadow-md"
                  }
                `}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-2">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`
                        w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-medium text-sm sm:text-base
                        transition-all duration-300
                        ${
                          currentPage === page
                            ? "bg-gradient-to-r from-[#18b500] to-[#48ad39] text-white shadow-lg scale-110"
                            : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#18b500] hover:text-[#18b500] hover:shadow-md"
                        }
                      `}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                  flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg
                  transition-all duration-300 font-medium
                  ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#18b500] hover:text-[#18b500] hover:shadow-md"
                  }
                `}
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Jump - Only on larger screens */}
          {totalPages > 5 && (
            <div className="hidden md:flex justify-center items-center gap-3 mt-6">
              <label htmlFor="pageJump" className="text-sm text-gray-600 font-medium">
                Jump to page:
              </label>
              <select
                id="pageJump"
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-[#18b500] focus:ring-2 focus:ring-[#18b500]/20 transition-all"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HomeProducts;