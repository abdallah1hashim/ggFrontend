import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "../../hooks/use-toast";
import { Product, ProductFormValues } from "../../types/product";
import ProductTable from "./components/ProductTable";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProducts, deleteProduct } from "../../api/products";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import ProductForm from "./components/ProductForm";
import { useProduct } from "../../contexts/ProductContext";

const Products: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    setIsDialogOpen,
    setSelectedProduct,
    setFormData,
    setValidationErrors,

    initialProductState,
  } = useProduct();
  const {
    data,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery<{ products: Product[] }, Error>(["products"], getProducts, {
    // Add retry logic
    retry: 2,
    // Add error handling
    onError: (error) => {
      toast({
        title: "Failed to Load Products",
        description:
          error.message || "Unable to fetch products. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("products");
      toast({
        title: "Product Deleted",
        description: response?.message || "Product successfully removed.",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Error",
        description:
          error.response?.data?.message || "Failed to delete product.",
        variant: "destructive",
      });
    },
  });
  // Handlers for adding and editing products
  const handleAddProduct = useCallback(() => {
    setSelectedProduct({ ...initialProductState });
    setValidationErrors({});
    setFormData(new FormData());
    setIsDialogOpen(true);
  }, []);

  const handleEditProduct = useCallback((product: ProductFormValues) => {
    setSelectedProduct({ ...product });
    setFormData(new FormData());
    setValidationErrors({});
    setIsDialogOpen(true);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {productsError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-primary text-primary-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Management</CardTitle>
            <Button onClick={handleAddProduct} aria-label="Add New Product">
              <Plus className="mr-2" /> Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isProductsLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductTable
              products={data?.products || []}
              isLoading={isProductsLoading}
              error={productsError}
              onEdit={handleEditProduct}
              onDelete={(id) => deleteProductMutation.mutate(id)}
            />
          )}
        </CardContent>
      </Card>
      <div className="overflow-auto">
        <ProductForm />
      </div>
    </div>
  );
};

export default Products;
/*
import { deleteProduct, getProducts } from "../../api/products";
import ManagementPage from "./components/ManagementPage";
import ProductForm from "./components/ProductForm";

const Columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category Name" },
];

const Products: React.FC = () => {
  return (
    <ManagementPage
      title="Products"
      queryKey="products"
      columns={Columns}
      fetchData={getProducts}
      deleteData={deleteProduct}
      FormComponent={ProductForm}
      dataKey="products"
    />
  );
};

export default Products;

*/
