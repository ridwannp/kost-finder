import React from 'react';
import {
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  DollarSign,
  User,
  Navigation,
  Wind,
  Wifi,
  Bath,
  Bike,
  Shirt,
  Bed,
  Check
} from 'lucide-react';
import { LOCATIONS, GENDER_TYPES } from '../../data/locations';

export default function FilterSidebar({ filters, onFilterChange, onReset }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleCheckboxChange = (key) => {
    onFilterChange({ ...filters, [key]: !filters[key] });
  };

  const activeCount = [
    filters.location !== 'all' && filters.location,
    filters.gender !== 'all' && filters.gender,
    filters.minPrice,
    filters.maxPrice,
    filters.maxDistance,
    filters.ac,
    filters.wifi,
    filters.bathroomInside,
    filters.parking,
    filters.laundry,
    filters.furnished
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EAF4EF] text-[#2D5A47] flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Filter Kos</h3>
            <p className="text-[11px] text-slate-500 font-medium">Sesuaikan kriteria impianmu</p>
          </div>
        </div>

        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-lg transition-all duration-200 animate-fade-in"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset ({activeCount})</span>
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#2D5A47]" />
          <span>Lokasi Sekitar IPB</span>
        </label>

        <div className="relative">
          <select
            value={filters.location || 'all'}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2D5A47]/20 focus:border-[#2D5A47] transition-all cursor-pointer"
          >
            <option value="all">Semua Area Lokasi</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gender Preference */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#2D5A47]" />
          <span>Tipe Gender Kos</span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          {GENDER_TYPES.map((gt) => {
            const isSelected = (filters.gender || 'all') === gt.id;
            return (
              <button
                key={gt.id}
                type="button"
                onClick={() => handleChange('gender', gt.id)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#EAF4EF] text-[#2D5A47] border-[#2D5A47] shadow-2xs scale-102'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{gt.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#2D5A47] stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Monthly Budget Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#2D5A47]" />
            <span>Anggaran Bulanan (Rp)</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Minimal</span>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              placeholder="e.g. 800000"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2D5A47] transition-all"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Maksimal</span>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              placeholder="e.g. 2000000"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2D5A47] transition-all"
            />
          </div>
        </div>

        {/* Quick Budget Presets */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { label: '< 1 Juta', max: 1000000 },
            { label: '1 - 1.5 Juta', min: 1000000, max: 1500000 },
            { label: '1.5 - 2 Juta', min: 1500000, max: 2000000 },
            { label: '> 2 Juta', min: 2000000 }
          ].map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                handleChange('minPrice', b.min || '');
                handleChange('maxPrice', b.max || '');
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-[#EAF4EF] hover:text-[#2D5A47] text-slate-600 rounded-lg text-[11px] font-bold transition-all duration-150"
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Distance to IPB */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#2D5A47]" />
            <span>Jarak ke Kampus IPB</span>
          </label>
          {filters.maxDistance && (
            <span className="text-[11px] font-extrabold text-[#2D5A47] bg-[#EAF4EF] px-2 py-0.5 rounded-full">
              &lt;= {filters.maxDistance} km
            </span>
          )}
        </div>

        <select
          value={filters.maxDistance || ''}
          onChange={(e) => handleChange('maxDistance', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#2D5A47] cursor-pointer transition-all"
        >
          <option value="">Semua Jarak Jangkauan</option>
          <option value="0.8">Jalan Kaki (&lt; 800m)</option>
          <option value="1.5">Dekat Kampus (&lt; 1.5 km)</option>
          <option value="2.5">&lt; 2.5 km</option>
          <option value="4.0">&lt; 4 km</option>
        </select>
      </div>

      {/* Key Facilities Custom Cards */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
          Fasilitas Penting
        </label>

        <div className="space-y-2">
          {[
            { id: 'ac', label: 'AC (Air Conditioner)', icon: Wind },
            { id: 'wifi', label: 'Wi-Fi Internet', icon: Wifi },
            { id: 'bathroomInside', label: 'Kamar Mandi Dalam', icon: Bath },
            { id: 'parking', label: 'Parkir Motor / Mobil', icon: Bike },
            { id: 'laundry', label: 'Layanan Laundry', icon: Shirt },
            { id: 'furnished', label: 'Kasur & Lemari (Furnished)', icon: Bed }
          ].map((item) => {
            const Icon = item.icon;
            const checked = !!filters[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleCheckboxChange(item.id)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  checked
                    ? 'bg-[#EAF4EF] border-[#2D5A47] text-[#2D5A47] font-bold shadow-2xs scale-101'
                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 text-xs">
                  <div
                    className={`p-1.5 rounded-xl ${
                      checked ? 'bg-[#2D5A47] text-white' : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                    checked ? 'bg-[#2D5A47] border-[#2D5A47] text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
