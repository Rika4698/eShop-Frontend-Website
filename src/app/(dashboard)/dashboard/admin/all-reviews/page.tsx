/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useState } from "react";
import { IReview } from "@/types/modal";

const Page = () => {
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5); // Reviews per page
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: allProductsResponse, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: dataPerPage,
    minPrice,
    maxPrice,
    category: activeCategory || "",
    sort,
  });

  // Extract and flatten all reviews from product data
  const allReviews: IReview[] =
    allProductsResponse?.data?.flatMap((product: any) => product.reviews || []) ||
    [];

  // Pagination Logic
  const totalReviews = allReviews.length;
  const indexOfLastReview = currentPage * dataPerPage;
  const indexOfFirstReview = indexOfLastReview - dataPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Product Review</h2>
      {currentReviews && currentReviews.length > 0 ? (
        <>
          {/* Reviews Table */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Product ID</th>
                  <th className="border border-gray-300 px-4 py-2">Rating</th>
                  <th className="border border-gray-300 px-4 py-2">Comment</th>
                  <th className="border border-gray-300 px-4 py-2">Vendor ID</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((review: IReview, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {indexOfFirstReview + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {review.productId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {review.rating}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {review.comment}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {review.vendorId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
            >
              Previous
            </button>

            {Array.from(
              { length: Math.ceil(totalReviews / dataPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(totalReviews / dataPerPage))
                )
              }
              disabled={currentPage === Math.ceil(totalReviews / dataPerPage)}
              className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>no data found</>
      )}
    </div>
  );
};

export default Page;
