/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
"use client";
import useUserDetails from "@/hooks/useUser";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import {
  clearCoupon,
  selectAppliedCoupon,
  setCoupon,
} from "@/redux/features/coupon/couponSlice";
import { usePlaceOrderMutation } from "@/redux/features/orders/orderApi";
import {
  clearCart,
  removeProduct,
} from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ICoupon } from "@/types/modal";
import { formatDate } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Image from "next/image";
import { FaCircleXmark } from "react-icons/fa6";

import { RiCoupon2Fill, RiErrorWarningFill } from "react-icons/ri";
import { toast } from "sonner";
import Loading from "../loading";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CheckOut = () => {
    const { userData } = useUserDetails();
      const router = useRouter();
    const { handleSubmit, formState, register, reset, getValues } =
        useForm<FieldValues>({
            defaultValues: {
                name: "",
                email: "",
                deliveryAddress: "",
                phone: "",
            },
        });
    const { errors } = formState;
    const dispatch = useAppDispatch();
    const [togglePayment, setTogglePayment] = useState(false);
    const [inputCoupon, setInputCoupon] = useState<string>("");
    const { data: allCoupons, isLoading } = useGetAllCouponsQuery(undefined);
    // console.log(allCoupons);
    const [copiedCouponCode, setCopiedCouponCode] = useState<string | null>(
        null
    );
    const [isCouponVerified, setIsCouponVerified] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);

    const handlePlaceOrder = async () => {
        if (!togglePayment) {
            return toast.error("Please select delivery method");
        }
        // Access the deliveryAddress from form values
        const deliveryAddress = getValues("deliveryAddress");
        const phone = getValues("phone");

        if (!deliveryAddress) {
            return toast.error("Please provide a delivery address");
        }

        if (!phone) {
            return toast.error("Please provide phone number");
        }
        // toast.loading("Placing order...");

       const loadingToast = toast.loading("Processing your order...");

  const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const orderInfo = {
            vendorId: cart[0].vendorId,
            transactionId,
            totalPrice: total,
            deliveryAddress,
            phone,
            orderDetails: cart?.map((singleProduct) => ({
                productId: singleProduct.id,
                quantity: singleProduct.quantity,
                pricePerUnit: singleProduct.price,
            })),
            ...(appliedCoupon?.code && { coupon: appliedCoupon.code }),
        };

        try {
            const response = await placeOrder(orderInfo);
            console.log(response.data);

           toast.dismiss(loadingToast);

    if (response?.data?.paymentSession?.result === "true" && 
        response?.data?.paymentSession?.payment_url) {
      
      // Store transaction ID in localStorage for verification
      localStorage.setItem("pendingTransaction", transactionId);
      
      toast.success("Redirecting to payment gateway...", { duration: 2000 });
      
      // Small delay before redirect for better UX
      setTimeout(() => {
        window.location.href = response.data.paymentSession.payment_url;
      }, 1000);
      
    } else {
      toast.error("Failed to initiate payment. Please try again.");
    }
        } catch (error: any) {
    toast.dismiss(loadingToast);
    console.error("Error placing order:", error);
    
    const errorMessage = error?.data?.message || 
                         error?.message || 
                         "An unexpected error occurred. Please try again.";
    
    toast.error(errorMessage, { duration: 4000 });
  }
    };



    useEffect(() => {
        if (userData?.userData) {
            reset({
                name: userData.userData.name || "",
                email: userData.userData.email || "",
                deliveryAddress:
                    userData.userData.address ||"",
                phone: userData.userData.phone || "",
            });
        }
    }, [userData, reset]);

    // Function to toggle the visibility of coupon section
    const handleShowCoupon = () => {
        setShowCoupon((prev) => !prev);
         if (!showCoupon) {
            setInputCoupon("");
            setIsCouponVerified(false);
        }
    };

    const handleInput = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // toast.loading("Applying Coupon...");

        // Check if the coupon exists in allCoupons
        const validCoupon = allCoupons?.find(
            (coupon: ICoupon) =>
                coupon.code.toLowerCase() === inputCoupon.toLowerCase()
        );

        toast.dismiss();

        if (validCoupon) {
            const couponInfo = {
                code: validCoupon.code,
                discountStatus: validCoupon.discountStatus,
                discountValue: validCoupon.discountValue,
            };

            console.log("Valid coupon info:", couponInfo);

            dispatch(setCoupon({ couponInfo }));
            setIsCouponVerified(true);
             setShowCoupon(false); 
            setInputCoupon(""); 
            toast.success("Coupon applied successfully", { duration: 3000 });
        } else {
            setIsCouponVerified(false);
            toast.error("Invalid coupon code. Please check and try again.", {
                duration: 3000,
            });
        }
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCoupon(event.target.value);
    };

    const handleCopy = async (couponCode: string) => {
        try {
            await navigator.clipboard.writeText(couponCode);
            setCopiedCouponCode(couponCode);

            // Reset copiedCouponCode state after 2 seconds
            setTimeout(() => setCopiedCouponCode(null), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    // console.log(userData?.userData?.customerCoupons);
    const [placeOrder] = usePlaceOrderMutation();

    const {
        cart
    } = useAppSelector((state) => state.products);

    const appliedCoupon = useAppSelector(selectAppliedCoupon);

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeProduct({id}));
        dispatch(clearCoupon());
        toast.success("Product removed successfully!");
    };

    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
  );
    const shipping = togglePayment ? subtotal * 0.05 : 0;
    const taxes = subtotal * 0.02;
    const primaryTotal = subtotal + shipping + taxes;
    const discount =
        appliedCoupon && appliedCoupon?.discountStatus === "PERCENTAGE"
            ? primaryTotal * (appliedCoupon?.discountValue / 100)
            : appliedCoupon?.discountValue ?? 0;
    const total = primaryTotal - discount;

    
    const handleGoBack = () => {
    router.back();
  };

  const handleRemoveCoupon = () => {
        dispatch(clearCoupon());
        setIsCouponVerified(false);
        setInputCoupon("");
        setShowCoupon(false);
        toast.success("Coupon removed successfully!", { duration: 2000 });
    };

