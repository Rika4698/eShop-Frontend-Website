/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { RiCoupon2Fill } from "react-icons/ri";
import { parseISO, format } from "date-fns";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { IoClose } from "react-icons/io5";
interface CreateCouponModalProps {
  onClose?: () => void;
}

const CreateCouponModal = ({ onClose }: CreateCouponModalProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FieldValues>({
    defaultValues: {
      code: "WINTER25",
      discountStatus: "PERCENTAGE",
      discountValue: 25,
      endDate: "2026-01-31",
    }
  });

  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form Data:", data);

    const { endDate, discountValue, discountStatus, code } = data;

    // Validate discount value
    if (Number(discountValue) <= 0) {
      toast.error("Discount value must be greater than 0.");
      return;
    }

    // Validate percentage
    if (discountStatus === "PERCENTAGE" && Number(discountValue) > 100) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }

    toast.loading("Creating coupon...");

    try {
      const parsedDate = parseISO(endDate);
      const formattedDate = format(parsedDate, "yyyy-MM-dd'T'23:59:59'Z'");

      const couponData = {
        code: code.toUpperCase().trim(),
        discountStatus: discountStatus,
        endDate: formattedDate,
        discountValue: Number(discountValue),
      };

      console.log("Sending coupon data:", couponData);

      const res = await createCoupon(couponData).unwrap();
      
      toast.dismiss();
      
      if (res.success) {
        toast.success("Coupon created successfully!");
        if (onClose) onClose();
      }
    } catch (error: any) {
      console.error("Error creating coupon:", error);
      toast.dismiss();
      
      const errorMessage = error?.data?.message || 
                           error?.message || 
                           "Failed to create coupon. Please try again.";
      
      toast.error(errorMessage);
    }
  };

  return (


    <div  className="p-6 max-w-2xl mx-auto overflow-y-auto">

      <button
       onClick={onClose}
     className=" text-gray-500 hover:text-red-500"
       >
   <IoClose size={26} />
    </button>
      <div className="flex gap-2 items-center justify-center text-green-600 font-bold text-3xl mb-6">
        <RiCoupon2Fill className="text-green-600 text-3xl" />
        <span>Create Coupon</span>

        
      </div>




      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Coupon Code */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Code *
            </label>
            <Input
              id="code"
              type="text"
              placeholder="e.g., WINTER25"
              {...register("code", { 
                required: "Coupon code is required",
                minLength: {
                  value: 3,
                  message: "Code must be at least 3 characters"
                }
              })}
              className="w-full"
            />
            {errors.code && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.code.message as string}
              </span>
            )}
          </div>

          {/* Discount Status */}
          <div>
            <label htmlFor="discountStatus" className="block text-sm font-medium text-gray-700 mb-2">
              Discount Type *
            </label>
            <select
              id="discountStatus"
              {...register("discountStatus", { required: "Discount type is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FIXED">Fixed Amount (TK)</option>
            </select>
            {errors.discountStatus && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.discountStatus.message as string}
              </span>
            )}
          </div>

          {/* Discount Value */}
          <div>
            <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-2">
              Discount Value *
            </label>
            <Input
              id="discountValue"
              type="number"
              min="1"
              step="0.01"
              placeholder={watch("discountStatus") === "PERCENTAGE" ? "e.g., 25" : "e.g., 100"}
              {...register("discountValue", { 
                required: "Discount value is required",
                min: {
                  value: 1,
                  message: "Value must be greater than 0"
                }
              })}
              className="w-full"
            />
            {errors.discountValue && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.discountValue.message as string}
              </span>
            )}
            {watch("discountStatus") === "PERCENTAGE" && (
              <span className="text-gray-500 text-xs mt-1 block">
                Maximum 100%
              </span>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date *
            </label>
            <Input
              id="endDate"
              type="date"
              min={format(new Date(), "yyyy-MM-dd")}
              {...register("endDate", { 
                required: "Expiry date is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selectedDate >= today || "Date must be in the future";
                }
              })}
              className="w-full"
            />
            {errors.endDate && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.endDate.message as string}
              </span>
            )}
          </div>
        </div>

        {/* Preview */}
        {watch("code") && watch("discountValue") && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Preview:</h3>
            <p className="text-sm text-gray-600">
              Code: <span className="font-mono font-bold text-primary">{watch("code").toUpperCase()}</span>
            </p>
            <p className="text-sm text-gray-600">
              Discount: <span className="font-semibold">
                {watch("discountStatus") === "PERCENTAGE" 
                  ? `${watch("discountValue")}% OFF`
                  : `${watch("discountValue")} TK OFF`
                }
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Valid until: <span className="font-semibold">
                {watch("endDate") ? format(new Date(watch("endDate")), "MMMM dd, yyyy") : "N/A"}
              </span>
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="relative h-10 px-6 origin-top transform rounded-lg border-2 border-green-700 text-green-800 before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-green-600 uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Coupon"}
          </button>
          
          <button 
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCouponModal;