const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

function getToken() {
    return localStorage.getItem('istock_token');
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    if (auth) {
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    // 204 No Content - Para DELETE no trae body
    if (response.status === 204) return null;

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const mensaje = (data && data.error) || `Error ${response.status}`;
        const error = new Error(mensaje);
        error.status = response.status;
        throw error;
    }

    return data;
}

export const apiClient = {
    get: (path) => request(path, { method: 'GET' }),
    post: (path, body) => request(path, { method: 'POST', body }),
    put: (path, body) => request(path, { method: 'PUT', body }),
    del: (path) => request(path, { method: 'DELETE' }),
    publicPost: (path, body) => request(path, { method: 'POST', body, auth: false }),
};
