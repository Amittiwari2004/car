import { fetchCars } from "@/lib/api";
import { Car } from "@/types/car";

export type SearchParams = {
  brand?: string;
  fuel?: string;
  seats?: string;
  page?: string;
};

export async function getFilteredCars(searchParams: SearchParams) {
  const brand = searchParams.brand ?? "";
  const fuel = searchParams.fuel ?? "";
  const seats = Number(searchParams.seats) || 0;
  const page = Number(searchParams.page) || 1;

  const cars: Car[] = await fetchCars();

  const filtered = cars.filter((car) => {
    return (
      (!brand || car.brand === brand) &&
      (!fuel || car.fuelType === fuel) &&
      (!seats || car.seatingCapacity >= seats)
    );
  });

  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return { paginated, totalPages, page };
}
