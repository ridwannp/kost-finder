import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bookmark, BookmarkCheck, Check, ArrowRight } from 'lucide-react';
import { useSavedKost } from '../../context/SavedKostContext';
import { getMatchLabel } from '../../utils/matching';

function formatRupiah(amount) {
  if (!amount) return null;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

const NOISE_MAP = {
  low:    { label: 'Tenang',      cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  medium: { label: 'Cukup ramai', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  high:   { label: 'Ramai',       cls: 'bg-orange-50 text-orange-700 border-orange-200' }
};

export default function RecommendationCard({ property, matchResult }) {
  const { isSaved, toggleSave } = useSavedKost();
  const [imgError, setImgError] = useState(false);

  const saved     = isSaved(property.id);
  const price     = property.pricing?.min || property.priceMin;
  const distance  = property.distanceFromIPB;
  const noise     = NOISE_MAP[property.environment?.noiseLevel] || null;
  const score     = matchResult?.score ?? 0;
  const reasons   = matchResult?.reasons ?? [];
  const tradeoffs = matchResult?.tradeoffs ?? [];

  const imageUrl = !imgError && property.images?.[0]
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=75';

  return (
    <article className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: '16/10' }}>
        <img
          src={imageUrl}
          alt={`Foto ${property.name}`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        {/* Save button */}
        <button
          onClick={() => toggleSave(property.id)}
          aria-label={saved ? `Hapus simpanan ${property.name}` : `Simpan ${property.name}`}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          {saved
            ? <BookmarkCheck className="w-4 h-4 text-slate-800" strokeWidth={2} />
            : <Bookmark className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
          }
        </button>
        {/* Match score badge on image */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold text-slate-900">{score}%</span>
          <span className="text-[10px] text-slate-500">{getMatchLabel(score)}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name + meta */}
        <div>
          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
            {property.name}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin className="w-3 h-3 shrink-0" />
              {property.location?.areaName || property.location?.area || '–'}
            </span>
            {distance && (
              <span className="text-[11px] text-slate-400">· {distance} km dari IPB</span>
            )}
            {noise && (
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${noise.cls}`}>
                {noise.label}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        {price && (
          <div className="text-sm">
            <span className="font-bold text-slate-900">{formatRupiah(price)}</span>
            <span className="text-xs text-slate-400 ml-1">/bulan</span>
          </div>
        )}

        {/* Reasons */}
        {reasons.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kenapa cocok?</p>
            {reasons.slice(0, 4).map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{r}</span>
              </div>
            ))}
          </div>
        )}

        {/* Trade-offs */}
        {tradeoffs.length > 0 && (
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Perlu dipertimbangkan</p>
            {tradeoffs.map((t, i) => (
              <p key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5 shrink-0">•</span>{t}
              </p>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <Link
            to={`/kost/${property.slug || property.id}`}
            className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Lihat detail <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => toggleSave(property.id)}
            aria-label={saved ? `Hapus simpanan ${property.name}` : `Simpan ${property.name}`}
            className="px-3 py-2 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50 transition-colors"
          >
            {saved ? '✓ Simpan' : 'Simpan'}
          </button>
        </div>
      </div>
    </article>
  );
}
