"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getWishlistCount } from "@/lib/wishlist";
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "CarFinder" }: HeaderProps) {
  const { resolvedTheme } = useTheme();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial wishlist count
    setWishlistCount(getWishlistCount());

    // Set up event listener for storage changes
    const handleStorageChange = () => {
      setWishlistCount(getWishlistCount());
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for when wishlist changes
    window.addEventListener("wishlistUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wishlistUpdated", handleStorageChange);
    };
  }, []);

  const isDarkMode = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <header className={`sticky top-0 z-10 shadow-md`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6"></div>
            <div className="w-6 h-6"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-10 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg backdrop-blur-sm bg-opacity-90`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            {title}
          </motion.h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/wishlist">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Heart
                size={24}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors"
              />
              {wishlistCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.div>
              )}
            </motion.div>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}