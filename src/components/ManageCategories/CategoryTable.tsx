import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditCategory from "./EditCategory";
import { ICategory } from "@/types/modal";
import Image from "next/image";
import CategoryDelete from "./CategoryDelete";

interface IProps {
  categories: ICategory[];
}

const CategoryTable: React.FC<IProps> = ({ categories }) => {

  const activeCategories = categories.filter((category) => !category.isDeleted);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activeCategories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>
              <Image width={80} height={20} src={category.image} alt={category.name} />
            </TableCell>
             <TableCell className="font-medium">{category.label || "No label"}</TableCell>
            <TableCell className="flex gap-5">
              <div className="flex space-x-2">
                <EditCategory category={category} />
              </div>
              <div className="flex space-x-2">
                <CategoryDelete category={category} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
