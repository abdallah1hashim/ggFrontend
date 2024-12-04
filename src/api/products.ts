import axiosInstance from "./axiosInstance";

export const getProducts = async () => {
  const response = await axiosInstance.get("/shop/products");
  return response.data;
};
