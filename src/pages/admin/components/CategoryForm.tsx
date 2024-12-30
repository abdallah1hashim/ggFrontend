import React from "react";
import { Category } from "../../../lib/types";
import { addCategory, editCategory } from "../../../api/category";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper";
import FormField from "../../../components/ui/FormField";
import FormSelect from "../../../components/ui/FormSelect";
import { BaseDialogForm } from "./BaseDialogForm";
import { z } from "zod";

interface CategoryFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  categoriesWithoutParent: Category[];
  selectedItem: Category | null;
}

const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  parentId: z.number().nullable().optional(),
});

const CategoryForm: React.FC<CategoryFormProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  categoriesWithoutParent,
  selectedItem,
}) => {
  const categoriesOptions = categoriesWithoutParent.map((category) => ({
    value: category.id ?? 0,
    label: category.name,
  }));

  return (
    <BaseDialogForm
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      selectedItem={selectedItem}
      title="Category"
      queryKey="categories"
      schema={categorySchema}
      createMutation={addCategory}
      updateMutation={editCategory}
    >
      {({ values, errors, handleChange }) => (
        <div className="grid grid-cols-2 gap-4">
          <FormFieldWrapper>
            <FormField
              id="name"
              name="name"
              type="text"
              label="Category Name"
              placeholder="Enter category name"
              value={values.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper>
            <FormSelect
              id="parent"
              options={categoriesOptions}
              label="Root Category"
              value={values.parentId ?? ""}
              onChange={(e) => handleChange("parentId", Number(e.target.value))}
            />
            {errors.parentId && (
              <p className="mt-1 text-sm text-red-500">{errors.parentId}</p>
            )}
          </FormFieldWrapper>
        </div>
      )}
    </BaseDialogForm>
  );
};

export default CategoryForm;
