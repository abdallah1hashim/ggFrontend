import { motion } from "framer-motion";

const StoreSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <SkeletonCard key={index} />
        ))}
    </motion.div>
  );
};

const SkeletonCard = () => {
  return (
    <motion.div
      className="relative aspect-[3/4] rounded-lg bg-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full w-full animate-pulse bg-gray-300" />
    </motion.div>
  );
};
export default StoreSkeleton;
