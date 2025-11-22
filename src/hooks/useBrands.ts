import { useState, useEffect, useCallback, useRef } from 'react';
import { getBrands, addBrand as addBrandApi, deleteBrand as deleteBrandApi, type Brand } from '@/api/api';

// Shared cache to prevent duplicate requests
let brandsCache: Brand[] | null = null;
let brandsLoadingPromise: Promise<Brand[]> | null = null;

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>(brandsCache || []);
  const [loading, setLoading] = useState(false);

  const hasInitialized = useRef(false);

  const loadBrands = useCallback(async () => {
    // If already loading, reuse the same promise
    if (brandsLoadingPromise) {
      return brandsLoadingPromise;
    }

    // If cache exists, return it immediately
    if (brandsCache !== null) {
      setBrands(brandsCache);
      return brandsCache;
    }

    setLoading(true);

    brandsLoadingPromise = getBrands()
      .then(({ data }) => {
        brandsCache = data;
        setBrands(data);
        return data;
      })
      .catch((err) => {
        console.error('Failed to load brands:', err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
        brandsLoadingPromise = null;
      });

    return brandsLoadingPromise;
  }, []);

  const addBrand = useCallback(async (name: string) => {
    try {
      await addBrandApi(name.trim());
      // Clear cache to force refresh
      brandsCache = null;
      brandsLoadingPromise = null;
      await loadBrands();
    } catch (err) {
      console.error('Failed to add brand:', err);
      throw err;
    }
  }, [loadBrands]);

  const deleteBrand = useCallback(async (id: number) => {
    try {
      await deleteBrandApi(id);
      // Clear cache to force refresh
      brandsCache = null;
      brandsLoadingPromise = null;
      await loadBrands();
    } catch (err) {
      console.error('Failed to delete brand:', err);
      throw err;
    }
  }, [loadBrands]);

  useEffect(() => {
    // Only load on first mount
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      loadBrands();
    }
  }, [loadBrands]);

  return {
    brands,
    loading,
    loadBrands,
    addBrand,
    deleteBrand,
  };
}

