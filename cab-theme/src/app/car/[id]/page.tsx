'use client'

import { Car } from '@/types/car'
import { fetchCars } from '@/lib/api'
import CarList from '@/components/CarList'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function Home() {
  const searchParams = useSearchParams()
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const load = async () => {
      const brand = searchParams.get('brand') || ''
      const fuel = searchParams.get('fuel') || ''
      const seats = Number(searchParams.get('seats')) || 0
      const currentPage = Number(searchParams.get('page')) || 1

      const cars = await fetchCars()
      const filtered = cars.filter(
        car =>
          (!brand || car.brand === brand) &&
          (!fuel || car.fuelType === fuel) &&
          (!seats || car.seatingCapacity === seats)
      )

      setFilteredCars(filtered)
      setPage(currentPage)
    }

    load()
  }, [searchParams])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarList cars={filteredCars} page={page} />
    </Suspense>
  )
}
