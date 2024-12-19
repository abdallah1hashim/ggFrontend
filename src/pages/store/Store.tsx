import { useState } from "react";
import { motion } from "framer-motion";

import { ShoppingCart, Heart, Badge } from "lucide-react";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

// Sample product data
const products = [
  {
    id: 1,
    name: "Sleek Minimalist Watch",
    price: 249.99,
    image: "/api/placeholder/400/400",
    category: "Accessories",
    description: "Elegant timepiece with modern design.",
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    image: "/api/placeholder/400/400",
    category: "Electronics",
    description: "Premium sound quality with active noise cancellation.",
  },
  {
    id: 3,
    name: "Leather Messenger Bag",
    price: 179.99,
    image: "/api/placeholder/400/400",
    category: "Accessories",
    description: "Handcrafted leather bag for professionals.",
  },
];

const ProductCard = ({ product }: { product: any }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Card className="mx-auto w-full max-w-xs overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover"
          />
        </motion.div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <Badge>{product.category}</Badge>
          </div>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">${product.price}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? "fill-current text-red-500" : "text-gray-500"}`}
              />
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="w-full" variant="default">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const StorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold">Modern Store</h1>
        <p className="text-gray-600">
          Discover our curated collection of premium products
        </p>
      </motion.header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StorePage;
