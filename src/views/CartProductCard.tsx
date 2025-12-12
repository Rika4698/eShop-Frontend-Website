import {
    decrementQuantity,
    incrementQuantity,
    removeProduct,
} from "@/redux/features/products/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CartItem } from "@/types/modal";
import Image from "next/image";
import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

export default function CartProductCard({ product }: { product: CartItem }) {
    const [quantity, setQuantity] = useState(product.quantity);

    const dispatch = useAppDispatch();

    const handleIncrementQuantity = () => {
        if (quantity < product.stockQuantity) {
            dispatch(incrementQuantity({ id: product.id }));
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            dispatch(decrementQuantity({ id: product.id }));
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const deleteCartProduct = () => {
        dispatch(removeProduct({ id: product.id }));
    };

    return (
        <div
            key={product.id}
            className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
        >
            <Image
                width={50}
                height={50}
                src={product.image[0] as unknown as string}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg border"
            />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-black">
                        {product.name}
                    </h2>
                    <FaCircleXmark
                        onClick={() => deleteCartProduct()}
                        className="text-red-500 cursor-pointer text-xl"
                    />
                </div>
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border border-gray-300 rounded">
                        <button
                            onClick={() => handleDecrementQuantity()}
                            className="px-3 py-1 text-gray-700 hover:bg-gray-200 border-r"
                        >
                            -
                        </button>
                        <span className="px-4 text-black">
                            {product.quantity}
                        </span>
                        <button
                            onClick={() =>
                                handleIncrementQuantity()
                            }
                            className="px-3 py-1 text-gray-700 hover:bg-gray-200 border-l"
                        >
                            +
                        </button>
                    </div>
                    <p className="text-lg font-semibold text-black">
                        ${product.price}
                    </p>
                </div>
            </div>
        </div>
    );
}
