import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectableList } from '@/components/common/SelectableList';
import { AddItemForm } from '@/components/common/AddItemForm';
import { useCategories } from '@/hooks/useCategories';

interface CategoryManagementProps {
    selectedCategoryId: number | null;
    onCategorySelect: (id: number | null) => void;
}

export function CategoryManagement({ selectedCategoryId, onCategorySelect }: CategoryManagementProps) {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            await addCategory(newCategoryName.trim());
            setNewCategoryName('');
        } catch (error) {
            alert('Add Category error!');
        }
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategoryId) return;
        if (!confirm('Are you sure?')) return;
        try {
            await deleteCategory(selectedCategoryId);
            onCategorySelect(null);
        } catch (error) {
            alert('Delete category error!');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Categories:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-3">
                    <SelectableList
                        items={categories}
                        selectedId={selectedCategoryId}
                        onSelect={onCategorySelect}
                        emptyMessage="No category exist"
                        className="h-103"
                    />
                </div>
                <AddItemForm
                    label="Add new category"
                    placeholder="Category name"
                    value={newCategoryName}
                    onChange={setNewCategoryName}
                    onSubmit={handleAddCategory}
                />
                <Button
                    variant="destructive"
                    onClick={handleDeleteCategory}
                    disabled={!selectedCategoryId}
                    className="w-full"
                >
                    Remove selected category
                </Button>
            </CardContent>
        </Card>
    );
}

