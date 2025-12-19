import { useState } from 'react';
import { BrandManagement } from '@/components/Brand/BrandManagement';
import { ModelManagement } from '@/components/Model/ModelManagement';
import { CarForm } from '@/components/Car/CarForm';
import { CarsList } from '@/components/Car/CarsList';

export default function CarAdmin() {
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin page</h1>

      {/* Main form section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BrandManagement
          selectedBrandId={selectedBrandId}
          onBrandSelect={setSelectedBrandId}
        />
        <ModelManagement
          selectedBrandId={selectedBrandId}
          onBrandSelect={setSelectedBrandId}
          selectedModelId={selectedModelId}
          onModelSelect={setSelectedModelId}
        />
        {/* <CarForm
          selectedBrandId={selectedBrandId}
          selectedModelId={selectedModelId}
          onCarAdded={handleCarAdded}
        /> */}

      </div>

      {/* Cars List Section
      <CarsList refreshTrigger={refreshTrigger} /> */}
    </div>
  );
}

