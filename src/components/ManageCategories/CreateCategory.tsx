
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
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";

import { Plus } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [formData, setFormData] = useState<{
    category: string;
    image: File | null; // Allow both File and null types
    label: string;
  }>({
    category: "",
    image: null,
    label: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] })); // Correctly update image as File
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateCategory = async () => {
    const { category, image, label } = formData;

    if (!category || !image) {
      toast.error("Please fill in all required fields (category and image)");
      return;
    }

    const loadingToast = toast.loading("Creating category...");
    try {
      const payload = new FormData();
      payload.append("image", image); // File field
      payload.append(
        "data",
        JSON.stringify({
          category,
          label,
        })
      );

      await createCategory(payload).unwrap();
      toast.success("Category created successfully!");
      setIsOpen(false);
      setFormData({ category: "", image: null, label: "" }); // Reset form
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating category!");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white bg-green-600 hover:bg-green-700 hover:text-white center gap-[5px]">
          Add Category
          <Plus className="w-[15px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Create a new category below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category Name
            </Label>
            <Input
              name="category"
              id="category"
              placeholder="Enter category name"
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label (Optional)
            </Label>
            <Input
              name="label"
              id="label"
              placeholder="Enter label (optional)"
              value={formData.label}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateCategory}
            className="center bg-[#0fb500] gap-[5px]"
          >
            Create
            <FaSpinner className="hidden" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
