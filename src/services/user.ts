import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
  const response = await axiosInstance.get("/auth/users");
  return response.data;
};
export const createUser = async (data: any) => {
  const response = await axiosInstance.post("/auth/users", data);
  return response.data;
};

export const editUser = async ({ id, data }: { id: number; data: any }) => {
  const response = await axiosInstance.put(`/auth/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/auth/users/${id}`);
  return response.data;
};
