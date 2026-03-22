import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ImageUpload } from '@/components/common/ImageUpload';
import type { AddPartDto } from '@/types/AddPartDto'

interface PartFormProps {
    selectedCarId: number | null;
    selectedCategoryId: number | null;
    addPart: (data: AddPartDto) => Promise<void>;
    loading: boolean;
}

export function PartForm({ selectedCarId, selectedCategoryId, addPart, loading }: PartFormProps) {
    const [name, setName] = useState('');
    const [availableCount, setAvaliableCount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [catalogNum, setCatalogNum] = useState('');
    const [description, setDescription] = useState('');

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUploadKey, setImageUploadKey] = useState(0);

    const handleAddPart = async () => {
        if (!selectedCarId || !selectedCategoryId || name === '') {
            alert('Select at least car, category, name!');
            return;
        }
        try {
            const partData: AddPartDto = {
                carId: selectedCarId,
                categoryId: selectedCategoryId,
                name,
                availableCount,
                price,
                catalogNum,
                description,
                ...(selectedImage && { image: selectedImage }),
            };
            await addPart(partData);

            // Reset form
            setName('');
            setAvaliableCount(0);
            setPrice(0);
            setCatalogNum('');
            setDescription('');
            setSelectedImage(null);
            setImageUploadKey((prev) => prev + 1); // Force ImageUpload to reset
        } catch (error) {
            alert('Add car error!');
        }
    };

    return (
        <Card>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                        type="text"
                        placeholder="Part name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Available count</Label>
                    <Input
                        type="number"
                        placeholder="count"
                        value={availableCount}
                        onChange={(e) => setAvaliableCount(Number(e.target.value))}
                        min="0"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                        type="number"
                        placeholder="0 $"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        min="0"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Catalog number</Label>
                    <Input
                        type="text"
                        placeholder="xxx-xxx-xxx"
                        value={catalogNum}
                        onChange={(e) => setCatalogNum(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                        className="h-37"
                        placeholder="Enter description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, 250))}
                        maxLength={250}
                    />
                </div>
                <ImageUpload key={imageUploadKey} onImageChange={setSelectedImage} />
                <Button
                    onClick={handleAddPart}
                    disabled={!selectedCarId || !selectedCarId || !selectedCategoryId}
                    className="w-full"
                >
                    {loading ? 'Adding...' : 'Add part'}
                </Button>
            </CardContent>
        </Card>
    );
}

