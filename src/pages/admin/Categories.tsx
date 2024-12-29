import React, { useCallback, useState } from "react";
import PageTable from "./components/PageTable";
import { Category } from "../../lib/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteCategory, fetchCategories } from "../../api/category";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle, Loader2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import CategoryForm from "./components/CategoryForm";

const cols = [
  { key: "id", label: "ID" },
  { key: "name", label: "Category Name" },
  { key: "parentId", label: "Parent ID" },
];

const Categories: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const queryClient = useQueryClient();
  // fetch categories
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useQuery<{ categories: (Category & { id: number })[] }, Error>(
    ["categories"],
    fetchCategories,
  );
  const categoriesWithoutParent =
    categoriesData?.categories.filter((category) => !category.parentId) || [];

  const deleteCategoryMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });

  const handleEdit = useCallback((category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  }, []);

  const handleDeleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id);
  };
  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      {categoriesError && !isCategoriesLoading && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load Categories. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-primary text-primary-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Category Management 🫡</CardTitle>
            <Button onClick={handleAddCategory} aria-label="Add New Category">
              <Plus className="mr-2" /> Add New Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isCategoriesLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <p>Loading Categories...</p>
            </div>
          ) : (
            <PageTable
              rows={categoriesData?.categories || []}
              columns={cols}
              onEdit={handleEdit}
              onDeleteRow={handleDeleteCategory}
            />
          )}
        </CardContent>
      </Card>
      <div>
        <CategoryForm
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoriesWithoutParent={categoriesWithoutParent}
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
        />
      </div>
    </div>
  );
};

export default Categories;
