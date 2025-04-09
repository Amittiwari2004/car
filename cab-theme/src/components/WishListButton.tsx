"use client";
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import {
  addToWishList,
  removeFromWishList,
  isInWishList,
} from "@/lib/wishlist";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  car: Car;
};

export default function WishlistButton({ car }: Props) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Check localStorage only on client side
    if (typeof window !== "undefined") {
      setLiked(isInWishList(car.id));
    }
  }, [car.id]);

  const toggle = () => {
    setAnimating(true);
    
    // Toggle wishlist status
    if (liked) {
      removeFromWishList(car.id);
    } else {
      addToWishList(car);
    }
    
    setLiked((prev) => !prev);
    
    // Reset animation state after animation completes
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition-transform duration-200 ${
        liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
    >
      <motion.div
        animate={
          animating
            ? {
                scale: [1, 1.3, 1],
                transition: { duration: 0.5 }
              }
            : {}
        }
      >
        <Heart size={18} fill={liked ? "currentColor" : "none"} />
      </motion.div>
    </motion.button>
  );
}