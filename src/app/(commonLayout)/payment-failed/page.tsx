/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentFailedPage = () => {
  const searchParams = useSearchParams();
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const txnId = searchParams.get("transactionId");
    if (txnId) {
      setTransactionId(txnId);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 w-full flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border-t-4 border-red-500">
        <div className="mb-6">
          <XCircle className="mx-auto h-20 w-20 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Failed
        </h1>
        
        <p className="text-gray-600 mb-4">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        
        {transactionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Transaction ID</p>
            <p className="font-mono text-sm font-semibold text-gray-900">
              {transactionId}
            </p>
          </div>
        )}
        
        <p className="text-sm text-gray-500 mb-8">
          If money was deducted from your account, it will be refunded within 5-7 business days.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;