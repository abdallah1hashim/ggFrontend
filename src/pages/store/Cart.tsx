import { Button } from "../../components/ui/button";
import { ShoppingCart, X, Plus, Minus, ArrowLeft } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useCartContext } from "../../contexts/CartContext";
import { CartItem as CartItemT } from "../../types/cart";

const API_URL = import.meta.env.VITE_API_URL;

const CartItem = ({ item }: { item: CartItemT }) => {
  const { deleteCartMutation, updateQuantity, isUpdating, isDeleting } =
    useCartContext();
  return (
    <div className="flex flex-col gap-4 py-6 sm:flex-row">
      <div className="aspect-square h-32 overflow-hidden rounded-md sm:h-40">
        <img
          src={API_URL + item.img_preview}
          alt={item.product_name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">{item.product_name}</h3>
            <p className="text-sm text-gray-500">Color: {item.color}</p>
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
          <p className="text-lg font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, subtotal, SHIPPING, total } = useCartContext();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Shopping Cart ({cartItems.length})
          </h1>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="divide-y">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6 flex gap-2">
                  <Input placeholder="Enter coupon code" />
                  <Button variant="outline">Apply</Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{subtotal} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{SHIPPING} EGP</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{tax} EGP</span>
                  </div> */}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{total} EGP</span>
                  </div>
                </div>

                <Button className="mt-6 w-full">Proceed to Checkout</Button>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Shipping calculated at checkout</p>
                  <p>Tax calculated based on delivery address</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
