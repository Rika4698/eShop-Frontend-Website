/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Textarea } from "../ui/textarea";
import { useUpdateVendorMutation } from "@/redux/features/users/userApi";

interface IProps {
  initialValues?: {
    shopName?: string;
    description?: string;
    logo?: string;
  };
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Shop name is required")
    .min(3, "Shop name must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

const ShopForm: React.FC<IProps> = ({ initialValues }) => {
  const [logo, setLogo] = useState<{ url?: string; file?: File }>({
    url: initialValues?.logo,
    file: undefined,
  });
  const [updateCustomer] = useUpdateVendorMutation();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Handle image upload if provided
    if (logo.file) {
      formData.append("image", logo.file);
    }
    console.log("Form Data: ", formData);

    toast.loading("Updating Profile...");

    try {
      const res = await updateCustomer(formData).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile.");
    } finally {
      toast.dismiss();
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo({ url, file });
    }
  };

  return (
    <div className="mx-auto p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>{initialValues ? "Update Shop" : "Create Shop"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: initialValues?.shopName || "",
              description: initialValues?.description || "",
              logo: "", // You can leave this empty or handle initial value for logo
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Shop Name</Label>
                <Field
                  name="name"
                  id="name"
                  as={Input}
                  placeholder="Enter your shop name"
                  className="input"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Field
                  name="description"
                  id="description"
                  as={Textarea}
                  placeholder="Describe your shop"
                  className="textarea"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  onChange={handleLogoChange}
                  accept="image/*"
                  
                />
                {logo.url && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Logo Preview</h3>
                    <Image
                      src={logo.url}
                      alt="Shop Logo Preview"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    
                  </div>



                  
                )}
              </div>
              <Button type="submit" className="w-full bg-[#7fad39] hover:bg-black">
                {initialValues ? "Update Shop" : "Create Shop"}
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopForm;
