import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { RetrievedProducts } from "../../../types/product";

import fallbackImage from "../../../assets/Image_socwjhsocwjhsocw.jpg";

const API_URL = import.meta.env.VITE_API_URL;

const StoreCard: React.FC<{ product: any }> = ({
  product,
}: {
  product: RetrievedProducts;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  // const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = API_URL + product.overview_img;

  return (
    <Link to={`/store/${product.category_name}/${product.id}`}>
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
                src={imageUrl}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
                className={`h-64 w-full object-cover`}
              />
            </motion.div>
          </CardContent>

          <CardFooter className="h-26 flex flex-row gap-3 bg-primary-800 p-[0] text-primary-50">
            <div className="text-md flex w-full flex-grow flex-col p-2">
              <p>{product.name}</p>
              <span className="text-sm font-semibold">999 EGP</span>
            </div>
            <div className="mb-auto ml-auto mr-2 mt-2 flex gap-2">
              <Button
                size={"icon"}
                variant="ghost"
                className="hover:bg-transparent"
              >
                <Plus className="h-5 w-5" />
              </Button>
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
