/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Star, Eye } from "lucide-react";
import NoTableDataFound from "@/components/uiElements/NoTableDataFound";

interface IReview {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    image: string[];
  };
  customer: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  vendor: {
    id: string;
    shopName: string;
    name: string;
    email: string;
    logo: string;
  };
  ReviewReply?: Array<{
    id: string;
    comment: string;
    createdAt: string;
    user: {
      name: string;
    };
  }>;
}


const StarDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-500 text-yellow-500"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const AdminReviewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: allProductsResponse, isLoading } = useGetAllProductsQuery(undefined);

  // console.log(allProductsResponse?.data,"admin");

  // Extract and flatten all reviews from product data
  const allReviews: IReview[] =
    allProductsResponse?.data?.flatMap((product: any) => 
      (product.reviews || []).map((review: any) => ({
        ...review,
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
        },
        vendor: {
          id: product.vendorId,
          name:product.vendor.name,
          email:product.vendor.email,
          logo:product.vendor.logo,
          shopName: product.vendor?.shopName || "No Shop Name",
        },
      }))
    ) || [];
    //  console.log(allProductsResponse,"admin");


  const totalPages = Math.ceil(allReviews.length / dataPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const openDetailsDialog = (review: IReview) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <p className="text-center py-20">Loading reviews...</p>;
  }

  // Paginate reviews
  const startIndex = (currentPage - 1) * dataPerPage;
  const paginatedReviews = allReviews?.slice(startIndex, startIndex + dataPerPage) || [];
  // console.log(paginatedReviews,"adm")

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Product Reviews</h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="pl-14">Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Reply Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReviews && paginatedReviews.length > 0 ? (
              paginatedReviews.map((review: IReview, index: number) => (
                <TableRow key={review.id}>
                  {/* Serial Number */}
                  <TableCell className="font-medium">
                    {startIndex + index + 1}
                  </TableCell>

                  {/* Product Info */}
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Image
                        src={review.product.image[0]}
                        alt={review.product.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                      <span className="font-medium max-w-[150px] truncate">
                        {review.product.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Shop Name */}
                  <TableCell className="whitespace-nowrap">
                    <span className="font-medium text-gray-700">
                      {review.vendor?.shopName || "No Shop Name"}
                    </span>
                  </TableCell>

                  {/* Customer Info */}
                  <TableCell className="whitespace-nowrap pl-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={review.customer.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt={review.customer.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {review.customer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {review.customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Rating */}
                  <TableCell className="pl-14">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <StarDisplay rating={review.rating} />
                      <span className="text-sm font-semibold">
                        {review.rating}/5
                      </span>
                    </div>
                  </TableCell>

                  {/* Review Comment */}
                  <TableCell>
                    <p className="max-w-xs truncate text-gray-700 whitespace-nowrap">
                      {review.comment || "No comment"}
                    </p>
                  </TableCell>

                  {/* Date & Time */}
                  <TableCell>
                    <div className="flex flex-col whitespace-nowrap">
                      <span className="font-medium text-sm">
                        {formatDate(review.createdAt)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(review.createdAt)}
                      </span>
                    </div>
                  </TableCell>

                  {/* Reply Status */}
                  <TableCell className="whitespace-nowrap">
                    {review.ReviewReply && review.ReviewReply.length > 0 ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        ✓ Replied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        No Reply
                      </span>
                    )}
                  </TableCell>

                  {/* Action Button */}
                  <TableCell>
                    <Dialog
                      open={isDialogOpen && selectedReview?.id === review.id}
                      onOpenChange={setIsDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => openDetailsDialog(review)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
                        <DialogHeader>
                          <DialogTitle className="text-base sm:text-lg break-words">
                            Review Details
                          </DialogTitle>
                        </DialogHeader>

                        {/* Review Details */}
                        <div className="space-y-4 overflow-x-hidden">
                          {/* Product Info Section */}
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-sm mb-3">
                              Product Information
                            </h3>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                              <Image
                                src={review.product.image[0]}
                                alt={review.product.name}
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-lg object-cover border flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-base break-words">
                                  {review.product.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  Shop: {review.vendor?.shopName || "No Shop Name"}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <StarDisplay rating={review.rating} />
                                  <span className="font-semibold text-sm">
                                    {review.rating}/5
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Customer Review Section */}
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-sm mb-3">
                              Customer Review
                            </h3>
                            <div className="flex items-start gap-3 mb-3">
                              <Image
                                src={
                                  review.customer.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }
                                alt={review.customer.name}
                                width={50}
                                height={50}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm">
                                  {review.customer.name}
                                </p>
                                <p className="text-xs text-gray-600 break-all">
                                  {review.customer.email}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(review.createdAt)} at{" "}{formatTime(review.createdAt)}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-900 text-sm break-words bg-white p-3 rounded border font-bold">
                              {review.comment || "No comment provided"}
                            </p>
                          </div>

                          {/* Vendor Replies Section */}
                          {review.ReviewReply && review.ReviewReply.length > 0 && (
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h3 className="font-semibold text-sm mb-3">
                                Vendor Replies ({review.ReviewReply.length})
                              </h3>
                              <div className="space-y-3">
                                {review.ReviewReply.map((reply, idx) => (
                                  <div
                                    key={reply.id}
                                    className=""
                                  >
                                    {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                                      <p className="font-semibold text-sm text-gray-700">
                                        Reply {idx + 1} 
                                      </p>
                                      <p className="text-xs text-gray-600 flex-shrink-0">
                                        {formatDate(reply.createdAt)} at{" "}
                                        {formatTime(reply.createdAt)}
                                      </p>
                                    </div> */}
                                     <p className="font-semibold text-sm text-gray-700 mb-2">
                                        Reply {idx + 1} 
                                      </p>

                                    <div className="flex items-start gap-3 mb-3">
                                      
                              <Image
                                src={
                                  review.vendor?.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }
                                alt={review.customer.name}
                                width={50}
                                height={50}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm">
                                  Shop Name: {review.vendor?.shopName}
                                </p>
                                <p className="text-xs text-gray-600 break-all">
                                  {review.vendor?.email}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(review.createdAt)} at{" "}
                                  {formatTime(review.createdAt)}
                                </p>
                              </div>
                            </div>
                                    <p className="p-3 bg-white rounded-lg border border-green-200 text-gray-900 text-sm break-words font-bold">
                                      {reply.comment}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* No Reply Message */}
                          {(!review.ReviewReply ||
                            review.ReviewReply.length === 0) && (
                            <div className="p-4 bg-gray-50 rounded-lg text-center">
                              <p className="text-gray-500 text-sm">
                                No vendor reply yet
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <NoTableDataFound span={9} />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {allReviews && allReviews.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
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
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-600 border border-green-800"
              } px-4 py-2 rounded-full transition duration-200 hover:bg-green-600 hover:text-white`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } p-2 bg-gray-300 rounded-full hover:bg-green-600 text-white transition-colors duration-200`}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReviewsPage;