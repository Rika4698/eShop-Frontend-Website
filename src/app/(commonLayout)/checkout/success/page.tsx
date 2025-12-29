import { CheckCircle } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen bg-white w-full center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You will receive an email confirmation shortly with your order
          details.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default page;
