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
  
  import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
  import { ICategory } from "@/types/modal";
  
  interface IProps {
    category: ICategory;
  }
  
  const CategoryDelete: React.FC<IProps> = ({ category }) => {
    const [open, setOpen] = React.useState(false);
  
    const categoryId = category.id;
  console.log(categoryId);
  
    const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  
    const handleDelete = async () => {
      try {
        // Call the deleteCategory mutation
        const res = await deleteCategory(categoryId);
  
        // If the response has an error
        if (res.error) {
          toast.error("Something went wrong");
          setOpen(false);
          return;
        }
  
        // Success case
        toast.success("Category deleted successfully");
        setOpen(false);
      } catch (error) {
        toast.error("Something went wrong");
        setOpen(false);
      }
    };
  
    return (

        
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="center bg-red-600 hover:bg-red-700 text-white rounded-full w-[40px] h-[40px]">
            <Trash2 className="h-4 w-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the category <span className="text-red-500 font-bold">&quot;{trimText(category.name, 25)}&quot;</span> ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-3">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
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
              {isLoading && <FaSpinner className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CategoryDelete;
  