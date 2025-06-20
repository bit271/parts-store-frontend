import { api } from '../../services/api';

export async function fetchParts() {
    const response = await api.get('/parts');
    return response.data;
}