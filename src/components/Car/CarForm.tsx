import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useCars } from '@/hooks/useCars';
import { ImageUpload } from '@/components/common/ImageUpload';

interface CarFormProps {
  selectedBrandId: number | null;
  selectedModelId: number | null;
  //onCarAdded: () => void;
}

export function CarForm({ selectedBrandId, selectedModelId }: CarFormProps) {
  const { addCar, loading } = useCars();
  const [year, setYear] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUploadKey, setImageUploadKey] = useState(0);

  const handleAddCar = async () => {
    if (!selectedBrandId || !selectedModelId || !year) {
      alert('Select at least brand, model and year!');
      return;
    }
    try {
      const carData = {
        brandId: selectedBrandId,
        modelId: selectedModelId,
        year: Number(year),
        description: description.trim(),
        ...(selectedImage && { image: selectedImage }),
      };

      await addCar(carData);
      // Reset form
      setYear('');
      setDescription('');
      setSelectedImage(null);
      setImageUploadKey((prev) => prev + 1); // Force ImageUpload to reset
    } catch (error) {
      alert('Add car error!');
    }
  };

  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Other info</CardTitle>
      </CardHeader> */}
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Year of manufacture</Label>
          <Input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => {
              const value = e.target.value;
              setYear(value === '' ? '' : parseInt(value, 10));
            }}
            min="1900"
            max="2100"
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
        </div>
        <ImageUpload key={imageUploadKey} onImageChange={setSelectedImage} />
        <Button
          onClick={handleAddCar}
          disabled={loading || !selectedBrandId || !selectedModelId || !year}
          className="w-full"
        >
          {loading ? 'Adding...' : 'Add car'}
        </Button>
      </CardContent>
    </Card>
  );
}

