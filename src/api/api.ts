import axios from 'axios';

// Types
export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  brandId: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Car {
  id: number;
  brandName: string;
  modelName: string;
  year: number;
  description: string;
  dateAdd: string;
  imageUrl?: string;
}

export interface Part {
  id: number;
  carId: number;
  categoryId: number;
  name: string;
  availableCount: number;
  price: number;
  catalogNum: string;
  description: string;
  image?: File;
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
export const addModel = (name: string, brandId: number) => api.post<Model>('/models', { name, brandId });
export const deleteModel = (id: number) => api.delete(`/models/${id}`);

// CATEGORIES
export const getCategories = () => api.get<Category[]>('/categories');
export const addCategory = (name: string) => api.post<Brand>('/categories', { name });
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);

// CARS
export const getCars = () => api.get<Car[]>('/cars');
export const addCar = (formData: FormData) =>
  api.post<Car>('/cars', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteCar = (id: number) => api.delete(`/cars/${id}`);

// PARTS
export const getParts = () => api.get<Part[]>('/parts');
export const addPart = (formData: FormData) =>
  api.post<Part>('/parts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deletePart = (id: number) => api.delete(`/parts/${id}`);
