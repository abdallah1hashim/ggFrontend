import { createContext, useContext, useEffect, useState } from "react";
import { UserPublicData } from "../types/user";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import { AnimatePresence } from "framer-motion";
import { clearAuthStorage } from "../lib/utils";
import { useMutation } from "react-query";
import { logoutRequest } from "../api/auth";
import { toast } from "../hooks/use-toast";

const environment = import.meta.env.VITE_ENVIROMENT;

type AuthContextType = {
  user: UserPublicData | null;
  setUser: React.Dispatch<React.SetStateAction<UserPublicData | null>>;
  logout: () => void;
  confirmedUser: UserPublicData | null;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserPublicData | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const { mutate: logoutMutation } = useMutation(logoutRequest, {
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
        type: "foreground",
        duration: 3000,
      });
      setUser(null);
      clearAuthStorage();
      window.location.href = "/";
    },
    onError: (error: any) => {
      if (environment === "development") {
        console.log(error.response.data.message);
      }
      toast({
        title: "Error",
        description: error.response.data.message,
        type: "background",
        duration: 3000,
      });
    },
  });

  const logout = () => {
    logoutMutation();
  };

  const confirmedUser =
    user || JSON.parse(localStorage.getItem("user") || "null");

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, confirmedUser, isLoggedIn }}
    >
      <AnimatePresence>
        {isInitializing && <FullScreenLoader />}
      </AnimatePresence>
      {!isInitializing && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
