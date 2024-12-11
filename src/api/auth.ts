import axiosInstance from "./axiosInstance";

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const refreshToken = async (data: { refresh_token: string }) => {
  const response = await axiosInstance.post("/auth/refresh-token", data);
  return response.data;
};
