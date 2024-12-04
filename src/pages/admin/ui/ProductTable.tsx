import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Edit, Trash2, PackageX } from "lucide-react";
import { Product, Category } from "../../../types/productTypes";
import { motion } from "framer-motion";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error?: any;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  categories,
  isLoading,
  error,
  onEdit,
  onDelete,
}) => {
  const getCategoryName = (categoryId?: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  const loadingAnimation = {
    initial: { opacity: 0.6, backgroundColor: "#f3f4f6" },
    animate: {
      opacity: [0.6, 1, 0.6],
      backgroundColor: ["#f3f4f6", "#e5e7eb", "#f3f4f6"],
    },
    transition: {
      duration: 1.5,
      type: "easeInOut",
      repeat: Infinity,
    },
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <motion.td
              {...loadingAnimation}
              colSpan={6}
              className="py-4 text-center"
            >
              Loading products...
            </motion.td>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell className="text-center" colSpan={6}>
              <div className="flex items-center justify-center space-x-2 text-red-500">
                <PackageX className="h-6 w-6" />
                <span>Error: {error.message}</span>
              </div>
            </TableCell>
          </TableRow>
        ) : products.length === 0 ? (
          <TableRow>
            <TableCell className="text-center text-gray-500" colSpan={6}>
              No products found
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow
              key={product.id}
              className="transition-colors hover:bg-gray-50"
            >
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <span
                  className={` ${
                    product.stock <= 10
                      ? "text-red-500"
                      : product.stock <= 25
                        ? "text-yellow-500"
                        : "text-green-500"
                  } `}
                >
                  {product.stock}
                </span>
              </TableCell>
              <TableCell>{getCategoryName(product.category_id)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(product)}
                  className="mr-1"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => product.id && onDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
