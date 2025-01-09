import { createContext, useContext, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  addCartItem,
  getAllCartItems,
  removeCartItem,
  updateCartItem,
} from "../services/cart";
import { toast, useToast } from "../hooks/use-toast";

import { AnimatePresence } from "framer-motion";
import { CartItem } from "../types/cart";
import { useAuth } from "./AuthContext";
import { cartItemSchemaT } from "../validators/Schemas";

interface CartContextType {
  cartItems: CartItem[];
  addCartMutation: (data: cartItemSchemaT) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  deleteCartMutation: (data: any) => void;
  cartFetchError: any;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<
      {
        cartItems: CartItem[];
      },
      Error
    >
  >;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  subtotal: number;
  SHIPPING: number;
  total: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const SHIPPING = 10;
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const {
    data,
    isLoading: isInitializing,
    error: cartFetchError,
    refetch,
  } = useQuery<{ cartItems: CartItem[] }, Error>("cart", () =>
    getAllCartItems({ userId: user?.id as number }),
  );

  // Create mutation for adding cart item
  const { mutate: addCartMutation, isLoading: isAdding } = useMutation(
    "cart",
    addCartItem,
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Item added to cart",
        });
        queryClient.invalidateQueries("cart");
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.response.data.message,
        });
      },
    },
  );

  // Create mutation for updating cart item
  const { mutate: updateCartMutation, isLoading: isUpdating } = useMutation(
    "cart",
    updateCartItem,
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Item updated in cart",
        });
        queryClient.invalidateQueries("cart");
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.response.data.message,
        });
      },
    },
  );

  // Create mutation for deleting cart item
  const { mutate: deleteCartMutation, isLoading: isDeleting } = useMutation(
    "cart",
    removeCartItem,
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Item removed from cart",
        });
        queryClient.invalidateQueries("cart");
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.response.data.message,
        });
      },
    },
  );

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity >= 10) {
      useToast().toast({
        title: "Error",
        description: "Quantity must be between 1 and 9",
      });
      return;
    }
    updateCartMutation({ id: itemId, quantity: newQuantity });
  };

  const subtotal =
    data?.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ) || 0;
  const total = subtotal ? subtotal + SHIPPING : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems: data?.cartItems as CartItem[],
        addCartMutation,
        updateQuantity,
        deleteCartMutation,
        cartFetchError,
        refetch,
        isLoading: isInitializing,
        isAdding,
        isUpdating,
        isDeleting,
        subtotal,
        SHIPPING,
        total,
        isOpen,
        setIsOpen,
      }}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCartContext };
