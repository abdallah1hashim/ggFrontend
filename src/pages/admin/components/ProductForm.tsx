import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FieldError, useForm, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";

import {
  initialProductState,
  useProduct,
} from "../../../contexts/ProductContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import FormField from "../../../components/ui/FormField";
import FormSelect from "../../../components/ui/FormSelect";
import { Button } from "../../../components/ui/button";

import { createProduct, updateProduct } from "../../../api/products";
import { ProductData, ProductFormValues } from "../../../types/product";
import { toast } from "../../../hooks/use-toast";
import ProductDetailRow from "./ProductDetailRow";
import { createAndEditProductSchema } from "../../../validators/createAndEditProductSchema";
import { FilePreview } from "../../../lib/types";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper";
import ProductCategorySelect from "./ProductCategorySelect";
import { fettchGroups } from "../../../api/groups";

const ProductForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [previews, setPreviews] = useState<FilePreview>({
    images: [],
    details: {},
  });
  const { selectedProduct, setIsDialogOpen, isDialogOpen } = useProduct();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    // resolver: zodResolver(createAndEditProductSchema),
    defaultValues: initialProductState,
    mode: "onChange",
  });

  const {
    data: groups,
    isLoading: isGroupsLoading,
    error: groupsError,
  } = useQuery("groups", fettchGroups);

  const groupOptions = groups?.groups?.map((group) => ({
    value: group.id.toString(),
    label: group.name,
  }));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_details",
  });

  const handleFileChange = (
    field: string,
    files: FileList | null,
    index?: number,
  ) => {
    if (!files?.length) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;

      // Create new FormData instance to avoid mutation issues
      const newFormData = new FormData();

      // Copy existing entries from old FormData
      for (const [key, value] of formData.entries()) {
        newFormData.append(key, value);
      }

      if (typeof index === "number") {
        // Handle variant image
        setValue(`product_details.${index}.img_preview`, file);
        newFormData.append(`product_details.${index}.img_preview`, file);

        setPreviews((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            [index]: result,
          },
        }));
      } else {
        // Handle main product images
        setValue("images", files);

        // Remove old image entries before adding new ones
        for (const [key] of formData.entries()) {
          if (key === "images") {
            newFormData.delete(key);
          }
        }

        Array.from(files).forEach((file) => {
          newFormData.append("images", file);
        });

        setPreviews((prev) => ({
          ...prev,
          images: Array.from(files).map((file) => URL.createObjectURL(file)),
        }));
      }

      setFormData(newFormData);
    };

    reader.readAsDataURL(file);
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      previews.images.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const createProductMutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast({
        title: "Success",
        description: "Product created successfully",
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

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      setIsDialogOpen(false);
    },
  });
  const onSubmit = async (data: ProductFormValues) => {
    const formDataToSend = new FormData();

    // Add basic fields
    formDataToSend.append("name", data.name);
    formDataToSend.append("description", data.description);
    formDataToSend.append("category_id", data.category_id.toString());
    formDataToSend.append("group_id", data.group_id?.toString() || "");

    // Add product details without img_preview
    const productDetailsWithoutImgPreviews = data.product_details.map(
      (detail, index) => {
        const { img_preview, ...rest } = detail;
        if (img_preview) {
          formDataToSend.append(`img_preview[${index}]`, img_preview); // Attach img_preview
        }
        return rest;
      },
    );

    // Add product details (without img_preview)
    formDataToSend.append(
      "product_details",
      JSON.stringify(productDetailsWithoutImgPreviews),
    );

    // Add images
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formDataToSend.append("images", file);
      });
    }
    if (selectedProduct?.id) {
      updateProductMutation.mutate(formDataToSend as ProductData);
    } else {
      createProductMutation.mutate(formDataToSend as ProductData);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="overflow-auto bg-primary-800 text-primary-50 sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct?.id ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the product details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormFieldWrapper>
              <FormField
                id="name"
                label="Product Name"
                {...register("name")}
                error={errors.name}
              />
            </FormFieldWrapper>
            <ProductCategorySelect register={register} errors={errors} />

            <FormFieldWrapper>
              <FormSelect
                id="group"
                label="Group"
                options={groupOptions ? groupOptions : []}
                error={errors.group_id}
                disabled={isGroupsLoading}
                {...register("group_id")}
              />
            </FormFieldWrapper>
            <FormFieldWrapper className="col-span-2">
              <FormField
                id="description"
                label="Description"
                {...register("description")}
                error={errors.description}
              />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-2">
              <FormField
                className="file:text-green-500 hover:file:text-green-600"
                id="images"
                type="file"
                accept="image/*"
                multiple
                label="Product Images"
                onChange={(e) => handleFileChange("images", e.target.files)}
                error={errors.images}
              >
                {previews.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-5 gap-4">
                    {previews.images.map((preview, idx) => (
                      <img
                        key={idx}
                        src={preview}
                        alt={`Preview ${idx}`}
                        className="h-24 w-full rounded object-cover"
                      />
                    ))}
                  </div>
                )}
              </FormField>
            </FormFieldWrapper>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <ProductDetailRow
                key={field.id}
                index={index}
                register={register}
                onRemoveDetail={remove}
                // @ts-ignore
                errors={errors}
                handleFileChange={handleFileChange}
                previews={previews}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() =>
                append({
                  size: "",
                  color: "",
                  price: 0,
                  discount: 0,
                  stock: 0,
                })
              }
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Variant
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {selectedProduct?.id ? "Update" : "Create"} Product
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
