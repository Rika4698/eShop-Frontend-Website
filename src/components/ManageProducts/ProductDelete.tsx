/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { trimText } from "@/utils/trimText";
import { Trash2 } from "lucide-react";
import React from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useDeleteProductMutation } from "@/redux/features/products/productApi";

interface IProps {
  productId: string;
  productName: string;
}

const ProductDelete: React.FC<IProps> = ({ productId, productName }) => {
  const [open, setOpen] = React.useState(false);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation()



  const handleDelete = async () => {

    try {
     await deleteProduct(productId).unwrap();

      toast.success("Product deleted successfully");
      setOpen(false);
      
    } catch (error) {
      toast.error("Something went wrong");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Delete" className="center bg-red-600 hover:bg-red-700 text-white rounded-full w-[40px] h-[40px]">
          <Trash2 className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the product &quot;
            {trimText(productName, 25)}
            &quot;? This action cannot be undone.
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
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="center gap-[10px]"
          >
            Delete
            {isLoading ? <FaSpinner className="animate-spin" /> : null}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDelete;
