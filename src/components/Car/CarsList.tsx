import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCars } from '@/hooks/useCars';
import { CarsTable } from '@/components/Car/CarsTable';

interface CarsListProps {
  refreshTrigger?: number;
}

export function CarsList({ refreshTrigger }: CarsListProps) {
  const { cars, loadCars } = useCars();
  const [carSearch, setCarSearch] = useState('');

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      loadCars();
    }
  }, [refreshTrigger, loadCars]);

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
        <CardTitle>Список автомобилей</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Поиск по названию, бренду или году..."
            value={carSearch}
            onChange={(e) => setCarSearch(e.target.value)}
          />
          <CarsTable cars={filteredCars} />
        </div>
      </CardContent>
    </Card>
  );
}

