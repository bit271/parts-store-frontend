import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Car } from '@/api/api';
import { deleteCar } from '@/api/api';
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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      // @ts-ignore
      await deleteCar(id);
      setCarsState(prev => prev.filter(car => car.id !== id));
    } catch (error) {
      alert('Delete error!');
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-45">Image</TableHead>
            <TableHead className="w-64">Info</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carsState.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No cars.
              </TableCell>
            </TableRow>
          ) : (
            carsState.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  {car.imageUrl ? (
                    <img
                      src={car.imageUrl}
                      alt={`${car.brandName} ${car.modelName}`}
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <div className="bg-gray-100 w-full aspect-4-3 flex items-center justify-center rounded-md text-xs text-gray-400">No image</div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{car.brandName} {car.modelName}</div>
                  <div className="text-sm text-muted-foreground">Year of manufacture: {car.year}</div>
                  <div className="text-xs text-muted-foreground">Added date: {car.dateAdd}</div>
                </TableCell>
                <TableCell>
                  <div className="whitespace-pre-line text-sm">{car.description}</div>
                </TableCell>
                <TableCell>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

