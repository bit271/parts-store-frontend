import { useState, useEffect, useCallback } from 'react';
import { getCars, addCar as addCarApi, type Car } from '@/api/api';
import type { AddCarDto } from '@/types/AddCarDto';

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCars = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getCars();
      setCars(data);
    } catch (err) {
      console.error('Failed to load cars:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addCar = useCallback(async (carData: AddCarDto) => {
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
      await loadCars();
    } catch (err) {
      console.error('Failed to add car:', err);
    } finally {
      setLoading(false);
    }
  }, [loadCars]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  return {
    cars,
    loading,
    addCar,
    reload: loadCars,
  };
}

