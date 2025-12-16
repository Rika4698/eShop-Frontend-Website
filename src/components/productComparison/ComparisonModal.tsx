/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearCompareProducts, selectCompareProducts, removeFromComparison } from "@/redux/features/productCompare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { IoSwapHorizontal } from "react-icons/io5";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { X } from "lucide-react";

const ComparisonModal = ({ openWishlist, setOpenWishlist }: any) => {
  const productsForComparison = useAppSelector(selectCompareProducts);
  const dispatch = useAppDispatch();

  

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm p-4"
      onClick={() => setOpenWishlist(false)}
    >
      <div
        className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#18b500] to-[#48ad39] p-4 sm:p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 sm:gap-3 items-center text-white">
              <IoSwapHorizontal className="text-2xl sm:text-3xl md:text-4xl" />
              <h2 className="font-bold text-lg sm:text-2xl md:text-3xl">
                Compare Products
              </h2>
            </div>
            
            <button
              onClick={() => setOpenWishlist(false)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300 hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Clear  Button */}
          {productsForComparison?.length > 0 && (
            <div className="mt-3 sm:mt-4">
              <button
                onClick={() => dispatch(clearCompareProducts())}
                className="text-white/90 hover:text-white text-sm sm:text-base underline hover:no-underline transition-all"
              >
                Clear All Products
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[calc(90vh-140px)]">
          {productsForComparison?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
              <IoSwapHorizontal className="text-gray-300 text-6xl sm:text-8xl mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
                No Products to Compare
              </h3>
              <p className="text-gray-500 text-sm sm:text-base text-center">
                Add products to comparison from the product list
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {productsForComparison?.map((product, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 hover:border-[#18b500] rounded-xl p-4 sm:p-5 relative transition-all duration-300 hover:shadow-lg bg-white"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => dispatch(removeFromComparison(product.id))}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-red-500 hover:rotate-180 transition-all duration-300 bg-white rounded-full p-1 shadow-md"
                      aria-label="Remove from comparison"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Product Image & Name */}
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative w-full aspect-square max-w-[200px] mb-3 overflow-hidden rounded-lg group">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-bold text-base sm:text-lg text-center text-gray-800 line-clamp-2">
                        {product.name}
                      </h4>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          Price:
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#18b500]">
                          {product.price.toFixed(2)} TK
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          Category:
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {product.category?.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          Flash Sale:
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded ${
                            product.flashSale
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {product.flashSale ? "Yes" : "No"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          Shop:
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 max-w-[150px] truncate">
                          {product.vendor?.shopName}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          Stock:
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">
                          {product.stockQuantity} 
                        </span>
                      </div>
                    </div>

                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    {/* View Details Button */}
                    {/* <div className="mt-4">
                      <button className="w-full bg-[#18b500] hover:bg-[#48ad39] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base">
                        View Details
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;