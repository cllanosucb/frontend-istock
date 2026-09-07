import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setCargando(true);
        try {
            await login(email, password);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.message || 'No se pudo iniciar sesion');
        } finally {
            setCargando(false);
        }
    }

    return (
        <main className="min-h-screen bg-surface flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-card rounded-2xl shadow-softer p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-3">
                        <Smartphone size={24} className="text-accent" />
                    </div>
                    <h1 className="text-xl font-semibold text-neutral-900">iStock</h1>
                    <p className="text-sm text-neutral-500 mt-1">Gestion de inventario y ventas</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Usuario (correo)
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@istock.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Contrasena
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-sm"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-danger bg-red-50 rounded-xl px-3 py-2">{error}</p>
                    )}

                    <p className="text-sm text-neutral-500 mt-1">Acceda con : admin@istock.com   -  admin123</p>

                    <button
                        type="submit"
                        disabled={cargando}
                        className="mt-2 w-full bg-accent hover:bg-accent-dark disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        {cargando && <Loader2 size={16} className="animate-spin" />}
                        Ingresar
                    </button>
                </form>
            </div>
        </main>
    );
}
