import { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '../api/resources';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem('istock_usuario');
        return guardado ? JSON.parse(guardado) : null;
    });

    const login = useCallback(async (email, password) => {
        const data = await authApi.login(email, password);
        localStorage.setItem('istock_token', data.token);
        localStorage.setItem('istock_usuario', JSON.stringify(data.usuario));
        setUsuario(data.usuario);
        return data.usuario;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('istock_token');
        localStorage.removeItem('istock_usuario');
        setUsuario(null);
    }, []);

    const isAuthenticated = Boolean(usuario && localStorage.getItem('istock_token'));

    return (
        <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return ctx;
}
