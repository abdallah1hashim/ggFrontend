import { useRef } from "react";
import BentoGrid from "./components/BentoGrid";
import Hero from "./components/Hero";
import Scroller from "./components/Scroller";
import { useScroll } from "framer-motion";
import ShopWithUs from "./components/ShopWithUs";

function Home() {
  const ref = useRef(null);
  useScroll({});

  return (
    <div ref={ref}>
      <Hero />
      <Scroller />
      <BentoGrid />
      <ShopWithUs />
    </div>
  );
}

export default Home;
