import { motion } from "framer-motion";

const SkeletonBlock = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => (
  <motion.div
    style={{ width, height }}
    className="rounded-md bg-gray-200"
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
  />
);

const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-8 p-8">
      {/* Thumbnail Skeleton */}
      <div className="col-span-1 flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonBlock key={idx} width="50px" height="70px" />
        ))}
      </div>

      {/* Main Image Skeleton */}
      <div className="col-span-6">
        <SkeletonBlock width="100%" height="400px" />
      </div>

      {/* Product Details Skeleton */}
      <div className="col-span-5 space-y-6">
        <SkeletonBlock width="80%" height="24px" />
        <SkeletonBlock width="60%" height="20px" />
        <SkeletonBlock width="100%" height="20px" />

        <div className="space-y-2">
          <SkeletonBlock width="60%" height="30px" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonBlock key={idx} width="40px" height="40px" />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <SkeletonBlock width="60%" height="30px" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonBlock key={idx} width="40px" height="40px" />
            ))}
          </div>
        </div>

        {/* Quantity Skeleton */}
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border">
            <SkeletonBlock width="40px" height="40px" />
            <SkeletonBlock width="40px" height="40px" />
            <SkeletonBlock width="40px" height="40px" />
          </div>
          <SkeletonBlock width="100px" height="40px" />
          <SkeletonBlock width="40px" height="40px" />
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-8">
          <SkeletonBlock width="80px" height="30px" />
          <SkeletonBlock width="80px" height="30px" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
