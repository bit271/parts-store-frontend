import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useModels } from '@/hooks/useModels';
import { SelectableList } from '@/components/common/SelectableList';
import { AddItemForm } from '@/components/common/AddItemForm';

interface ModelManagementProps {
  selectedModelId: number | null;
  onModelSelect: (id: number | null) => void;
}

export function ModelManagement({ selectedModelId, onModelSelect }: ModelManagementProps) {
  const { models, addModel, deleteModel } = useModels();
  const [modelSearch, setModelSearch] = useState('');
  const [newModelName, setNewModelName] = useState('');

  const filteredModels = useMemo(() => {
    if (!modelSearch) return models;
    return models.filter((model) =>
      model.name.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [models, modelSearch]);

  const handleAddModel = async () => {
    if (!newModelName.trim()) return;
    try {
      await addModel(newModelName);
      setNewModelName('');
    } catch (error) {
      alert('Не удалось добавить модель');
    }
  };

  const handleDeleteModel = async () => {
    if (!selectedModelId) return;
    if (!confirm('Вы уверены, что хотите удалить выбранную модель?')) return;
    try {
      await deleteModel(selectedModelId);
      onModelSelect(null);
    } catch (error) {
      alert('Не удалось удалить модель');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Модель</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Поиск модели</Label>
          <Input
            placeholder="Поиск..."
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Модель</Label>
          <SelectableList
            items={filteredModels}
            selectedId={selectedModelId}
            onSelect={onModelSelect}
            emptyMessage="Нет моделей"
          />
        </div>
        <AddItemForm
          label="Новая модель"
          placeholder="Введите название модели"
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
          Удалить выбранную модель
        </Button>
      </CardContent>
    </Card>
  );
}

