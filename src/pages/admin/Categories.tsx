import React, { useState } from "react";
import TableHeader from "./ui/TableHeader";
import PageTable from "./ui/PageTable";
import { Category } from "../../lib/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
} from "../../api/category";

const fields = [
  { key: "name", label: "Category Name", placeholder: "Enter category name" },
  { key: "parentId", label: "Parent ID", placeholder: "Enter parent ID" },
];

const cols = [
  { key: "id", label: "ID" },
  { key: "name", label: "Category Name" },
  { key: "parentId", label: "Parent ID" },
];

const Categories: React.FC = () => {
  const queryClient = useQueryClient();
  // fetch categories
  const { data, error, isLoading } = useQuery(["categories"], fetchCategories);
  // add categories
  const addCategoryMutation = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
  // edit categories
  const editCategoryMutation = useMutation(editCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });

  const deleteCategoryMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({});

  const handleAddCategory = () => {
    if (newCategory.name) {
      addCategoryMutation.mutate({
        ...newCategory,
      });
      setNewCategory({ name: "", parentId: null });
    }
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      editCategoryMutation.mutate({
        id: editingCategory.id,
        data: {
          name: editingCategory.name,
          parentId: editingCategory.parentId,
        },
      });
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id);
  };

  if (isLoading === true || data.categories === null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching categories</div>;
  }

  return (
    <div className="space-y-4">
      <TableHeader
        title="Categories"
        fields={fields}
        newRow={newCategory}
        setNewRow={setNewCategory}
        onAddRow={handleAddCategory}
        buttonLabel="Add Category"
      />
      <PageTable
        fields={fields}
        rows={data.categories}
        columns={cols}
        editingRow={editingCategory}
        setEditingRow={setEditingCategory}
        onDeleteRow={handleDeleteCategory}
        onUpdateRow={handleUpdateCategory}
      />
    </div>
  );
};

export default Categories;
