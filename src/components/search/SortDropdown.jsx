import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function SortDropdown({ value, onChange }) {
  const options = [
    { value: 'recommended', label: 'Rekomendasi Terbaik' },
    { value: 'lowest_price', label: 'Harga Termurah' },
    { value: 'closest', label: 'Terdekat dari IPB' },
    { value: 'highest_rated', label: 'Rating Tertinggi' }
  ];

  return (
    <div className="relative flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-2xs"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Urutkan: {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
