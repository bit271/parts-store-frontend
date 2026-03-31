import { useState, useEffect, useCallback } from 'react';
import {
    type Part,
    getParts as getPartsApi,
    addPart as addPartApi,
    deletePart as deletePartApi
} from '@/api/api';
import type { AddPartDto } from '@/types/AddPartDto'

export function useParts() {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(false);

    const loadParts = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await getPartsApi();
            setParts(data);
        } catch (err) {
            console.error('Failed to load parts:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addPart = useCallback(async (partData: AddPartDto) => {
        try {
            const form = new FormData();
            form.append('carId', partData.carId.toString());
            form.append('categoryId', partData.categoryId.toString());
            form.append('name', partData.name);
            form.append('availableCount', partData.availableCount.toString());
            form.append('price', partData.price.toString());
            form.append('catalogNum', partData.catalogNum);
            form.append('description', partData.description);

            if (partData.image) {
                form.append('image', partData.image);
            }

            await addPartApi(form);
            await loadParts();
        } catch (err) {
            console.error('Failed to add part:', err);
            throw err;
        }
    }, [loadParts]);

    const deletePart = useCallback(async (id: number) => {
        try {
            await deletePartApi(id);
            await loadParts();
        } catch (err) {
            console.error('Failed to delete part:', err);
            throw err;
        }
    }, [loadParts]);

    useEffect(() => {
        loadParts();
    }, [loadParts]);

    return {
        parts,
        loading,
        reload: loadParts,
        addPart,
        deletePart,
    };
}
