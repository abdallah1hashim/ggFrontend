import {
  ProductData,
  ProductUpdateData,
  ProductWithImagesAndDetails,
} from "../types/product";
import axiosInstance from "./axiosInstance";

export const getProducts = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  const response = await axiosInstance.get(
    `/shop/products?limit=${limit}&page=${page}`,
  );
  return response.data;
};
export const getProduct = async ({ id }: { id: number }) => {
  const response = await axiosInstance.get<{
    product: ProductWithImagesAndDetails;
  }>(`/shop/products/${id}`);
  return response.data;
};

export const createProduct = async (data: ProductData) => {
  const response = await axiosInstance.post("/shop/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await axiosInstance.delete(`/shop/products/${id}`);
  return response.data;
};

export const updateProduct = async (data: ProductUpdateData) => {
  const response = await axiosInstance.put(
    `/shop/products/${data.id as number}`,
    data,
  );
  return response.data;
};

export const updateProductImages = async (id: number, data: FormData) => {
  const response = await axiosInstance.put(`/shop/products/${id}/images`, data);
  return response.data;
};
