/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/app/loading";
import useUserDetails  from "@/hooks/useUser";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


const Myreviews = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  // Fetch all reviews
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
    setCurrentPage(page);
  };

  if (isLoading || !userData) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
     <div>
            <h1 className="text-xl font-semibold mb-4">My Reviews</h1>

            <div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No.</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Shop Name</TableHead>
                                    <TableHead>Total Price</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {allReviews?.map((review: { id: Key | null | undefined; product: { image: any; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; rating: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; comment: any; customer: { name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }, index: number) => (
                        <TableRow key={review.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{review.rating}</TableCell>
                            <TableCell>{review.comment || "No comment"}</TableCell>
                            <TableCell>{review.customer?.name}</TableCell>
                            <Button>Reply Reviews</Button>
                        </TableRow>
                    ))}
                </TableBody>
                        </Table>

                        <div className="pt-7">
                            {allReviews?.data?.length > 0 && (
                                <div className="flex justify-center items-center mt-4">
                                    <div className="flex items-center space-x-2">
                                        {/* Left Arrow Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`${
                                                currentPage === 1
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            } p-2 bg-gray-300 rounded-full hover:bg-[#80b500] text-white transition-colors duration-200`}
                                        >
                                            <span className="font-bold text-lg">
                                                {"<"}
                                            </span>
                                        </button>

                                        {/* Page Numbers */}
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

                                        {/* Right Arrow Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`${
                                                currentPage === totalPages
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            } p-2 bg-gray-300 rounded-full hover:bg-[#80b500] text-white transition-colors duration-200`}
                                        >
                                            <span className="font-bold text-lg">{">"}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
  );
};

export default Myreviews;
