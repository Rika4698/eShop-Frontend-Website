/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDuplicateProductMutation } from "@/redux/features/products/productApi";

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";
const DuplicateProduct = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false);
  const [duplicate, { isLoading }] = useDuplicateProductMutation()

  const handleDuplicate = async () => {
    try {
      await duplicate(productId).unwrap();
      

      toast.success("Product duplicated successfully");
      setOpen(false);
    } catch (error) {toast.error("Something went wrong");}
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Duplicate" className="w-[40px] h-[40px] bg-[#7fad39] text-white rounded-full center hover:bg-main">
          <FaRegCopy />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[555px]">
        <DialogHeader>
          <DialogTitle>Duplicate Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to create a copy of this product ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#80b500] text-white"
            onClick={handleDuplicate}
            disabled={isLoading}
          >
            {isLoading ? "Duplicating..." : "Confirm Duplication"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateProduct;
