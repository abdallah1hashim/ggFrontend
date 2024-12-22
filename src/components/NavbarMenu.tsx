import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { fetchNestedCategories } from "../api/category";
import { CategoryWithChildren } from "../types/categories";
import NavbarMenuListItem from "./NavbarMenuListItem";
import { useAuth } from "../contexts/AuthContext";

function NavbarMenu({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("categories", fetchNestedCategories);

  const { user } = useAuth();

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/70"
        onClick={() => setMenuOpen(false)}
      />
      {/* Slide-in menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-black p-4 text-white"
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <Link to="/store" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          {user?.role === "admin" && (
            <li>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                Admin Panel
              </Link>
            </li>
          )}

          <li>
            <Link to="/store" onClick={() => setMenuOpen(false)}>
              Store
            </Link>
          </li>
          <li className="flex items-center text-sm text-primary-500">
            <span>Categories</span>
            <div className="ml-2 flex-grow border-t border-primary-500" />
          </li>
          {isLoading && <div>Loading...</div>}
          {categories &&
            categories?.categories.map((category: CategoryWithChildren) => (
              <NavbarMenuListItem
                category={category}
                setMenuOpen={setMenuOpen}
              />
            ))}
          <li>
            <div className="ml-2 flex-grow border-t border-primary-500" />
          </li>

          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
}

export default NavbarMenu;
