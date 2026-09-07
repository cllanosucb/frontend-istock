import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ventasApi, equiposApi } from '../api/resources';

const VACIO = {
    equipo_id: '', fecha_venta: '', cliente: '', precio_final: '',
    metodo_pago: 'efectivo', garantia: 'sin_garantia',
};

export default function VentasFormPage() {
    const { id } = useParams();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState(VACIO);
    const [equiposDisponibles, setEquiposDisponibles] = useState([]);
    const [equipoActual, setEquipoActual] = useState(null); // para mantener el seleccionado al editar
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function cargar() {
            try {
                const disponibles = await equiposApi.getDisponibles();

                if (esEdicion) {
                    const venta = await ventasApi.getById(id);
                    setForm({
                        equipo_id: venta.equipo_id,
                        fecha_venta: venta.fecha_venta?.slice(0, 10) || '',
                        cliente: venta.cliente,
                        precio_final: venta.precio_final,
                        metodo_pago: venta.metodo_pago,
                        garantia: venta.garantia,
                    });
                    // El equipo de esta venta puede ya no estar "disponible": lo agregamos
                    // igual a la lista para que el select lo pueda mostrar seleccionado.
                    setEquipoActual({
                        id: venta.equipo_id,
                        modelo: venta.modelo,
                        capacidad: venta.capacidad,
                    });
                }

                setEquiposDisponibles(disponibles);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        }
        cargar();
    }, [id, esEdicion]);

    function handleChange(campo, valor) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setGuardando(true);
        setError('');
        try {
            if (esEdicion) {
                await ventasApi.update(id, form);
            } else {
                await ventasApi.create(form);
            }
            navigate('/ventas');
        } catch (err) {
            setError(err.message);
        } finally {
            setGuardando(false);
        }
    }

    if (cargando) return <p className="text-sm text-neutral-500">Cargando...</p>;

    // Lista final del select: disponibles + el equipo actual de la venta (si no esta ya)
    const opciones = equipoActual && !equiposDisponibles.some((e) => e.id === equipoActual.id)
        ? [equipoActual, ...equiposDisponibles]
        : equiposDisponibles;

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
                {esEdicion ? 'Editar Venta' : 'Registrar Nueva Venta'}
            </h1>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-soft p-6">
                {error && (
                    <p className="text-sm text-danger bg-red-50 rounded-xl px-4 py-3 mb-5">{error}</p>
                )}

                <div className="flex flex-col gap-5">
                    <Campo label="Seleccionar iPhone">
                        <select
                            required
                            value={form.equipo_id}
                            onChange={(e) => handleChange('equipo_id', e.target.value)}
                            className="input"
                        >
                            <option value="" disabled>Elegir equipo...</option>
                            {opciones.map((eq) => (
                                <option key={eq.id} value={eq.id}>{eq.modelo} - {eq.capacidad}</option>
                            ))}
                        </select>
                        {opciones.length === 0 && (
                            <p className="text-xs text-warn mt-1">No hay equipos disponibles para vender</p>
                        )}
                    </Campo>

                    <Campo label="Fecha de Venta">
                        <input
                            type="date"
                            required
                            value={form.fecha_venta}
                            onChange={(e) => handleChange('fecha_venta', e.target.value)}
                            className="input"
                        />
                    </Campo>

                    <Campo label="Nombre del Cliente">
                        <input
                            required
                            value={form.cliente}
                            onChange={(e) => handleChange('cliente', e.target.value)}
                            className="input"
                        />
                    </Campo>

                    <Campo label="Precio Final de Venta">
                        <input
                            type="number"
                            step="0.01"
                            min={0}
                            required
                            value={form.precio_final}
                            onChange={(e) => handleChange('precio_final', e.target.value)}
                            className="input"
                        />
                    </Campo>

                    <Campo label="Metodo de Pago">
                        <select
                            value={form.metodo_pago}
                            onChange={(e) => handleChange('metodo_pago', e.target.value)}
                            className="input"
                        >
                            <option value="efectivo">Efectivo</option>
                            <option value="transferencia">Transferencia</option>
                            <option value="tarjeta">Tarjeta</option>
                        </select>
                    </Campo>

                    <Campo label="Garantia Otorgada">
                        <select
                            value={form.garantia}
                            onChange={(e) => handleChange('garantia', e.target.value)}
                            className="input"
                        >
                            <option value="sin_garantia">Sin garantia</option>
                            <option value="1_mes">1 mes</option>
                            <option value="3_meses">3 meses</option>
                        </select>
                    </Campo>
                </div>

                <div className="flex items-center gap-3 mt-7">
                    <button
                        type="submit"
                        disabled={guardando}
                        className="bg-accent hover:bg-accent-dark disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                    >
                        Confirmar Venta
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/ventas')}
                        className="text-neutral-600 hover:bg-neutral-100 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

function Campo({ label, children }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-neutral-700">{label}</span>
            {children}
        </label>
    );
}
