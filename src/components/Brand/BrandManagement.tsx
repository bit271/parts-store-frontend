import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBrands } from '@/hooks/useBrands';
import { SelectableList } from '@/components/common/SelectableList';
import { AddItemForm } from '@/components/common/AddItemForm';

interface BrandManagementProps {
  selectedBrandId: number | null;
  onBrandSelect: (id: number | null) => void;
}

export function BrandManagement({ selectedBrandId, onBrandSelect }: BrandManagementProps) {
  const { brands, addBrand, deleteBrand } = useBrands();
  const [brandSearch, setBrandSearch] = useState('');
  const [newBrandName, setNewBrandName] = useState('');

  const filteredBrands = useMemo(() => {
    if (!brandSearch) return brands;
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brands, brandSearch]);

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    try {
      await addBrand(newBrandName);
      setNewBrandName('');
    } catch (error) {
      alert('Add brand error!');
    }
  };

  const handleDeleteBrand = async () => {
    if (!selectedBrandId) return;
    if (!confirm('Are you sure?')) return;
    try {
      await deleteBrand(selectedBrandId);
      onBrandSelect(null);
    } catch (error) {
      alert('Delete brand error!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Search brand</Label>
          <Input
            placeholder="Search..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Brands</Label>
          <SelectableList
            items={filteredBrands}
            selectedId={selectedBrandId}
            onSelect={onBrandSelect}
            emptyMessage="No brands exist"
          />
        </div>
        <AddItemForm
          label="Add new brand"
          placeholder="Brand name"
          value={newBrandName}
          onChange={setNewBrandName}
          onSubmit={handleAddBrand}
        />
        <Button
          variant="destructive"
          onClick={handleDeleteBrand}
          disabled={!selectedBrandId}
          className="w-full"
        >
          Remove selected brand
        </Button>
      </CardContent>
    </Card>
  );
}

