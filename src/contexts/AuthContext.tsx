import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserPublicData } from "../types/user";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import { AnimatePresence } from "framer-motion";

type AuthContextType = {
  tokens: { accessToken: string; refreshToken: string } | null;
  setTokens: React.Dispatch<
    React.SetStateAction<{ accessToken: string; refreshToken: string } | null>
  >;
  user: UserPublicData | null;
  setUser: React.Dispatch<React.SetStateAction<UserPublicData | null>>;
  logout: () => void;
  confirmedUser: UserPublicData | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<{
    accessToken: string;
    refreshToken: string;
  } | null>(null);
  const [user, setUser] = useState<UserPublicData | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    if (tokens) {
      localStorage.setItem("access_token", tokens.accessToken);
      localStorage.setItem("refresh_token", tokens.refreshToken);
      const decodedToken = jwtDecode(tokens.accessToken);
      localStorage.setItem("user", JSON.stringify(decodedToken));
    }
  }, [tokens]);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        // minimum loading time to show the loader
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch (error) {
        console.error("Authentication initialization error:", error);
        localStorage.clear();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  const confirmedUser =
    user ||
    (localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : null);

  return (
    <AuthContext.Provider
      value={{ tokens, setTokens, user, setUser, logout, confirmedUser }}
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
