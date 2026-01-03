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
  onDelete: (userId: string) => void;  
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

  // console.log(users)
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

              <TableCell className="whitespace-nowrap">{user.email}</TableCell>
              <TableCell className="whitespace-nowrap">{user.role}</TableCell>

              <TableCell className="whitespace-nowrap">
                {user.status === "ACTIVE"
                  ? "Active"
                  : user.status === "DELETED"
                  ? "Deleted"
                  : "Suspended"}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-2">
                  {user.status !== "BLOCKED" && (
                   <Button
    onClick={() => handleSuspendClick(user)}
    variant="outline"
    title="Suspend"
  >
    <LucideMoreVertical className="w-4 h-4" />
  </Button>
          )}
               {( (user.customer?.orders?.length || 0) === 0 &&
      (user.customer?.following?.length || 0) === 0 &&
      (user.vendor?.products?.length || 0) === 0 &&
      (user.vendor?.followers?.length || 0) === 0) && 
                  <Button
                    onClick={() => handleDeleteClick(user.id)}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>}

                  {user.status === "BLOCKED" && 
      ((user.customer?.orders?.length || 0) > 0 ||
        (user.customer?.following?.length || 0) > 0 ||
        (user.vendor?.products?.length || 0) > 0 ||
        (user.vendor?.followers?.length || 0) > 0)? 
                    <h2 className="text-gray-500">No Action</h2>:""
                  }

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
