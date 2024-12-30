import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data;
};
export const createUser = async (data: any) => {
  const response = await axiosInstance.post("/api/users", data);
  return response.data;
};

export const editUser = async ({ id, data }: { id: number; data: any }) => {
  const response = await axiosInstance.put(`/api/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/api/users/${id}`);
  return response.data;
};
