export default function MetricCard({ icon: Icon, label, value }) {
    return (
        <div className="bg-card rounded-2xl shadow-soft p-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Icon size={18} className="text-accent" />
            </div>
            <p className="text-sm text-neutral-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-neutral-900">{value}</p>
        </div>
    );
}
