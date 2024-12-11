import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        >
          <Loader2 className="h-16 w-16 text-primary" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.3,
              duration: 0.5,
            },
          }}
          className="mt-6 text-lg text-gray-600"
        >
          Loading your experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FullScreenLoader;
