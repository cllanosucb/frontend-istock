import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { equiposApi } from '../api/resources';
import BadgeEstado from '../components/BadgeEstado';
import BadgeBateria from '../components/BadgeBateria';

export default function InventarioListPage() {
    const [equipos, setEquipos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    function cargar() {
        setCargando(true);
        equiposApi
            .getAll()
            .then(setEquipos)
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }

    useEffect(() => {
        cargar();
    }, []);

    async function handleEliminar(id) {
        if (!window.confirm('Seguro que queres eliminar este equipo?')) return;
        try {
            await equiposApi.remove(id);
            setEquipos((prev) => prev.filter((eq) => eq.id !== id));
        } catch (err) {
            window.alert(err.message);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-neutral-900">Inventario</h1>
                <Link
                    to="/inventario/nuevo"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                >
                    <Plus size={16} />
                    Registrar Nuevo Equipo
                </Link>
            </div>

            {error && (
                <p className="text-sm text-danger bg-red-50 rounded-xl px-4 py-3 mb-4">{error}</p>
            )}

            <div className="bg-card rounded-2xl shadow-soft overflow-x-auto">
                <table className="w-full text-sm min-w-[860px]">
                    <thead>
                        <tr className="text-left text-neutral-400 border-b border-black/5">
                            <th className="px-5 py-3 font-medium">IMEI</th>
                            <th className="px-5 py-3 font-medium">Modelo</th>
                            <th className="px-5 py-3 font-medium">Capacidad</th>
                            <th className="px-5 py-3 font-medium">Color</th>
                            <th className="px-5 py-3 font-medium">Bateria</th>
                            <th className="px-5 py-3 font-medium">Precio Base</th>
                            <th className="px-5 py-3 font-medium">Estado</th>
                            <th className="px-5 py-3 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr>
                                <td colSpan={8} className="px-5 py-6 text-neutral-500">Cargando...</td>
                            </tr>
                        ) : equipos.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-5 py-6 text-neutral-500">No hay equipos registrados</td>
                            </tr>
                        ) : (
                            equipos.map((eq) => (
                                <tr key={eq.id} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                                    <td className="px-5 py-3.5 text-neutral-500">{eq.imei}</td>
                                    <td className="px-5 py-3.5 font-medium text-neutral-800">{eq.modelo}</td>
                                    <td className="px-5 py-3.5">{eq.capacidad}</td>
                                    <td className="px-5 py-3.5">{eq.color}</td>
                                    <td className="px-5 py-3.5"><BadgeBateria valor={eq.salud_bateria} /></td>
                                    <td className="px-5 py-3.5">${Number(eq.precio_venta_sugerido).toLocaleString()}</td>
                                    <td className="px-5 py-3.5"><BadgeEstado estado={eq.estado} /></td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/inventario/${eq.id}/editar`}
                                                className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-accent"
                                            >
                                                <Pencil size={15} />
                                            </Link>
                                            <button
                                                onClick={() => handleEliminar(eq.id)}
                                                className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-danger"
                                            >
                                                <Trash2 size={15} />
                                            </button>
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
