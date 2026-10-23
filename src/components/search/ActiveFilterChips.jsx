import React from 'react';
import { X } from 'lucide-react';
import { LOCATIONS, GENDER_TYPES } from '../../data/locations';

export default function ActiveFilterChips({ filters, onRemoveFilter, onClearAll }) {
  const chips = [];

  if (filters.query) {
    chips.push({
      key: 'query',
      label: `Pencarian: "${filters.query}"`
    });
  }

  if (filters.location && filters.location !== 'all') {
    const loc = LOCATIONS.find((l) => l.id === filters.location);
    chips.push({
      key: 'location',
      label: `Lokasi: ${loc ? loc.name : filters.location}`
    });
  }

  if (filters.gender && filters.gender !== 'all') {
    const g = GENDER_TYPES.find((item) => item.id === filters.gender);
    chips.push({
      key: 'gender',
      label: `Gender: ${g ? g.name : filters.gender}`
    });
  }

  if (filters.minPrice || filters.maxPrice) {
    const minStr = filters.minPrice ? `Rp${(Number(filters.minPrice)/1000).toFixed(0)}k` : 'Rp0';
    const maxStr = filters.maxPrice ? `Rp${(Number(filters.maxPrice)/1000).toFixed(0)}k` : 'Tak Terbatas';
    chips.push({
      key: 'price',
      label: `Harga: ${minStr} - ${maxStr}`,
      removeKeys: ['minPrice', 'maxPrice']
    });
  }

  if (filters.maxDistance) {
    chips.push({
      key: 'maxDistance',
      label: `Jarak: <= ${filters.maxDistance} km`
    });
  }

  const facilityLabels = {
    ac: 'AC',
    wifi: 'Wi-Fi',
    bathroomInside: 'Kamar Mandi Dalam',
    parking: 'Parkir Motor/Mobil',
    laundry: 'Laundry',
    furnished: 'Furnished'
  };

  Object.keys(facilityLabels).forEach((facKey) => {
    if (filters[facKey]) {
      chips.push({
        key: facKey,
        label: facilityLabels[facKey]
      });
    }
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs font-semibold text-slate-500">Filter Aktif:</span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-semibold"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => {
              if (chip.removeKeys) {
                chip.removeKeys.forEach((k) => onRemoveFilter(k));
              } else {
                onRemoveFilter(chip.key);
              }
            }}
            className="p-0.5 hover:bg-emerald-200/60 rounded-full transition-colors"
            aria-label={`Hapus filter ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs text-slate-500 hover:text-rose-600 underline font-medium ml-1 transition-colors"
        >
          Hapus Semua
        </button>
      )}
    </div>
  );
}
