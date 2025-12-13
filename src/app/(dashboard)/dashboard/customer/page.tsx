/* eslint-disable prefer-const */
"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserDetails from "@/hooks/useUser";
import { useUpdateCustomerMutation } from "@/redux/features/users/userApi";
import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsPhone } from "react-icons/bs";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { FaUser, FaFacebook, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import { toast } from "sonner";

interface FormValues {
    name: string;
    email: string;
    address: string;
    phone: string;
    image?: FileList;
}

const CustomerProfile = () => {
    const { userData, isLoading } = useUserDetails();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updateCustomer] = useUpdateCustomerMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    if (isLoading) {
        return <Loading />;
    }

    const {
        image,
        name,
        role,
        email,
        address = "N/A",
        phone = "N/A",
    } = userData?.userData || {};

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        toast.loading("Updating Profile...");

        try {
            const formData = new FormData();
            
            let hasChanges = false;

            // Append fields directly to FormData 
            if (data.name && data.name.trim()) {
                formData.append("name", data.name.trim());
                hasChanges = true;
            }
            if (data.address && data.address.trim()) {
                formData.append("address", data.address.trim());
                hasChanges = true;
            }
            if (data.phone && data.phone.trim()) {
                formData.append("phone", data.phone.trim());
                hasChanges = true;
            }

            // Append image file if selected (OPTIONAL)
            if (data.image && data.image.length > 0) {
                const imageFile = data.image[0];
                formData.append("image", imageFile);
                hasChanges = true;
                console.log("Image file selected:", imageFile.name, imageFile.size, imageFile.type);
            } else {
                console.log("No image selected ");
            }

            // Check if there's anything to update
            if (!hasChanges) {
                toast.dismiss();
                toast.info("No changes to update");
                return;
            }

            //  Log FormData contents
            console.log("Sending update with fields:");
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`);
                } else {
                    console.log(`  ${key}: ${value}`);
                }
            }

            const res = await updateCustomer(formData).unwrap();
            
            if (res.success) {
                toast.dismiss();
                toast.success("Profile updated successfully!");
                setIsDialogOpen(false);
                // Reset form
                reset();
            }
        } catch (error: unknown) {
            toast.dismiss();
            const typedError = error as { data?: { message?: string }; message?: string };
            const errorMessage = 
                typedError?.data?.message || 
                typedError?.message || 
                "Failed to update profile";
            toast.error(errorMessage);
            console.error("Profile update error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Cover Background */}
                    <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-r from-green-400 to-green-600"></div>
                    
                    {/* Profile Content */}
                    <div className="px-4 sm:px-6 md:px-8 pb-8">
                        {/* Profile Image */}
                        <div className="flex justify-center -mt-16 sm:-mt-20 md:-mt-24">
                            <div className="relative">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 sm:border-6 border-white shadow-2xl overflow-hidden bg-gray-100">
                                    {image ? (
                                        <Image
                                            width={192}
                                            height={192}
                                            src={image}
                                            alt={name || "Customer"}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-green-100">
                                            <FaUser className="text-green-600 text-5xl sm:text-6xl md:text-7xl" />
                                        </div>
                                    )}
                                </div>
                                {/* Online Status Indicator */}
                                <div className="absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white"></div>
                            </div>
                        </div>

                        {/* Name and Role */}
                        <div className="text-center mt-4 sm:mt-6">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 break-words px-2">
                                {name || "Customer Name"}
                            </h1>
                            <div className="inline-block mt-2 sm:mt-3 px-4 py-1.5 sm:px-6 sm:py-2 bg-green-100 rounded-full">
                                <p className="text-sm sm:text-base font-semibold text-green-700 uppercase tracking-wide">
                                    {role || "Customer"}
                                </p>
                            </div>
                        </div>

                        {/* Contact Information Grid */}
                        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                            {/* Email */}
                            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <MdEmail className="text-green-600 text-xl sm:text-2xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Email Address</p>
                                    <p className="text-sm sm:text-base text-gray-800 font-medium break-all">
                                        {email || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <BsPhone className="text-blue-600 text-xl sm:text-2xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Phone Number</p>
                                    <p className="text-sm sm:text-base text-gray-800 font-medium break-all">
                                        {phone || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Address - Full Width */}
                            <div className="md:col-span-2 flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <MdOutlineLocationOn className="text-purple-600 text-xl sm:text-2xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Address</p>
                                    <p className="text-sm sm:text-base text-gray-800 font-medium break-words">
                                        {address || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Update Profile Button */}
                        <div className="flex justify-center mt-6 sm:mt-8">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base">
                                        Update Profile
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-lg sm:text-xl">Update Profile</DialogTitle>
                                    </DialogHeader>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-4 sm:space-y-5"
                                        encType="multipart/form-data"
                                    >
                                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                                            💡 <strong>Tip:</strong> You can update any field individually. All fields are optional.
                                        </div>

                                        <div>
                                            <Label htmlFor="name" className="text-sm sm:text-base">
                                                Name <span className="text-gray-400 text-xs">(Optional)</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder={name || "Enter your name"}
                                                {...register("name")}
                                                className="mt-1"
                                            />
                                            {errors.name && (
                                                <p className="text-xs sm:text-sm text-red-500 mt-1">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="address" className="text-sm sm:text-base">
                                                Address <span className="text-gray-400 text-xs">(Optional)</span>
                                            </Label>
                                            <Input
                                                id="address"
                                                type="text"
                                                placeholder={address || "Enter your address"}
                                                {...register("address")}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="phone" className="text-sm sm:text-base">
                                                Phone <span className="text-gray-400 text-xs">(Optional)</span>
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder={phone || "Enter your phone"}
                                                {...register("phone")}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="image" className="text-sm sm:text-base">
                                                Profile Image <span className="text-gray-400 text-xs">(Optional)</span>
                                            </Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                {...register("image")}
                                                className="mt-1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Max file size: 5MB. Supported: JPG, PNG, GIF, WebP
                                            </p>
                                        </div>

                                        <Button 
                                            type="submit" 
                                            className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base"
                                        >
                                            Save Changes
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
                            <p className="text-center text-xs sm:text-sm text-gray-500 mb-4">Connect with me</p>
                            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                                {[
                                    { icon: FaFacebook, color: "hover:bg-blue-600", label: "Facebook" },
                                    { icon: FaTwitter, color: "hover:bg-sky-500", label: "Twitter" },
                                    { icon: FaGithub, color: "hover:bg-gray-800", label: "GitHub" },
                                    { icon: FaInstagram, color: "hover:bg-pink-600", label: "Instagram" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110`}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="text-lg sm:text-xl" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;