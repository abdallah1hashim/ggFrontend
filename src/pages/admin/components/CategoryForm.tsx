import { useMutation, useQueryClient } from "react-query";
import { addCategory, editCategory } from "../../../api/category";
import { toast } from "../../../hooks/use-toast";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Category } from "../../../lib/types";
import { useState } from "react";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper";
import FormField from "../../../components/ui/FormField";
import FormSelect from "../../../components/ui/FormSelect";

interface CategoryFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesWithoutParent: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  categoriesWithoutParent,
  selectedCategory,
  setSelectedCategory,
}) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // map categories without parent to options for select
  const categoriesOptions = categoriesWithoutParent.map((category) => ({
    value: category.id ?? 0,
    label: category.name,
  }));

  const UpdateCategoryMutation = useMutation(editCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });
  const createCategoryMutation = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // validate form data before submitting
    const errors: Record<string, string> = {};
    if (!selectedCategory?.name) errors.name = "Name is required";
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    if (selectedCategory?.id) {
      UpdateCategoryMutation.mutate({
        id: selectedCategory.id,
        data: selectedCategory,
      });
      return;
    }
    createCategoryMutation.mutate(selectedCategory);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="overflow-auto bg-primary-800 text-primary-50 sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            {selectedCategory?.id ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            Fill in the this form to {selectedCategory?.id ? "edit" : "create"}{" "}
            a {selectedCategory?.id ? "Category" : "new Category"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormFieldWrapper>
              <FormField
                id="name"
                name="name"
                type="text"
                label="Category Name"
                placeholder="Enter category name"
                value={selectedCategory?.name || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.name}
                </p>
              )}
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormSelect
                id="parent"
                options={categoriesOptions}
                label="Root Category"
                value={selectedCategory?.parentId}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    parentId: Number(e.target.value),
                    name: selectedCategory?.name || "",
                  })
                }
              />
              {validationErrors.parentId && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.parentId}
                </p>
              )}
            </FormFieldWrapper>
            <div className="col-span-2 flex justify-end gap-4">
              <Button
                type="button"
                className="text-red-500"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Create Category
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
