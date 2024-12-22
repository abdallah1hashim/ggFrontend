import { motion, useInView } from "framer-motion";
import Section from "../../../components/ui/Section";
import brownSweatshirt from "../../../assets/photo_13_2024-12-18_21-51-28.jpg";
import pinkSweatshirt from "../../../assets/photo_16_2024-12-18_21-51-28.jpg";
import pants from "../../../assets/photo1.png";
import whiteSweatshirt from "../../../assets/photo_14_2024-12-18_21-51-28.jpg";
import pinkPants from "../../../assets/photo_6_2024-12-18_21-51-28.jpg";
import { useRef } from "react";

const MotionSection = motion(Section);

const items = [
  { photo: brownSweatshirt, description: "Jeans", duplicated: false },
  { photo: pinkSweatshirt, description: "Hoodies", duplicated: false },
  { photo: pants, description: "Sweatshirts", duplicated: false },
  { photo: whiteSweatshirt, description: "Shirts", duplicated: false },
  { photo: pinkPants, description: "Pants", duplicated: false },
];
const duplicatedItems = [
  { photo: brownSweatshirt, description: "Jeans", duplicated: true },
  { photo: pinkSweatshirt, description: "Hoodies", duplicated: true },
  { photo: pants, description: "Sweatshirts", duplicated: true },
  { photo: whiteSweatshirt, description: "Shirts", duplicated: true },
  { photo: pinkPants, description: "Pants", duplicated: true },
];
type Item = {
  photo: string;
  description: string;
  dupicated: boolean;
};

export function Scroller() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return (
    <MotionSection
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 100 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }}
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      initial="hidden"
      className={`relative z-10 mb-10 overflow-hidden`}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
    >
      <div
        className={`scroller aspec mask-linear-gradient flex w-full outline outline-lime-500 ${reducedMotion ? "" : "overflow-hidden"}`}
        {...(!reducedMotion && { data_animated: "true" })}
      >
        <motion.ul
          className={`tag-list scroller__inner flex w-fit gap-4 py-4 ${reducedMotion ? "flex-wrap" : "flex-nowrap"}`}
          initial={{ translateX: 0 }}
          animate={{ translateX: reducedMotion ? 0 : "calc(-50% - 0.5rem)" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...duplicatedItems].map((item, index) => (
            <li
              key={index}
              className="relative flex flex-shrink-0 items-center justify-center border border-gray-300 bg-primary-700 shadow-sm shadow-primary-600"
              {...(item.duplicated && { "aria-hidden": "true" })}
            >
              <div className="relative md:h-64 md:w-48 lg:h-80 lg:w-64">
                <img
                  src={item.photo}
                  alt={item.description}
                  className="h-full w-full object-cover"
                />
              </div>

              {/*<div> <p className="mt-2 text-center text-sm font-medium text-gray-50">
                    {item.description}
                  </p> <div/> */}
            </li>
          ))}
        </motion.ul>
      </div>
    </MotionSection>
  );
}

export default Scroller;
