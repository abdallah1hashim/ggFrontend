import { CartItem } from "../types/cart";
import { cartItemEditSchemaT, cartItemSchemaT } from "../validators/Schemas";
import axiosInstance from "./axiosInstance";

export const getAllCartItems = async ({ userId }: { userId: number }) => {
  const response = await axiosInstance.get<{ cartItems: CartItem[] }>(
    `/shop/cart/${userId}`,
  );
  return response.data;
};

export const addCartItem = async (data: cartItemSchemaT) => {
  const response = await axiosInstance.post(`/shop/cart`, data);
  return response.data;
};

export const updateCartItem = async (data: cartItemEditSchemaT) => {
  const response = await axiosInstance.put(`/shop/cart/${data.id}`, data);
  return response.data;
};

export const removeCartItem = async (data: { id: number }) => {
  const response = await axiosInstance.delete(`/shop/cart/${data.id}`);
  return response.data;
};
