import { Group } from "../lib/types";
import axiosInstance from "./axiosInstance";

export const fetchGroups = async (): Promise<{
  groups: (Group & { id: number })[];
}> => {
  const response = await axiosInstance.get("/shop/groups");
  return response.data;
};

export const deleteGroup = async (id: number) => {
  const response = await axiosInstance.delete(`/shop/groups/${id}`);
  return response.data;
};

export const addGroup = async (data: any) => {
  const response = await axiosInstance.post("/shop/groups", data);
  return response.data;
};

export const editGroup = async ({ id, data }: { id: number; data: any }) => {
  const response = await axiosInstance.put(`/shop/groups/${id}`, data);
  return response.data;
};

export const fetchGroup = async (id: number) => {
  const response = await axiosInstance.get(`/shop/groups/${id}`);
  return response.data;
};
