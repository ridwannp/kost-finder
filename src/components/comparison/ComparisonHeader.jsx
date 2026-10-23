import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, MapPin, Heart } from 'lucide-react';
import { formatRupiah, formatDistance } from '../../utils/formatters';

export default function ComparisonHeader({
  properties = [],
  onRemoveFromComparison,
  onRemoveFromSaved,
  isPropertySaved,
  matchScores = {}
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_repeat(auto-fit,minmax(220px,1fr))] lg:grid-cols-[220px_repeat(auto-fit,minmax(240px,1fr))] gap-4 items-stretch border-b border-slate-200 pb-6">
      {/* Category Col Header Title on Desktop */}
      <div className="hidden md:flex flex-col justify-end pb-3 text-slate-500 font-bold text-xs uppercase tracking-wider">
        <span>Kategori Spesifikasi</span>
      </div>

      {/* Property Column Headers */}
      {properties.map((property) => {
        const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80';
        const saved = isPropertySaved ? isPropertySaved(property.id) : false;
        const match = matchScores[property.id];

        return (
          <div
            key={property.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between shadow-2xs relative group"
          >
            {/* Top Image & Remove Action */}
            <div className="space-y-3">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={mainImage}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />

                {/* Remove from comparison button */}
                <button
                  type="button"
                  onClick={() => onRemoveFromComparison(property.id)}
                  aria-label={`Hapus ${property.name} dari perbandingan`}
                  className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors shadow-xs"
                  title="Hapus dari perbandingan"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Gender Pill */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                  {property.gender === 'putri'
                    ? 'Khusus Putri'
                    : property.gender === 'putra'
                    ? 'Khusus Putra'
                    : 'Campur'}
                </div>
              </div>

              {/* Title & Key Subtext */}
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 line-clamp-1 leading-snug">
                  {property.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-[#2D5A47] shrink-0" />
                  <span className="truncate">{property.location?.areaName || 'Dramaga'}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-700 shrink-0">
                    {formatDistance(property.distanceFromIPB)}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-base sm:text-lg font-black text-[#2D5A47]">
                {formatRupiah(property.priceMin || property.pricing?.min)}
                <span className="text-xs font-normal text-slate-500"> / bulan</span>
              </div>

              {/* Match Score Indicator (if profile active) */}
              {match && typeof match.score === 'number' && (
                <div className="p-2 bg-[#EAF4EF] rounded-xl border border-[#2D5A47]/15 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#2D5A47]">{match.score}% Cocok</span>
                  <span className="text-[10px] text-slate-600 font-semibold">{match.label}</span>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-3">
              {saved && (
                <button
                  type="button"
                  onClick={() => onRemoveFromSaved(property.id)}
                  className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition-colors"
                  title="Hapus dari daftar simpan"
                >
                  Hapus simpan
                </button>
              )}

              <Link
                to={`/kost/${property.slug || property.id}`}
                className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 bg-[#2D5A47] hover:bg-[#234939] text-white text-[11px] font-bold rounded-xl transition-all shadow-2xs"
              >
                <span>Lihat detail</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
