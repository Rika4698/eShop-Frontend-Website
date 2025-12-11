/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUserMutation } from "@/redux/features/users/userApi";
import { IUser } from "@/types/modal";
import { toast } from "sonner";

interface IProps {
  user: IUser;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const DeleteUser: React.FC<IProps> = ({ user, isOpen, setIsOpen }) => {
  const [deleteUser, { isLoading, error }] = useDeleteUserMutation();


  const handleConfirmDelete = async () => {
    try {
      await deleteUser(user.id).unwrap(); // Perform delete action

      // Show success toast
       toast.success(`${user.email} has been deleted successfully!`, { duration: 3000 });

      setIsOpen(false); // Close modal
    } catch (err: any) {
      console.error("Error deleting user:", err);

      // Show error toast
      toast.error(err?.data?.message || "Failed to delete user.");
    
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the user <strong className="font-bold text-red-500">{user.email}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
        {error && (
          <p className="text-red-500 mt-2">
            Failed to delete user. Please try again.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
