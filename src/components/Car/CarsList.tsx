import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CarsTable } from '@/components/Car/CarsTable';
import { type Car } from '@/api/api';

export function CarsList({ cars }: { cars: Car[] }) {
  const [carSearch, setCarSearch] = useState('');

  const filteredCars = useMemo(() => {
    if (!carSearch) return cars;
    const searchLower = carSearch.toLowerCase();
    return cars.filter(
      (car) =>
        car.brandName.toLowerCase().includes(searchLower) ||
        car.modelName.toLowerCase().includes(searchLower) ||
        car.year.toString().includes(searchLower)
    );
  }, [cars, carSearch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cars list</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Search by name, brand or year of manufacture"
            value={carSearch}
            onChange={(e) => setCarSearch(e.target.value)}
          />
          <CarsTable cars={filteredCars} />
        </div>
      </CardContent>
    </Card>
  );
}

