"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { FaCircleXmark } from "react-icons/fa6";
import CartProductCard from "./CartProductCard";

const CartViews = () => {
    const { cart } = useAppSelector((state) => state.products);
    const router = useRouter();
    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        router.push("/checkout");
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-semibold text-black">Your Cart</h1>
               
            </div>
            <div className="divider" />

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Cart Items */}
                <div className="flex-1">
                    {cart?.length > 0 ? (
                        <div className="overflow-y-auto max-h-[70vh] space-y-4">
                            {cart.map((singleProduct) => (
                                <CartProductCard product={singleProduct} key={singleProduct.id}  />
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg text-gray-500">
                            Your cart is currently empty.
                        </p>
                    )}
                </div>

                {/* Right: Subtotal & Checkout */}
                {cart.length > 0 && (
                    <div className="w-full md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-black mb-4">
                            Order Summary
                        </h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-black">
                                Subtotal
                            </h3>
                            <p className="text-lg text-gray-800">
                                {subtotal.toFixed(2)} Tk
                            </p>
                            <p className="text-sm text-gray-500">
                                Shipping and taxes calculated at checkout.
                            </p>
                        </div>
                      <button
                            onClick={handleCheckout}
                      className="w-full h-12 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition uppercase"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartViews;
