import React from 'react';
import { MapPin, Navigation, Compass, Info } from 'lucide-react';

/**
 * Reusable LocationMap component.
 * Serves as a high-fidelity placeholder designed to seamlessly accept
 * Leaflet / Google Maps / Mapbox SDK props in future backend phases.
 */
export default function LocationMap({
  location,
  latitude,
  longitude,
  distanceFromIPB,
  propertyName
}) {
  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${propertyName} ${location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 group">
      {/* Decorative Mock Map Canvas */}
      <div className="relative h-64 sm:h-80 w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Stylized Grid Lines representing Dramaga IPB area map */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#047857" strokeWidth="3" strokeDasharray="6 6" />
            <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="50%" cy="50%" r="90" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* IPB Dramaga Campus Landmark Marker */}
        <div className="absolute top-1/4 left-1/4 flex flex-col items-center group/ipb">
          <div className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-md shadow-lg flex items-center gap-1">
            <Compass className="w-3 h-3" />
            IPB Dramaga
          </div>
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-md animate-ping mt-1" />
        </div>

        {/* Distance connection line effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full">
            <path
              d="M 120 80 Q 200 120 280 150"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="5 5"
            />
          </svg>
        </div>

        {/* Property Location Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-xl flex items-center gap-1.5 animate-bounce">
            <MapPin className="w-3.5 h-3.5" />
            <span className="max-w-[140px] truncate">{propertyName || 'Lokasi Kost'}</span>
          </div>
          <div className="w-3 h-3 bg-rose-600 rotate-45 -mt-1 shadow-sm" />
          <div className="w-6 h-2 bg-slate-950/60 rounded-full blur-xs mt-0.5" />
        </div>

        {/* Bottom Location Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/85 backdrop-blur-md rounded-xl border border-slate-700/60 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-[280px]">
                {location}
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">
                ~{distanceFromIPB} km ke Kampus IPB Dramaga
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenGoogleMaps}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
          >
            Google Maps
          </button>
        </div>
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
        <Info className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          Peta interaktif Leaflet / Mapbox siap diintegrasikan pada fase selanjutnya. Koordinat: ({latitude}, {longitude}).
        </span>
      </div>
    </div>
  );
}
