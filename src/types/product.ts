export interface ProductWithImagesAndDetails {
  id: number;
  name: string;
  description: string;
  category_id: number;
  category: string;
  details: ProductDetails[];
  images: {
    id: number;
    image_url: string;
  }[];
  groups: {
    id: number;
    name: string;
  }[];
}

export interface ProductImage {
  id?: number;
  product_id: number;
  image_url: string;
}

export interface Category {
  id: number;
  name: string;
}

export type ProductDetails = {
  id: number;
  size: string;
  color: string;
  stock: number;
  price: number;
  discount: number;
  img_preview: string;
};

export type RetrievedProducts = {
  id: number;
  category_id: number;
  category_name: string;
  description: string;
  name: string;
  overview_img: string;
  created_at: string;
  update_at: string;
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

export interface ProductData
  extends Omit<ProductFormValues, "overview_img">,
    FormData {}
export interface ProductUpdateData extends Omit<ProductData, "images"> {}
