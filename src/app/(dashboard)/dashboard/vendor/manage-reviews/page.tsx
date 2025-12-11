"use client";


import useUserDetails from "@/hooks/useUser";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IReviewItem {
  id: string;
  product: {
    image: string;
    name: string;
  };
  rating: number;
  comment: string;
  customer: {
    name: string;
  };
}

const Myreviews = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const { data: allReviews, isLoading } = useGetAllReviewsQuery(
    {
      page: currentPage,
      limit: dataPerPage,
      vendorId: userData?.userData?.id,
    },
    { skip: !userData?.userData?.id }
  );

  const totalPages = Math.ceil((allReviews?.meta?.total || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (isLoading || !userData) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My Reviews</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allReviews?.data?.map((review: IReviewItem, index: number) => (
            <TableRow key={review.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{review.product.name}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.comment || "No comment"}</TableCell>
              <TableCell>{review.customer.name}</TableCell>
              <TableCell>
                <Button>Reply</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {allReviews?.data?.length > 0 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            } p-2 bg-gray-300 rounded-full hover:bg-green-600 text-white transition-colors duration-200`}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`${
                currentPage === idx + 1
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600"
              } px-4 py-2 rounded-full transition duration-200 hover:bg-green-600 hover:text-white`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
            } p-2 bg-gray-300 rounded-full hover:bg-green-600 text-white transition-colors duration-200`}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Myreviews;
