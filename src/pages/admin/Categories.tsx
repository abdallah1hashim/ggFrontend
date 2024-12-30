import React from "react";
import { useQuery } from "react-query";
import type { Category } from "../../lib/types";
import { fetchCategories, deleteCategory } from "../../api/category";
import CategoryForm from "./components/CategoryForm";
import ManagementPage from "./components/ManagementPage";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Category Name" },
  { key: "parentId", label: "Parent Category" },
];

const Categories: React.FC = () => {
  const { data: categoriesData } = useQuery<{ categories: Category[] }>(
    ["categories"],
    fetchCategories,
  );

  const categoriesWithoutParent =
    categoriesData?.categories.filter((cat) => !cat.parentId) || [];

  return (
    <ManagementPage<Category & { id: number }>
      title="Categories"
      queryKey="categories"
      columns={columns}
      fetchData={fetchCategories}
      deleteData={deleteCategory}
      FormComponent={(props) => (
        <CategoryForm
          {...props}
          categoriesWithoutParent={categoriesWithoutParent}
        />
      )}
      dataKey="categories"
    />
  );
};

export default Categories;
