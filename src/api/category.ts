import axiosInstance from "./axiosInstance";

export const fetchNestedCategories = async () => {
  const response = await axiosInstance.get("/shop/categories?isnested=true");
  return response.data;
};
export const fetchCategories = async () => {
  const response = await axiosInstance.get("/shop/categories");
  return response.data;
};

export const addCategory = async (data: any) => {
  const response = await axiosInstance.post("/shop/categories", data);
  return response.data;
};

export const editCategory = async ({ id, data }: { id: number; data: any }) => {
  const response = await axiosInstance.put(`/shop/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await axiosInstance.delete(`/shop/categories/${id}`);
  return response.data;
};
