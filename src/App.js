import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InventarioListPage from './pages/InventarioListPage';
import InventarioFormPage from './pages/InventarioFormPage';
import VentasListPage from './pages/VentasListPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/inventario" element={<InventarioListPage />} />
            <Route path="/inventario/nuevo" element={<InventarioFormPage />} />
            <Route path="/inventario/:id/editar" element={<InventarioFormPage />} />

            <Route path="/ventas" element={<VentasListPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
