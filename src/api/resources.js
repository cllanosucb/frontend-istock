import { apiClient } from './client';

export const authApi = {
    login: (email, password) => apiClient.publicPost('/auth/login', { email, password }),
};

export const equiposApi = {
    getAll: () => apiClient.get('/equipos'),
    getDisponibles: () => apiClient.get('/equipos/disponibles'),
    getById: (id) => apiClient.get(`/equipos/${id}`),
    create: (data) => apiClient.post('/equipos', data),
    update: (id, data) => apiClient.put(`/equipos/${id}`, data),
    remove: (id) => apiClient.del(`/equipos/${id}`),
};

export const ventasApi = {
    getAll: () => apiClient.get('/ventas'),
    getById: (id) => apiClient.get(`/ventas/${id}`),
    create: (data) => apiClient.post('/ventas', data),
    update: (id, data) => apiClient.put(`/ventas/${id}`, data),
    remove: (id) => apiClient.del(`/ventas/${id}`),
};

export const dashboardApi = {
    getResumen: () => apiClient.get('/dashboard/resumen'),
};
