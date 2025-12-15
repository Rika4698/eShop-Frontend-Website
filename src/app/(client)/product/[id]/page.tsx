/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { FaCircleXmark } from "react-icons/fa6";

import Loading from "@/app/loading";
import QuantitySelector from "@/components/Home/QuantitySelector";
import HomePageProductCard from "@/components/HomePage/HomePageProductCard";
import WarningModal from "@/components/shared/ConflictWarningModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAddRecentProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/products/productApi";
import { addProduct, clearCart } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct, IReview } from "@/types/modal";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import ReactStars from "react-stars";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductDetails = () => {
  const params = useParams();
  const cart = useAppSelector((state) => state.products.cart);
 
  const productId = params?.id as string;

  const { data, isLoading, isError, error } = useGetSingleProductQuery(
    productId ?? "", 
    {
      skip: !productId,
    }
  );

  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(0);
  const [inStock, setInStock] = useState(0);
  const isDisabled = !(inStock && quantity);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);
  const [category, setCategory] = useState<string | undefined>(undefined);

  const [addRecentProduct] = useAddRecentProductMutation();

  const { data: allProductsResponse, isLoading: allProductsLoading } = useGetAllProductsQuery({ category });

  // Debug: Log the error
  useEffect(() => {
    if (isError) {
      console.error("Product fetch error:", error);
      console.error("Product ID:", productId);
    }
  }, [isError, error, productId]);

  useEffect(() => {
    const addProductAsync = async () => {
      if (data?.id) {
        try {
          const productInfo = { productId: data.id };
          await addRecentProduct(productInfo).unwrap();
        } catch (error: any) {
          // Silently fail for recent products - it's not critical
          console.log("Recent product tracking failed:", error);
        }
      }
    };

    if (data?.image?.length) {
      setSelectedImage(data.image[0]);
    }

    if (data?.stockQuantity !== undefined) {
      setInStock(data.stockQuantity);
    }

    if (data?.category?.name) {
      setCategory(data.category.name);
    }

    addProductAsync();
  }, [data, addRecentProduct]);

  const increment = () => {
    if (inStock > 0) {
      setQuantity((prev) => prev + 1);
      setInStock((prev: number) => prev - 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      setInStock((prev: number) => prev + 1);
    }
  };

  const addProductToCart = () => {
    if (!data) return;
    dispatch(addProduct({ ...data, quantity }));
    toast.success("Product added to cart successfully.");
  };

  const handleAddToCart = () => {
    if (!data) return;
    const existingVendorId = cart[0]?.vendorId;

    if (existingVendorId && existingVendorId !== data?.vendor?.id) {
      setPendingProduct({
        id: data.id,
        name: data?.name,
        price: data?.price,
        quantity,
        image: data?.image?.[0],
        inStock,
        vendorId: data?.vendor?.id,
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

  const getCardCount = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 5;
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    return 1;
  };

  const renderLoadingCards = () => {
    const cardCount = getCardCount();
    return Array.from({ length: cardCount }).map((_, index) => (
      <SwiperSlide key={index}>
        <Loading />
      </SwiperSlide>
    ));
  };

  const discountPercentage = (data?.discount ?? 0) / 100;
  const discountAmount = (data?.price ?? 0) * discountPercentage;
  const discountedPrice = data?.flashSale
    ? (data?.price ?? 0) - discountAmount
    : (data?.price ?? 0);

  const shopParams = new URLSearchParams();
  if (data?.vendor?.id) {
    shopParams.set("shop", data.vendor.id);
  }

  console.log(shopParams);

  if (!productId) {
    return (
      <div className="py-10 text-center">
        <p className="text-xl text-red-500">No product ID provided</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="py-10 px-4 text-center max-w-2xl mx-auto">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
          <FaCircleXmark className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Product</h2>
          <p className="text-gray-700 mb-4">
            {error && 'status' in error 
              ? `Error ${error.status}: ${JSON.stringify(error.data)}`
              : 'Failed to load product details'}
          </p>
          <p className="text-sm text-gray-500 mb-6">Product ID: {productId}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-10 text-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="py-6 md:py-10 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnail Images */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {data?.image?.map((singleImage: string, index: number) => (
              <div
                key={index}
                className={`relative rounded-lg border-2 cursor-pointer flex-shrink-0 ${
                  singleImage === selectedImage
                    ? "border-primary"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(singleImage)}
              >
                <Image
                  src={singleImage}
                  alt={`Product ${index + 1}`}
                  height={80}
                  width={80}
                  className="rounded-lg h-20 w-20 md:h-24 md:w-24 object-cover"
                />
                {singleImage === selectedImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
                )}
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected Product"
                height={600}
                width={600}
                className="rounded-lg w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 md:space-y-5">
          <h1 className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold">
            {data?.name}
          </h1>
          
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {data?.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 flex-wrap">
            {data?.flashSale ? (
              <>
                <span className="text-xl md:text-2xl text-gray-400 line-through">
                  {data?.price.toFixed(2)} TK
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                  {discountedPrice.toFixed(2)} TK
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {data?.discount}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                {data?.price.toFixed(2)} TK
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="space-y-3">
            <p className="text-gray-700 text-base md:text-lg font-medium">
              Available in stock: <span className="font-bold">{data?.stockQuantity}</span>
            </p>
            
            {inStock > 0 ? (
              <div className="inline-flex items-center space-x-2 border-2 border-green-500 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                <AiFillCheckCircle className="text-xl" />
                <span className="font-semibold">In Stock</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2 border-2 border-red-500 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
                <FaCircleXmark className="text-xl" />
                <span className="font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <p className="text-gray-700 text-base md:text-lg font-medium">
              Select quantity:
            </p>
            <div className="max-w-xs ">
              <QuantitySelector
                quantity={quantity}
                increment={increment}
                decrement={decrement}
                inStock={inStock}
                
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors"
            >
              Buy Now
            </button>
            
            {isDisabled ? (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
              >
                <BsCart3 />
                <span>Add to Cart</span>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-all"
              >
                <BsCart3 />
                <span>Add to Cart</span>
              </button>
            )}
          </div>

          {/* Category */}
          <div className="pt-4">
            <span className="inline-block bg-[#18b500] text-white px-4 py-2 rounded-lg font-bold mr-2">
              Category:
            </span>
            <span className="text-gray-600 font-medium">{data?.category?.name}</span>
          </div>
        </div>
      </div>

      {/* Shop Owner Section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 pb-4 border-b-2">
          Shop Owner Info
        </h2>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold">
                  Shop Owner: <span className="text-gray-700">{data?.vendor?.name}</span>
                </h3>
                <p className="text-lg md:text-xl">
                  <span className="font-bold">Shop Name:</span>{" "}
                  <span className="text-gray-600">{data?.vendor?.shopName}</span>
                </p>
              </div>
              
              <Link href={`/shop-page?${shopParams.toString()}`}>
                <Button className="bg-[#48ad39] hover:bg-[#3a9330] text-white px-6 py-3 whitespace-nowrap">
                  View Shop Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Reviews Section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 pb-4 border-b-2">
          Customer Reviews
        </h2>

        {data?.reviews?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 text-center">
                Be the first to share your thoughts about this product!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.reviews?.map((singleReview: IReview, index: number) => (
              <Card key={index} className="border-2 border-[#80b500]/30 hover:border-[#21b500] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={singleReview?.customer?.image ?? "/default-avatar.png"}
                        alt={singleReview?.customer?.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <svg
                        viewBox="-1 0 19 19"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute -bottom-1 -right-1 w-8 h-8"
                      >
                        <path
                          d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917z"
                          fill="#f5840c"
                        />
                        <path
                          d="M7.659 9.733a3.333 3.333 0 0 0-.362-2.507 2.543 2.543 0 0 0-.908-.851 2.504 2.504 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.23 2.23 0 0 0 2.515.211 3.335 3.335 0 0 1-1.655 1.403 3.942 3.942 0 0 1-.485.164 1.84 1.84 0 0 0-.445.128.567.567 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113 5.2 5.2 0 0 0 .475-.161A4.37 4.37 0 0 0 7.57 10.07q.053-.167.09-.337zm6.34 0a3.331 3.331 0 0 0-.362-2.507 2.54 2.54 0 0 0-.908-.851 2.502 2.502 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.229 2.229 0 0 0 2.515.211 3.334 3.334 0 0 1-1.654 1.403 3.96 3.96 0 0 1-.486.164 1.847 1.847 0 0 0-.445.128.568.568 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113q.241-.07.475-.161a4.37 4.37 0 0 0 2.617-2.708q.052-.167.089-.337z"
                          fill="#ffffff"
                        />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-semibold text-primary mb-1">
                        {singleReview?.customer?.name}
                      </h4>
                      <ReactStars
                        count={5}
                        value={singleReview?.rating}
                        size={20}
                        color2="#f5840c"
                        edit={false}
                      />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm md:text-base italic">
                    &quot;{singleReview?.comment}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Related Products */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Related Products
          </h2>

          <div className="flex gap-3">
            <button
              id="swiper-button-prev"
              className="rounded-sm border-2 border-green-700 bg-white hover:bg-green-600 text-primary hover:text-white px-1 py-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              id="swiper-button-next"
              className="rounded-sm border-2 border-green-700 bg-white hover:bg-green-600 text-primary hover:text-white px-1 py-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: '#swiper-button-prev',
            nextEl: '#swiper-button-next',
          }}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {allProductsLoading
            ? renderLoadingCards()
            : (() => {
                const filteredProducts = allProductsResponse?.data?.filter(
                  (singleProduct: IProduct) => singleProduct?.id !== data?.id
                );

                if (filteredProducts?.length === 0) {
                  return (
                    <div className="text-center text-gray-600 text-xl py-8">
                      No related products available
                    </div>
                  );
                }

                return filteredProducts?.map((singleProduct: IProduct, index: number) => (
                  <SwiperSlide key={index}>
                    <HomePageProductCard singleProduct={singleProduct} />
                  </SwiperSlide>
                ));
              })()}
        </Swiper>
      </section>

      <WarningModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmReplace}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ProductDetails;