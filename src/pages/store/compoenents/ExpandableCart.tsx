import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { ArrowLeft, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Separator } from "@radix-ui/react-separator";

import React from "react";
import { CartItem as CartItemT } from "../../../types/cart";
import { useCartContext } from "../../../contexts/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

const CartItem = ({ item }: { item: CartItemT }) => {
  const { deleteCartMutation, updateQuantity, isUpdating, isDeleting } =
    useCartContext();
  return (
    <div className="flex gap-4 py-4">
      <div className="aspect-square h-24 overflow-hidden rounded-md">
        <img
          src={API_URL + item.img_preview}
          alt={item.product_name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.product_name}</h3>
            <p className="text-sm text-gray-500">Size: {item.size}</p>
          </div>
          <Button
            onClick={() => deleteCartMutation({ id: item.id })}
            className="text-gray-500 hover:text-gray-700"
            disabled={isDeleting}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded border">
            <Button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-gray-100"
              disabled={item.quantity <= 1 || isUpdating}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4">{item.quantity}</span>
            <Button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={isUpdating}
              className="p-1 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-medium">{item.price * item.quantity} EGP</p>
        </div>
      </div>
    </div>
  );
};

export const ExpandableCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems, subtotal, SHIPPING, total } = useCartContext();
  if (cartItems.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
          </SheetHeader>
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-12">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
              <h2 className="text-2xl font-medium">Your cart is empty</h2>
              <p className="text-gray-500">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <div className="flex h-full flex-col">
            <ScrollArea className="-mx-6 my-4 flex-1 px-6">
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <CartItem item={item} />
                  <Separator />
                </React.Fragment>
              ))}
            </ScrollArea>

            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{subtotal} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{SHIPPING} EGP</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{total} EGP</span>
                </div>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-gray-500">Add items to your cart to checkout</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ExpandableCart;
