import axiosInstance from "./axiosInstance";

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
export const logoutRequest = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
