import { motion } from "framer-motion";
import { FaRegSquare } from "react-icons/fa6";
import { GoColumns } from "react-icons/go";
import StorePagination from "./compoenents/StorePagination";
import StoreCard from "./compoenents/StoreCard";
import { useQuery } from "react-query";
import { getProducts } from "../../services/products";
import { useSearchParamsHandler } from "../../hooks/useSearchParamsHandler";
import { RetrievedProducts } from "../../types/product";
import StoreError from "./compoenents/StoreError";
import StoreSkeleton from "./compoenents/StoreSkeleton";
import NoItemsFound from "./compoenents/NoProductsFound";

interface GetProducts {
  limit: number;
  maxPage: number;
  page: number;
  products: RetrievedProducts[];
  total_products: number;
}

const StorePage = () => {
  const { searchParams, handleParams } = useSearchParamsHandler();
  const page = searchParams.get("page") || 1;

  const { data, isLoading, error } = useQuery<GetProducts>("products", () =>
    getProducts({ limit: 10, page: Number(page) }),
  );
  const products = data?.products || [];

  if (error) return <StoreError />;
  if (isLoading) return <StoreSkeleton />;
  if (products.length === 0) return <NoItemsFound />;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <ul className="flex items-center justify-end gap-4">
          <li>
            <FaRegSquare className="h-5 w-5" />
          </li>
          <li>
            <GoColumns className="h-5 w-5" />
          </li>
        </ul>
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
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <StoreCard product={product} />
          </motion.div>
        ))}
      </motion.div>
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-auto flex items-center justify-center gap-4"
      >
        <StorePagination
          page={+page < 1 ? 1 : +page}
          handlePage={handleParams}
          totalPages={data?.maxPage || 1}
        />
      </motion.footer>
    </>
  );
};

export default StorePage;
