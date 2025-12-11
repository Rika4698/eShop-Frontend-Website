/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/redux/features/products/productApi";
import { ICategory } from "@/types/modal";
import { useRouter } from "next/navigation";

interface IFormInput {
  name: string;
  price: number;
  stockQuantity: number;
  discount: number;
  description: string;
  image: FileList | undefined;
  categoryId: string;
  flashSale: string; // radio return string ("true" / "false")
}

export default function CreateProductForm() {
  const router = useRouter();
  const { data: allCategories } = useGetAllCategoriesQuery(undefined);
  const [createProduct] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      price: 0,
      stockQuantity: 0,
      discount: 0,
      description: "",
      image: undefined,
      categoryId: "",
      flashSale: "false",
    },
  });

  const onSubmit = async (data: IFormInput) => {
    const loading = toast.loading("Creating product...");

    try {
      const productData = {
        name: data.name,
        price: Number(data.price),
        stockQuantity: Number(data.stockQuantity),
        discount: Number(data.discount),
        description: data.description,
        categoryId: data.categoryId,
        flashSale: data.flashSale === "true",
      };

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("data", JSON.stringify(productData));

      if (data.image) {
        Array.from(data.image).forEach((img) => {
          formDataToSubmit.append("image", img);
        });
      }

      await createProduct(formDataToSubmit).unwrap();

      toast.success("Product created successfully!");
      toast.dismiss(loading);
      router.push("/dashboard/vendor/manage-products");
    } catch (error: any) {
      toast.dismiss(loading);
      toast.error(error?.data?.message || "Error creating product!");
    }
  };

  return (
    <div className="mx-auto">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5">
          {/* Product Name */}
          <div>
            <label>Product Name</label>
            <Input
              type="text"
              placeholder="Enter product name"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Price</label>
              <Input
                type="number"
                placeholder="Enter price"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label>Stock Quantity</label>
              <Input
                type="number"
                placeholder="Enter stock quantity"
                {...register("stockQuantity", {
                  required: "Stock quantity is required",
                  min: 0,
                })}
              />
              {errors.stockQuantity && (
                <p className="text-red-500 text-sm">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label>Category</label>
            <Select {...register("categoryId", { required: "Category is required" })} onValueChange={(value) => setValue("categoryId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {allCategories?.map((category: ICategory) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.categoryId && (
              <p className="text-red-500 text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Flash Sale */}
          <div>
            <label>Flash Sale</label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="false"
                  {...register("flashSale")}
                />
                No
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="true"
                  {...register("flashSale")}
                />
                Yes
              </label>
            </div>
          </div>

          {/* Discount */}
          <div>
            <label>Discount (%)</label>
            <Input
              type="number"
              placeholder="Enter discount"
              {...register("discount", {
                required: "Discount is required",
                min: 0,
              })}
            />
            {errors.discount && (
              <p className="text-red-500 text-sm">{errors.discount.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label>Description</label>
            <Textarea
              placeholder="Enter product description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div >
            <label htmlFor="image" className="text-right font-medium">
              Images
            </label>

            <label
              htmlFor="image"
              className="col-span-3 flex items-center justify-between border rounded-md px-3 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium text-sm">
                {watch("image")?.length
                  ? `${watch("image")?.length} file(s) selected`
                  : "Upload files"}
              </span>

              <Input
                id="image"
                type="file"
                multiple
                className="hidden"
                {...register("image", {
                  required: "At least one image is required",
                })}
              />
            </label>

            {errors.image && (
              <p className="col-start-2 col-span-3 text-red-500 text-sm">
                {errors.image.message as string}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#638d24] hover:bg-[#426014]"
          >
            Create Product
          </Button>
        </form>
      </Card>
    </div>
  );
}
