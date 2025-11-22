import { useState, useEffect, useCallback, useRef } from 'react';
import { getModels, addModel as addModelApi, deleteModel as deleteModelApi, type Model } from '@/api/api';

// Shared cache to prevent duplicate requests
let modelsCache: Model[] | null = null;
let modelsLoadingPromise: Promise<Model[]> | null = null;

export function useModels() {
  const [models, setModels] = useState<Model[]>(modelsCache || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const loadModels = useCallback(async () => {
    // If already loading, reuse the same promise
    if (modelsLoadingPromise) {
      return modelsLoadingPromise;
    }

    // If cache exists, return it immediately
    if (modelsCache !== null) {
      setModels(modelsCache);
      return modelsCache;
    }

    setLoading(true);
    setError(null);

    modelsLoadingPromise = getModels()
      .then(({ data }) => {
        modelsCache = data;
        setModels(data);
        return data;
      })
      .catch((err) => {
        setError('Не удалось загрузить модели');
        console.error('Failed to load models:', err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
        modelsLoadingPromise = null;
      });

    return modelsLoadingPromise;
  }, []);

  const addModel = useCallback(async (name: string) => {
    try {
      await addModelApi(name.trim());
      // Clear cache to force refresh
      modelsCache = null;
      modelsLoadingPromise = null;
      await loadModels();
    } catch (err) {
      setError('Не удалось добавить модель');
      console.error('Failed to add model:', err);
      throw err;
    }
  }, [loadModels]);

  const deleteModel = useCallback(async (id: number) => {
    try {
      await deleteModelApi(id);
      // Clear cache to force refresh
      modelsCache = null;
      modelsLoadingPromise = null;
      await loadModels();
    } catch (err) {
      setError('Не удалось удалить модель');
      console.error('Failed to delete model:', err);
      throw err;
    }
  }, [loadModels]);

  useEffect(() => {
    // Only load on first mount
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      loadModels();
    }
  }, [loadModels]);

  return {
    models,
    loading,
    error,
    loadModels,
    addModel,
    deleteModel,
  };
}

