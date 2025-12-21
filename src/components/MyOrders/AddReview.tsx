"use client";

import { ReactNode, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion, useInView } from "framer-motion";
import ReactStars from "react-stars";
import { IOrder } from "@/types/modal";
import { useCreateReviewMutation } from "@/redux/features/review/reviewsApi";
import { toast } from "sonner";
import Image from "next/image";

interface FeedbackFormValues {
  feedback: string;
  rating: number;
}

interface ReviewModalProps {
  onClose?: () => void;
  singleOrder?: IOrder | null;
}

const AddReview = ({ onClose, singleOrder }: ReviewModalProps) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [reviewedProducts, setReviewedProducts] = useState<Set<number>>(new Set());

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    defaultValues: {
      feedback: "",
      rating: 0,
    },
  });

  const ref = useRef(null);
  const isInView = useInView(ref);

  const [createReview] = useCreateReviewMutation();

  // Get current selected product
  const currentProduct = singleOrder?.orderDetails?.[selectedProductIndex];

  const onSubmit = async (data: FeedbackFormValues) => {
    if (!currentProduct) {
      toast.error("No product selected");
      return;
    }

    const reviewData = {
      comment: data.feedback,
      rating: data.rating,
      productId: currentProduct.productId,
      vendorId: singleOrder?.vendorId,
    };

    try {
      await toast.promise(createReview(reviewData).unwrap(), {
        loading: "Submitting review...",
        success: "Review added successfully!",
        error: "Failed to submit review",
      });

      // Mark this product as reviewed
      setReviewedProducts((prev) => new Set(prev).add(selectedProductIndex));

      // Reset form
      reset();

      // Move to next product if available
      if (selectedProductIndex < (singleOrder?.orderDetails?.length || 0) - 1) {
        setSelectedProductIndex(selectedProductIndex + 1);
        toast.success("You can review the next product now!", { duration: 2000 });
      } else {
        // All products reviewed
        toast.success("All products reviewed! Thank you!", { duration: 3000 });
        setTimeout(() => {
          onClose && onClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Review submission error:", error);
    }
  };

  const handleSkipProduct = () => {
    if (selectedProductIndex < (singleOrder?.orderDetails?.length || 0) - 1) {
      setSelectedProductIndex(selectedProductIndex + 1);
      reset();
      toast.info("Skipped to next product");
    } else {
      toast.info("No more products to review");
      onClose && onClose();
    }
  };

  const handleSelectProduct = (index: number) => {
    setSelectedProductIndex(index);
    reset();
  };

  const totalProducts = singleOrder?.orderDetails?.length || 0;

  return (
    <div className="overflow-y-auto">
      <div className="mb-4">
        <h1 className="text-center text-3xl font-bold text-black mb-2">
          Product Review
        </h1>
        <p className="text-center text-gray-600">
          Reviewing product {selectedProductIndex + 1} of {totalProducts}
        </p>
      </div>

      {/* Product Selection Tabs */}
      {totalProducts > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 px-4">
          {singleOrder?.orderDetails?.map((detail, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectProduct(index)}
              className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                selectedProductIndex === index
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              {/* Product Image */}
              <Image
                src={detail?.product?.image?.[0] || "/placeholder.png"}
                alt={detail?.product?.name || "Product"}
                width={40}
                height={40}
                className="w-10 h-10 rounded object-cover"
              />
              
              {/* Product Name */}
              <div className="text-left">
                <p className="text-sm font-semibold text-black line-clamp-1">
                  {detail?.product?.name}
                </p>
                <p className="text-xs text-gray-500">Qty: {detail.quantity}</p>
              </div>

              {/* Reviewed Badge */}
              {reviewedProducts.has(index) && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  ✓ Reviewed
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="flex-1"
        >
          {/* Current Product Display */}
          {currentProduct && (
            <div className="px-10 mb-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Image
                  src={currentProduct?.product?.image?.[0] || "/placeholder.png"}
                  alt={currentProduct?.product?.name || "Product"}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-black">
                    {currentProduct?.product?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {currentProduct.quantity} × ৳{currentProduct.pricePerUnit}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    Total: ৳{(currentProduct.quantity * currentProduct.pricePerUnit).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <div>
                <label htmlFor="feedback" className="text-lg font-semibold block mb-2">
                  Your Review:
                </label>
                <Controller
                  name="feedback"
                  control={control}
                  rules={{ required: "Review message is required" }}
                  render={({ field }) => (
                    <textarea
                      id="feedback"
                      {...field}
                      placeholder={`Share your experience with ${currentProduct?.product?.name}...`}
                      rows={4}
                      className="w-full box-border p-6 rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary text-black"
                    />
                  )}
                />
                <p className="text-red-600 font-medium mt-2">
                  {errors?.feedback?.message as ReactNode}
                </p>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label htmlFor="rating" className="text-lg font-semibold block mb-2">
                  Rating:
                </label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{
                    validate: (value) => value > 0 || "Rating is required",
                  }}
                  render={({ field }) => (
                    <ReactStars
                      count={5}
                      value={field.value}
                      onChange={(newRating) => field.onChange(Math.round(newRating))}
                      size={48}
                       half={false} 
                      color2={"#f5840c"}
                    />
                  )}
                />
                <p className="text-red-600 font-medium">
                  {errors?.rating?.message as ReactNode}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="relative h-12 flex-1 origin-top transform rounded-lg border-2 border-green-700 bg-green-700 text-white hover:bg-green-800 uppercase font-bold px-3 transition-colors"
                >
                  {reviewedProducts.has(selectedProductIndex) 
                    ? "Update Review" 
                    : "Submit Review"}
                </button>

                {totalProducts > 1 && 
                  selectedProductIndex < totalProducts - 1 && 
                  !reviewedProducts.has(selectedProductIndex) && (
                  <button
                    type="button"
                    onClick={handleSkipProduct}
                    className="relative h-12 px-6 origin-top transform rounded-lg border-2 border-gray-400 text-gray-700 hover:bg-gray-100 uppercase font-bold transition-colors"
                  >
                    Skip
                  </button>
                )}
              </div>

              {/* Progress Indicator */}
              {totalProducts > 1 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{reviewedProducts.size} / {totalProducts} reviewed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(reviewedProducts.size / totalProducts) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddReview;