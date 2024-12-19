import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const TOKEN_KEYS = {
  USER: "user",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clearAuthStorage = () => {
  Object.values(TOKEN_KEYS).forEach((key) => localStorage.removeItem(key));
};
