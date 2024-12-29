import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const StoreCard: React.FC<{ product: any }> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link to={`/store/${product.category}/${product.id}`}>
      <motion.div className="relative text-primary-50">
        <Card className="mx-auto w-full max-w-xs overflow-hidden rounded-none border-none p-[0px]">
          <CardContent className="relative p-[0px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-primary-600"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 mx-auto mb-3 mt-auto flex h-fit w-fit items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="w-full rounded-full bg-primary-500 hover:bg-primary-500"
                variant="default"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          </CardContent>

          <CardFooter className="h-26 flex flex-row gap-3 bg-primary-800 p-[0] text-primary-50">
            <div className="text-md flex w-full flex-grow flex-col">
              <p>{product.description}</p>
              <span className="text-sm font-semibold">{product.price} EGP</span>
            </div>
            <div className="mb-auto ml-auto mr-2 mt-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsLiked(!isLiked)}
                className="hover:bg-transparent"
              >
                <Heart
                  className={`h-5 w-5 ${isLiked ? "fill-current text-red-500" : "text-gray-500"}`}
                />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default StoreCard;
