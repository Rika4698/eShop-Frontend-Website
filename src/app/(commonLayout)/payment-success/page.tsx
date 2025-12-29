/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/products/productSlice";
import { clearCoupon } from "@/redux/features/coupon/couponSlice";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    transactionId: ""
  });

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const transactionId = searchParams.get("transactionId");
    
    if (orderId && transactionId) {
      setOrderDetails({ orderId, transactionId });
      
      // Clear cart and coupon after successful payment
      dispatch(clearCart());
      dispatch(clearCoupon());
    }
  }, [searchParams, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 w-full flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border-t-4 border-green-500">
        <div className="mb-6">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500 animate-bounce" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        {orderDetails.transactionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Transaction ID</p>
            <p className="font-mono text-sm font-semibold text-green-900">
              {orderDetails.transactionId}
            </p>
          </div>
        )}
        
        {/* <p className="text-sm text-gray-500 mb-8">
          You will receive an email confirmation shortly with your order details.
        </p> */}
        
        <div className="space-y-3">
          <Link
            href="/dashboard/customer/my-orders"
            className="block w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            View My Orders
          </Link>
          
          <Link
            href="/all-products"
            className="block w-full bg-lime-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-lime-800 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;