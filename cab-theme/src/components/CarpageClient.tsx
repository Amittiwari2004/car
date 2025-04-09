'use client'

import { useSearchParams } from 'next/navigation'
import CarFilters from './CarFilters'
import CarList from './CarList'
import Pagination from './Pagination'

import Header from './Header'
import { fetchCars } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Car } from '@/types/car'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

export default function CarPageClient() {
  const searchParams = useSearchParams()
  const { resolvedTheme } = useTheme()
  
  const brand = searchParams.get('brand') ?? ''
  const fuel = searchParams.get('fuel') ?? ''
  const seats = Number(searchParams.get('seats')) || 0
  const page = Number(searchParams.get('page')) || 1
  
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    const loadCars = async () => {
      setLoading(true)
      const data = await fetchCars()
      const filtered = data.filter(car =>
        (!brand || car.brand === brand) &&
        (!fuel || car.fuelType === fuel) &&
        (!seats || car.seatingCapacity >= seats)
      )
      setCars(filtered)
      setLoading(false)
    }
    
    loadCars()
  }, [brand, fuel, seats])
  
  const pageSize = 10
  const totalPages = Math.ceil(cars.length / pageSize)
  const paginated = cars.slice((page - 1) * pageSize, page * pageSize)
  
  if (!mounted) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">CarFinder</h1>
        </div>
        <div className="animate-pulse h-screen bg-gray-100"></div>
      </div>
    )
  }
  
  const isDarkMode = resolvedTheme === 'dark'
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
    >
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-6 rounded-xl shadow-md mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white'}`}
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold mb-4"
          >
            Find Your Perfect Car
          </motion.h2>
          <CarFilters />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-b-2 border-t-2 border-blue-600"
              ></motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants}
                className="mb-4"
              >
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Found <span className="font-bold text-blue-500">{cars.length}</span> cars matching your criteria
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CarList cars={paginated} page={page} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Pagination current={page} total={totalPages} />
              </motion.div>
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
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CarFinder. All rights reserved.
          </p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            className="text-xs mt-2 text-gray-400"
          >
            Find your dream car with ease
          </motion.p>
        </div>
      </motion.footer>
    </motion.div>
  )
}