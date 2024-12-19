import { motion, useInView } from "framer-motion";
import { Carousel, CarouselItem } from "../../../components/ui/carousel";
import Section from "../../../components/ui/Section";
import brownSweatshirt from "../../../assets/photo_13_2024-12-18_21-51-28.jpg";
import pinkSweatshirt from "../../../assets/photo_16_2024-12-18_21-51-28.jpg";
import pants from "../../../assets/photo1.png";
import whiteSweatshirt from "../../../assets/photo_14_2024-12-18_21-51-28.jpg";
import pinkPants from "../../../assets/photo_6_2024-12-18_21-51-28.jpg";
import { useRef } from "react";

const MotionSection = motion(Section);

export function SlidingCards() {
  const items = [
    { photo: brownSweatshirt, description: "Jeans" },
    { photo: pinkSweatshirt, description: "Hoodies" },
    { photo: pants, description: "Sweatshirts" },
    { photo: whiteSweatshirt, description: "Shirts" },
    { photo: pinkPants, description: "Pants" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <MotionSection
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 100 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }}
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      initial="hidden"
      className="relative z-10 mb-10 overflow-hidden"
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
    >
      <div className="flex items-center justify-center overflow-hidden">
        <Carousel className="w-full">
          <motion.div
            className="flex"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 25, // Adjust for speed
              ease: "linear",
              repeat: Infinity, // Keep it looping
            }}
          >
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <div className="aspect-w-9 aspect-h-16 flex items-center justify-center border border-gray-300 bg-primary-300">
                    <img
                      src={item.photo}
                      alt={item.description}
                      className="h-full w-full rounded-md object-cover shadow-lg"
                    />
                  </div>
                  {/* <p className="mt-2 text-center text-sm font-medium text-gray-50">
                    {item.description}
                  </p> */}
                </div>
              </CarouselItem>
            ))}
          </motion.div>
        </Carousel>
      </div>
    </MotionSection>
  );
}

export default SlidingCards;
