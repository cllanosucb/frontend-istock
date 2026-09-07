import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InventarioListPage from './pages/InventarioListPage';
import InventarioFormPage from './pages/InventarioFormPage';
import VentasListPage from './pages/VentasListPage';
import VentasFormPage from './pages/VentasFormPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
