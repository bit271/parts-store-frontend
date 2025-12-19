import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Car } from '@/api/api';
import { useState, useEffect } from 'react';

interface CarsTableProps {
  cars: Car[];
}

export function CarsTable({ cars }: CarsTableProps) {
  const [carsState, setCarsState] = useState<Car[]>([]);

  useEffect(() => {
    if (Array.isArray(cars)) {
      setCarsState(cars);
    }
  }, [cars]);

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car name</TableHead>
            <TableHead>Year of manufacture</TableHead>
            <TableHead>Added date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carsState.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                No cars.
              </TableCell>
            </TableRow>
          ) : (
            carsState.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">
                  {car.brandName} {car.modelName}
                </TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.dateAdd}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

