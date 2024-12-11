export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  overview_img_url: string | File | null;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
  bought_times?: number;
  category_name?: string;
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
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

export interface ProductData extends ProductWithImages, FormData {}
export interface ProductUpdateData extends Omit<ProductData, "images"> {}
