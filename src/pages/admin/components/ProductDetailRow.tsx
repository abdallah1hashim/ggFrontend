import { Minus } from "lucide-react";
import { FieldError, UseFormRegister } from "react-hook-form";
import FormField from "../../../components/ui/FormField";
import FormSelect from "../../../components/ui/FormSelect";
import { ProductFormValues } from "../../../types/product";
import { FilePreview } from "../../../lib/types";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper";
import { Separator } from "../../../components/ui/separator";

interface ProductDetailRowProps {
  index: number;
  register: UseFormRegister<ProductFormValues>;
  onRemoveDetail: (index: number) => void;
  errors: Record<string, FieldError> | undefined;
  handleFileChange: (
    field: string,
    files: FileList | null,
    index: number,
  ) => void;
  previews: FilePreview;
}

const sizeOptions = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "2XL" },
  { value: "XXXL", label: "3XL" },
  { value: "XXXXL", label: "4XL" },
  { value: "XXXXXL", label: "5XL" },
];

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
];

const ProductDetailRow = ({
  index,
  register,
  onRemoveDetail,
  errors,
  handleFileChange,
  previews,
}: ProductDetailRowProps) => (
  <>
    <Separator />
    <div className="col-span-2 grid grid-cols-6 items-start gap-4">
      <FormFieldWrapper className="col-span-3">
        <FormSelect
          id={`size-${index}`}
          label="Size"
          options={sizeOptions}
          error={errors?.[`product_details.${index}.size`]}
          {...register(`product_details.${index}.size`, {
            required: "Size is required.",
          })}
        />
      </FormFieldWrapper>
      <FormFieldWrapper className="col-span-3">
        <FormSelect
          id={`color-${index}`}
          label="Color"
          options={colorOptions}
          error={errors?.[`product_details.${index}.color`]}
          {...register(`product_details.${index}.color`, {
            required: "Color is required.",
          })}
        />
      </FormFieldWrapper>
      <FormFieldWrapper className="col-span-2">
        <FormField
          id={`price-${index}`}
          label="Price"
          error={errors?.[`product_details.${index}.price`]}
          {...register(`product_details.${index}.price`, {
            required: "Price is required.",
            valueAsNumber: true,
            min: 0,
          })}
        />
      </FormFieldWrapper>
      <FormFieldWrapper className="col-span-2">
        <FormField
          id={`discount-${index}`}
          label="Discount"
          error={errors?.[`product_details.${index}.discount`]}
          {...register(`product_details.${index}.discount`, {
            required: "Discount is required.",
            valueAsNumber: true,
            min: 0,
            max: 100,
          })}
        />
      </FormFieldWrapper>
      <FormFieldWrapper className="col-span-2">
        <FormField
          id={`stock-${index}`}
          label="Stock"
          error={errors?.[`product_details.${index}.stock`]}
          {...register(`product_details.${index}.stock`, {
            required: "Stock is required.",
            valueAsNumber: true,
            min: 0,
          })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper className="col-span-3">
        <FormField
          id={`image-${index}`}
          type="file"
          accept="image/*"
          label="Image Preview"
          className="w-full file:text-green-500 hover:file:text-green-600"
          onChange={(e) =>
            handleFileChange("img_preview", e.target.files, index)
          }
          error={errors?.[`product_details.${index}.img_preview`]}
        >
          {previews && previews.details[index] && (
            <div className="h-28 w-16">
              <img
                src={previews.details[index]}
                alt={`Preview ${index}`}
                className="h-24 w-full rounded object-cover"
              />
            </div>
          )}
        </FormField>
      </FormFieldWrapper>
      <div className="col-span-3 ml-auto flex h-full items-center justify-center">
        {index > 0 && (
          <button
            type="button"
            className="mt-2 flex items-center justify-center gap-4 p-2 text-red-500 transition-colors hover:text-red-600"
            onClick={() => onRemoveDetail(index)}
          >
            Remove Detail <Minus className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
    {index !== 0 && <Separator />}
  </>
);

export default ProductDetailRow;
