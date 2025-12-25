/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/modal";

import { Pen } from "lucide-react";

import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface IProps {
  category: ICategory;
}

const EditCategory: React.FC<IProps> = ({ category }) => {


  const [isOpen, setIsOpen] = useState(false);
  const [updateCategory, { isSuccess, isError, error, isLoading }] = useUpdateCategoryMutation();
  const [formData, setFormData] = useState<{
    category: string;
    image: File | null;
  }>({
    category: category.label || "",
    image: null,
  });
  const id = category.id
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateCategory = async () => {
    const { category, image } = formData;

    if (!category || !image) {
      toast.error("Please fill in all required fields (label and image)");
      return;
    }

    // Preparing FormData
    const payload = new FormData();
    payload.append("category", category);
    if (image) {
      payload.append("image", image); 
    }

    try {
   
      await updateCategory({ categoryId: id, formData: payload }).unwrap();
      toast.success("Category updated successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error updating category!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="center gap-[5px]">
          <Pen className="w-[15px]" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update the category details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right w-32 -ml-12 md:-ml-6">
              Category Name
            </Label>
            <Input
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>


         <div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="image" className="text-right">
    Image
  </Label>

 
  <label
    htmlFor="image"
    className="col-span-3 flex items-center justify-between border rounded-md px-3 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
  >
    <span className="font-medium text-sm">{formData.image ? formData.image.name : "Upload a file"}</span>
    <Input
      name="image"
      id="image"
      type="file"
      onChange={handleInputChange}
      className="hidden"
    />
  </label>
</div>

        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCategory}
            className="center gap-[5px] bg-green-600 hover:bg-green-800"
            disabled={isLoading} 
          >
            Save Changes
            {isLoading && <FaSpinner className="animate-spin" />} {/* Show spinner if loading */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
