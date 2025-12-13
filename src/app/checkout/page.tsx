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

        if (!deliveryAddress) {
            return toast.error("Please provide a delivery address");
        }
        // toast.loading("Placing order...");

       const loadingToast = toast.loading("Processing your order...");

  const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const orderInfo = {
            vendorId: cart[0].vendorId,
            transactionId,
            totalPrice: total,
            deliveryAddress,
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

    console.log(userData?.userData?.customerCoupons);
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
    const shipping = subtotal * 0.05;
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

    return (
        <div>
            <main className="max-w-7xl mx-auto pt-10 lg:pt-5 pb-24 px-4 sm:px-6 lg:px-8">
                <button
        className="flex items-center justify-start gap-[10px]"
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
                            
                            
                            Checkout  Complete Your Purchase
                        
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
                                                    Please select delivery
                                                    method
                                                </h1>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        <label
                                            className={`relative rounded-lg shadow-sm p-4 flex focus:outline-none cursor-not-allowed border border-[#f5840c]`}
                                        >
                                            <div className="flex-1 flex">
                                                <div className="flex flex-col">
                                                    <span
                                                        id="delivery-method-0-label"
                                                        className="block text-sm font-medium text-black"
                                                    >
                                                        {" "}
                                                        Cash on Delivery{" "}
                                                    </span>
                                                    <span
                                                        id="delivery-method-1-description-0"
                                                        className="mt-1 flex items-center text-sm text-gray-400"
                                                    >
                                                        {" "}
                                                        Currently Unavailable{" "}
                                                    </span>
                                                    <span
                                                        id="delivery-method-0-description-1"
                                                        className="mt-6 text-sm font-medium text-black"
                                                    >
                                                        <span className="line-through">
                                                            
                                                            <span>250.00</span> <span>TK</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <FaCircleXmark className="text-lg text-red-500" />

                                            <div
                                                className="absolute -inset-px rounded-lg border-2 border-primary pointer-events-none"
                                                aria-hidden="true"
                                            />
                                        </label>

                                        <label
                                            onClick={() =>
                                                setTogglePayment(!togglePayment)
                                            }
                                            className={`relative rounded-lg shadow-sm p-4 flex  cursor-pointer ${
                                                togglePayment
                                                    ? "bg-[#00b521] text-white"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex-1 flex">
                                                <div className="flex flex-col">
                                                    <span
                                                        id="delivery-method-1-label"
                                                        className="block text-sm font-medium "
                                                    >
                                                        {" "}
                                                        AamarPay Payment{" "}
                                                    </span>
                                                   
                                                    <span
                                                        id="delivery-method-1-description-1"
                                                        className="mt-6 text-sm font-medium "
                                                    >
                                                        {" "}
                                                        <span>
                                                            
                                                            <span>
                                                                {shipping.toFixed(
                                                                    2
                                                                )}
                                                            </span> <span>TK</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <svg
                                                className={`h-5 w-5 text-[#04a30c] ${
                                                    togglePayment &&
                                                    "text-white"
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <div
                                                className="absolute -inset-px rounded-lg border-2 border-primary pointer-events-none"
                                                aria-hidden="true"
                                            />
                                        </label>
                                    </div>
                                </fieldset>
                            
                            </div>
                    </div>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        <div className="border-2 border-[#0fb004] p-2 rounded-lg">
                            <div>
                                <h2 className="text-lg font-bold text-black text-center">
                                    Contact information
                                </h2>

                                <div className="mt-4">
                                    <label
                                        htmlFor="email-address"
                                        className="block text-sm font-medium text-black"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "User Email is required",
                                                },
                                            })}
                                            readOnly
                                            className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-orange-500 transition placeholder-slate-400 focus:ring-2 focus:border-orange-500 rounded-lg focus:ring-primary text-black"
                                        />
                                        <p className="text-sm text-red-600 font-medium  mt-2">
                                            {
                                                errors?.email
                                                    ?.message as ReactNode
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className=" border-primary pt-5">
                                <h2 className="text-lg font-bold text-black">
                                    Shipping information
                                </h2>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Full Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Full Name"
                                                {...register("name", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Name is required",
                                                    },
                                                })}
                                                readOnly
                                                className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-orange-500 transition placeholder-slate-400 focus:ring-2 focus:border-orange-500 rounded-lg focus:ring-primary text-black"
                                            />
                                            <p className="text-sm text-red-600 font-medium  mt-2">
                                                {
                                                    errors?.name
                                                        ?.message as ReactNode
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="deliveryAddress"
                                            className="block text-sm font-medium text-black"
                                        >
                                            deliveryAddress
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="deliveryAddress"
                                                type="text"
                                                required
                                                placeholder="Enter Address"
                                                {...register(
                                                    "deliveryAddress",
                                                    {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                " deliveryAddress is required",
                                                        },
                                                    }
                                                )}
                                                className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-orange-500 transition placeholder-slate-400 focus:ring-2 focus:border-orange-500 rounded-lg focus:ring-primary text-black"
                                            />
                                            <p className="text-sm text-red-600 font-medium  mt-2">
                                                {
                                                    errors?.address
                                                        ?.message as ReactNode
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Phone
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter Phone Number"
                                                {...register("phone", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Phone Number is required",
                                                    },
                                                })}
                                                className="block w-full bg-transparent p-2 border border-primary outline-none invalid:border-orange-500 transition placeholder-slate-400 focus:ring-2 focus:border-orange-500 rounded-lg focus:ring-primary text-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                          
                        </div>
                     
                            <div className="mt-10 lg:mt-0 border-2 border-[#30b304] rounded-lg">
                            <h2 className="text-lg font-bold text-center rounded-lg text-black">
                                Order summary
                            </h2>

                            <div className="mt-4 shadow-sm">
                                <div>
                                    {cart.length > 0 &&
                                        cart.map((singleProduct) => (
                                            <div key={singleProduct.id}>
                                                <ul
                                                    role="list"
                                                    className="divide-y divide-gray-200"
                                                >
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
                                                                        <a
                                                                            href="#"
                                                                            className="text-black text-lg font-semibold"
                                                                        >
                                                                            {
                                                                                singleProduct.name
                                                                            }{" "}
                                                                        </a>
                                                                    </h4>
                                                                    <p className="mt-1 text-sm text-black">
                                                                        x
                                                                        {singleProduct.quantity}
                                                                    </p>
                                                                </div>

                                                                <div className="ml-4 flex-shrink-0 flow-root">
                                                                    <FaCircleXmark
                                                                        onClick={() =>
                                                                            handleRemoveFromCart(
                                                                                singleProduct.id
                                                                            )
                                                                        }
                                                                        className="text-[#f5840c] cursor-pointer text-lg"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="flex-1 pt-2 flex items-end justify-between">
                                                                <p className="mt-1 text-sm font-medium text-black">
                                                                    
                                                                    {
                                                                        singleProduct.price
                                                                    }.00 <span>TK
                                                                    </span>
                                                                        
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    <div>
                                        {cart?.length > 0 &&
                                            !appliedCoupon && (
                                                <div
                                                    className={`flex gap-2 items-center text-primary font-bold ${
                                                        cart?.length >
                                                            0 &&
                                                        "border-t border-[#f5840c]"
                                                    } px-4 sm:px-6 pt-4 cursor-pointer hover:underline`}
                                                >
                                                    <span>
                                                        <RiCoupon2Fill className="text-primary" />
                                                    </span>
                                                    <span>
                                                        Want to get Coupon
                                                        discount save? Apply a
                                                        coupon.
                                                    </span>
                                                    <button
                                                        onClick={
                                                            handleShowCoupon
                                                        }
                                                        className="ml-2 text-blue-500 hover:underline"
                                                    >
                                                        See Coupon
                                                    </button>
                                                </div>
                                            )}
                                    </div>

                                    <div
                                        className={`${
                                            cart?.length > 0 &&
                                            appliedCoupon &&
                                            "text-black"
                                        }  py-6 px-4 space-y-6 sm:px-6 `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-black">
                                                Subtotal
                                            </dt>
                                            <dd className="text-sm font-medium text-black">
                                                
                                                {subtotal.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-black">
                                                Shipping
                                            </dt>
                                            <dd className="text-sm font-medium text-black">
                                                
                                                {shipping.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-black">
                                                Taxes
                                            </dt>
                                            <dd className="text-sm font-medium text-black">
                                                
                                                {taxes.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                        {appliedCoupon && (
                                            <div className="flex items-center justify-between">
                                                <dt className="text-sm text-black">
                                                    Coupon Discount{" "}
                                                    <span className="text-primary ml-3 font-semibold">
                                                        {`(${appliedCoupon?.code})`}
                                                    </span>
                                                </dt>{" "}
                                                <dd className="text-sm font-medium text-black">
                                                    
                                                    {discount.toFixed(2)} <span>TK</span>
                                                </dd>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between border-t border-[#0fb500] pt-6">
                                            <dt className="text-base font-medium  text-black">
                                                Total
                                            </dt>
                                            <dd className="text-base font-medium text-black">
                                                
                                                {total.toFixed(2)} <span>TK</span>
                                            </dd>
                                        </div>
                                    </div>
                                </div>

                                <div className=" py-6 px-4 sm:px-6">
                                    <button
                                        type="submit"
                                        className="relative h-12 w-full origin-top bg-[#21b500] rounded-lg border-2 border-[#12b500] text-white   uppercase font-bold px-3"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Display the coupon section if showCoupon is true */}
                {showCoupon && (
                    <div>
                        <div
                            className={`mt-12 flex gap-2 items-center justify-center text-primary font-bold text-3xl`}
                        >
                            <span>
                                <RiCoupon2Fill className="text-primary text-3xl" />
                            </span>
                            <span>Apply Coupon</span>
                        </div>

                        <div className="mx-auto max-w-xl">
                            <div className="p-6">
                                <form onSubmit={handleInput}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="coupon"
                                            className="block text-black font-semibold mb-2"
                                        >
                                            Coupon Code:
                                        </label>
                                        <input
                                            type="text"
                                            id="coupon"
                                            name="coupon"
                                            className="w-full px-4 py-2 border border-primary rounded-lg focus:ring focus:ring-primary outline-none text-black"
                                            placeholder="Enter your coupon code"
                                            value={inputCoupon}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-black hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
                                        >
                                            Apply Coupon
                                        </button>
                                    </div>
                                </form>

                                {isCouponVerified && (
                                    <div className="mt-4 text-green-500 text-center font-semibold">
                                        Coupon code applied successfully!
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            {isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {Array.from({ length: 2 }).map(
                                        (_, index) => (
                                            <div key={index}>
                                                <Loading />
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {allCoupons
                                        ?.filter(
                                            (singleCoupon: ICoupon) =>
                                                !userData?.userData?.customerCoupons?.some(
                                                    (customerCoupon: any) =>
                                                        customerCoupon.couponId ===
                                                        singleCoupon.id
                                                )
                                        )
                                        .map((singleCoupon: ICoupon) => {
                                            return (
                                                <div
                                                    key={singleCoupon?.id}
                                                    className="container border border-primary text-black p-5 rounded-lg shadow-lg max-w-md mx-auto"
                                                >
                                                    <div className="text-lg mb-4">
                                                        {singleCoupon?.discountStatus ===
                                                        "PERCENTAGE" ? (
                                                            <p>
                                                                Get{" "}
                                                                <span className="text-primary font-bold">
                                                                    <span>
                                                                        {
                                                                   singleCoupon.discountValue
                                                                        }
                                                                    </span>
                                                                    % OFF
                                                                </span>{" "}
                                                                your next
                                                                purchase!
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                Get{" "}
                                                                <span className="text-primary font-bold">
                                                                    
                                                                    {
                                                                        singleCoupon.discountValue
                                                                    } <span>
                                                                        TK
                                                                    </span>{" "}
                                                                    OFF
                                                                </span>{" "}
                                                                your next
                                                                purchase!
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-base mb-4">
                                                        Use coupon code:
                                                    </div>
                                                    <div className="bg-white text-gray-800 rounded-lg px-4 py-2">
                                                        <span className="text-2xl font-semibold">
                                                            {singleCoupon.code}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleCopy(
                                                                singleCoupon.code
                                                            )
                                                        }
                                                        className="bg-primary text-black px-3 py-1 rounded hover:bg-[#c4650a] focus:outline-none focus:ring-2 focus:ring-orange-600 mt-3"
                                                    >
                                                        {copiedCouponCode ===
                                                        singleCoupon.code
                                                            ? "Copied!"
                                                            : "Copy"}
                                                    </button>
                                                    <div className="text-sm mt-3">
                                                        <p>
                                                            Valid until{" "}
                                                            <span className="font-semibold">
                                                                {formatDate(
                                                                    new Date(
                                                                        singleCoupon.endDate
                                                                    ),
                                                                    "MMMM dd, yyyy"
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            *Terms and
                                                            conditions apply.
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
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
