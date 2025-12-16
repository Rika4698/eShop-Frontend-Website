"use client";

import {useDeleteRecentProductMutation, useGetRecentViewProductsQuery,
} from "@/redux/features/products/productApi";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { IRecentProductView } from "@/types/modal";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { Eye, ShoppingCart, ArrowRight, Package,Trash2 } from "lucide-react";
import Image from "next/image";

const Loading = dynamic(() => import("@/app/loading"), {
  ssr: false,
});

const RecentProduct = () => {
  const { data: recentViewedProducts, isLoading } = useGetRecentViewProductsQuery(undefined);
  const [deleteRecentProduct] = useDeleteRecentProductMutation();
  const [currentPage, setCurrentPage] = useState(1);
  
  const dataPerPage = 6;
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

  const paginatedProducts = recentViewedProducts?.slice(startIndex, endIndex) || [];
  const totalProducts = recentViewedProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  const [pImg, setPImg] = useState(paginatedProducts[0]?.product || null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = async (id: string | null) => {
    if (!id) {
      toast.error("You need to be logged in to remove recently viewed products.");
      return;
    }

    try {
      await toast.promise(deleteRecentProduct({ productId: id }).unwrap(), {
        loading: "Removing...",
        success: "Product removed from recently viewed!",
        error: `Failed to remove product. You need to be logged in.`,
      });
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  console.log(totalProducts,"rr");

  return (
    <div className="py-12  bg-gradient-to-br from-green-50/50 via-white to-green-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            <Eye className="w-6 h-6 text-green-600" />
            <div className="h-1 w-12 bg-gradient-to-l from-green-400 to-green-600 rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Recently Viewed Products
          </h2>
          <p className="text-lg text-gray-600">Pick up where you left off</p>
        </div>

        {isLoading ? (
          <Loading />
        ) : totalProducts === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Package className="w-16 h-16 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Products Viewed Yet
            </h3>
            <p className="text-gray-600 text-center">
              Start exploring our fresh products!
            </p>
          </div>
        ) : (
          <div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Featured Product Display */}
              <div className="relative group order-2 lg:order-1">

              {pImg && pImg.image ? (  
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                  <Image
                  
                    className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                    width={700} height={700}
                    src={pImg?.image?.[0] || pImg?.image}
                    alt={pImg?.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {pImg?.flashSale && (
                        <span className="px-4 py-1.5 bg-red-500 rounded-full text-sm font-semibold animate-pulse">
                          🔥 Flash Sale
                        </span>
                      )}
                      <span className="px-4 py-1.5 bg-green-500 rounded-full text-sm font-semibold">
                        {pImg?.price?.toFixed(2)} TK
                      </span>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                        pImg?.stockQuantity === 0 ? 'bg-red-500' : 'bg-green-600'
                      }`}>
                        {pImg?.stockQuantity === 0 ? 'Out of Stock' : `Stock: ${pImg?.stockQuantity}`}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                      {pImg?.name}
                    </h2>
                    {/* <p className="text-green-200 text-sm">
                      {pImg?.category?.name || 'Product'}
                    </p> */}
                  </div>
                </div>):(
                     <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-green-100 to-green-200 h-[400px] lg:h-[600px] flex items-center justify-center">
                    <Package className="w-32 h-32 text-green-600 opacity-50" />
                  </div>
                )}   
              </div>





              {/* Products List */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border-2 border-green-100">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <ShoppingCart className="w-6 h-6 text-green-600 mr-3" />
                    Your Recent Views
                  </h3>
                  
                  <div className="space-y-3 max-h-[500px] lg:max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                    {paginatedProducts.map((product: IRecentProductView, i: number) => (
                      <div
                        key={product?.id || `${product?.product?.id}-${i}`}
                        onMouseEnter={() => setPImg(product?.product)}
                        className={`group relative transition-all duration-300 rounded-xl p-3 md:p-4 cursor-pointer hover:scale-95 ${
                        pImg?.id === product?.product?.id
                            ? 'bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 shadow-lg'
                        : 'bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          {/* Product Image */}
                          <div className="relative flex-shrink-0">
                            <Image
                              src={product?.product?.image?.[0]}
                              alt={product?.product?.name}
                              width={700} height={700}
                              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-md"
                            />
                            {product?.product?.flashSale && (
                              <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                                🔥
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm md:text-lg mb-1 truncate">
                              {product?.product?.name}
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-1">
                              {product?.product?.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                                product?.product?.stockQuantity === 0
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {product?.product?.stockQuantity === 0 
                                  ? 'Out of Stock' 
                                  : `Stock: ${product?.product?.stockQuantity}`}
                              </span>
                              <span className="text-base md:text-lg font-bold text-green-600">
                                {product?.product?.price?.toFixed(2)} TK
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteProduct(product?.product?.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 md:p-3 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg"
                              title="Remove from recent"
                            >
                              <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                          <Link 
                            href={`/product/${product?.product?.id}`}
                            className="flex-shrink-0"
                          >
                            <Button title="View Items" className="bg-green-600 hover:bg-green-700 text-white p-2 md:p-3 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg">
                              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                            </Button>
                          </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>




                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t-2 border-green-100">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 md:px-4 py-2 rounded-lg font-semibold transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Prev
                      </button>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full font-semibold transition-all duration-300 ${
                              currentPage === pageNum
                                ? 'bg-green-600 text-white shadow-lg scale-110'
                                : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 md:px-4 py-2 rounded-lg font-semibold transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default RecentProduct;