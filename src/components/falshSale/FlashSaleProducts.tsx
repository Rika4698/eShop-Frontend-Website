"use client";

import { Key, useEffect, useState, useMemo } from "react";
import { Pagination } from "@nextui-org/pagination";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { ICategory, IProduct } from "@/types/modal";
import Loading from "@/app/loading";
import HomePageProductCard from "../HomePage/HomePageProductCard";

// Helper function to get data per page based on window width
const getDataPerPageByWidth = (width: number): number => {
  if (width >= 1280) return 12;
  if (width >= 768) return 9;
  if (width >= 425) return 8;
  return 6;
};

const FlashSale = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(7000);

  const { data: allCategories } = useGetAllCategoriesQuery(undefined);

  // Compute filterApplied using useMemo instead of useEffect
  const filterApplied = useMemo(() => {
    return !!(searchTerm || category || sort || minPrice > 500 || maxPrice < 7000);
  }, [searchTerm, category, sort, minPrice, maxPrice]);

  // Compute queryObj using useMemo instead of useEffect
  const queryObj = useMemo(() => ({
    page: currentPage,
    limit: dataPerPage,
    searchTerm: debouncedSearchTerm,
    minPrice,
    maxPrice,
    category,
    sort,
    flashSale: true,
  }), [currentPage, dataPerPage, debouncedSearchTerm, minPrice, maxPrice, category, sort]);

  const {
    data: allProductsResponse,
    isLoading,
  } = useGetAllProductsQuery(queryObj);

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Debounce implementation for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Handle window resize - this is valid because it's responding to external system (window)
  useEffect(() => {
    const updateDataPerPage = () => {
      const width = window.innerWidth;
      const newDataPerPage = getDataPerPageByWidth(width);
      setDataPerPage(newDataPerPage);
    };

    // Set initial value
    updateDataPerPage();

    // Add event listener
    window.addEventListener("resize", updateDataPerPage);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDataPerPage);
    };
  }, []); // Empty dependency array - only run once on mount

  const handleCategorySelect = (key: Key) => {
    setCategory(String(key));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortSelect = (key: Key) => {
    setSort(String(key));
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    setCurrentPage(1); // Reset to first page when price range changes
  };

  return (
    <div className="pb-16">
      {/* Filter part - You can add your filter UI here */}
    
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <Loading/>
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <HomePageProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>

      {/* Pagination part */}
      <div className="pt-7">
        {allProductsResponse?.data?.length > 0 && (
          <div className="flex justify-center items-center mt-4 ">
              <Pagination
      total={totalPages}
      page={currentPage}
      onChange={setCurrentPage}
      showControls
      variant="light"
      classNames={{
        wrapper: "gap-1",
        item: `
          w-9 h-9
          border border-green-500
          text-green-600
          font-semibold
          rounded-lg
          hover:bg-green-100
          transition
        `,
        cursor: `
          bg-green-600
          text-white
          font-bold
          rounded-lg
          shadow-none
          after:hidden
          before:hidden
        `,
        prev: `
          border border-green-500
          text-green-600
          hover:bg-green-100
          rounded-lg
        `,
        next: `
          border border-green-500
          text-green-600
          hover:bg-green-100
          rounded-lg
        `,
      }}
    />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashSale;