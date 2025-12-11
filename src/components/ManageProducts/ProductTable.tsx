"use client"
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICategory, IProduct } from "@/types/modal";
import { trimText } from "@/utils/trimText";
import Link from "next/link";
import ProductDelete from "./ProductDelete";
import DuplicateProduct from "./DuplicateProduct";
import NoTableDataFound from "../uiElements/NoTableDataFound";


interface IProps {
  products: IProduct[];
  categories: ICategory[];
  isLoading: boolean;
}

const ProductTable: React.FC<IProps> = ({ products,categories, isLoading }) => {
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (product: IProduct) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };
   const getCategoryName = (id: string) => {
    const cat = categories?.find((c) => c.id === id);
    return cat ? cat.name : "No category";
  };

if (isLoading) return <p>Loading...</p>;
  
  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Stock Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <p className="line-clamp-2">{trimText(product.name, 70)}</p>
                </TableCell>
                <TableCell>{product.price.toFixed(2)} TK</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>{getCategoryName(product.categoryId)}</TableCell>
               

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-[10px]">
                    <Link
                      href={`/dashboard/vendor/edit-product/${product.id}`}
                      title="Update"
                      onClick={() => handleEditClick(product)}
                      className="w-[40px] h-[40px] bg-[#16d120] text-white rounded-full center hover:bg-[#1a7e1f]"
                    >
                      <MdEdit />
                    </Link>
                    <ProductDelete
                      productId={product.id}
                      productName={product.name}
                    />
                    <DuplicateProduct productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {!isLoading && products.length === 0 && (
              <NoTableDataFound span={5} />
            )}
          </TableBody>
        </Table>
      </CardContent>
    
    </Card>
  );
};

export default ProductTable;
