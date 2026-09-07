import { BatteryFull, BatteryWarning } from 'lucide-react';

export default function BadgeBateria({ valor }) {
    const bueno = Number(valor) > 85;
    const Icon = bueno ? BatteryFull : BatteryWarning;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bueno ? 'bg-green-50 text-ok' : 'bg-orange-50 text-warn'
                }`}
        >
            <Icon size={14} />
            {valor}%
        </span>
    );
}
