import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RefreshCw, Home, Compass, Sparkles } from 'lucide-react';
import SEO from '../../components/common/SEO';
import FilterSidebar from '../../components/search/FilterSidebar';
import MobileFilterDrawer from '../../components/search/MobileFilterDrawer';
import SortDropdown from '../../components/search/SortDropdown';
import ActiveFilterChips from '../../components/search/ActiveFilterChips';
import PropertyCard from '../../components/property/PropertyCard';
import Modal from '../../components/common/Modal';
import { propertyService } from '../../services/propertyService';
import { useSavedKost } from '../../context/SavedKostContext';
import { useStudentProfile } from '../../context/StudentProfileContext';

export default function KostListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedContactProperty, setSelectedContactProperty] = useState(null);

  const { savedIds } = useSavedKost();
  const { profile, getMatchForProperty } = useStudentProfile();

  const filters = {
    query: searchParams.get('query') || '',
    location: searchParams.get('location') || 'all',
    gender: searchParams.get('gender') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    maxDistance: searchParams.get('maxDistance') || '',
    ac: searchParams.get('ac') === 'true',
    wifi: searchParams.get('wifi') === 'true',
    bathroomInside: searchParams.get('bathroomInside') === 'true',
    parking: searchParams.get('parking') === 'true',
    laundry: searchParams.get('laundry') === 'true',
    furnished: searchParams.get('furnished') === 'true',
    sortBy: searchParams.get('sortBy') || 'recommended',
    savedOnly: searchParams.get('saved') === 'true'
  };

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const val = newFilters[key];
      if (val !== undefined && val !== null && val !== '' && val !== 'all' && val !== false) {
        params.set(key, val);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleRemoveFilterKey = (key) => {
    const next = { ...filters };
    delete next[key];
    updateFilters(next);
  };

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        let result = await propertyService.getProperties(filters);

        if (filters.savedOnly) {
          result = result.filter((p) => savedIds.includes(p.id));
        }

        setProperties(result);
      } catch (err) {
        console.error('Failed fetching property listings:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [searchParams, savedIds]);

  const handleOwnerWhatsApp = (property) => {
    if (!property?.owner?.whatsapp) return;
    const msg = encodeURIComponent(
      `Halo ${property.owner.name}, saya berminat dengan ${property.name} di Ngekost. Apakah ada info ketersediaan kamar?`
    );
    window.open(`https://wa.me/${property.owner.whatsapp}?text=${msg}`, '_blank');
  };

  const activeCount = Object.keys(filters).filter(
    (k) => filters[k] && filters[k] !== 'all' && filters[k] !== 'recommended'
  ).length;

  return (
    <>
      <SEO
        title="Semua kos di sekitar IPB - Ngekost"
        description="Bandingkan tempat tinggal di IPB Dramaga berdasarkan harga, lokasi, fasilitas, dan suasana."
      />

      <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs animate-slide-up flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Home className="w-3.5 h-3.5 text-[#2D5A47]" />
              <span>Beranda</span>
              <span>/</span>
              <span className="text-[#2D5A47] font-bold">Semua Kos IPB</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Semua kos di sekitar IPB
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              Bandingkan tempat tinggal berdasarkan harga, lokasi, fasilitas, dan suasana.
            </p>
          </div>

          {/* Quick Search Header Input */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => updateFilters({ ...filters, query: e.target.value })}
                placeholder="Cari nama kos atau lokasi..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2D5A47] focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 shrink-0 sticky top-24 animate-slide-up">
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Listing Content Right */}
          <div className="flex-1 w-full space-y-4">
            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 animate-fade-in">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-[#EAF4EF] hover:bg-[#DDF0E6] text-[#2D5A47] font-bold text-xs rounded-xl flex items-center gap-2 border border-[#2D5A47]/20 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter ({activeCount})</span>
              </button>

              <div className="text-xs sm:text-sm font-semibold text-slate-700">
                Menampilkan <span className="text-[#2D5A47] font-extrabold">{properties.length}</span> tempat kos
              </div>

              <SortDropdown
                value={filters.sortBy}
                onChange={(val) => updateFilters({ ...filters, sortBy: val })}
              />
            </div>

            {/* Active Filter Chips */}
            <ActiveFilterChips
              filters={filters}
              onRemoveFilter={handleRemoveFilterKey}
              onClearAll={handleResetFilters}
            />

            {/* Properties Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-80 bg-slate-200/60 animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-2xs max-w-lg mx-auto my-8 animate-slide-up">
                <div className="w-16 h-16 bg-[#EAF4EF] text-[#2D5A47] rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">Tidak Ada Kos Sesuai Filter</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Coba longgarkan atau reset beberapa kriteria filter seperti batasan harga, lokasi, atau fasilitas.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-[#2D5A47] hover:bg-[#234939] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Semua Filter</span>
                  </button>

                  <a
                    href="/find"
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#2D5A47]" />
                    <span>Gunakan Asisten Rekomendasi</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Properties Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {properties.map((property, idx) => {
                  const match = profile ? getMatchForProperty(property) : null;
                  return (
                    <div
                      key={property.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${idx * 70}ms` }}
                    >
                      <PropertyCard
                        property={property}
                        matchScore={match?.score}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={updateFilters}
        onReset={handleResetFilters}
        totalResults={properties.length}
      />

      {/* Owner Contact Modal */}
      {selectedContactProperty && (
        <Modal
          isOpen={!!selectedContactProperty}
          onClose={() => setSelectedContactProperty(null)}
          title={`Hubungi Pemilik: ${selectedContactProperty.name}`}
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500">Pemilik Properti:</div>
              <div className="text-base font-bold text-slate-900">
                {selectedContactProperty.owner?.name}
              </div>
              <div className="text-xs text-[#2D5A47] font-semibold">
                Tanggapan Cepat ({selectedContactProperty.owner?.responseRate})
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Menghubungi langsung via WhatsApp pemilik kos {selectedContactProperty.name}.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedContactProperty(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={() => handleOwnerWhatsApp(selectedContactProperty)}
                className="px-5 py-2.5 bg-[#2D5A47] text-white font-bold text-xs rounded-xl shadow-md"
              >
                Buka WhatsApp
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
