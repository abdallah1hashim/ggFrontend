import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCartItem,
  getAllCartItems,
  removeCartItem,
  updateCartItem,
} from "../services/cart";
import { toast, useToast } from "../hooks/use-toast";

import { AnimatePresence } from "framer-motion";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import { CartItem } from "../types/cart";

interface CartContextType {
  cartItems: CartItem[];
  addCartMutation: (data: any) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  deleteCartMutation: (data: any) => void;
  cartFetchError: any;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  subtotal: number;
  SHIPPING: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const SHIPPING = 10;
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isInitializing,
    error: cartFetchError,
  } = useQuery("cart", getAllCartItems);
  // create mutation
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
  // update mutation
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
  // delete mutation
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
        isAdding,
        isUpdating,
        isDeleting,
        subtotal,
        SHIPPING,
        total,
      }}
    >
      <AnimatePresence>
        {isInitializing && <FullScreenLoader />}
      </AnimatePresence>
      {!isInitializing && children}
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
