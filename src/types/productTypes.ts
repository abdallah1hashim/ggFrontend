export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  overview_img_url: string | null;
  category_id?: number;
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
