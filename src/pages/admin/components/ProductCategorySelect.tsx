import { useQuery } from "react-query";
import { fetchNestedCategories } from "../../../services/category";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper";
import FormSelect from "../../../components/ui/FormSelect";
import { Category } from "../../../lib/types";
import { useEffect, useState } from "react";

function ProductCategorySelect({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) {
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    number | null
  >(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery<{
    categories: Category[];
  }>(["categories"], fetchNestedCategories);

  const mainCategoryOptions =
    categoriesData?.categories.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  useEffect(() => {
    if (selectedMainCategory && categoriesData) {
      const selectedCategory = categoriesData.categories.find(
        (category) => category.id === selectedMainCategory,
      );

      const childCategories = selectedCategory?.children || [];
      const options = childCategories.map((category) => ({
        value: category.id,
        label: category.name,
      }));

      setSubCategoryOptions(options);
    } else {
      setSubCategoryOptions([]);
    }
  }, [selectedMainCategory, categoriesData]);

  return (
    <>
      <FormFieldWrapper>
        <FormSelect
          id="mainCategory"
          label="Main Category"
          options={mainCategoryOptions}
          isLoading={isCategoriesLoading}
          value={selectedMainCategory || ""}
          onChange={(e) => setSelectedMainCategory(Number(e.target.value))}
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <FormSelect
          id="subCategory"
          label="Sub Category"
          options={subCategoryOptions}
          isLoading={isCategoriesLoading}
          {...register("category_id")}
          error={errors.category_id}
        />
      </FormFieldWrapper>
    </>
  );
}

export default ProductCategorySelect;
