/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useUserDetails from "@/hooks/useUser";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import { IOrder } from "@/types/modal";

const OrderList = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    vendorId: userData?.userData?.id,
  });

  const { data: vendorOrders, isLoading } = useGetAllOrdersQuery(queryObj, {
    skip: !userData?.userData,
  });

  const totalPages = Math.ceil((vendorOrders?.meta?.total || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
      vendorId: userData?.userData?.id,
    }));
  }, [currentPage, userData?.userData]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Order History</h2>
      <div>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-sm bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="text-left text-gray-700 border-b bg-gray-100">
                    <th className="py-3 px-4">No.</th>
                    <th className="py-3 px-4">Product Image</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorOrders?.data?.map(
                    (singleOrder: IOrder, index: number) => (
                      <tr
                        key={index}
                        className="border-b transition hover:bg-gray-100"
                      >
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {index + 1 + (currentPage - 1) * dataPerPage}
                        </td>
                        <td className="py-4 px-4">
                          <img
                            src={
                              singleOrder?.orderDetails[0]?.product?.image[0]
                            }
                            alt="product"
                            className="w-12 h-12 rounded-md object-cover border"
                          />
                        </td>
                        <td className="py-4 px-4 text-gray-600 font-medium">
                          {singleOrder?.orderDetails[0]?.product?.name}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          {singleOrder?.orderDetails[0]?.quantity}
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {singleOrder?.customer?.name}
                        </td>
                        <td className="py-4 px-4 font-semibold text-green-600">
                          ${singleOrder?.totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </motion.div>

            {/* Custom Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                className={`px-4 py-2 text-sm rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className={`px-4 py-2 text-sm rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
