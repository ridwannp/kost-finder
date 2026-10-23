import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Wifi,
  Wind,
  Bath,
  Check
} from 'lucide-react';
import { formatRupiah, formatDistance } from '../../utils/formatters';

export default function SavedPropertyCard({
  property,
  isSelected,
  onToggleSelect,
  onRemove,
  matchData
}) {
  if (!property) return null;

  const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80';
  const price = property.priceMin || property.pricing?.min || 0;
  const area = property.location?.areaName || property.location?.area || 'Dramaga, Bogor';

  // Environment summary phrase
  const quietScore = property.personality?.quiet ?? 3;
  const envSummary =
    quietScore >= 4
      ? 'Lingkungan tenang, sangat cocok untuk fokus belajar'
      : quietScore <= 2
      ? 'Suasana komunal & aktif, mudah bersosialisasi'
      : 'Suasana seimbang dan nyaman untuk istirahat';

  return (
    <div
      className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-2xs ${
        isSelected
          ? 'border-[#2D5A47] ring-2 ring-[#2D5A47]/20 shadow-md'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div>
        {/* Top Image & Selection Checkbox Bar */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
          <img
            src={mainImage}
            alt={property.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

          {/* Selection Checkbox (Top Left) */}
          <div className="absolute top-3 left-3 z-10">
            <button
              type="button"
              onClick={() => onToggleSelect(property.id)}
              aria-label={`Pilih ${property.name} untuk dibandingkan`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                isSelected
                  ? 'bg-[#2D5A47] text-white ring-2 ring-white'
                  : 'bg-white/95 text-slate-700 hover:bg-white'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  isSelected ? 'bg-white border-white text-[#2D5A47]' : 'border-slate-400 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] text-[#2D5A47]" />}
              </div>
              <span>{isSelected ? 'Terpilih' : 'Pilih Banding'}</span>
            </button>
          </div>

          {/* Remove from Saved (Top Right) */}
          <div className="absolute top-3 right-3 z-10">
            <button
              type="button"
              onClick={() => onRemove(property.id)}
              aria-label={`Hapus ${property.name} dari daftar simpan`}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-600 transition-colors shadow-xs"
              title="Hapus dari daftar simpan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Tags over image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs font-semibold text-[11px]">
                {property.gender === 'putri'
                  ? 'Khusus Putri'
                  : property.gender === 'putra'
                  ? 'Khusus Putra'
                  : 'Campur'}
              </span>
              {property.verified && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-xs text-emerald-300 font-semibold text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Terverifikasi
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Match Score Badge (Only when profile & matchData exists) */}
          {matchData && typeof matchData.score === 'number' && (
            <div className="flex items-center justify-between p-2.5 bg-[#EAF4EF] rounded-2xl border border-[#2D5A47]/15">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#2D5A47]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{matchData.score}% Match dengan Kebutuhanmu</span>
              </div>
              <span className="text-[11px] text-slate-600 font-medium hidden sm:inline">
                {matchData.score >= 80 ? 'Kecocokan Tinggi' : 'Cukup Cocok'}
              </span>
            </div>
          )}

          {/* Title & Location */}
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-1">
              {property.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#2D5A47] shrink-0" />
              <span className="truncate">{area}</span>
              <span>·</span>
              <span className="font-semibold text-slate-700 shrink-0">
                {formatDistance(property.distanceFromIPB)}
              </span>
            </div>
          </div>

          {/* Price */}
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-[#2D5A47]">
              {formatRupiah(price)}
              <span className="text-xs font-normal text-slate-500"> / bulan</span>
            </div>
          </div>

          {/* Key Facilities Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
            {property.facilities?.includes('wifi') && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                <Wifi className="w-3 h-3 text-slate-500" /> WiFi
              </span>
            )}
            {property.facilities?.includes('ac') && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                <Wind className="w-3 h-3 text-slate-500" /> AC
              </span>
            )}
            {(property.facilities?.includes('bathroom_inside') || property.facilities?.includes('private_bathroom')) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                <Bath className="w-3 h-3 text-slate-500" /> KM Dalam
              </span>
            )}
          </div>

          {/* Environment Summary Phrase */}
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            "{envSummary}"
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
        <button
          type="button"
          onClick={() => onRemove(property.id)}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors p-2"
        >
          Hapus
        </button>

        <Link
          to={`/kost/${property.slug || property.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D5A47] hover:bg-[#234939] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          <span>Lihat detail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
