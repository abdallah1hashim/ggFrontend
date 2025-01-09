import axios from "axios";
import { clearAuthStorage } from "../lib/utils";
import { redirect } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    // If the request is successful, just return the response
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || "";

    if (
      errorMessage.includes("No access token provided") ||
      errorMessage.includes("No cookies provided") ||
      errorMessage.includes("Token expired") ||
      errorMessage.includes("Unauthorized") ||
      // errorMessage.includes("Forbidden") ||
      errorMessage.includes("Token expired")
    ) {
      clearAuthStorage();
      redirect("/auth/login");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
