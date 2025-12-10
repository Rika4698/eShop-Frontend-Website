import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateUserStatusMutation } from "@/redux/features/users/userApi";
import { IUser, UserStatus } from "@/types/modal";

import { useState } from "react";

interface IProps {
  user: IUser | null;  // Nullable user prop
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;  // Expecting a boolean to toggle modal
  isOpen: boolean;  // Boolean state for modal visibility
}

const SuspendUser: React.FC<IProps> = ({ user, setIsOpen, isOpen }) => {
  console.log(user?.email, "User in modal");

  const [updateUserStatus, { isLoading, error }] = useUpdateUserStatusMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSuspend = async () => {
    setErrorMessage(null); // Clear any previous error messages
    try {
      if (user) {
        // Call mutation to update user status to BLOCKED
        await updateUserStatus({ userId: user.id, status: UserStatus.BLOCKED }).unwrap();
        setIsOpen(false); // Close the dialog after successful suspension
      }
    } catch (err) {
      console.error("Error suspending user:", err);
      setErrorMessage("An error occurred while suspending the user. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Suspension</DialogTitle>
          <DialogDescription>
            Are you sure you want to suspend this user: <span className="font-bold text-green-800">{user?.email}</span> ?
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className="center gap-[6px]"
            onClick={handleSuspend}
            disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? "Suspending..." : "Suspend"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuspendUser;
