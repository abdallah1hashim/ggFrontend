import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { fetchCategories } from "../../../api/category";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Category,
  Product,
  ProductData,
  ProductUpdateData,
} from "../../../types/product";
import { Loader2 } from "lucide-react";
import { useProduct } from "../../../contexts/ProductContext";
import { createProduct, updateProduct } from "../../../api/products";
import { toast } from "../../../hooks/use-toast";

const ProductForm: React.FC = ({}) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading: isCategoriesLoading,
  } = useQuery<{ categories: Category[] }>(["categories"], fetchCategories, {
    // Add retry logic
    retry: 2,
    onError: (err) => {
      console.error("Failed to fetch categories", err);
    },
  });
  const {
    setSelectedProduct,
    setFormData,
    isDialogOpen,
    setIsDialogOpen,
    selectedProduct,
    validationErrors,
    imagePreview,
    setImagePreview,
    setValidationErrors,
    formData,
  } = useProduct();

  const handleInputChange = useCallback(
    (field: keyof Product, value: string | number | File) => {
      // Handle regular input changes
      if (field !== "overview_img_url") {
        setSelectedProduct((prev) => ({
          ...prev,
          [field]: value,
        }));
      }

      // Special handling for file input
      if (field === "overview_img_url" && value instanceof File) {
        // Update selected product with file name or path
        setSelectedProduct((prev) => ({
          ...prev,
          overview_img_url: value.name,
        }));

        // Create FormData for file upload
        const newFormData = new FormData();
        newFormData.append("overview_img_url", value);
        setFormData(newFormData);

        // Create image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(value);
      }
    },
    [setSelectedProduct, setFormData],
  );

  const validateProduct = useCallback((product: Product): boolean => {
    const errors: Record<string, string> = {};

    if (!product.name?.trim()) errors.name = "Product name is required";
    if (product.price <= 0) errors.price = "Price must be positive";
    if (product.stock < 0) errors.stock = "Stock cannot be negative";
    if (!product.category_id) errors.category_id = "Category is required";
    if (!product.overview_img_url)
      errors.overview_img_url = "Image is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  const createProductMutation = useMutation(createProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("products");
      toast({
        title: "Product Created",
        description: response?.message || "Product successfully added.",
        variant: "default",
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Creation Error",
        description:
          error.response?.data?.message || "Failed to create product.",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("products");
      toast({
        title: "Product Updated",
        description: response?.message || "Product successfully updated.",
        variant: "default",
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Update Error",
        description:
          error.response?.data?.message || "Failed to update product.",
        variant: "destructive",
      });
    },
  });

  const handleSaveProduct = useCallback(() => {
    // Validate before submission
    if (!validateProduct(selectedProduct)) return;

    // Prepare form data
    const formDataToSend = new FormData();
    Object.entries(selectedProduct).forEach(([key, value]) => {
      if (value !== undefined) {
        formDataToSend.append(key, value as string | Blob);
      }
    });

    // Add file if exists
    if (formData && formData.get("overview_img_url")) {
      formDataToSend.append(
        "overview_img_url",
        formData.get("overview_img_url") || "",
      );
    }

    // Mutate based on whether it's a new or existing product
    if (selectedProduct.id) {
      updateProductMutation.mutate(formDataToSend as ProductUpdateData);
    } else {
      createProductMutation.mutate(formDataToSend as ProductData);
    }
  }, [
    selectedProduct,
    formData,
    validateProduct,
    updateProductMutation,
    createProductMutation,
  ]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct?.id ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {selectedProduct?.id
              ? "Update the details of an existing product"
              : "Create a new product for your catalog"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={selectedProduct.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              aria-invalid={!!validationErrors.name}
              aria-describedby="name-error"
            />
            {validationErrors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={selectedProduct.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                handleInputChange("price", parseFloat(e.target.value))
              }
              aria-invalid={!!validationErrors.price}
              aria-describedby="price-error"
            />
            {validationErrors.price && (
              <p id="price-error" className="mt-1 text-sm text-red-500">
                {validationErrors.price}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={selectedProduct.stock}
              onChange={(e) =>
                handleInputChange("stock", parseInt(e.target.value))
              }
              aria-invalid={!!validationErrors.stock}
              aria-describedby="stock-error"
            />
            {validationErrors.stock && (
              <p id="stock-error" className="mt-1 text-sm text-red-500">
                {validationErrors.stock}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            {isCategoriesLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Loading categories...</span>
              </div>
            ) : error ? (
              <p className="text-red-500">Failed to load categories</p>
            ) : (
              <select
                id="category"
                className="w-full rounded border p-2"
                value={selectedProduct.category_id}
                onChange={(e) =>
                  handleInputChange("category_id", parseInt(e.target.value))
                }
                aria-invalid={!!validationErrors.category_id}
                aria-describedby="category-error"
              >
                <option value="">Select Category</option>
                {data?.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            {validationErrors.category_id && (
              <p id="category-error" className="mt-1 text-sm text-red-500">
                {validationErrors.category_id}
              </p>
            )}
          </div>

          {/* Overview Image */}
          <div>
            <Label htmlFor="overview_img_url">Overview Image</Label>
            <Input
              id="overview_img_url"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleInputChange("overview_img_url", file);
              }}
              aria-invalid={!!validationErrors.overview_img_url}
              aria-describedby="image-error"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-h-32 rounded object-cover"
              />
            )}
            {validationErrors.overview_img_url && (
              <p
                id="image-error
                                "
                className="mt-1 text-sm text-red-500"
              >
                {validationErrors.overview_img_url}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveProduct}
            disabled={
              isCategoriesLoading || Object.keys(validationErrors).length > 0
            }
          >
            {selectedProduct?.id ? "Save Changes" : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
