// src/features/cars/carsAPI.js
import { api } from '../../services/api';

export async function fetchBrands() {
    const res = await api.get('/admin/brands');
    return res.data;
}

export async function fetchModels() {
    const res = await api.get('/admin/models');
    return res.data;
}

export async function createCar(carData) {
    const res = await api.post('/admin/cars', carData);
    return res.data;
}