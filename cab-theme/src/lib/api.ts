import { Car } from "@/types/car";

export async function fetchCars(): Promise<Car[]> {
  const res = await fetch("/api/cars", {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch cars");

  const data = await res.json();
  return data.cars ;
}
