import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil } from 'lucide-react';
import { ventasApi } from '../api/resources';

const METODOS_LABEL = { efectivo: 'Efectivo', transferencia: 'Transferencia', tarjeta: 'Tarjeta' };

export default function VentasListPage() {
    const [ventas, setVentas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        ventasApi
            .getAll()
            .then(setVentas)
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-neutral-900">Ventas</h1>
                <Link
                    to="/ventas/nueva"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                >
                    <Plus size={16} />
                    Registrar Nueva Venta
                </Link>
            </div>

            {error && (
                <p className="text-sm text-danger bg-red-50 rounded-xl px-4 py-3 mb-4">{error}</p>
            )}

            <div className="bg-card rounded-2xl shadow-soft overflow-x-auto">
                <table className="w-full text-sm min-w-[780px]">
                    <thead>
                        <tr className="text-left text-neutral-400 border-b border-black/5">
                            <th className="px-5 py-3 font-medium">ID Venta</th>
                            <th className="px-5 py-3 font-medium">Fecha</th>
                            <th className="px-5 py-3 font-medium">Modelo Vendido</th>
                            <th className="px-5 py-3 font-medium">Cliente</th>
                            <th className="px-5 py-3 font-medium">Precio Final</th>
                            <th className="px-5 py-3 font-medium">Metodo de Pago</th>
                            <th className="px-5 py-3 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr><td colSpan={7} className="px-5 py-6 text-neutral-500">Cargando...</td></tr>
                        ) : ventas.length === 0 ? (
                            <tr><td colSpan={7} className="px-5 py-6 text-neutral-500">No hay ventas registradas</td></tr>
                        ) : (
                            ventas.map((v) => (
                                <tr key={v.id} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                                    <td className="px-5 py-3.5 text-neutral-500">#{v.id}</td>
                                    <td className="px-5 py-3.5">{new Date(v.fecha_venta).toLocaleDateString('es-BO')}</td>
                                    <td className="px-5 py-3.5 font-medium text-neutral-800">{v.modelo} {v.capacidad}</td>
                                    <td className="px-5 py-3.5">{v.cliente}</td>
                                    <td className="px-5 py-3.5 font-semibold text-ok">${Number(v.precio_final).toLocaleString()}</td>
                                    <td className="px-5 py-3.5">{METODOS_LABEL[v.metodo_pago] || v.metodo_pago}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-end">
                                            <Link
                                                to={`/ventas/${v.id}/editar`}
                                                className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-accent"
                                            >
                                                <Pencil size={15} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
