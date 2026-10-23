import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Home, Columns3, Compass } from 'lucide-react';
import SEO from '../../components/common/SEO';
import SavedEmptyState from '../../components/saved/SavedEmptyState';
import SavedPropertyList from '../../components/saved/SavedPropertyList';
import { useSavedKost } from '../../context/SavedKostContext';
import { useStudentProfile } from '../../context/StudentProfileContext';
import { usePropertyComparison } from '../../hooks/usePropertyComparison';
import { propertyService } from '../../services/propertyService';
import { matchPropertyToProfile } from '../../utils/matching';

export default function SavedPage() {
  const { savedIds, removeSaved } = useSavedKost();
  const { profile } = useStudentProfile();
  const {
    comparisonIds,
    toggleComparison,
    warningMessage,
    clearWarning,
    reconcileWithProperties
  } = usePropertyComparison();

  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load properties corresponding to saved IDs
  useEffect(() => {
    async function loadSaved() {
      setLoading(true);
      try {
        const allProps = await propertyService.getProperties({});
        // Preserve saved order while filtering valid properties
        const idMap = new Map(allProps.map((p) => [String(p.id), p]));
        const ordered = savedIds
          .map((id) => idMap.get(String(id)))
          .filter(Boolean);

        setSavedProperties(ordered);
        reconcileWithProperties(allProps);
      } catch (err) {
        console.error('Failed loading saved properties:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, [savedIds, reconcileWithProperties]);

  // Match calculator (only if student profile exists with preferences)
  const getMatchData = useMemo(() => {
    if (!profile || (!profile.budgetMax && !profile.environmentPref && !profile.facilities?.length)) {
      return null;
    }
    return (property) => {
      const prefs = profile.preferences || profile;
      return matchPropertyToProfile(property, prefs);
    };
  }, [profile]);

  return (
    <>
      <SEO
        title="Kos yang Kamu Simpan - Ngekost IPB"
        description="Daftar kos yang kamu simpan di sekitar kampus IPB Dramaga. Kumpulkan dan bandingkan beberapa pilihan."
      />

      <div className="bg-[#FAF9F6] min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Home className="w-3.5 h-3.5 text-[#2D5A47]" />
          <Link to="/" className="hover:underline">Beranda</Link>
          <span>/</span>
          <span className="text-[#2D5A47] font-bold">Kos yang kamu simpan</span>
        </div>

        {/* Section Header (Specifications Section 5) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Kos yang kamu simpan
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF4EF] text-[#2D5A47] text-xs font-extrabold border border-[#2D5A47]/15">
                {savedProperties.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Kumpulkan beberapa pilihan dulu. Kamu nggak harus langsung memutuskan.
            </p>
          </div>

          {/* Quick links when properties exist */}
          {savedProperties.length > 0 && (
            <div className="flex items-center gap-2">
              {comparisonIds.length >= 2 && (
                <Link
                  to="/compare"
                  className="px-4 py-2 bg-[#2D5A47] hover:bg-[#234939] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span>Buka Perbandingan ({comparisonIds.length})</span>
                </Link>
              )}
              <Link
                to="/kost"
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Cari Kos Lain</span>
              </Link>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 bg-white rounded-3xl border border-slate-200/80 animate-pulse p-6 space-y-4"
              >
                <div className="h-44 bg-slate-200 rounded-2xl" />
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                <div className="h-4 bg-slate-200 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : savedProperties.length === 0 ? (
          <SavedEmptyState />
        ) : (
          <SavedPropertyList
            properties={savedProperties}
            selectedIds={comparisonIds}
            onToggleSelect={toggleComparison}
            onRemove={removeSaved}
            getMatchData={getMatchData}
            warningMessage={warningMessage}
            onClearWarning={clearWarning}
          />
        )}
      </div>
    </>
  );
}
