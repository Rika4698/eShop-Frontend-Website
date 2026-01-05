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

/* ================= VALIDATION ================= */
const validationSchema = Yup.object({
  shopName: Yup.string()
    .required("Shop name is required")
    .min(3, "Shop name must be at least 3 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  logo: Yup.mixed().required("Shop logo is required"),
});

const ShopForm: React.FC<IProps> = ({ initialValues }) => {
  const [preview, setPreview] = useState<string | null>(
    initialValues?.logo || null
  );
  const [updateVendor] = useUpdateVendorMutation();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const toastId = toast.loading("Updating shop...");

    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          shopName: values.shopName,
          description: values.description,
        })
      );
      formData.append("image", values.logo);

      const res = await updateVendor(formData).unwrap();

      if (res.success) {
        toast.success("Shop updated successfully!", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Update Shop</CardTitle>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{
              shopName: initialValues?.shopName || "",
              description: initialValues?.description || "",
              logo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-4">
                {/* Shop Name */}
                <div className="space-y-2">
                  <Label>Shop Name *</Label>
                  <Field as={Input} name="shopName" />
                  <ErrorMessage
                    name="shopName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Field as={Textarea} name="description" />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Logo */}
                <div className="space-y-2">
                  <Label>Shop Logo *</Label>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setFieldValue("logo", file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />

                  <ErrorMessage
                    name="logo"
                    component="p"
                    className="text-red-500 text-sm"
                  />

                  {preview && (
                    <Image
                      src={preview}
                      alt="Logo preview"
                      width={120}
                      height={120}
                      className="rounded-md mt-2"
                    />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#33a730] hover:bg-[#1c8618]"
                >
                  {isSubmitting ? "Saving..." : "Update Shop"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopForm;
