import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
}

export function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onImageChange(null);
      setImagePreview(null);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    onImageChange(null);
    const fileInput = document.getElementById('car-image-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="space-y-2">
      <Label>Picture</Label>
      <Input
        id="car-image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="cursor-pointer"
      />
      {imagePreview && (
        <div className="mt-2 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-md border"
          />
          <button
            type="button"
            onClick={handleReset}
            className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

