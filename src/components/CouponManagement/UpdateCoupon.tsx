/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { RiCoupon2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { parseISO, format, formatISO } from "date-fns";
import { toast } from "sonner";
import { ICoupon } from "@/types/modal";
import { useUpdateCouponMutation } from "@/redux/features/coupon/couponApi";

interface UpdateCouponModalProps {
  onClose: () => void;
  singleCoupon: ICoupon;
}

const UpdateCoupon: React.FC<UpdateCouponModalProps> = ({
  onClose,
  singleCoupon,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      code: singleCoupon?.code || "",
      discountStatus: singleCoupon?.discountStatus || "PERCENTAGE",
      discountValue: singleCoupon?.discountValue || 0,
      endDate: formatISO(new Date(singleCoupon?.endDate || new Date()), {
        representation: "date",
      }),
    },
  });

  const [updateCoupon] = useUpdateCouponMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Updating coupon...");

    const formattedDate = format(
      parseISO(data.endDate),
      "yyyy-MM-dd'T'23:59:59'Z'"
    );

    try {
      const couponInfo = {
        code: data.code,
        discountStatus: data.discountStatus,
        endDate: formattedDate,
        discountValue: Number(data.discountValue),
      };

      const res = await updateCoupon({
        id: singleCoupon.id,
        couponInfo,
      }).unwrap();

      toast.dismiss();
      toast.success("Coupon updated successfully!");
      onClose();
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message || "Failed to update coupon");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-full
            max-w-2xl
            bg-white
            rounded-xl
            shadow-xl
            max-h-[90vh]
            overflow-y-auto
            p-6
          "
        >
          {/* Cross Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={26} />
          </button>

          {/* Header */}
          <div className="flex gap-2 items-center justify-center text-green-700 font-bold text-2xl sm:text-3xl mb-6">
            <RiCoupon2Fill className="text-green-700 text-3xl" />
            <span>Update Coupon</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                {...register("code")}
                placeholder="Coupon Code"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
              />

              <select
                {...register("discountStatus")}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="PERCENTAGE">PERCENTAGE</option>
                <option value="FIXED">FIXED</option>
              </select>

              <input
                type="date"
                {...register("endDate")}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="number"
                {...register("discountValue")}
                placeholder="Discount Value"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                type="submit"
                className="px-6 py-2 border-2 border-green-700 text-green-700 font-bold rounded-lg hover:bg-green-600 hover:text-white transition uppercase"
              >
                Update
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold transition"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCoupon;
