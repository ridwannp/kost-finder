import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { LOCATIONS } from '../../data/locations';

export default function SearchBar({
  initialQuery = '',
  initialLocation = 'all',
  onSearch,
  className = ''
}) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query, location });
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch({ query: '', location });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-2 rounded-2xl border border-slate-200 shadow-lg shadow-slate-100/80 flex flex-col md:flex-row items-stretch gap-2 ${className}`}
    >
      {/* Search Input */}
      <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl md:rounded-none">
        <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama kost, jalan, atau daerah sekitar IPB..."
          className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="hidden md:block w-px bg-slate-200 my-2" />

      {/* Location Selector */}
      <div className="relative flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl md:rounded-none min-w-[200px]">
        <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mr-2" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent text-slate-800 text-sm font-medium focus:outline-none cursor-pointer"
        >
          <option value="all">Semua Area IPB</option>
          {LOCATIONS.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 shrink-0 flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" />
        <span>Cari Kost</span>
      </button>
    </form>
  );
}
