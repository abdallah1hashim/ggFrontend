import { useQuery } from "react-query";
import { getProduct } from "../../services/products";
import { useSearchParamsHandler } from "../../hooks/useSearchParamsHandler";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import StoreError from "./compoenents/StoreError";
import ProductSkeleton from "./compoenents/ProductSkeleton";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useCartContext } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function Product() {
  const { searchParams, handleParams } = useSearchParamsHandler();
  const { productId } = useParams();
  const size = searchParams.get("size") || "M";
  const color = searchParams.get("color") || "black";
  const quantity = Number(searchParams.get("quantity")) || 1;
  const currentImageIndex = Number(searchParams.get("currentImageIndex")) || 1;

  const { data, isLoading, error } = useQuery("products", () =>
    getProduct({ id: Number(productId) }),
  );
  const { addCartMutation, isAdding } = useCartContext();
  const { user } = useAuth();
  if (isLoading) return <ProductSkeleton />;

  if (error || data === undefined || data.product === undefined)
    return <StoreError message="Product not found" />;

  const mainImage =
    data?.product?.images?.[currentImageIndex] ||
    data?.product?.images?.[0] ||
    null;

  const addToCart = () => {
    addCartMutation({
      userId: user?.id as number,
      productId: data.product.id,
      productDetailsId: data.product.details[0].id,
      quantity: quantity,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Thumbnail Navigation */}
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          {data.product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleParams("currentImageIndex", idx)}
              className={`relative aspect-[3/4] overflow-hidden rounded-md ${
                currentImageIndex === idx ? "ring-2 ring-blue-600" : ""
              }`}
            >
              <img
                src={API_URL + img.image_url}
                alt={`Product thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="col-span-6">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <img
            src={API_URL + mainImage?.image_url || ""}
            alt={`Product view ${currentImageIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="col-span-5 space-y-6">
        <div>
          <div>
            {data.product.groups.map((group) => (
              <Badge key={group.id} className="bg-indigo-500">
                {group.name}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold">{data.product.name}</h1>
          <p className="mt-2 text-2xl font-semibold">
            ${data.product.details[0].price}
          </p>
        </div>

        <p className="text-gray-600">{data.product.description}</p>

        {/* Color Selection */}
        <div className="space-y-2">
          <p className="font-medium">Color</p>
          <div className="flex gap-2">
            {data.product.details.map((detail) => (
              <button
                key={detail.color}
                className="h-8 w-8 rounded-full ring-2 ring-transparent ring-offset-2 hover:ring-gray-300 focus:ring-gray-400"
                style={{ backgroundColor: detail.color }}
                title={detail.color}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <p className="font-medium">Size</p>
          <div className="flex gap-2">
            {data.product.details.map((detail) => (
              <button
                key={size}
                onClick={() => handleParams("size", detail.size)}
                className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                  size === detail.size
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border">
            <button
              onClick={() => {
                if (quantity > 1) {
                  handleParams("quantity", quantity - 1);
                }
              }}
              className="px-4 py-2 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button
              onClick={() => {
                if (quantity < 10) {
                  handleParams("quantity", quantity + 1);
                }
              }}
              className="px-4 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <Button className="flex-1" onClick={addToCart} disabled={isAdding}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button variant="outline">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Information Tabs */}
        <Tabs defaultValue="details" className="mt-8">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">
              Details
            </TabsTrigger>
            <TabsTrigger value="care" className="flex-1">
              Care Instructions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li>100% Organic Cotton</li>
                  <li>Regular fit</li>
                  <li>Ribbed cuffs and hem</li>
                  <li>Machine washable</li>
                  <li>Made in Egypt</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="care" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li>Machine wash at 30°C</li>
                  <li>Do not tumble dry</li>
                  <li>Iron on medium heat</li>
                  <li>Do not dry clean</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default Product;
