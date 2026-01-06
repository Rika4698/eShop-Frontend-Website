/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/self-closing-comp */
"use client";
import { forgotPassword } from "@/utils/loginService";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CheckEmail from "./CheckEmail";


const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  setIsLoading(true);
  const toastId = toast.loading("Sending reset email...");

  const response = await forgotPassword({ email: value });

  toast.dismiss(toastId);
  setIsLoading(false);

  if (!response.success) {
    toast.error(response.message);
    return;
  }

  setIsSent(true);
  toast.success("Please check email inbox or spam!", {
    duration: 6000,
  });
  
  };

  if(isSent){
    return(
        <section className="bg-gray-100 h-screen flex items-center justify-center">
            <CheckEmail setIsSent={setIsSent}/>

        </section>
    )
  }

  return (
    <section className="bg-gray-100 h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center items-center mb-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
          />
        </Link>
      </div>

      <h1 className="text-2xl text-center font-bold text-black mb-2">
        Forgot your password?
      </h1>
     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            value={value}
            type="email"
            placeholder="Enter your email..."
            variant="bordered"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "primary"}
            errorMessage=""
            onValueChange={setValue}
            size="lg"
            required
            className="border rounded-lg"
          />
           {isInvalid && (
    <p className="text-red-500 text-sm ml-1">
      Please enter a valid email
    </p>
  )}
        </div>
        <button
          type="submit"
           disabled={isLoading}
  className={`w-full py-3 rounded-lg text-lg font-semibold text-white
    ${isLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#269f34] hover:bg-green-700 focus:ring-4 focus:ring-green-300"}
  `}>
         {isLoading ? "Sending..." : "Reset Password"}
        </button>
      </form>
    </div>
  </section>
  );
};

export default ForgotPassword;