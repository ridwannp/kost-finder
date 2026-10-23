import React from 'react';
import { Check, X, HelpCircle } from 'lucide-react';

export default function ComparisonRow({
  field,
  properties = [],
  isDifferent = false,
  highlightField = false
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[200px_repeat(auto-fit,minmax(220px,1fr))] lg:grid-cols-[220px_repeat(auto-fit,minmax(240px,1fr))] gap-4 py-3.5 px-4 rounded-2xl transition-colors items-center ${
        highlightField
          ? 'bg-amber-50/70 border border-amber-200/60'
          : isDifferent
          ? 'bg-emerald-50/40 hover:bg-emerald-50/60'
          : 'hover:bg-slate-50'
      }`}
    >
      {/* Field Label on Left Column */}
      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
        <span>{field.label}</span>
        {isDifferent && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" title="Ada perbedaan" />
        )}
      </div>

      {/* Property Column Value Cells */}
      {properties.map((property) => {
        const rawVal = field.getValue(property);
        const formatted = field.format ? field.format(rawVal) : String(rawVal ?? '-');

        // Render boolean facility values nicely
        const isFacility = typeof rawVal === 'boolean' || rawVal === null;

        return (
          <div
            key={property.id}
            className="text-xs text-slate-700 flex items-center justify-between md:justify-start gap-2 pt-1 md:pt-0 border-t md:border-t-0 border-slate-100"
          >
            {/* Mobile-only label preview */}
            <span className="md:hidden text-[11px] font-semibold text-slate-400">
              {field.label}:
            </span>

            {isFacility && rawVal === true && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                <span>Ada</span>
              </span>
            )}

            {isFacility && rawVal === false && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 font-medium text-[11px]">
                <X className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
                <span>Tidak tersedia</span>
              </span>
            )}

            {isFacility && rawVal === null && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Belum diketahui</span>
              </span>
            )}

            {!isFacility && (
              <span className="font-semibold text-slate-800">
                {formatted}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
