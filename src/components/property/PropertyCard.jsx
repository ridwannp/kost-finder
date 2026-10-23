import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, ArrowRight, Sparkles, Wifi, Wind, Bath, Bike, Utensils } from 'lucide-react';
import { useSavedKost } from '../../context/SavedKostContext';
import { formatRupiah, formatDistance } from '../../utils/formatters';

export default function PropertyCard({ property, matchScore }) {
  const { isSaved, toggleSave } = useSavedKost();
  const saved = isSaved(property.id);

  const displayScore = matchScore || property.matchScore;
  const mainSuitableTag = property.suitableFor?.[0] || 'Cocok untuk mahasiswa IPB';

  const renderFacilityIcon = (chipText) => {
    const text = (chipText || '').toLowerCase();
    if (text.includes('ac')) return <Wind className="w-3.5 h-3.5 text-slate-500" />;
    if (text.includes('wifi')) return <Wifi className="w-3.5 h-3.5 text-slate-500" />;
    if (text.includes('kamar mandi') || text.includes('km')) return <Bath className="w-3.5 h-3.5 text-slate-500" />;
    if (text.includes('parkir')) return <Bike className="w-3.5 h-3.5 text-slate-500" />;
    if (text.includes('dapur')) return <Utensils className="w-3.5 h-3.5 text-slate-500" />;
    return null;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Property Image & Badges */}
        <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Left Badge */}
          {displayScore ? (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#2D5A47] text-white text-[11px] font-extrabold rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{displayScore}% Cocok untuk kamu</span>
            </div>
          ) : property.badge === 'Rekomendasi' ? (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#2D5A47] text-white text-[11px] font-bold rounded-full shadow-xs flex items-center gap-1">
              <span>🎓</span> Rekomendasi
            </div>
          ) : property.badge === 'Populer' ? (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#FDF6E2] border border-[#F3E2B4] text-[#8C6B1B] text-[11px] font-bold rounded-full shadow-xs flex items-center gap-1">
              <span>⚙</span> Populer
            </div>
          ) : null}

          {/* Top Right Heart Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(property.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-xs hover:scale-110 transition-all"
            aria-label="Simpan kos"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2.5">
          {/* Personality / Environment Tagline */}
          <div className="text-[11px] font-bold text-[#2D5A47] bg-[#EAF4EF] px-2.5 py-1 rounded-lg inline-block truncate max-w-full">
            {mainSuitableTag}
          </div>

          {/* Title */}
          <Link to={`/kost/${property.slug || property.id}`} className="block">
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#2D5A47] transition-colors line-clamp-1">
              {property.name}
            </h3>
          </Link>

          {/* Location & Distance */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{property.location?.areaName || property.location}</span>
            </div>
            <div className="shrink-0 font-medium text-slate-600">
              {formatDistance(property.distanceFromIPB)}
            </div>
          </div>

          {/* Key Facilities Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {(property.facilityChips || ['WiFi', 'AC', 'Kamar Mandi Dalam']).map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 border border-slate-200/80 rounded-lg text-[11px] font-medium text-slate-600"
              >
                {renderFacilityIcon(chip)}
                <span>{chip}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 pb-4 pt-3 flex items-center justify-between border-t border-slate-100 mt-1">
        <div>
          <span className="text-base font-extrabold text-[#2D5A47]">
            {formatRupiah(property.pricing?.min || property.priceMin)}
          </span>
          <span className="text-xs font-normal text-slate-500"> / bulan</span>
        </div>

        <Link
          to={`/kost/${property.slug || property.id}`}
          className="text-xs font-bold text-slate-700 hover:text-[#2D5A47] flex items-center gap-1 transition-colors"
        >
          <span>Lihat kos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
