export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  overview_img_url: string | File | null;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
  bought_times?: number;
  category_name?: string;
}

export interface ProductImage {
  id?: number;
  product_id: number;
  image_url: string;
  is_primary?: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export type ProductDetails = {
  size: string;
  color: string;
  stock: number;
};

export type RetrievedProductDetails = {
  id: number;
  product_id: number;
  size: string;
  color: string;
  stock: number;
  img_preview: string;
};

export interface ProductFormValues {
  id?: number;
  name: string;
  description: string;
  category_id: number;
  group_id?: number;
  product_details: {
    size: string;
    color: string;
    discount: number;
    price: number;
    stock: number;
    img_preview?: File;
  }[];
  images?: FileList;
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
}

export interface ProductData
  extends Omit<ProductFormValues, "overview_img">,
    FormData {}
export interface ProductUpdateData extends Omit<ProductData, "images"> {}
