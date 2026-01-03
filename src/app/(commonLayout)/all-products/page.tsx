/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

// export default AllProducts;
"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IProduct } from "@/types/modal";
import HomePageProductCard from "@/components/HomePage/HomePageProductCard";
import Loading from "@/app/loading";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import RangeSlider from "@/components/Home/RangeSlider";

interface ICategory {
  id: string;
  name: string;
}


const AllProducts = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [activeCategory, setActiveCategory] = useState<string | null>(
  selectedCategory || null);
  const { data: allCategories } = useGetAllCategoriesQuery(undefined);
  const { data: allProductsResponse, isLoading, refetch } =

  useGetAllProductsQuery({
    page: currentPage,
    limit: dataPerPage,
    searchTerm: debouncedSearchTerm,
    minPrice,
    maxPrice,
    category: activeCategory || "", 
    sort,
  });

const totalPages = Math.ceil(
  (allProductsResponse?.meta?.total || 0) / dataPerPage
);

useEffect(() => {
  if (selectedCategory) {
    setActiveCategory(selectedCategory);
  } else {
    setActiveCategory(null);
  }
  setCurrentPage(1);
}, [selectedCategory]);

// Debounce search term for performance
useEffect(() => {
  const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
  return () => clearTimeout(handler);
}, [searchTerm]);



  useEffect(() => {
    refetch();
  }, [ activeCategory,selectedCategories, sort, debouncedSearchTerm, minPrice, maxPrice, currentPage, refetch]);


  const handleCategorySelect = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category)); 
    setCurrentPage(1); 
  };
  
  useEffect(() => {
    refetch();
  }, [activeCategory, debouncedSearchTerm, currentPage, refetch]);




  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory(null);
    setSort("");
    setMinPrice(100);
    setMaxPrice(10000);
    setCurrentPage(1);
  };

  
  return (
    <div className="lg:container lg:mx-auto lg:px-4 py-8">
      <h1 className="text-3xl md:text-5xl text-green-700 font-bold mb-6 text-center">All Products</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters Section - Left Side */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Search Filter */}
          <div className="relative mb-4">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md"
            />
          </div>

          {/* Categories Filter (Checkboxes) */}

         <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {allCategories?.map((cat: ICategory) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`category-${cat.id}`}
                    checked={activeCategory === cat.name}
                    onChange={() => handleCategorySelect(cat.name)}
                    className="w-4 h-4 accent-[#0c9127] text-white"
                  />
                  <label
                    htmlFor={`category-${cat.id}`}
                    className="capitalize cursor-pointer"
                  >
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
  <h3 className="font-bold mb-7">Price Range</h3>
  
  {/* Slider with value line */}
 <RangeSlider
  min={100}
  max={10000}
  value={[minPrice, maxPrice]}
  onChange={(v) => {
    setMinPrice(v[0]);
    setMaxPrice(v[1]);
  }}
/>

  

</div>

          {/* Sort Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Sort By</h3>
            <select
              className="w-full border-gray-300 rounded-md py-2 px-3"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="">Select Sort</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="text-center">
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Product Cards - Right Side */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
           <div className="md:col-span-8 lg:col-span-9 col-span-12">
    <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <Loading />
              </div>
            ))
          : allProductsResponse?.data?.length
    ? allProductsResponse.data.map((singleProduct: IProduct) => (
        <div key={singleProduct.id}>
          <HomePageProductCard singleProduct={singleProduct} />
        </div>
      ))
    : (
        <div className="col-span-full text-center text-gray-500 text-lg py-20">
          No products found.
        </div>
      )
            
            }
      </div>
    </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-end items-center space-x-2">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-[#00b52a] text-white rounded-lg disabled:bg-gray-300"
  >
    &lt;
  </button>

  {/* Page Numbers */}
  <div className="flex space-x-2">
    {Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-4 py-2 rounded-lg ${
          currentPage === index + 1
            ? "bg-[#03b500] text-white"
            : "bg-[#babeb8] text-gray-700 hover:bg-[#ccd4cf]"
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-[#00b524] text-white rounded-lg disabled:bg-gray-300"
  >
    &gt;
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default AllProducts;
