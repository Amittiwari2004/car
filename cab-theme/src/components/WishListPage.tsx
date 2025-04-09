'use client'

import { useState, useEffect } from 'react'
import { Car } from '@/types/car'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { getWishlistItems, removeFromWishList } from '@/lib/wishlist'
import Header from '@/components/Header'
import CarCard from '@/components/CarCard'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
  const [wishlistCars, setWishlistCars] = useState<Car[]>([])
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    loadWishlist()

    // Listen for storage changes
    const handleStorageChange = () => {
      loadWishlist()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('wishlistUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('wishlistUpdated', handleStorageChange)
    }
  }, [])

  const loadWishlist = () => {
    const cars = getWishlistItems()
    setWishlistCars(cars)
  }

  const handleRemoveFromWishlist = (carId: string) => {
    removeFromWishList(carId)
    
    // Update the UI
    setWishlistCars(prev => prev.filter(car => car.id !== carId))
    
    // Dispatch custom event to notify other components
    const event = new Event('wishlistUpdated')
    window.dispatchEvent(event)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Wishlist</h1>
        </div>
        <div className="animate-pulse h-screen bg-gray-100"></div>
      </div>
    )
  }

  const isDarkMode = resolvedTheme === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
    >
      <Header title="Your Wishlist" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <motion.div
              whileHover={{ x: -5 }}
              className={`inline-flex items-center text-blue-500 hover:text-blue-700`}
            >
              <ChevronLeft size={18} className="mr-1" />
              <span>Back to cars</span>
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-6 rounded-xl shadow-md mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white'}`}
        >
          <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            {wishlistCars.length > 0
              ? `You have ${wishlistCars.length} car${wishlistCars.length > 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is empty'}
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {wishlistCars.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {wishlistCars.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  layout
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-12 rounded-xl shadow-md text-center ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3 className="text-xl mb-4">No cars in your wishlist yet</h3>
              <p className="mb-6 text-gray-500">
                Add cars to your wishlist by clicking the heart icon on any car card
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-colors"
                >
                  Browse Cars
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={`mt-12 py-6 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CarFinder. All rights reserved.
        </div>
      </motion.footer>
    </motion.div>
  )
}