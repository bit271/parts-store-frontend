import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useModels } from '@/hooks/useModels';
import { SelectableList } from '@/components/common/SelectableList';
import { AddItemForm } from '@/components/common/AddItemForm';

interface ModelManagementProps {
  selectedBrandId: number | null;
  onBrandSelect: (id: number | null) => void;
  selectedModelId: number | null;
  onModelSelect: (id: number | null) => void;
}

export function ModelManagement({ selectedBrandId, onBrandSelect, selectedModelId, onModelSelect }: ModelManagementProps) {
  // const { models, addModel, deleteModel } = useModels();
  const { models, addModel, deleteModel } = useModels();
  const [modelSearch, setModelSearch] = useState('');
  const [newModelName, setNewModelName] = useState('');

  const filteredModels = useMemo(() => {
    const byBrand = selectedBrandId == null
      ? models
      : models.filter((model) => model.brandId === selectedBrandId);

    if (!modelSearch) return byBrand;

    return byBrand.filter((model) =>
      model.name.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [selectedBrandId, models, modelSearch]);

  const handleAddModel = async () => {
    if (!newModelName.trim() || !selectedBrandId) return;
    try {
      await addModel({
        name: newModelName.trim(),
        brandId: selectedBrandId
      });
      setNewModelName('');
    } catch (error) {
      alert('Add model error!');
    }
  };

  const handleDeleteModel = async () => {
    if (!selectedModelId) return;
    if (!confirm('Are you sure?')) return;
    try {
      await deleteModel(selectedModelId);
      onModelSelect(null);
    } catch (error) {
      alert('Delete model error!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Search model</Label>
          <Input
            placeholder="Search..."
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Model</Label>
          <SelectableList
            items={filteredModels}
            selectedId={selectedModelId}
            onSelect={onModelSelect}
            emptyMessage="No model exist"
          />
        </div>
        <AddItemForm
          label="Add new model"
          placeholder="Model name"
          value={newModelName}
          onChange={setNewModelName}
          onSubmit={handleAddModel}
        />
        <Button
          variant="destructive"
          onClick={handleDeleteModel}
          disabled={!selectedModelId}
          className="w-full"
        >
          Remove selected model
        </Button>
      </CardContent>
    </Card>
  );
}

