import { IProduct } from "@/types/modal";
import Image from "next/image";
import Link from "next/link";

const NavSearchProductCard = ({
  singleProduct,
}: {
  singleProduct: IProduct;
}) => {
  const params = new URLSearchParams();
  params.set("product", singleProduct.id);

  const discountPercentage = (singleProduct?.discount ?? 0) / 100;
  const discountAmount = singleProduct.price * discountPercentage;
  const discountedPrice = singleProduct.flashSale
    ? singleProduct.price - discountAmount
    : singleProduct.price;

  return (
    <Link href={`/productDetails?${params.toString()}`}>
      <div className="hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center gap-3 p-3">
          {/* Product Image */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-md"
              src={singleProduct.image[0]}
              alt={singleProduct.name}
            />

            {singleProduct.flashSale && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white py-0.5 px-1.5 rounded-full text-[10px] font-semibold">
                {singleProduct.discount}% OFF
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            {/* Product Name */}
            <h2 className="text-gray-800 font-medium text-sm line-clamp-2 mb-1">
              {singleProduct.name}
            </h2>

            {/* Price Section */}
            <div className="flex items-center gap-2">
              {singleProduct.flashSale ? (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ${singleProduct.price.toFixed(2)}
                  </span>
                  <span className="text-base font-bold text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-base font-semibold text-gray-800">
                  ${singleProduct.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavSearchProductCard;