import { useState, useEffect, useCallback } from 'react';
import { getModels, addModel as addModelApi, deleteModel as deleteModelApi, type Model } from '@/api/api';
import type { AddModelDto } from '@/types/AddModelDto';

export function useModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);

  const loadModels = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getModels();
      setModels(data);
    } catch (err) {
      console.error('Failed to load models:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addModel = useCallback(async (modelData: AddModelDto) => {
    try {
      await addModelApi(modelData.name, modelData.brandId);
      await loadModels();
    } catch (err) {
      console.error('Failed to add model:', err);
      throw err;
    }
  }, [loadModels]);

  const deleteModel = useCallback(async (id: number) => {
    try {
      await deleteModelApi(id);
      await loadModels();
    } catch (err) {
      console.error('Failed to delete model:', err);
      throw err;
    }
  }, [loadModels]);

  useEffect(() => {
    loadModels();
  }, [loadModels]);

  return {
    models,
    loading,
    reload: loadModels,
    addModel,
    deleteModel,
  };
}

