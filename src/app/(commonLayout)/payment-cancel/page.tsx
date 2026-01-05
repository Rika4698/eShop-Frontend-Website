/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// import useUserDetails from "@/hooks/useUser";
import { XCircle, ShoppingCart, Home, Info } from "lucide-react";
import Link from "next/link";
import {  useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PaymentCancelPage = () => {
  const searchParams = useSearchParams();

//   const userData = useUserDetails();
//   const router = useRouter();
  const [transactionId, setTransactionId] = useState("");

//   if(!userData?.userData){
//     router.replace("/login");
//   }

  useEffect(() => {
    const txnId = searchParams.get("transactionId");
    
    if (txnId) {
      setTransactionId(txnId);
    }

    // Clear pending transaction from localStorage
    localStorage.removeItem("pendingTransaction");
    
    // Show toast notification
    toast.info("Payment was cancelled. Your cart items are still available.");
  }, [searchParams]);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 w-full flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border-t-4 border-blue-500">
        <div className="mb-6">
          <XCircle className="mx-auto h-20 w-20 text-blue-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          You have cancelled the payment process. Don't worry, your items are still in your cart!
        </p>
        
        {transactionId && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <p className="text-sm text-gray-600 mb-2 font-medium">Transaction ID</p>
            <p className="font-mono text-xs font-semibold text-gray-900 break-all">
              {transactionId}
            </p>
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm text-blue-900 font-medium mb-1">
                What happens next?
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your cart items are preserved</li>
                <li>• Product stock has been restored</li>
                <li>• No charges were made</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            Complete Your Order
          </Link>
          
          <Link
            href="/cart"
            className="block w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            View Cart
          </Link>
          
          <Link
            href="/all-products"
            className="block w-full bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Changed your mind?{" "}
            <Link href="/all-products" className="text-blue-600 hover:text-blue-700 font-medium">
              Browse Products
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;