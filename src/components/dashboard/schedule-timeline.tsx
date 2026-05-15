import { Clock, MapPin } from "lucide-react";

type Item = {
  id: string;
  time: string;
  patientName: string;
  serviceName: string;
  address: string;
};

export function ScheduleTimeline({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
        <p className="text-sm font-semibold text-slate-700">Tidak ada jadwal</p>
        <p className="mt-1 text-xs text-slate-500">Jadwal kunjungan berikutnya akan tampil di sini.</p>
      </div>
    );
  }

  return (
    <ol className="relative space-y-3 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-3">
          <span
            className={`relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
              index === 0
                ? "border-teal-500 bg-white text-teal-600"
                : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            <Clock className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-white p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold text-slate-950">{item.patientName}</p>
              <span className="shrink-0 rounded-md bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {item.time}
              </span>
            </div>
            <p className="mt-1 truncate text-xs text-slate-600">{item.serviceName}</p>
            <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-500">
              <MapPin className="h-3 w-3" />
              {item.address}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
