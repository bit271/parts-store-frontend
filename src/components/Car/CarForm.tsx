import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCars } from '@/hooks/useCars';
import { ImageUpload } from '@/components/common/ImageUpload';

interface CarFormProps {
  selectedBrandId: number | null;
  selectedModelId: number | null;
  onCarAdded: () => void;
}

export function CarForm({ selectedBrandId, selectedModelId, onCarAdded }: CarFormProps) {
  const { addCar, loading } = useCars();
  const [year, setYear] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUploadKey, setImageUploadKey] = useState(0);

  const handleAddCar = async () => {
    if (!selectedBrandId || !selectedModelId || !year || !selectedImage) {
      alert('Заполните все обязательные поля');
      return;
    }
    try {
      await addCar({
        brandId: selectedBrandId,
        modelId: selectedModelId,
        year: Number(year),
        description: description.trim(),
        image: selectedImage,
      });
      // Reset form
      setYear('');
      setDescription('');
      setSelectedImage(null);
      setImageUploadKey((prev) => prev + 1); // Force ImageUpload to reset
      onCarAdded();
    } catch (error) {
      alert('Не удалось добавить автомобиль');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Детали автомобиля</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Год выпуска</Label>
          <Input
            type="number"
            placeholder="Год"
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
          <Label>Описание</Label>
          <Textarea
            placeholder="Введите описание..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
        </div>
        <ImageUpload key={imageUploadKey} onImageChange={setSelectedImage} />
        <Button
          onClick={handleAddCar}
          disabled={loading || !selectedBrandId || !selectedModelId || !year || !selectedImage}
          className="w-full"
        >
          {loading ? 'Добавление...' : 'Добавить'}
        </Button>
      </CardContent>
    </Card>
  );
}

