import { LogIn, Menu, ShoppingCartIcon, Store } from "lucide-react";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./Logo";

import NavbarMenu from "./NavbarMenu";
import { useAuth } from "../contexts/AuthContext";
import ExpandableCart from "../pages/store/compoenents/ExpandableCart";
import { Button } from "./ui/button";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const { scrollY } = useScroll();

  const { user } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() as number;
    if (latest < prev) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed right-0 top-0 z-20 flex w-full items-center justify-between bg-primary bg-gradient-to-b p-4 shadow-sm"
    >
      <div className="container relative mx-auto flex items-center justify-between">
        <Menu size={22} onClick={() => setMenuOpen(!menuOpen)} />

        {/* Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link to="/">
            <Logo textOnly={true} size="medium" />
          </Link>
        </div>
        {/* links */}
        <ul className="flex gap-2">
          <li className="flex items-center justify-center">
            <Link to="/store">
              <Store size={18} className="" />
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <ExpandableCart />
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <LogIn size={18} />
              </Link>
            </li>
          )}
        </ul>
        {/* menu items */}
        <AnimatePresence>
          {menuOpen && (
            <NavbarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
