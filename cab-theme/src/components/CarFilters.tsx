"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";

const brands = ["Tesla", "Toyota", "BMW", "Kia"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
const seatOptions = [2, 4, 5, 7];

export default function CarFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [fuel, setFuel] = useState(searchParams.get("fuel") || "");
  const [seats, setSeats] = useState(searchParams.get("seats") || "");
  const [showFilters, setShowFilters] = useState(true);

  const updateQuery = () => {
    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (fuel) params.set("fuel", fuel);
    if (seats) params.set("seats", seats);

    router.push(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    setBrand("");
    setFuel("");
    setSeats("");
    router.push("/");
  };

  const hasFilters = brand || fuel || seats;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-sm font-medium"
        >
          <Filter size={16} className="mr-1" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        
        {hasFilters && (
          <button 
            onClick={resetFilters}
            className="flex items-center text-sm text-red-500 hover:text-red-700"
          >
            <X size={16} className="mr-1" />
            Reset Filters
          </button>
        )}
      </div>
      
      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">All Fuel Types</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">Any Seats</option>
            {seatOptions.map((s) => (
              <option key={s} value={s}>
                {s}+ Seats
              </option>
            ))}
          </select>

          <button
            onClick={updateQuery}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}