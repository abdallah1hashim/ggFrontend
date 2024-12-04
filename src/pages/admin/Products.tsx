import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Plus } from "lucide-react";

import { Product, ProductImage, Category } from "../../types/productTypes";
import ProductTable from "./ui/ProductTable";
import ProductImageUploader from "./ui/ProductImageUploader";
import { useQuery, useQueryClient } from "react-query";
import { getProducts } from "../../api/products";

const Products: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(["products"], getProducts);
  console.log(data);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  const handleAddProduct = () => {
    setSelectedProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      overview_img_url: null,
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!selectedProduct) return;

    if (selectedProduct.id) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? selectedProduct : p,
        ),
      );
    } else {
      // Add new product
      const newProduct = {
        ...selectedProduct,
        id: products.length + 1,
      };
      setProducts([...products, newProduct]);
    }

    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Management</CardTitle>
            <Button onClick={handleAddProduct}>
              <Plus className="mr-2" /> Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={data && data.products}
            isLoading={isLoading}
            error={error}
            categories={categories}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct?.id ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {/* Product Details Column */}
            <div>
              <div className="grid gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={selectedProduct?.name || ""}
                    onChange={(e) =>
                      setSelectedProduct((prev) =>
                        prev ? { ...prev, name: e.target.value } : null,
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={selectedProduct?.description || ""}
                    onChange={(e) =>
                      setSelectedProduct((prev) =>
                        prev ? { ...prev, description: e.target.value } : null,
                      )
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={selectedProduct?.price || 0}
                      onChange={(e) =>
                        setSelectedProduct((prev) =>
                          prev
                            ? { ...prev, price: Number(e.target.value) }
                            : null,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      value={selectedProduct?.stock || 0}
                      onChange={(e) =>
                        setSelectedProduct((prev) =>
                          prev
                            ? { ...prev, stock: Number(e.target.value) }
                            : null,
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={String(selectedProduct?.category_id)}
                    onValueChange={(value) =>
                      setSelectedProduct((prev) =>
                        prev ? { ...prev, category_id: Number(value) } : null,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Product Images Column */}
            <div>
              <ProductImageUploader
                productId={selectedProduct?.id}
                onImagesUpdate={(images) => setProductImages(images)}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>Save Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
