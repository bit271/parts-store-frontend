import { useState } from 'react';
import { CarsListViev } from '@/components/Part/CarsListViev';
import { CategoryManagement } from '@/components/Category/CategoryManagement.tsx';
import { useCars } from '@/hooks/useCars';
import { useParts } from '@/hooks/useParts';
import { PartForm } from '@/components/Part/PartForm';
import { PartsList } from '@/components/Part/PartsList';

export default function PartAdmin() {
    const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const carsState = useCars();
    const partsState = useParts();

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Admin part page</h1>

            {/* Main form section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CarsListViev
                    cars={carsState.cars}
                    selectedCarId={selectedCarId}
                    onCarSelect={setSelectedCarId}
                />
                <CategoryManagement
                    selectedCategoryId={selectedCategoryId}
                    onCategorySelect={setSelectedCategoryId}
                />
                <PartForm
                    selectedCarId={selectedCarId}
                    selectedCategoryId={selectedCategoryId}
                    addPart={partsState.addPart}
                    loading={carsState.loading}
                />
            </div>

            {/* Parts list section */}
            <PartsList
                parts={partsState.parts}
            />

        </div>
    );
}
