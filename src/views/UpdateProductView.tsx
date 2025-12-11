"use client";
import { useForm } from "react-hook-form";
import { IProduct, ICategory } from "@/types/modal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface IProps {
  product: IProduct;
  categories?: ICategory[];
  onSubmit: (data: IProduct) => void;
}

export default function UpdateProductView({ product, categories = [], onSubmit }: IProps) {
  const [flashSale, setFlashSale] = useState(product.flashSale || false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IProduct>({
    defaultValues: product,
  });

  const watchImages = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label>Product Name</label>
        <Input {...register("name", { required: "Name required" })} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Price */}
      <div>
        <label>Price</label>
        <Input type="number" {...register("price", { required: true, min: 0 })} />
      </div>

      {/* Stock */}
      <div>
        <label>Stock Quantity</label>
        <Input type="number" {...register("stockQuantity", { required: true, min: 0 })} />
      </div>

      {/* Category */}
      <div>
        <label>Category</label>
        <Select
          value={product.categoryId}
          onValueChange={(value) => setValue("categoryId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Flash Sale */}
      <div>
        <label>Flash Sale</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              checked={!flashSale}
              onChange={() => { setFlashSale(false); setValue("flashSale", false); }}
            /> No
          </label>
          <label>
            <input
              type="radio"
              checked={flashSale}
              onChange={() => { setFlashSale(true); setValue("flashSale", true); }}
            /> Yes
          </label>
        </div>
      </div>

      {/* Discount */}
      <div>
        <label>Discount</label>
        <Input type="number" {...register("discount", { min: 0 })} />
      </div>

      {/* Description */}
      <div>
        <label>Description</label>
        <Textarea {...register("description")} />
      </div>

      {/* Images */}
      <div>
        <label>Images</label>
        <Input type="file" multiple {...register("image")} />
        {watchImages && "length" in watchImages && watchImages.length > 0 && (
          <p>{watchImages.length} file(s) selected</p>
        )}
      </div>

      <Button type="submit">Update Product</Button>
    </form>
  );
}
