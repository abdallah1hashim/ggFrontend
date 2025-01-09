export interface CartItem {
  id: number;
  quantity: number;
  product_id: number;
  product_name: string;
  product_details_id: number;
  size: string;
  color: string;
  price: number;
  dicount: number;
  img_preview: string;
  in_stock: boolean;
}
