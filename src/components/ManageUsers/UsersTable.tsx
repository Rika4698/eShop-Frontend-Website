import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SuspendUser from "./SuspendUser";
import DeleteUser from "./DeleteUser";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import { IUser } from "@/types/modal";
import { Button } from "../ui/button";
import { LucideMoreVertical, Trash2 } from "lucide-react";  
import { useState } from "react";


interface IProps {
  users: IUser[];
  isLoading: boolean;
  onDelete: (userId: string) => void;  // onDelete prop
}

const UsersTable: React.FC<IProps> = ({ users, isLoading, onDelete }) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null); 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); 

  const handleSuspendClick = (user: IUser) => {
    setSelectedUser(user); 
    setIsOpen(true); 
  };

  const handleDeleteClick = (userId: string) => {
    setDeleteUserId(userId);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return; // Ensure a user ID is set

    try {
      await onDelete(deleteUserId); // Call the delete handler with the user ID
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleteOpen(false); 
      setDeleteUserId(null); 
    }
  };

  return (
      <div>
      <Table>
        <TableHeader>
          <TableRow>
            
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>

              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>

              <TableCell>
                {user.status === "ACTIVE"
                  ? "Active"
                  : user.status === "DELETED"
                  ? "Deleted"
                  : "Suspended"}
              </TableCell>

              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => handleSuspendClick(user)}
                    variant="outline" title="Suspend"
                  >
                    <LucideMoreVertical className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => handleDeleteClick(user.id)}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {!isLoading && users.length === 0 && <NoTableDataFound span={7} />}
        </TableBody>
      </Table>

      {/* SuspendUser Modal */}
      {selectedUser && (
        <SuspendUser  user={selectedUser} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      {/* DeleteUser Modal */}
      {isDeleteOpen && deleteUserId && (
        <DeleteUser
          user={users.find((u) => u.id === deleteUserId)!}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </div>
  );
};

export default UsersTable;
