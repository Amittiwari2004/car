"use client";
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Car } from "@/types/car";
import WishlistButton from "./WishListButton";
import { Fuel, Users } from "lucide-react";

type Props = {
  car: Car;
};

//nsfdkhdkfjsdk

type AmitTest={
  kuch:"Bhi"
}

export default function CarCard({ car }: Props) {
  return (
    <div className=" border-2  border-pink-600 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={car.name}
          width={400}
          height={240}
          className="object-cover h-48 w-full"
        />
        <div className="absolute top-3 right-3">
          <WishlistButton car={car} />
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">{car.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{car.brand}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Fuel size={16} className="mr-1" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Users size={16} className="mr-1" />
              <span>{car.seatingCapacity} Seats</span>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">
                ₹{car.price ? car.price.toLocaleString("en-IN") : 'N/A'}
              </span>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full transition-colors">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}