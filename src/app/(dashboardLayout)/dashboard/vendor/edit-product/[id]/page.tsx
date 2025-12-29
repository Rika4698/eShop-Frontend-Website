"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/features/products/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

import { IProduct, ICategory } from "@/types/modal";

interface IFormInput {
  name: string;
  price: number;
  stockQuantity: number;
  discount: number;
  description: string;
  image: FileList | null;
  categoryId: string;

}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isFetching } = useGetSingleProductQuery(productId);
  const { data: allCategories } = useGetAllCategoriesQuery(undefined);
  const [updateProduct] = useUpdateProductMutation();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      price: 0,
      stockQuantity: 0,
      discount: 0,
      description: "",
      image: null,
      categoryId: "",
    
    },
  });

  const watchImages = watch("image");

  // Prefill form when product is fetched
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stockQuantity: product.stockQuantity,
        discount: product.discount,
        description: product.description,
        image: null,
        categoryId: product.categoryId,
       
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: IFormInput) => {
    if (!product) return;

    const { name, price, stockQuantity, discount, description, image, categoryId} = data;

    if (!name || !price || !stockQuantity || !description || !categoryId) {
      toast.error("All fields except images are required!");
      return;
    }

    const productData = {
      name,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      discount: Number(discount),
      description,
      categoryId,
     
    };

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("data", JSON.stringify(productData));

    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formDataToSubmit.append("image", img));
    }

    const loadingToast = toast.loading("Updating product...");
    try {
      await updateProduct({ productId, payload: formDataToSubmit }).unwrap();
      toast.success("Product updated successfully!");
      router.push("/dashboard/vendor/manage-products");
    } catch (error) {
      toast.error("Failed to update product!");
    }
    toast.dismiss(loadingToast);
  };

  if (isFetching) return <p>Loading...</p>;
  if (!product) return <p className="text-gray-200 text-base">Product not found!</p>;
 console.log(product,"update");

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5">
          {/* Product Name */}
          <div>
            <label>Product Name</label>
            <Input type="text" {...register("name", { required: "Product name is required" })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Price</label>
              <Input type="number" {...register("price", { required: true, min: 0 })} />
            </div>
            <div>
              <label>Stock Quantity</label>
              <Input type="number" {...register("stockQuantity", { required: true, min: 0 })} />
            </div>
          </div>

          {/* Category */}
          <div>
            <label>Category</label>
            <Select
              {...register("categoryId", { required: "Category is required" })}
              value={product?.categoryId}
              onValueChange={(value) => setValue("categoryId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories?.map((cat: ICategory) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
          </div>

              
        


          {/* Discount */}
          <div>
            <label>Discount (%)</label>
            <Input type="number" {...register("discount", { min: 0 })} />
          </div>

          {/* Description */}
          <div>
            <label>Description</label>
            <Textarea {...register("description")} />
          </div>

          {/* Images */}
         <div>
  <label htmlFor="image" className="text-right font-medium">
    Images
  </label>

  <label
    htmlFor="image"
    className="col-span-3 flex flex-col border rounded-md px-3 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
  >
   <span className="font-medium text-base mb-2">
      {watch("image") && watch("image")!.length > 0
        ? "Selected files:"
        : "Upload files"}
    </span>

    {/* List selected file names safely */}
    {watch("image") &&
      watch("image")!.length > 0 &&
      Array.from(watch("image")!).map((file: File, index: number) => (
        <span key={index} className="text-sm text-gray-700">
          {file.name}
        </span>
      ))}

    <Input
      id="image"
      type="file"
      multiple
      className="hidden"
      {...register("image")}
    />
  </label>

  {errors.image && (
    <p className="text-red-500 text-sm mt-1">
      {errors.image.message as string}
    </p>
  )}
</div>
          <Button type="submit" className="w-full bg-[#31a635] hover:bg-[#405d15]">
            Update Product
          </Button>
        </form>
      </Card>
    </div>
  );
}
