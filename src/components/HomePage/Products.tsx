"use client";

import { useEffect, useState, useCallback } from "react";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import Loading from "@/app/loading";
import { IProduct } from "@/types/modal";
import HomePageProductCard from "./HomePageProductCard";

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
  };

  const updateDataPerPage = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1280) {
      setDataPerPage(8);
    } else if (width >= 768) {
      setDataPerPage(6);
    } else {
      setDataPerPage(4);
    }
  }, []);

  // Update dataPerPage on resize
 useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    let newDataPerPage = 4;

    if (width >= 1280) newDataPerPage = 8;
    else if (width >= 768) newDataPerPage = 6;

    // Schedule state update after render
    requestAnimationFrame(() => setDataPerPage(newDataPerPage));
  };

  handleResize(); // initial check
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
    // Wrap in requestAnimationFrame to avoid cascading render warning
    requestAnimationFrame(() => setQueryObj(newQueryObj));
  }, [currentPage, dataPerPage]);

  // Refetch data when queryObj changes
  useEffect(() => {
    refetch();
  }, [queryObj, refetch]);

  return (
    <div>
      <div className="justify-between flex lg:flex-row flex-col items-center">
        <h2 className="lg:text-4xl text-3xl font-bold tracking-tight text-gray-900 lg:text-start text-center">
          Latest Products
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-6">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <Loading />
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <HomePageProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>

      {/* Pagination */}
      {allProductsResponse?.data?.length > 0 && (
        <div className="flex justify-end items-center mt-8 space-x-2 md:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            } p-2 bg-gray-300 rounded-full hover:bg-[#80b500] text-white`}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-[#80b500] text-white"
                  : "bg-white text-rose-600"
              } px-4 py-2 rounded-full transition duration-200 hover:bg-[#80b500] hover:text-white`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
            } p-2 bg-gray-300 rounded-full hover:bg-[#80b500] text-white`}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeProducts;
