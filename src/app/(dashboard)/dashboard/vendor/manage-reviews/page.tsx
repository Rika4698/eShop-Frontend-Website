/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useUserDetails from "@/hooks/useUser";
import { useGetAllReviewsQuery, useCreateReplyMutation } from "@/redux/features/review/reviewsApi";
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
import NoTableDataFound from "@/components/uiElements/NoTableDataFound";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { MessageSquare, Star } from "lucide-react";

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
    image: string;
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

// Star Display Component
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

const Myreviews = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [replyText, setReplyText] = useState("");
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: allReviews, isLoading } = useGetAllReviewsQuery(
    {
      page: currentPage,
      limit: dataPerPage,
      vendorId: userData?.userData?.id,
    },
    { skip: !userData?.userData?.id }
  );

  const [createReply, { isLoading: isReplying }] = useCreateReplyMutation();

  const totalPages = Math.ceil((allReviews?.length || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    if (!selectedReview) {
      toast.error("No review selected");
      return;
    }

    try {
      const replyData = {
        reviewId: selectedReview.id,
        comment: replyText,
      };

      await toast.promise(createReply(replyData).unwrap(), {
        loading: "Sending reply...",
        success: "Reply sent successfully!",
        error: (err: any) => {
          return err?.data?.message || "Failed to send reply";
        },
      });

      setReplyText("");
      setIsDialogOpen(false);
      setSelectedReview(null);
    } catch (error: any) {
      console.error("Reply error:", error);
    }
  };

  const openReplyDialog = (review: IReview) => {
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
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};


  if (isLoading || !userData) {
    return <p className="text-center py-20">Loading...</p>;
  }

  // Paginate reviews
  const startIndex = (currentPage - 1) * dataPerPage;
  const paginatedReviews = allReviews?.slice(startIndex, startIndex + dataPerPage);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Customer Reviews</h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="pl-9">Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reply Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReviews && paginatedReviews.length > 0 ? (
              paginatedReviews.map((review: IReview, index: number) => (
                <TableRow key={review.id}>
                 
                  <TableCell className="font-medium">
                    {startIndex + index + 1}
                  </TableCell>

                  {/* Product Info */}
                  <TableCell className="whitespace-nowrap ">
                    <div className="flex items-center gap-3">
                      <Image
                        src={review.product.image[0]}
                        alt={review.product.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{review.product.name}</span>
                    </div>
                  </TableCell>

                  {/* Customer Info */}
                  <TableCell className="whitespace-nowrap pl-9">
                    <div className="flex items-center gap-2 text-right ">
                      <Image
                        src={review.customer.image || "/default-avatar.png"}
                        alt={review.customer.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{review.customer.name}</span>
                    </div>
                  </TableCell>

                  {/* Rating */}
                  <TableCell>
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

                  {/* Date */}

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
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        ⏳ Pending
                      </span>
                    )}
                  </TableCell>

                  {/* Action Button */}
                  <TableCell>
                    <Dialog open={isDialogOpen && selectedReview?.id === review.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => openReplyDialog(review)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {review.ReviewReply && review.ReviewReply.length > 0
                            ? "View Reply"
                            : "Reply"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
                        <DialogHeader>
                          <DialogTitle className="text-base sm:text-lg break-words">Review Details & Reply</DialogTitle>
                        </DialogHeader>
                        

                        {/* Review Details */}
                        <div className="space-y-4 overflow-x-hidden">
                          
                          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <Image
                              src={review.product.image[0]}
                              alt={review.product.name}
                              width={80}
                              height={80}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-base sm:text-lg break-words">{review.product.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <StarDisplay rating={review.rating} />
                                <span className="font-semibold text-sm">{review.rating}/5</span>
                              </div>
                            </div>
                          </div>

                          {/* Customer Review */}
                          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg overflow-x-hidden">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3">
                              <Image
                                src={review.customer.image || "/default-avatar.png"}
                                alt={review.customer.name}
                                width={40}
                                height={40}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                              />
                              <div  className="min-w-0 flex-1">
                                <p className="font-semibold text-sm sm:text-base truncate">{review.customer.name}</p>
                                <p className="text-xs text-gray-600">
                                  {formatDate(review.createdAt)} ,  {formatTime(review.createdAt)} 
                                </p>

                             
                              </div>
                            </div>
                            <p className="text-gray-900 text-sm break-words">
                              {review.comment || "No comment provided"}
                            </p>
                          </div>

                          {/* Existing Replies */}
                          {review.ReviewReply && review.ReviewReply.length > 0 && (
                            <div className="space-y-2 overflow-hidden">
                              <h4 className="font-semibold text-sm sm:text-base">Your Replies:</h4>
                              {review.ReviewReply.map((reply) => (
                                <div key={reply.id} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500 overflow-hidden">
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 mb-2">
                                    <p className="font-semibold text-sm truncate">{reply.user.name}</p>
                                    <p className="text-xs text-gray-600 flex-shrink-0">
                                      {formatDate(reply.createdAt)} , {formatTime(review.createdAt)}
                                    </p>
                                  </div>
                                  <p className="text-gray-900 text-sm break-words">{reply.comment}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Form */}
                          <div className="space-y-3 overflow-hidden">
                            <h4 className="font-semibold text-sm sm:text-base">
                              {review.ReviewReply && review.ReviewReply.length > 0
                                ? "Add Another Reply:"
                                : "Write Your Reply:"}
                            </h4>
                            <textarea
                              placeholder="Type your reply here..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={4}
                              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm resize-none"
                            />
                          </div>
                        </div>

                        <DialogFooter className="flex-col sm:flex-row gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setIsDialogOpen(false);
                              setReplyText("");
                              setSelectedReview(null);
                            }}
                            className="w-full sm:w-auto"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleReplySubmit}
                            disabled={isReplying || !replyText.trim()}
                            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                          >
                            {isReplying ? "Sending..." : "Send Reply"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              
                <NoTableDataFound span={8} />
             
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
              currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
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
                  : "bg-white text-green-600 border border-green-600"
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

export default Myreviews;