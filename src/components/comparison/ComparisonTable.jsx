import React from 'react';
import {
  Tag,
  MapPin,
  Building,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  SlidersHorizontal
} from 'lucide-react';
import ComparisonRow from './ComparisonRow';
import { hasFieldDifference } from '../../utils/propertyComparison';

export default function ComparisonTable({
  categories = [],
  properties = [],
  showDifferencesOnly = false,
  onToggleDifferencesOnly,
  priorityFields = []
}) {
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'price':
        return Tag;
      case 'location':
        return MapPin;
      case 'specs':
        return Building;
      case 'facilities':
        return CheckCircle2;
      case 'environment':
        return Sparkles;
      default:
        return HelpCircle;
    }
  };

  const isNoDifferences =
    showDifferencesOnly && categories.every((cat) => cat.fields.length === 0);

  const propertyCountText =
    properties.length === 2 ? 'Kedua pilihan ini' : 'Semua pilihan ini';

  return (
    <div className="space-y-6">
      {/* Toggle Bar: Highlight Differences */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2D5A47]" />
            <span>Mode Perbandingan</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Fokuskan pandangan pada aspek spesifikasi yang berbeda di antara kos yang dipilih.
          </p>
        </div>

        {/* Toggle Switch */}
        <label className="inline-flex items-center gap-2.5 cursor-pointer self-start sm:self-auto select-none">
          <input
            type="checkbox"
            checked={showDifferencesOnly}
            onChange={(e) => onToggleDifferencesOnly(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D5A47] relative"></div>
          <span className="text-xs font-bold text-slate-700 peer-checked:text-[#2D5A47]">
            Tunjukkan perbedaan saja
          </span>
        </label>
      </div>

      {/* No Difference Message (Section 10 specification) */}
      {isNoDifferences ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-2">
          <p className="text-sm font-extrabold text-slate-800">
            {propertyCountText} memiliki informasi yang sama pada kategori yang dibandingkan.
          </p>
          <p className="text-xs text-slate-500">
            Coba matikan toggle "Tunjukkan perbedaan saja" untuk melihat seluruh spesifikasi lengkap.
          </p>
        </div>
      ) : (
        /* Categorized Comparison Rows */
        <div className="space-y-6">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 space-y-3 shadow-2xs"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#EAF4EF] text-[#2D5A47] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                    {cat.title}
                  </h4>
                </div>

                {/* Category Field Rows */}
                <div className="space-y-1">
                  {cat.fields.map((field) => {
                    const diff = hasFieldDifference(properties, field);
                    const isPriority = priorityFields.includes(field.id);
                    return (
                      <ComparisonRow
                        key={field.id}
                        field={field}
                        properties={properties}
                        isDifferent={diff}
                        highlightField={isPriority}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
