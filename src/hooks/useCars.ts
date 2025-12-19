import { useState, useEffect, useCallback, useRef } from 'react';
import { getCars, addCar as addCarApi, type Car } from '@/api/api';

// Shared cache to prevent duplicate requests
let carsCache: Car[] | null = null;
let carsLoadingPromise: Promise<Car[]> | null = null;

export function useCars() {
  const [cars, setCars] = useState<Car[]>(carsCache || []);
  const [loading, setLoading] = useState(false);

  const hasInitialized = useRef(false);

  const loadCars = useCallback(async () => {
    // If already loading, reuse the same promise
    if (carsLoadingPromise) {
      return carsLoadingPromise;
    }

    // If cache exists, return it immediately
    if (carsCache !== null) {
      setCars(carsCache);
      return carsCache;
    }

    setLoading(true);

    carsLoadingPromise = getCars()
      .then(({ data }) => {
        carsCache = data;
        setCars(data);
        return data;
      })
      .catch((err) => {
        console.error('Failed to load cars:', err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
        carsLoadingPromise = null;
      });

    return carsLoadingPromise;
  }, []);

  const addCar = useCallback(async (carData: {
    description: string;
    year: number;
    brandId: number;
    modelId: number;
    image?: File;
  }) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append('description', carData.description);
      form.append('year', carData.year.toString());
      form.append('brandId', carData.brandId.toString());
      form.append('modelId', carData.modelId.toString());
      if (carData.image) {
        form.append('image', carData.image);
      }
      await addCarApi(form);

      // Clear cache to force refresh on next load
      carsCache = null;
      carsLoadingPromise = null;
      await loadCars();
    } catch (err) {
      console.error('Failed to add car:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadCars]);

  useEffect(() => {
    // Only load on first mount
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      loadCars();
    }
  }, [loadCars]);

  return {
    cars,
    loading,
    loadCars,
    addCar,
  };
}

