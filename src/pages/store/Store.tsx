import { motion } from "framer-motion";
import { FaRegSquare } from "react-icons/fa6";
import { GoColumns } from "react-icons/go";
import Section from "../../components/ui/Section";
import StorePagination from "./compoenents/StorePagination";
import { useSearchParams } from "react-router-dom";
import StoreCard from "./compoenents/StoreCard";
import { Query, QueryClient, useQuery } from "react-query";
import { getProducts } from "../../api/products";

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
  {
    id: 3,
    name: "Leather Messenger Bag",
    price: 179.99,
    image: "/api/placeholder/400/400",
    category: "Accessories",
    description: "Handcrafted leather bag for professionals.",
  },
];

const StorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const { data, isLoading, error } = useQuery("products", getProducts);

  console.log(data);

  function handleParams(query: string, value: string | number) {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set(query, String(value));
      return updated;
    });
  }
  searchParams;
  return (
    <Section className="container mx-auto min-h-screen px-4 py-8">
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
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
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
          totalPages={5}
        />
      </motion.footer>
    </Section>
  );
};

export default StorePage;
