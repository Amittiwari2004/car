export interface Car {
    id: string;
    name: string;
    brand: string;
    price: number;
    fuelType: FuelType;
    seatingCapacity: number;
    imageUrl: string;
    specs: string[];
}

enum FuelType {
    Petrol = 'Petrol',
    Diesel = 'Diesel',
    Electric = 'Electric',
    Hybrid = 'Hybrid'
}

// src/types/daisyui.d.ts
declare module 'daisyui';

