/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useState } from "react";

import { IoMdCart } from "react-icons/io";

import useUserDetails from "@/hooks/useUser";
import {
  addCompareProducts,
  selectCompareProducts
} from "@/redux/features/productCompare/compareSlice";
import { useAddRecentProductMutation } from "@/redux/features/products/productApi";
import { addProduct, clearCart } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/modal";
import { Eye, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { GrCompare } from "react-icons/gr";
import { toast } from "sonner";
import WarningModal from "../shared/ConflictWarningModal";
import { RiH2 } from "react-icons/ri";

interface ProductCardProps {
    singleProduct: IProduct;
    isCompareActive?: boolean;
    setIsCompareActive?: {};
    compareProducts?: IProduct[];
    categoryName?:string;
    shopName?:string;
}
const HomePageProductCard = (
    { singleProduct,
  categoryName, shopName
}: ProductCardProps
    ) => {

    
    const params = new URLSearchParams();
    params.set("product", singleProduct.id);
    const { cart } = useAppSelector((state) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState<any>(null);
    const { userData } = useUserDetails();
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const productsForComparison = useAppSelector(selectCompareProducts);
console.log(singleProduct,"sa");
    const [addRecentProduct] = useAddRecentProductMutation();

    const addProductToCart = () => {
        if (!userData?.userData) {
            router.push("/login");
            return;
        }

        dispatch(addProduct({ ...singleProduct, quantity: 1 }));
        toast.success("Product added to cart successfully!");
    };

    const handleAddToCart = () => {
        const existingVendorId = cart[0]?.vendorId;

        console.log(existingVendorId, singleProduct?.vendor?.id);

        if (
            existingVendorId &&
            existingVendorId !== singleProduct?.vendor?.id
        ) {
            setPendingProduct({
                id: singleProduct.id,
                name: singleProduct?.name,
                price: singleProduct?.price,
                quantity: 1,
                image: singleProduct?.image[0],
                inStock: singleProduct.stockQuantity - 1,
                vendorId: singleProduct?.vendor?.id,
            });
            setIsModalOpen(true);
        } else {
            addProductToCart();
        }
    };

    const handleConfirmReplace = () => {
        dispatch(clearCart());
        addProductToCart();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setPendingProduct(null);
        setIsModalOpen(false);
    };

    const discountPercentage = (singleProduct?.discount ?? 0) / 100;
    const discountAmount = singleProduct.price * discountPercentage;
    const discountedPrice = singleProduct.flashSale
        ? singleProduct.price - discountAmount
        : singleProduct.price;

    const handleCompareButton = () => {
        if (productsForComparison.length > 0) {
            const existingCategory = productsForComparison[0]?.category?.id;

            if (singleProduct?.category?.id !== existingCategory) {
                toast.error(
                    "You can only compare products from the same category."
                );
                return;
            }
        }

        if (productsForComparison.length >= 3) {
            toast.error("You can only compare up to 3 products.");
            return;
        }

        dispatch(
            addCompareProducts({
                products: [...productsForComparison, singleProduct],
            })
        );
        toast.success(`${singleProduct.name} added for comparison.`);
    };

    console.log("from redux", productsForComparison);


    return (
        <div className="w-full h-full">
            <div className="h-full">
                <div className="h-full">
                    <div className="h-full bg-white cursor-pointer group shadow-lg rounded-md border p-3 flex flex-col">
     {/* Image Section */}
   <div className="relative overflow-hidden rounded-lg w-full aspect-square mb-3">
                            <Image
                                className="w-full h-full object-cover rounded-md transition-opacity hover:duration-700 ease-in-out group-hover:scale-110 transition-transform duration-500"
                                src={singleProduct.image[0]}
                                alt={singleProduct.name}
                                width={500}
                                height={500}
                            />
                            <div className="absolute top-2 left-2">
                                {singleProduct.flashSale ? (
                                    <span className="bg-red-600 text-white px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base py-1 rounded-tl-[15px] rounded-tr-none rounded-bl-none rounded-br-[15px]">
                                        {singleProduct.discount}% off
                                    </span>
                                ) : (
                                    <span className="bg-[#24b500] text-white px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base py-1 rounded-tl-[15px] rounded-tr-none rounded-bl-none rounded-br-[15px]">
                                        New Arrival
                                    </span>
                                )}
                            </div>

  {userData?.userData ? (
         <div>
 {singleProduct.stockQuantity > 0 && (
    <div>


        <div className="flex justify-center">
      <ul className="flex gap-2 sm:gap-3 h-[40px] rounded-full bg-opacity-90 opacity-0 group-hover:opacity-100 transition-all duration-700 top-1/2 -translate-y-1/2 justify-center items-center absolute">


         {userData?.userData ? (
    singleProduct.stockQuantity > 0 && (
      <li className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] shadow-md border cursor-pointer bg-green-500 flex justify-center items-center rounded-full hover:bg-green-700 hover:text-white hover:rotate-[360deg] transition-all">
        <button
          onClick={handleCompareButton}
          className="w-full h-full flex justify-center items-center"
        >
          <GrCompare className="text-base sm:text-xl text-black" />
        </button>
      </li>
    )
  ) : (
    <li className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] shadow-md border cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#36931e] hover:text-white hover:rotate-[360deg] transition-all">
      <button className="w-full h-full flex justify-center items-center">
        <FaArrowRightArrowLeft className="text-sm sm:text-base" />
      </button>
    </li>
  )}


     <Link
      href={`/product/${singleProduct.id}`}
      className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] shadow-md border cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[360deg] transition-all"
      >
    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </ul>

      <div
                                                    onClick={() =>
                                                        handleAddToCart()
                                                    }
                                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-32 h-16 sm:w-40 sm:h-[75px] rounded-t-full bg-[#329003] text-white flex flex-col items-center justify-center text-xs sm:text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white"
                                                >
                                                    <span>
                                                        <ShoppingBasket className="text-base sm:text-[20px] text-white mb-1 sm:mb-2" />
                                                    </span>
                                                    <span className="text-sm sm:text-lg">
                                                        Add to Cart
                                                    </span>
         </div>
            </div>
          </div>
             )}
             </div>
   ) : (
   <div className="flex justify-center">
   <ul className="flex gap-2 sm:gap-3 h-[40px] rounded-full bg-opacity-90 opacity-0 group-hover:opacity-100 transition-all duration-700 top-1/2 -translate-y-1/2 justify-center items-center absolute">
   <li className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] shadow-md border cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#36931e] hover:text-white hover:rotate-[360deg] transition-all">
          <button>
      <FaArrowRightArrowLeft className="text-sm sm:text-base" />
          </button>
              </li>
            <Link
         href={`/product/${singleProduct.id}`}
       className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] shadow-md border cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[360deg] transition-all"
                              >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                   </ul>
                                    <span
                                        onClick={handleAddToCart}
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-32 h-16 sm:w-40 sm:h-[75px] rounded-t-full bg-primary text-white flex flex-col items-center justify-center text-xs sm:text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white"
                                    >
                                        <span>
                                            <IoMdCart className="text-lg sm:text-xl" />
                                        </span>
                                        <span className="text-sm sm:text-lg">
                                            Add to Cart
                                        </span>
                                    </span>
  </div>
      )}
