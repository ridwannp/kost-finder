import React, { useEffect } from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200">
      <div className="mt-auto w-full bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-lg">Filter Kost</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            aria-label="Tutup Filter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onReset}
          />
        </div>

        {/* Footer Apply CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="px-4 py-3 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Tampilkan ({totalResults}) Hasil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
