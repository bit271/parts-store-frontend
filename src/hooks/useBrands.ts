import { useState, useEffect, useCallback } from 'react';
import { getBrands, addBrand as addBrandApi, deleteBrand as deleteBrandApi, type Brand } from '@/api/api';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBrands = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getBrands();
      setBrands(data);
    } catch (err) {
      console.error('Failed to load brands:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addBrand = useCallback(async (name: string) => {
    try {
      await addBrandApi(name.trim());
      await loadBrands();
    } catch (err) {
      console.error('Failed to add brand:', err);
      throw err;
    }
  }, [loadBrands]);

  const deleteBrand = useCallback(async (id: number) => {
    try {
      await deleteBrandApi(id);
      await loadBrands();
    } catch (err) {
      console.error('Failed to delete brand:', err);
      throw err;
    }
  }, [loadBrands]);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  return {
    brands,
    loading,
    reload: loadBrands,
    addBrand,
    deleteBrand,
  };
}

