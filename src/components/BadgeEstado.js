const estilos = {
    disponible: 'bg-green-50 text-ok',
    vendido: 'bg-neutral-100 text-neutral-500',
    en_reparacion: 'bg-orange-50 text-warn',
};

const etiquetas = {
    disponible: 'Disponible',
    vendido: 'Vendido',
    en_reparacion: 'En reparacion',
};

export default function BadgeEstado({ estado }) {
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${estilos[estado] || 'bg-neutral-100 text-neutral-500'}`}>
            {etiquetas[estado] || estado}
        </span>
    );
}