</div>
                        {/* view details  */}
                        <div className="flex-1 flex flex-col">
                            <Link href={`/product/${singleProduct.id}`} className="flex-1 flex flex-col">
                                <div className="gap-2 flex-1 flex flex-col">
                               <button className="text-white text-xs sm:text-sm font-medium bg-[#53a22c] px-2 sm:px-3 py-1 mt-2 rounded-md w-fit">
                             {singleProduct?.category?.name || categoryName ||
                                            "Unknown Category"}
                                    </button>

                                    <h1 className="text-sm sm:text-base md:text-lg font-semibold text-black flex-grow line-clamp-2">
                                        {singleProduct.name}
                                    </h1>
                                    <div className="flex gap-2 items-center pb-2">
                                        <span className="font-medium text-sm sm:text-base md:text-lg text-black">
                                            Price:
                                        </span>
                                        <h2
                                            className={`font-medium text-sm sm:text-base md:text-lg text-red-600 ${
                                                singleProduct?.flashSale &&
                                                "line-through"
                                            }`}
                                        >
                                            
                                            {singleProduct.price} <span>TK</span>
                                        </h2>
                                        {singleProduct?.flashSale && (
                                            <h2 className="font-medium text-sm sm:text-base md:text-lg text-primary">
                                               
                                                {discountedPrice} <span>TK</span>
                                            </h2>
                                        )}
                                    

                                    </div>
                                    <div className="flex gap-2 items-center pb-2">
                                         {singleProduct?.vendor?.shopName || shopName ?(<>
                                        <span className="font-medium text-sm sm:text-base md:text-lg text-black">Shop Name:</span>
                                        <h2 className="font-medium text-sm sm:text-base md:text-lg text-primary line-clamp-1">{singleProduct?.vendor?.shopName || shopName }</h2> </>) :""}

                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmReplace}
                onCancel={handleCancel}
            />

            <div>
            </div>
        </div>
    );
};

export default HomePageProductCard;