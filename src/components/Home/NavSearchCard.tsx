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
    <div>
      <div className="rounded-lg bg-[#f7f7f7] shadow-lg">
      <div className="flex gap-2">
        {/* Image Section */}
        <div className="relative w-[50px]">
          <Image width={200} height={200}
            className="w-full h-full object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-300"
            src={singleProduct.image[0]}
            alt={singleProduct.name}
          />

          {singleProduct.flashSale && (
            <span className="absolute top-2 left-2 bg-red-600 text-white py-1 px-1 rounded-full text-[8px] font-semibold">
              {singleProduct.discount}% OFF
            </span>
          )}
        </div>

        {/* Product Details Section */}
        <div className=" flex flex-col justify-between w-full">
          {/* Product Name */}
          <h2 className="text-black font-semibold text-lg line-clamp-2">{singleProduct.name}</h2>

          {/* Price Section */}
          <div className="flex items-center">
            <span className="text-sm text-gray-600 line-through">
              ${singleProduct.price}
            </span>
            {singleProduct.flashSale && (
              <span className="text-sm font-bold text-primary">
                ${discountedPrice.toFixed(2)}
              </span>
            )}
            {!singleProduct.flashSale && (
              <span className="text-sm font-semibold text-black">
                ${singleProduct.price}
              </span>
            )}
          </div>

          {/* View Details Button */}
        
        </div>
        <Link href={`/productDetails?${params.toString()}`}>
            <button className="w-full py-2 w-36 bg-primary text-white text-sm font-semibold rounded-lg transition-all hover:bg-primary-dark">
              View Details
            </button>
          </Link>
      </div>
    </div>

    {/* <tbody>
            <tr className="hover:bg-gray-50 border-b transition duration-300">
                <td className="py-4 px-4 flex justify-start">
                <div className="relative w-[140px]">
          <img
            className="w-full h-full object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-300"
            src={singleProduct.image[0]}
            alt={singleProduct.name}
          />

          {singleProduct.flashSale && (
            <span className="absolute top-2 left-2 bg-primary text-white py-1 px-3 rounded-full text-sm font-semibold">
              {singleProduct.discount}% OFF
            </span>
          )}
        </div>
                </td>
                <td className="py-4 px-6 border-b text-lg font-medium">{singleProduct.name}</td>
                <td className="py-4 px-6 border-b text-xl font-medium"> <div className="flex items-center space-x-2 mt-2">
            <span className="text-sm text-gray-600 line-through">
              ${singleProduct.price}
            </span>
            {singleProduct.flashSale && (
              <span className="text-xl font-bold text-primary">
                ${discountedPrice.toFixed(2)}
              </span>
            )}
            {!singleProduct.flashSale && (
              <span className="text-xl font-semibold text-black">
                ${singleProduct.price}
              </span>
            )}
          </div></td>
                <td className="py-4 px-6 border-b text-lg font-medium">$599.99</td>
                <td className="py-4 px-6 border-b text-end">
                     <Link href={`/productDetails?${params.toString()}`}>
            <button className="w-full mt-4 py-2 px-4 bg-primary text-white text-sm font-semibold rounded-lg transition-all hover:bg-primary-dark">
              View Details
            </button>
          </Link>
                </td>
            </tr>
        </tbody> */}
    </div>
  );
};

export default NavSearchProductCard;
