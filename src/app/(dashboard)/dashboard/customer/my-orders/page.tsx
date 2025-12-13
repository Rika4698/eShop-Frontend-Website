/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
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

const MyOrders = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
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

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>

      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Product Image</TableHead>
                    <TableHead>Product Name</TableHead>
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
                        <TableRow key={index}>
                          <TableCell>
                            {index + 1 + (currentPage - 1) * dataPerPage}
                          </TableCell>
                          <TableCell>
                           <div>
                           <Image
                            width={200}
                            height={200}
                              src={
                                singleOrder?.orderDetails[0]?.product?.image[0]
                              }
                              alt="product"
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                           </div>
                          </TableCell>
                          <TableCell>
                            {singleOrder?.orderDetails[0]?.product?.name}
                          </TableCell>
                          <TableCell>
                            {singleOrder?.orderDetails[0]?.quantity}
                          </TableCell>
                          <TableCell>
                            {singleOrder?.vendor?.shopName}
                          </TableCell>
                          <TableCell>
                            ${(singleOrder?.totalPrice).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  onClick={() => handleAddReviewClick(singleOrder)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Add Review
                                </Button>
                              </DialogTrigger>
                              {selectedOrder && isModalOpen && (
                                <DialogContent>
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

                       {!isLoading && customerOrders?.data.length === 0 && <NoTableDataFound span={7} />}
                </TableBody>
              </Table>
           

              <div className="pt-7">
  {customerOrders?.data?.length > 0 && (
    <div className="flex justify-center items-center mt-4">
      <div className="flex items-center space-x-2">
        {/* Left Arrow Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          } p-2 bg-gray-300 rounded-full hover:bg-[#80b500] text-white transition-colors duration-200`}
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
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
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

export default MyOrders;
