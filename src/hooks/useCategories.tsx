import { useState, useEffect, useCallback } from 'react';
import {
    type Category,
    getCategories as getCategoriesApi,
    addCategory as addCategoryApi,
    deleteCategory as deleteCategoryApi
} from '@/api/api';

export function useCategories() {
    const [categories, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCategories = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await getCategoriesApi();
            setCategory(data);
        } catch (err) {
            console.error('Failed to load categories:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addCategory = useCallback(async (name: string) => {
        try {
            await addCategoryApi(name.trim());
            await loadCategories();
        } catch (err) {
            console.error('Failed to add category:', err);
            throw err;
        }
    }, [loadCategories]);

    const deleteCategory = useCallback(async (id: number) => {
        try {
            await deleteCategoryApi(id);
            await loadCategories();
        } catch (err) {
            console.error('Failed to delete category:', err);
            throw err;
        }
    }, [loadCategories]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    return {
        categories,
        loading,
        reload: loadCategories,
        addCategory,
        deleteCategory,
    };
}

