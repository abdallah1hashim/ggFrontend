import { Group } from "../lib/types";
import axiosInstance from "./axiosInstance";

export const fettchGroups = async (): Promise<{ groups: Group[] }> => {
  const response = await axiosInstance.get("/shop/groups");
  return response.data;
};
