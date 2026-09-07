import { useEffect, useState } from 'react';
import { Package, TrendingUp, Star, ArrowUpRight } from 'lucide-react';
import { dashboardApi } from '../api/resources';
import MetricCard from '../components/MetricCard';

export default function DashboardPage() {
    const [resumen, setResumen] = useState(null);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        dashboardApi
            .getResumen()
            .then(setResumen)
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">Dashboard</h1>

            {error && (
                <p className="text-sm text-danger bg-red-50 rounded-xl px-4 py-3 mb-6">{error}</p>
            )}

            {cargando ? (
                <p className="text-sm text-neutral-500">Cargando metricas...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                        <MetricCard
                            icon={Package}
                            label="Total de iPhones en Stock"
                            value={resumen?.totalEnStock ?? 0}
                        />
                        <MetricCard
                            icon={TrendingUp}
                            label="Ventas del Mes"
                            value={`$${Number(resumen?.ventasDelMes?.monto ?? 0).toLocaleString()}`}
                        />
                        <MetricCard
                            icon={Star}
                            label="Modelo mas vendido"
                            value={resumen?.modeloMasVendido ?? 'Sin datos'}
                        />
                    </div>

                    <div className="bg-card rounded-2xl shadow-soft">
                        <div className="px-6 py-5 border-b border-black/5">
                            <h2 className="text-sm font-semibold text-neutral-800">Ultimas 5 transacciones</h2>
                        </div>

                        {(!resumen?.ultimasTransacciones || resumen.ultimasTransacciones.length === 0) ? (
                            <p className="text-sm text-neutral-500 px-6 py-6">Sin datos aun</p>
                        ) : (
                            <ul>
                                {resumen.ultimasTransacciones.map((t, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center justify-between px-6 py-4 border-b border-black/5 last:border-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-ok">
                                                <ArrowUpRight size={16} />
                                            </span>
                                            <div>
                                                <p className="text-sm font-medium text-neutral-800">
                                                    {t.modelo} {t.capacidad}
                                                </p>
                                                <p className="text-xs text-neutral-400">
                                                    {new Date(t.fecha_venta).toLocaleDateString('es-BO')}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-ok">
                                            ${Number(t.precio_final).toLocaleString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
