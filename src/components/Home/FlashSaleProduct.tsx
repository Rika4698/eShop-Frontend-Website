"use client";
import Loading from "@/app/loading";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IProduct } from "@/types/modal";
import { useEffect, useState } from "react";
import HomePageProductCard from "../HomePage/HomePageProductCard";
import Link from "next/link";
import { Zap, ArrowRight, Flame } from "lucide-react";

const FlashSale = () => {
  const [dataPerPage, setDataPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryObj, setQueryObj] = useState({
    flashSale: true,
    limit: dataPerPage,
  });

  const {
    data: allProductsResponse,
    isLoading,
  } = useGetAllProductsQuery(queryObj);

  useEffect(() => {
    const updateDataPerPage = () => {
      const width = window.innerWidth;
      let newDataPerPage = 4;

      if (width >= 1280) {
        newDataPerPage = 8;
      } else if (width >= 768 && width < 1280) {
        newDataPerPage = 6;
      }

      setDataPerPage(newDataPerPage);
    };

    // Initial call
    updateDataPerPage();
    
    // Add event listener
    window.addEventListener("resize", updateDataPerPage);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDataPerPage);
    };
  }, []);

  const startIndex = (currentPage - 1) * dataPerPage;
  const currentProducts = allProductsResponse?.data?.slice(startIndex, startIndex + dataPerPage);

  return (
    <section className="py-8 sm:py-12 md:py-16  max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
     
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <div className="relative">
                <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-[#18b500] animate-pulse" />
                <div className="absolute inset-0 bg-[#18b500] blur-xl opacity-50 animate-pulse"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#18b500] via-[#48ad39] to-[#80b500]">
                Flash Sale
              </h2>
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#80b500] animate-bounce" />
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base">
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#18b500]/10 text-[#18b500] rounded-full font-bold animate-pulse">
                🔥 Limited Time Offer
              </span>
              {allProductsResponse?.meta?.total && (
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-[#48ad39]/20 to-[#80b500]/20 text-[#18b500] rounded-full font-semibold">
                  {allProductsResponse.meta.total} Deals
                </span>
              )}
            </div>
          </div>

          {/* View All Button - Desktop */}
          <Link href="/flashSale" className="hidden lg:block">
            <button className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#18b500] via-[#48ad39] to-[#80b500] text-white font-bold text-sm sm:text-base uppercase rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                View All Flash Sale
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#80b500] via-[#48ad39] to-[#18b500] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>

        {/* Decorative Line */}
        <div className="mt-6 h-1 w-full bg-gradient-to-r from-[#18b500] via-[#48ad39] to-[#80b500] rounded-full"></div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {Array.from({ length: dataPerPage }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <Loading />
            </div>
          ))}
        </div>
      ) : currentProducts && currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {currentProducts.map((singleProduct: IProduct, index: number) => (
            <div 
              key={singleProduct.id}
              className="transform transition-all duration-300 hover:scale-105"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="relative">
                {/* Flash Sale Badge */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#18b500] to-[#48ad39] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      🔥 SALE
                    </div>
                    <div className="absolute inset-0 bg-[#18b500] blur-md opacity-50 animate-pulse"></div>
                  </div>
                </div>
                <HomePageProductCard singleProduct={singleProduct} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          <Flame className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
            No Flash Sale Available
          </h3>
          <p className="text-gray-500 text-sm sm:text-base text-center">
            Check back later for amazing deals!
          </p>
        </div>
      )}

      {/* View All Button - Mobile/Tablet */}
      <Link href="/flashSale" className="block lg:hidden mt-8">
        <div className="flex justify-center">
          <button className="group relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#18b500] via-[#48ad39] to-[#80b500] text-white font-bold text-sm sm:text-base uppercase rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center justify-center gap-2">
              View All Flash Sale
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#80b500] via-[#48ad39] to-[#18b500] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </Link>


     
    </section>
  );
};

export default FlashSale;