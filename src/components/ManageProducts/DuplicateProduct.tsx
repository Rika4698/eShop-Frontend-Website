/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useDuplicateProductMutation } from "@/redux/features/products/productApi";
import { Copy } from "lucide-react";
import React from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface IProps {
  productId: string;
}

const DuplicateProduct: React.FC<IProps> = ({ productId }) => {
  const [duplicateProduct, { isLoading }] = useDuplicateProductMutation();

  const handleDuplicate = async () => {
    try {
      const result = await duplicateProduct(productId).unwrap();
      toast.success("Product duplicated successfully");
    } catch (error: any) {
      console.error("Duplicate error:", error || "Same duplicate product");
      toast.error(error?.data?.message || "Failed to duplicate product");
    }
  };

  return (
    <Button
      onClick={handleDuplicate}
      disabled={isLoading}
      title="Duplicate"
      className="center bg-blue-600 hover:bg-blue-700 text-white rounded-full w-[40px] h-[40px] p-0"
    >
      {isLoading ? (
        <FaSpinner className="animate-spin h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};

export default DuplicateProduct;