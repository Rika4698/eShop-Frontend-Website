/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import useUserDetails from "@/hooks/useUser";
import { IOrder } from "@/types/modal";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, MapPin, Tag, Percent } from "lucide-react";
import NoTableDataFound from "@/components/uiElements/NoTableDataFound";
import { Button } from "@/components/ui/button";


// Date and Time formatting functions
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

const OrderList = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  // const [queryObj, setQueryObj] = useState({
  //   page: currentPage,
  //   limit,
  //   vendorId: userData?.userData?.id,
  // });

  const { data: vendorOrders, isLoading , isFetching } = useGetAllOrdersQuery({
    page: currentPage,
    limit,
    vendorId: userData?.userData?.id,
  }, {
    skip: !userData?.userData.id,
    refetchOnMountOrArgChange: true,
  });

  console.log(vendorOrders);

  const orders = vendorOrders?.data || [];
  const totalPages = Math.ceil((vendorOrders?.meta?.total || 0) / limit);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

   const openDetailsDialog = (order: IOrder) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // useEffect(() => {
  //   setQueryObj((prev) => ({
  //     ...prev,
  //     page: currentPage,
  //     limit: dataPerPage,
  //     vendorId: userData?.userData?.id,
  //   }));
  // }, [currentPage, userData?.userData]);

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

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

