import { createContext, useContext, useState } from "react";
import { ProductFormValues } from "../types/product";
export const initialProductState: ProductFormValues = {
  id: undefined,
  name: "",
  description: "",
  category_id: 0,
  group_id: 0,
  product_details: [
    {
      size: "",
      color: "",
      discount: 0,
      price: 0,
      stock: 0,
      img_preview: undefined,
    },
  ],
  images: undefined,
};
type ProductContextType = {
  selectedProduct: ProductFormValues;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductFormValues>>;
  formData: FormData | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  validationErrors: Record<string, string>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  initialProductState: ProductFormValues;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormValues>(initialProductState);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        formData,
        setFormData,
        isDialogOpen,
        setIsDialogOpen,
        validationErrors,
        setValidationErrors,
        initialProductState,
        imagePreview,
        setImagePreview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
export { ProductProvider, useProduct };
