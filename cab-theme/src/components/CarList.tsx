import { Car } from "@/types/car";
import CarCard from "./CarCard";

type Props = {
  cars: Car[];
  page:number;
};

export default function CarList({ cars }: Props) {
  if (cars.length === 0) return <p>No cars found 💀</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
