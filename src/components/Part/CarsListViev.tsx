import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectableList } from '@/components/common/SelectableList';
import { type Car } from '@/api/api';

interface CarsListVievProps {
    cars: Car[];
    selectedCarId: number | null;
    onCarSelect: (id: number | null) => void;
}

export function CarsListViev({ cars, selectedCarId, onCarSelect }: CarsListVievProps) {
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
                <CardTitle>Cars:</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    <Input
                        placeholder="Search by name, brand or year of manufacture"
                        value={carSearch}
                        onChange={(e) => setCarSearch(e.target.value)}
                    />
                    <div className="space-y-3 ">
                        <SelectableList
                            items={filteredCars.map((c) => ({
                                id: c.id,
                                name: `'id: ${c.id}' ${c.brandName} ${c.modelName} (${c.year})`,
                            }))}
                            selectedId={selectedCarId}
                            onSelect={onCarSelect}
                            emptyMessage="No cars found"
                            className="h-122"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

