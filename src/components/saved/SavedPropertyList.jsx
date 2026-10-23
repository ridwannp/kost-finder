import React from 'react';
import { Link } from 'react-router-dom';
import { Columns3, AlertCircle, X } from 'lucide-react';
import SavedPropertyCard from './SavedPropertyCard';

export default function SavedPropertyList({
  properties = [],
  selectedIds = [],
  onToggleSelect,
  onRemove,
  getMatchData,
  warningMessage,
  onClearWarning
}) {
  const selectedCount = selectedIds.length;

  return (
    <div className="space-y-6">
      {/* Warning Alert if user selects more than 4 properties */}
      {warningMessage && (
        <div
          role="alert"
          className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-amber-900 text-xs font-semibold animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{warningMessage}</span>
          </div>
          <button
            type="button"
            onClick={onClearWarning}
            className="p-1 hover:bg-amber-100 rounded-lg text-amber-700"
            aria-label="Tutup peringatan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid of Saved Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {properties.map((property, idx) => (
          <div
            key={property.id}
            className="animate-slide-up"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <SavedPropertyCard
              property={property}
              isSelected={selectedIds.includes(String(property.id))}
              onToggleSelect={onToggleSelect}
              onRemove={onRemove}
              matchData={getMatchData ? getMatchData(property) : null}
            />
          </div>
        ))}
      </div>

      {/* Sticky Bottom Action Bar when at least 2 properties selected */}
      {selectedCount >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-slide-up">
          <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 pl-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                {selectedCount}
              </div>
              <div>
                <div className="text-xs font-extrabold text-white">
                  {selectedCount} Kos Terpilih
                </div>
                <div className="text-[11px] text-slate-400">
                  Maksimal 4 pilihan untuk perbandingan optimal
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/compare"
                className="px-5 py-2.5 bg-[#2D5A47] hover:bg-[#3a7060] text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-[#2D5A47]/30 flex items-center gap-2 transition-all hover:scale-102"
              >
                <Columns3 className="w-4 h-4" />
                <span>Bandingkan {selectedCount} kos</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
