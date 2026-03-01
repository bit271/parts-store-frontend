import { useState } from 'react';
import { CarsListViev } from '@/components/part/CarsListViev';
import { PartForm } from '@/components/part/PartForm';
import { useCars } from '@/hooks/useCars';

export default function PartAdmin() {
    const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
    const carsState = useCars();

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


            </div>
        </div>
    );
}

