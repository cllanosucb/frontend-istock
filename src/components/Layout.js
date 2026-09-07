import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/inventario', label: 'Inventario', icon: Package },
    { to: '/ventas', label: 'Ventas', icon: ShoppingCart },
];

export default function Layout() {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <div className="min-h-screen bg-surface flex">
            <nav className="w-64 shrink-0 bg-white border-r border-black/5 flex flex-col py-6 px-4">
                <div className="flex items-center gap-2 px-2 mb-8">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Smartphone size={18} className="text-accent" />
                    </div>
                    <span className="text-lg font-semibold text-neutral-900">iStock</span>
                </div>

                <ul className="flex flex-col gap-1 flex-1">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-neutral-600 hover:bg-neutral-100'
                                    }`
                                }
                            >
                                <Icon size={18} />
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-100 hover:text-danger transition-colors"
                >
                    <LogOut size={18} />
                    Cerrar sesion
                </button>
            </nav>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-black/5 flex items-center justify-end px-8">
                    <span className="text-sm text-neutral-500">
                        Hola, <span className="font-medium text-neutral-800">{usuario?.nombre}</span>
                    </span>
                </header>

                <main className="flex-1 p-8">
                    <Outlet />
                </main>

                <footer className="px-8 py-4 text-xs text-neutral-400 border-t border-black/5">
                    iStock &middot; Gestion de inventario y ventas de iPhones de medio uso
                </footer>
            </div>
        </div>
    );
}
