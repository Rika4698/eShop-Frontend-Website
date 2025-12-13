"use client"
import React, { useState } from "react";

import { IOrder } from "@/types/modal";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
export type TOrderFilterRequest = {
  vendorId?: string; 
  customerId?: string; 
};

const TransactionHistory = () => {
  const [filters, setFilters] = useState<TOrderFilterRequest>({});
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: orders, isLoading, isError } = useGetAllOrdersQuery({
    page,
    limit,
    ...filters,
  });
console.log(orders, "ss");

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading transaction history...</p>;
  if (isError) return <p>Failed to fetch transaction history.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transaction History</h1>

      {/* Transaction Table */}
      {orders?.data?.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Vendor ID</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Delivery Address</th>
              <th className="border px-4 py-2">Coupon</th>
              <th className="border px-4 py-2">Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order: IOrder) => (
              <tr key={order.transactionId}>
                <td className="border px-4 py-2">{order.transactionId}</td>
                <td className="border px-4 py-2">{order.vendorId}</td>
                <td className="border px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">{order.deliveryAddress || "N/A"}</td>
                <td className="border px-4 py-2">{order.coupon || "N/A"}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.orderDetails.map((detail, idx) => (
                      <li key={idx}>
                        Product ID: {detail.productId}, Quantity: {detail.quantity}, Price: ${detail.pricePerUnit.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transaction history found.</p>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-[#80b500] px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-[#80b500] px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