console.log(vendorOrders?.data);



  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Order History</h1>

      <div>
        {isLoading || isFetching ? (
          <div className="text-center py-8">Loading...</div>
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
                    <TableHead>Coupon Use</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Customer Email</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.length > 0 &&
                    orders?.map((singleOrder: IOrder, index: number) => {
                      return (
                        <TableRow key={singleOrder.id}>
                          {/* Serial Number */}
                          <TableCell className="font-medium">
                            {(currentPage - 1) * limit + index + 1 }
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
                                <div key={idx} className="flex items-center gap-2">
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
                            <span className="font-semibold">
                              {singleOrder?.orderDetails?.reduce(
                                (sum, detail) => sum + detail.quantity,
                                0
                              )}
                            </span>
                          </TableCell>

                          <TableCell className="text-center">
                            <span className="font-semibold">
                              {singleOrder?.couponUsages?.[0]?"Yes":"N/A"}
                            </span>
                          </TableCell>

                          {/* Customer Name */}
                          <TableCell className="text-center">
                            <span className="font-medium whitespace-nowrap ">
                              {singleOrder?.customer?.name || "No Customer Name"}
                            </span>
                          </TableCell>

                           <TableCell>
                            <span className="font-medium whitespace-nowrap">
                              {singleOrder?.customer?.email || "No Customer email"}
                            </span>
                          </TableCell>

                          {/* Total Price */}
                          <TableCell>
                            <span className="font-bold text-green-600">
                              {singleOrder?.totalPrice.toFixed(2)} TK
                            </span>
                          </TableCell>

                           <TableCell>
                             <Dialog
                                open={isDialogOpen && selectedOrder?.id === singleOrder.id}
                                  onOpenChange={setIsDialogOpen}
                                  >
                                 <DialogTrigger asChild>
                                  <Button
                                   onClick={() => openDetailsDialog(singleOrder)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                   size="sm"
                                        >
                                    <Eye className="w-4 h-4 mr-1" />
                                               Details
                                           </Button>
                                     </DialogTrigger>
                                    <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
                                        <DialogHeader>
                                  <DialogTitle className="text-base sm:text-lg">
                                     Order Details - {singleOrder.transactionId}
                                   </DialogTitle>
                                  </DialogHeader>
                          
                       <div className="space-y-4 overflow-x-hidden">
                                 {/* Order Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                              {/* Customer Info Card */}
                                                              <div className="p-4 bg-blue-50 rounded-lg border">
                                                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                                                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                                                                    C
                                                                  </span>
                                                                  Customer Information
                                                                </h3>
                                                                <div className="space-y-2 text-sm">
                                                                  <p><span className="font-semibold">Name:</span> {singleOrder?.customer?.name}</p>
                                                                  <p><span className="font-semibold">Email:</span> {singleOrder?.customer?.email}</p>
                          
                                                                  <p><span className="font-semibold">Phone:</span> {singleOrder?.phone || singleOrder?.customer?.phone || "N/A"}</p>
                                                                  <div className="flex items-start gap-2 mt-2 ">
                                                                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                                                    <div className="flex gap-2">
                                                                   <p className="font-semibold">Delivery Address:</p>
                                                                      <p className="text-gray-700 break-words">
                                                                        {singleOrder?.deliveryAddress || singleOrder?.customer?.address || "No address provided"}
                                                                      </p>
                          
                                                                      
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                          
                                                              {/* Vendor Info Card */}
                                                              <div className="p-4 bg-green-50 rounded-lg border">
                                                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                                                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                                                                    V
                                                                  </span>
                                                                  Vendor Information
                                                                </h3>
                                                                <div className="space-y-2 text-sm">
                                                                  <p><span className="font-semibold">Shop Name:</span> {singleOrder?.vendor?.shopName}</p>
                                                                  <p><span className="font-semibold">Owner:</span> {singleOrder?.vendor?.name}</p>
                                                                  <p><span className="font-semibold">Email:</span> {singleOrder?.vendor?.email}</p>
                                                                </div>
                                                              </div>
                                                            </div>
                          
                                                            {/* Order Details */}
                                                            <div className="p-4 bg-gray-50 rounded-lg border">
                                                              <h3 className="font-semibold text-sm mb-3">Order Information</h3>
                                                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                                                <div>
                                                                  <p className="text-gray-600">Transaction ID</p>
                                                                  <p className="font-mono font-semibold text-xs">{singleOrder?.transactionId}</p>
                                                                </div>
                                                                <div>
                                                                  <p className="text-gray-600">Payment Status</p>
                                                                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(singleOrder?.paymentStatus)}`}>
                                                                    {singleOrder?.paymentStatus}
                                                                  </span>
                                                                </div>
                                                                <div>
                                                                  <p className="text-gray-600">Order Date</p>
                                                                  <p className="font-semibold">{formatDate(singleOrder?.createdAt)}</p>
                                                                </div>
                                                                <div>
                                                                  <p className="text-gray-600">Order Time</p>
                                                                  <p className="font-semibold">{formatTime(singleOrder?.createdAt)}</p>
                                                                </div>
                                                              </div>
                                                            </div>
                          
                                                            {/* Coupon & Discount Info - FIXED */}
                                                            {singleOrder?.couponCode && singleOrder?.couponUsages?.[0]?.coupon && (
                                                              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                                                  <Tag className="w-4 h-4 text-yellow-600" />
                                                                  Coupon Applied
                                                                </h3>
                                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                                                  <div>
                                                                    <p className="text-gray-600">Coupon Code</p>
                                                                    <p className="font-mono font-bold text-yellow-700">
                                                                      {Array.isArray(singleOrder?.couponUsages?.[0]?.coupon) 
                                                                        ? singleOrder?.couponUsages?.[0]?.coupon?.[0]?.code 
                                                                        : singleOrder?.couponUsages?.[0]?.coupon?.code || singleOrder?.couponCode || "N/A"}
                                                                    </p>
                                                                  </div>
                                                                  <div>
                                                                    <p className="text-gray-600">Discount Type</p>
                                                                    <p className="font-semibold">
                                                                      {Array.isArray(singleOrder?.couponUsages?.[0]?.coupon)
                                                                        ? singleOrder?.couponUsages?.[0]?.coupon?.[0]?.discountStatus
                                                                        : singleOrder?.couponUsages?.[0]?.coupon?.discountStatus || "N/A"}
                                                                    </p>
                                                                  </div>
                                                                  <div>
                                                                    <p className="text-gray-600 flex items-center gap-1">
                                                                      <Percent className="w-3 h-3" />
                                                                      Discount Amount
                                                                    </p>
                                                                    <p className="font-bold text-yellow-700">
                                                                      {(() => {
                                                                        const coupon = Array.isArray(singleOrder?.couponUsages?.[0]?.coupon)
                                                                          ? singleOrder?.couponUsages?.[0]?.coupon?.[0]
                                                                          : singleOrder?.couponUsages?.[0]?.coupon;
                                                                        const discountValue = coupon?.discountValue || 0;
                                                                        const discountStatus = coupon?.discountStatus;
                                                                        return `${discountValue}${discountStatus === "PERCENTAGE" ? "%" : " TK"}`;
                                                                      })()}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                                <div className="mt-3 pt-3 border-t border-yellow-200">
                                                                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                                                    <div>
                                                                      <p>Redeemed: {singleOrder?.couponUsages?.[0]?.isRedeemed ? "✓ Yes" : "✗ No"}</p>
                                                                    </div>
                                                                    <div>
                                                                      <p>Used Count: {(() => {
                                                                        const coupon = Array.isArray(singleOrder?.couponUsages?.[0]?.coupon)
                                                                          ? singleOrder?.couponUsages?.[0]?.coupon?.[0]
                                                                          : singleOrder?.couponUsages?.[0]?.coupon;
                                                                        return coupon?.usedCount || 0;
                                                                      })()}</p>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            )}
                          
                                                            {/* Products List */}
                                                            <div className="p-4 bg-white rounded-lg border">
                                                              <h3 className="font-semibold text-sm mb-3">Ordered Products</h3>
                                                              <div className="space-y-3">
                                                                {singleOrder?.orderDetails?.map((detail, idx) => (
                                                                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                                    <div className="relative flex-shrink-0">
                                                                      <Image
                                                                        width={60}
                                                                        height={60}
                                                                        src={detail?.product?.image[0]}
                                                                        alt={detail?.product?.name || "product"}
                                                                        className="w-16 h-16 rounded-lg object-cover border"
                                                                      />
                                                                      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                                                                        {detail.quantity}
                                                                      </span>
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                      <p className="font-semibold text-sm break-words">
                                                                        {detail?.product?.name}
                                                                      </p>
                                                                      <p className="text-xs text-gray-600">
                                                                        Price: {detail?.pricePerUnit?.toFixed(2)} TK × {detail.quantity}
                                                                      </p>
                                                                      <p className="text-sm font-bold text-green-600 mt-1">
                                                                        Subtotal: {(detail?.pricePerUnit * detail.quantity)?.toFixed(2)} TK
                                                                      </p>
                                                                    </div>
                                                                  </div>
                                                                ))}
                                                              </div>
                                                            </div>
                          
                                                            {/* Price Summary - FIXED */}
                                                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                              <h3 className="font-semibold text-sm mb-3">Price Summary</h3>
                                                              <div className="space-y-2 text-sm">
                                                                {/* Subtotal Calculation */}
                                                                <div className="flex justify-between">
                                                                  <span>Subtotal:</span>
                                                                  <span className="font-semibold">
                                                                    {(() => {
                                                                      const subtotal = singleOrder?.orderDetails?.reduce(
                                                                        (sum, detail) => sum + (detail.pricePerUnit * detail.quantity),
                                                                        0
                                                                      ) || 0;
                                                                      return subtotal.toFixed(2);
                                                                    })()} TK
                                                                  </span>
                                                                </div>
                          
                                                                {/* Shipping Charge (5% of subtotal) */}
                                                                <div className="flex justify-between">
                                                                  <span>Shipping Charge (5%):</span>
                                                                  <span className="font-semibold">
                                                                    {(() => {
                                                                      const subtotal = singleOrder?.orderDetails?.reduce(
                                                                        (sum, detail) => sum + (detail.pricePerUnit * detail.quantity),
                                                                        0
                                                                      ) || 0;
                                                                      const shipping = subtotal * 0.05;
                                                                      return shipping.toFixed(2);
                                                                    })()} TK
                                                                  </span>
                                                                </div>
                          
                                                                {/* Taxes (2% of subtotal) */}
                                                                <div className="flex justify-between">
                                                                  <span>Taxes (2%):</span>
                                                                  <span className="font-semibold">
                                                                    {(() => {
                                                                      const subtotal = singleOrder?.orderDetails?.reduce(
                                                                        (sum, detail) => sum + (detail.pricePerUnit * detail.quantity),
                                                                        0
                                                                      ) || 0;
                                                                      const taxes = subtotal * 0.02;
                                                                      return taxes.toFixed(2);
                                                                    })()} TK
                                                                  </span>
                                                                </div>
                          
                                                                {/* Coupon Discount - FIXED */}
                                                                {singleOrder?.couponCode && singleOrder?.couponUsages?.[0]?.coupon && (
                                                                  <div className="flex justify-between text-yellow-700">
                                                                    <span>Discount ({(() => {
                                                                      const coupon = Array.isArray(singleOrder?.couponUsages?.[0]?.coupon)
                                                                        ? singleOrder?.couponUsages?.[0]?.coupon?.[0]
                                                                        : singleOrder?.couponUsages?.[0]?.coupon;
                                                                      return coupon?.code || singleOrder?.couponCode;
                                                                    })()}):</span>
                                                                    <span className="font-semibold">
                                                                      {(() => {
                                                                        const subtotal = singleOrder?.orderDetails?.reduce(
                                                                          (sum, detail) => sum + (detail.pricePerUnit * detail.quantity),
                                                                          0
                                                                        ) || 0;
                                                                        const shipping = subtotal * 0.05;
                                                                        const taxes = subtotal * 0.02;
                                                                        const primaryTotal = subtotal + shipping + taxes;
                                                                        
                                                                        const coupon = Array.isArray(singleOrder?.couponUsages?.[0]?.coupon)
                                                                          ? singleOrder?.couponUsages?.[0]?.coupon?.[0]
                                                                          : singleOrder?.couponUsages?.[0]?.coupon;
                                                                        
                                                                        const discount = coupon?.discountStatus === "PERCENTAGE"
                                                                          ? primaryTotal * ((coupon?.discountValue || 0) / 100)
                                                                          : coupon?.discountValue || 0;
                                                                        
                                                                        return `- ${discount.toFixed(2)}`;
                                                                      })()} TK
                                                                    </span>
                                                                  </div>
                                                                )}
                          
                                                                <div className="h-px bg-gray-300 my-2"></div>
                          
                                                                {/* Total Paid */}
                                                                <div className="flex justify-between text-lg font-bold text-green-700">
                                                                  <span>Total Paid:</span>
                                                                  <span>{singleOrder?.totalPrice?.toFixed(2)} TK</span>
                                                                </div>
                          
                                                                {/* Calculation Breakdown Info */}
                                                                <div className="mt-3 pt-3 border-t border-green-200">
                                                                  <p className="text-xs text-gray-600 italic">
                                                                    * Shipping: 5% of subtotal, Taxes: 2% of subtotal
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </DialogContent>
                             </Dialog>
                             </TableCell>


                        </TableRow>
                      );
                    })}

                  {!isLoading && vendorOrders?.data?.length === 0 && (
                    <NoTableDataFound span={10} />
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="pt-7">
              {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "border "
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;