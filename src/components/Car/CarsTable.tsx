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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Автомобиль</TableHead>
            <TableHead>Год</TableHead>
            <TableHead>Добавлено</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carsState.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                Нет автомобилей
              </TableCell>
            </TableRow>
          ) : (
            carsState.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">
                  {car.brandName} {car.modelName}
                </TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{formatDate(car.addDate)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

