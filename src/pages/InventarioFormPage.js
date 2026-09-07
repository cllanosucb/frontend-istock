import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { equiposApi } from '../api/resources';

const MODELOS = [
    'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
    'iPhone 12', 'iPhone 12 Mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
    'iPhone 13', 'iPhone 13 Mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
    'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
    'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
];

const CAPACIDADES = ['64GB', '128GB', '256GB', '512GB', '1TB'];

const VACIO = {
    imei: '', modelo: MODELOS[0], capacidad: CAPACIDADES[0], color: '',
    salud_bateria: 100, precio_compra: '', precio_venta_sugerido: '', estado: 'disponible',
};

export default function InventarioFormPage() {
    const { id } = useParams();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState(VACIO);
    const [cargando, setCargando] = useState(esEdicion);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!esEdicion) return;
        equiposApi
            .getById(id)
            .then((data) => setForm({ ...data }))
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
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
                await equiposApi.update(id, form);
            } else {
                await equiposApi.create(form);
            }
            navigate('/inventario');
        } catch (err) {
            setError(err.message);
        } finally {
            setGuardando(false);
        }
    }

    if (cargando) return <p className="text-sm text-neutral-500">Cargando...</p>;

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
                {esEdicion ? 'Editar Equipo' : 'Registrar Nuevo Equipo'}
            </h1>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-soft p-6">
                {error && (
                    <p className="text-sm text-danger bg-red-50 rounded-xl px-4 py-3 mb-5">{error}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Campo label="IMEI / Codigo Interno">
                        <input
                            required
                            value={form.imei}
                            onChange={(e) => handleChange('imei', e.target.value)}
                            className="input"
                        />
                    </Campo>

                    <Campo label="Modelo">
                        <select
                            value={form.modelo}
                            onChange={(e) => handleChange('modelo', e.target.value)}
                            className="input"
                        >
                            {MODELOS.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </Campo>

                    <Campo label="Capacidad">
                        <select
                            value={form.capacidad}
                            onChange={(e) => handleChange('capacidad', e.target.value)}
                            className="input"
                        >
                            {CAPACIDADES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </Campo>

                    <Campo label="Color">
                        <input
                            value={form.color || ''}
                            onChange={(e) => handleChange('color', e.target.value)}
                            className="input"
                        />
                    </Campo>

                    <Campo label="Salud de Bateria (%)">
                        <input
                            type="number"
                            min={1}
                            max={100}
                            required
                            value={form.salud_bateria}
                            onChange={(e) => handleChange('salud_bateria', e.target.value)}
                            className="input"
                        />
                    </Campo>

                    <Campo label="Estado">
                        <select
                            value={form.estado}
                            onChange={(e) => handleChange('estado', e.target.value)}
                            className="input"
                        >
                            <option value="disponible">Disponible</option>
                            <option value="en_reparacion">En Reparacion</option>
                            <option value="vendido">Vendido</option>
                        </select>
                    </Campo>

                    <Campo label="Precio de Compra">
                        <input
                            type="number"
                            step="0.01"
                            min={0}
                            required
                            value={form.precio_compra}
                            onChange={(e) => handleChange('precio_compra', e.target.value)}
                            className="input"
                        />
                    </Campo>

                    <Campo label="Precio de Venta Sugerido">
                        <input
                            type="number"
                            step="0.01"
                            min={0}
                            required
                            value={form.precio_venta_sugerido}
                            onChange={(e) => handleChange('precio_venta_sugerido', e.target.value)}
                            className="input"
                        />
                    </Campo>
                </div>

                <div className="flex items-center gap-3 mt-7">
                    <button
                        type="submit"
                        disabled={guardando}
                        className="bg-accent hover:bg-accent-dark disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                    >
                        Guardar Equipo
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/inventario')}
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
