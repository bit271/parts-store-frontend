import axios from 'axios';

// Types
export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
}

export interface Car {
  id: number;
  brandName: string;
  modelName: string;
  year: number;
  description: string;
  addDate: string;
  imageUrl?: string;
}

// Create single axios instance
const api = axios.create({
  baseURL: '/api/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

// BRANDS
export const getBrands = () => api.get<Brand[]>('/brands');
export const addBrand = (name: string) => api.post<Brand>('/brands', { name });
export const deleteBrand = (id: number) => api.delete(`/brands/${id}`);

// MODELS
export const getModels = () => api.get<Model[]>('/models');
export const addModel = (name: string) => api.post<Model>('/models', { name });
export const deleteModel = (id: number) => api.delete(`/models/${id}`);

// CARS
export const getCars = () => api.get<Car[]>('/cars');
export const addCar = (formData: FormData) =>
  api.post<Car>('/cars', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteCar = (id: number) => api.delete(`/cars/${id}`);

