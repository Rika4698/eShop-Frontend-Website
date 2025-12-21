/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import useUserDetails from "@/hooks/useUser";
import { IOrder } from "@/types/modal";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import Loading from "@/app/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import AddReview from "@/components/MyOrders/AddReview";
import Image from "next/image";
import NoTableDataFound from "@/components/uiElements/NoTableDataFound";
// If date-fns is not installed, use this simple function instead:
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const MyOrders = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    customerId: userData?.userData?.id,
  });

  const { data: customerOrders, isLoading } = useGetAllOrdersQuery(queryObj, {
    skip: !userData?.userData,
  });

  const totalPages = Math.ceil(
    (customerOrders?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddReviewClick = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
      customerId: userData?.userData?.id,
    }));
  }, [currentPage, userData?.userData]);

  // Get payment status badge color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "UNPAID":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>

      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Order Date & Time</TableHead>
                    <TableHead>Product Images</TableHead>
                    <TableHead>Product Names</TableHead>
                    <TableHead>Trans ID</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Shop Name</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerOrders?.data.length > 0 &&
                    customerOrders?.data?.map((singleOrder: IOrder, index: number) => {
                      return (
                        <TableRow key={singleOrder.id}>
                          {/* Serial Number */}
                          <TableCell className="font-medium">
                            {index + 1 + (currentPage - 1) * dataPerPage}
                          </TableCell>

                          {/* Order Date & Time */}
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">
                                {formatDate(singleOrder.createdAt)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTime(singleOrder.createdAt)}
                              </span>
                            </div>
                          </TableCell>

                          {/* Product Images - All products in this order */}
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {singleOrder?.orderDetails?.map((detail, idx) => (
                                <div key={idx} className="relative">
                                  <Image
                                    width={50}
                                    height={50}
                                    src={detail?.product?.image[0]}
                                    alt={detail?.product?.name || "product"}
                                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                  />
                                  {/* Quantity badge on image */}
                                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {detail.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </TableCell>

                          {/* Product Names - All products in this order */}
                          <TableCell>
                            <div className="flex flex-col gap-1 whitespace-nowrap">
                              {singleOrder?.orderDetails?.map((detail, idx) => (
                                <div key={idx} className="flex items-center gap-2 ">
                                  <span className="text-sm font-bold text-green-700">{idx+1}.</span>
                                  <span className="text-sm">
                                    {detail?.product?.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    (x{detail.quantity})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </TableCell>

                          {/* Transaction ID */}
                          <TableCell>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                              {singleOrder?.transactionId}
                            </span>
                          </TableCell>

                          {/* Payment Status */}
                          <TableCell>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                                singleOrder?.paymentStatus
                              )}`}
                            >
                              {singleOrder?.paymentStatus}
                            </span>
                          </TableCell>

                          {/* Total Quantity */}
                          <TableCell className="text-center">
                            <span className="font-semibold ">
                              {singleOrder?.orderDetails?.reduce(
                                (sum, detail) => sum + detail.quantity,
                                0
                              )}
                            </span>
                          </TableCell>

                          {/* Shop Name */}
                          <TableCell>
                            <span className="font-medium whitespace-nowrap">
                              {singleOrder?.vendor?.shopName || "No Shop Name"}
                            </span>
                          </TableCell>

                          {/* Total Price */}
                          <TableCell>
                            <span className="font-bold text-green-600">
                              {singleOrder?.totalPrice.toFixed(2)} TK
                            </span>
                          </TableCell>

                          {/* Action - Add Review */}
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  onClick={() => handleAddReviewClick(singleOrder)}
                                  className="bg-green-600 hover:bg-green-700"
                                  size="sm"
                                >
                                  Add Review
                                </Button>
                              </DialogTrigger>
                              {selectedOrder && isModalOpen && (
                                <DialogContent className="overflow-y-auto max-h-[90vh]">
                                  <DialogHeader>
                                    <DialogTitle>Add Product Review</DialogTitle>
                                  </DialogHeader>
                                  <AddReview
                                    singleOrder={selectedOrder}
                                    onClose={closeModal}
                                  />
                                  <DialogFooter>
                                    <Button
                                      variant="secondary"
                                      onClick={closeModal}
                                    >
                                      Close
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              )}
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  {!isLoading && customerOrders?.data.length === 0 && (
                    <NoTableDataFound span={10} />
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="pt-7">
              {customerOrders?.data?.length > 0 && (
                <div className="flex justify-center items-center mt-4">
                  <div className="flex items-center space-x-2">
                    {/* Left Arrow Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`${
                        currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      } p-2 bg-gray-300 rounded-full hover:bg-[#04c41a] text-white transition-colors duration-200`}
                    >
                      <span className="font-bold text-lg">{"<"}</span>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`${
                          currentPage === index + 1
                            ? "bg-[#1d6e0f] text-white"
                            : "bg-white text-rose-600"
                        } px-4 py-2 rounded-full transition duration-200 hover:bg-[#04c41a] hover:text-white`}
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
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      } p-2 bg-gray-300 rounded-full hover:bg-[#04c41a] text-white transition-colors duration-200`}
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

export default MyOrders;