import React from 'react';
import {
  Wifi,
  Wind,
  Bath,
  Flame,
  Bed,
  BookOpen,
  Bike,
  Car,
  Shirt,
  Utensils,
  Refrigerator,
  Users,
  ShieldCheck,
  Key,
  CheckCircle2
} from 'lucide-react';
import { FACILITY_MAP } from '../../data/facilities';

const iconMap = {
  Wifi,
  Wind,
  Bath,
  Flame,
  Bed,
  BookOpen,
  Bike,
  Car,
  Shirt,
  Utensils,
  Refrigerator,
  Users,
  ShieldCheck,
  Key
};

export default function FacilityList({ facilities = [], compact = false, limit }) {
  const displayFacilities = limit ? facilities.slice(0, limit) : facilities;

  return (
    <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-2 sm:grid-cols-3 gap-3'}`}>
      {displayFacilities.map((facId) => {
        const fac = FACILITY_MAP[facId] || { name: facId, icon: 'CheckCircle2' };
        const IconComponent = iconMap[fac.icon] || CheckCircle2;

        if (compact) {
          return (
            <div key={facId} className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
              <IconComponent className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{fac.name}</span>
            </div>
          );
        }

        return (
          <div
            key={facId}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-sm font-medium"
          >
            <div className="p-1.5 rounded-lg bg-emerald-100/60 text-emerald-700">
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="truncate">{fac.name}</span>
          </div>
        );
      })}

      {limit && facilities.length > limit && (
        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium pt-0.5">
          +{facilities.length - limit} fasilitas lainnya
        </div>
      )}
    </div>
  );
}