console.log( !userData?.userData?.customerCoupons);

    return (
        <div>
            <main className="max-w-7xl mx-auto pt-10 lg:pt-5 pb-24 px-4 sm:px-6 lg:px-8">
                <button
                    className="flex items-center justify-start gap-[10px] mb-4"
                    onClick={handleGoBack}
                >
                    <FaArrowLeft /> Go Back
                </button>
                <form
                    onSubmit={handleSubmit(handlePlaceOrder)}
                    className="max-w-2xl mx-auto lg:max-w-none"
                >
                    <div className="mb-8 flex justify-between items-center">
                        <div className="w-[40%] flex justify-start font-bold items-center gap-2 uppercase">
                            Checkout Complete Your Purchase
                        </div>
                        <div className="w-[60%] border-gray-200">
                            <fieldset>
                                <div className="flex gap-3 flex-col md:flex-row">
                                    <legend className="text-lg font-medium text-black">
                                        Delivery method
                                    </legend>
                                    {!togglePayment && (
                                        <div className="flex gap-2 items-center">
                                            <RiErrorWarningFill className="text-primary" />
                                            <h1 className="text-sm text-primary">
                                                Please select delivery method
                                            </h1>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <label className="relative rounded-lg shadow-sm p-4 flex focus:outline-none cursor-not-allowed border border-[#f5840c]">
                                        <div className="flex-1 flex">
                                            <div className="flex flex-col">
                                                <span className="block text-sm font-medium text-black">
                                                    Cash on Delivery
                                                </span>
                                                <span className="mt-1 flex items-center text-sm text-gray-400">
                                                    Currently Unavailable
                                                </span>
                                                <span className="mt-6 text-sm font-medium text-black">
                                                    <span className="line-through">
                                                        <span>250.00</span> <span>TK</span>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <FaCircleXmark className="text-lg text-red-500" />
                                    </label>

                                    <label
                                        onClick={() => setTogglePayment(!togglePayment)}
                                        className={`relative rounded-lg shadow-sm p-4 flex cursor-pointer  ${
                                            togglePayment ? "bg-[#00b521] text-white" : "border border-green-600"
                                        }`}
                                    >
                                        <div className="flex-1 flex">
                                            <div className="flex flex-col ">
                                                <span className="block text-base font-bold">
                                                    AamarPay Payment
                                                </span>
                                                <span className="mt-1 flex items-center text-xs">
                                                    {togglePayment ? "✓ Selected" : "Fast & Secure"}
                                                </span>
                                                <span className="mt-6 text-sm font-medium">
                                                    {togglePayment ? (
                                                        <span>Shipping: {shipping.toFixed(2)} <span>TK</span></span>
                                                    ) : (
                                                        <span className={togglePayment ? "" : "text-gray-500"}>
                                                            + Shipping calculated
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <svg
                                            className={`h-5 w-5  ${
                                         togglePayment ? "text-white  ":"text-[#adb8ae]"
                                            }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        <div className="border-2 border-[#30b304] p-4 rounded-lg py-5">
                            <div>
                                <h2 className="text-lg font-bold text-black text-center">
                                    Contact information
                                </h2>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-black">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            {...register("email", {
                                                required: { value: true, message: "User Email is required" },
                                            })}
                                            readOnly
                                            className="block w-full bg-transparent p-2 border border-primary outline-none rounded-lg text-black"
                                        />
                                        <p className="text-sm text-red-600 font-medium mt-2">
                                            {errors?.email?.message as ReactNode}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h2 className="text-lg font-bold text-black">
                                    Shipping information
                                </h2>
                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div className="sm:col-span-2 lg:row-span-5">
                                        <label className="block text-sm font-medium text-black">
                                            Full Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Full Name"
                                                {...register("name", {
                                                    required: { value: true, message: "Name is required" },
                                                })}
                                                readOnly
                                                className="block w-full bg-transparent p-2 border border-primary outline-none rounded-lg text-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 lg:row-span-5">
                                        <label className="block text-sm font-medium text-black">
                                            Delivery Address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter Address"
                                                {...register("deliveryAddress", {
                                                    required: { value: true, message: "Delivery address is required" },
                                                })}
                                                className="block w-full bg-transparent p-2 border border-primary outline-none rounded-lg text-black"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 lg:row-span-5">
                                        <label className="block text-sm font-medium text-black">
                                            Phone Number
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter Phone Number"
                                                {...register("phone", {
                                                    required: { value: true, message: "Phone Number is required" },
                                                })}
                                                className="block w-full bg-transparent p-2 border border-primary outline-none rounded-lg text-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 lg:mt-0 py-5 border-2 border-[#30b304] rounded-lg">
                            <h2 className="text-lg font-bold text-center rounded-lg text-black">
                                Order summary
                            </h2>

                            <div className="mt-4 shadow-sm">
                                <div>
                                    {cart.length > 0 &&
                                        cart.map((singleProduct) => (
                                            <div key={singleProduct.id}>
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    <li className="flex py-6 px-4 sm:px-6">
                                                        <div className="flex-shrink-0">
                                                            <Image
                                                                width={200}
                                                                height={300}
                                                                src={singleProduct.image[0] as unknown as string}
                                                                alt=""
                                                                className="w-20 rounded-md object-contain"
                                                            />
                                                        </div>
                                                        <div className="ml-6 flex-1 flex flex-col">
                                                            <div className="flex">
                                                                <div className="min-w-0 flex-1">
                                                                    <h4 className="text-sm">
                                                                        <a href="#" className="text-black text-lg font-semibold">
                                                                            {singleProduct.name}
                                                                        </a>
                                                                    </h4>
                                                                    <p className="mt-1 text-sm text-black">
                                                                        x{" "}{singleProduct.quantity}
                                                                    </p>
                                                                </div>
                                                                <div className="ml-4 flex-shrink-0 flow-root">
                                                                    <FaCircleXmark
                                                                        onClick={() => handleRemoveFromCart(singleProduct.id)}
                                                                        className="text-[#f50c0c] cursor-pointer text-lg"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 pt-2 flex items-end justify-between">
                                                                <p className="mt-1 text-sm font-medium text-black">
                                                                    {singleProduct.price}.00 <span>TK</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}

                                    {/* Coupon Section */}
                                    <div>
                                      
                                        {cart?.length > 0 && !appliedCoupon && (
                                            <div className="flex flex-col gap-3 border-t-2 border-[#06a80e] px-4 sm:px-6 pt-4">
                                                <div className="flex gap-2 items-center text-primary font-bold">
                                                    <RiCoupon2Fill className="text-green-800 text-xl" />
                                                    <span className="text-sm">
                                                        Want to get Coupon discount? Apply a coupon.
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleShowCoupon}
                                                    className="w-full bg-green-600 hover:bg-green-800 border border-green-800 text-white px-4 py-2 rounded-lg transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                                                >
                                                    <RiCoupon2Fill className="text-lg" />
                                                    See Available Coupons
                                                </button>
                                            </div>
                                        )}

                                        {/* Applied Coupon Display */}
                                        {appliedCoupon && (
                                            <div className="px-4 sm:px-6 pt-4 border-t border-green-500">
                                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-green-500 p-2 rounded-lg">
                                                                <RiCoupon2Fill className="text-white text-xl" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold text-green-800">
                                                                    Coupon Applied Successfully!
                                                                </p>
                                                                <p className="text-xs text-green-600 font-medium">
                                                                    Code: {appliedCoupon.code}
                                                                </p>
                                                                <p className="text-xs text-gray-600 mt-1">
                                                                    You saved {discount.toFixed(2)} TK
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveCoupon}
                                                            className="flex items-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm font-semibold"
                                                        >
                                                            <FaCircleXmark className="text-base" />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Price Summary */}
                                    <div className="py-6 px-4 space-y-6 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-black">Subtotal</dt>
                                            <dd className="text-sm font-medium text-black">
                                                {subtotal.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-black">Shipping</dt>
                                            <dd className="text-sm font-medium text-black">
                                                {shipping.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-black">Taxes</dt>
                                            <dd className="text-sm font-medium text-black">
                                                {taxes.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                        {appliedCoupon && (
                                            <div className="flex items-center justify-between">
                                                <dt className="text-sm text-black">
                                                    Coupon Discount{" "}
                                                    <span className="text-primary ml-3 font-semibold">
                                                        ({appliedCoupon?.code})
                                                    </span>
                                                </dt>
                                                <dd className="text-sm font-medium text-black">
                                                    -{discount.toFixed(2)} <span>TK</span>
                                                </dd>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between border-t border-[#0fb500] pt-6">
                                            <dt className="text-base font-medium text-black">Total</dt>
                                            <dd className="text-base font-medium text-black">
                                                {total.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-6 px-4 sm:px-6">
                                    <button
                                        type="submit"
                                        className="relative h-12 w-full origin-top bg-[#269b0c] rounded-lg border-2 border-[#12530b] text-white uppercase font-bold px-3"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {/*  Show all active coupons */}
                {showCoupon && (
                    <div>
                        <div className="mt-12 flex gap-2 items-center justify-center text-green-700 font-bold text-3xl">
                            <RiCoupon2Fill className="text-green-700 text-3xl" />
                            <span>Apply Coupon</span>
                        </div>

                        <div className="mx-auto max-w-xl">
                            <div className="p-6">
                                <form onSubmit={handleInput}>
                                    <div className="mb-4">
                                        <label className="block text-black font-semibold mb-2">
                                            Coupon Code:
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-green-700 rounded-lg focus:ring focus:ring-green-800 outline-none text-black"
                                            placeholder="Enter your coupon code"
                                            value={inputCoupon}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-green-700 text-green-700 before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-green-700 uppercase font-bold px-3"
                                        >
                                            Apply Coupon
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            {isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <div key={index}>
                                            <Loading />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {/* customers can use them multiple times */}
                                    {allCoupons && allCoupons.length > 0 ? (
                                        allCoupons.map((singleCoupon: ICoupon) => (
                                            <div
                                                key={singleCoupon?.id}
                                                className="container border border-green-700 text-black p-5 rounded-lg shadow-lg max-w-md mx-auto"
                                            >
                                                <div className="text-lg mb-4">
                                                    {singleCoupon?.discountStatus === "PERCENTAGE" ? (
                                                        <p>
                                                            Get{" "}
                                                            <span className="text-primary font-bold">
                                                                {singleCoupon.discountValue}% OFF
                                                            </span>{" "}
                                                            your current purchase!
                                                        </p>
                                                    ) : (
                                                        <p>
                                                            Get{" "}
                                                            <span className="text-primary font-bold">
                                                                {singleCoupon.discountValue} <span>TK</span> OFF
                                                            </span>{" "}
                                                            your next purchase!
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-base mb-4">Use coupon code:</div>
                                                <div className="bg-white text-gray-800 rounded-lg px-4 py-2">
                                                    <span className="text-2xl font-semibold">{singleCoupon.code}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(singleCoupon.code)}
                                                    className="bg-white border border-green-800 text-green-700 px-3 py-1 rounded hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-600 mt-3"
                                                >
                                                    {copiedCouponCode === singleCoupon.code ? "Copied!" : "Copy"}
                                                </button>
                                                <div className="text-sm mt-3">
                                                    <p>
                                                        Valid until{" "}
                                                        <span className="font-semibold">
                                                            {formatDate(new Date(singleCoupon.endDate), "MMMM dd, yyyy")}
                                                        </span>
                                                    </p>
                                                    <p>*Terms and conditions apply.</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12">
                                            <div className="bg-gray-100 rounded-lg p-8">
                                                <RiCoupon2Fill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                                <h3 className="text-xl font-bold text-gray-700 mb-2">
                                                    No Available Coupons
                                                </h3>
                                                <p className="text-gray-600">
                                                    No active coupons available at the moment. Check back later for new offers!
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CheckOut;
