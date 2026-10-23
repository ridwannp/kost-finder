import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, RotateCcw, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { useStudentProfile } from '../../context/StudentProfileContext';
import { propertyService } from '../../services/propertyService';
import RecommendationCard from '../../components/matching/RecommendationCard';
import PreferenceSummary from '../../components/matching/PreferenceSummary';
import './recommendations.css';

// ─── Transparency Accordion ─────────────────────────────────────────────────
const CRITERIA = [
  { label: 'Budget', weight: 25 },
  { label: 'Fasilitas', weight: 20 },
  { label: 'Jarak ke IPB', weight: 20 },
  { label: 'Suasana', weight: 15 },
  { label: 'Privasi & sosial', weight: 10 },
  { label: 'Gaya hidup', weight: 10 }
];

function MatchTransparency() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-slate-700">Bagaimana kami menentukan kecocokan?</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-4 pb-5 border-t border-slate-100 pt-4 space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            Kami melihat hal-hal yang kamu anggap penting — budget, jarak, fasilitas, dan suasana tinggal — bukan sekadar harga termurah.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {CRITERIA.map(({ label, weight }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-28 shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D5A47] rounded-full"
                    style={{ width: `${weight}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500 w-7 text-right shrink-0">{weight}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sort Bar ───────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'score', label: 'Paling cocok' },
  { value: 'distance', label: 'Paling dekat' },
  { value: 'price', label: 'Paling hemat' }
];

// ─── Category label chip ────────────────────────────────────────────────────
const CATEGORY_META = {
  hemat:  { emoji: '💸', label: 'Lebih hemat',  desc: 'Harganya lebih rendah — cocok kalau budget adalah prioritasmu.' },
  dekat:  { emoji: '🚶', label: 'Lebih dekat',  desc: 'Jaraknya lebih dekat ke IPB, lebih efisien untuk mobilitas.' },
  sosial: { emoji: '🤝', label: 'Lebih sosial', desc: 'Suasana lebih hidup — cocok kalau kamu suka lingkungan ramai.' },
  nyaman: { emoji: '🏡', label: 'Lebih nyaman', desc: 'Fasilitas atau suasana lebih nyaman, walau mungkin ada trade-off.' }
};

function CategoryDivider({ catKey }) {
  const meta = CATEGORY_META[catKey] || { emoji: '📦', label: catKey, desc: '' };
  return (
    <div className="flex items-start gap-3 py-3 border-t border-slate-200 mt-2">
      <span className="text-2xl leading-none mt-0.5">{meta.emoji}</span>
      <div>
        <h3 className="text-sm font-bold text-slate-800">{meta.label}</h3>
        {meta.desc && <p className="text-xs text-slate-500 mt-0.5">{meta.desc}</p>}
      </div>
    </div>
  );
}

// ─── Top Pick Card (horizontal, larger) ─────────────────────────────────────
import { Bookmark, BookmarkCheck, Check, MapPin } from 'lucide-react';
import { useSavedKost } from '../../context/SavedKostContext';
import { getMatchLabel } from '../../utils/matching';

function formatRupiah(amount) {
  if (!amount) return null;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}

function TopPickCard({ property, matchResult }) {
  const { isSaved, toggleSave } = useSavedKost();
  const [imgError, setImgError] = useState(false);
  const saved = isSaved(property.id);
  const score = matchResult?.score ?? 0;
  const reasons = matchResult?.reasons ?? [];
  const tradeoffs = matchResult?.tradeoffs ?? [];
  const price = property.pricing?.min || property.priceMin;
  const distance = property.distanceFromIPB;
  const noiseLevel = property.environment?.noiseLevel;
  const imageUrl = !imgError && property.images?.[0]
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=75';

  const noiseMap = { low: 'Tenang', medium: 'Cukup ramai', high: 'Ramai' };

  return (
    <article className="bg-white border border-[#2D5A47]/30 rounded-2xl overflow-hidden shadow-sm">
      {/* Header strip */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#EAF4EF] border-b border-[#2D5A47]/20">
        <span className="text-sm">🏆</span>
        <span className="text-xs font-bold text-[#2D5A47] tracking-wide">Pilihan paling cocok buat kamu</span>
        <span className="ml-auto text-xs font-semibold text-[#2D5A47] bg-white border border-[#2D5A47]/30 px-2.5 py-0.5 rounded-full">
          {score}% · {getMatchLabel(score)}
        </span>
      </div>

      {/* Card body: side by side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Image */}
        <div className="md:col-span-2 relative overflow-hidden" style={{ minHeight: 200 }}>
          <img
            src={imageUrl}
            alt={`Foto ${property.name}`}
            loading="eager"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            style={{ minHeight: 200 }}
          />
          <button
            onClick={() => toggleSave(property.id)}
            aria-label={saved ? `Hapus simpanan ${property.name}` : `Simpan ${property.name}`}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            {saved
              ? <BookmarkCheck className="w-4 h-4 text-slate-800" strokeWidth={2} />
              : <Bookmark className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
            }
          </button>
        </div>

        {/* Info */}
        <div className="md:col-span-3 p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            {/* Name & meta */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">{property.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {property.location?.areaName || property.location?.area}
                </span>
                {distance && <><span className="text-slate-300">·</span><span>{distance} km dari IPB</span></>}
                {noiseLevel && (
                  <><span className="text-slate-300">·</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${noiseLevel === 'low' ? 'bg-emerald-50 text-emerald-700' : noiseLevel === 'high' ? 'bg-orange-50 text-orange-700' : 'bg-amber-50 text-amber-700'}`}>
                    {noiseMap[noiseLevel] || noiseLevel}
                  </span></>
                )}
              </div>
            </div>

            {/* Price */}
            {price && (
              <div>
                <span className="text-xl font-bold text-slate-900">{formatRupiah(price)}</span>
                <span className="text-xs text-slate-400 ml-1">/bulan</span>
              </div>
            )}

            {/* Reasons */}
            {reasons.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Kenapa cocok?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {reasons.slice(0, 6).map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={2.5} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trade-offs */}
            {tradeoffs.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Yang perlu dipertimbangkan</p>
                {tradeoffs.map((t, i) => (
                  <p key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">•</span>{t}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Link
              to={`/kost/${property.slug || property.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#2D5A47] text-white text-sm font-semibold rounded-lg hover:bg-[#234939] transition-colors"
            >
              Lihat detail <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => toggleSave(property.id)}
              className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
            >
              {saved ? 'Tersimpan ✓' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top pick skeleton */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse h-56" />
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} className="bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">
            <div className="bg-slate-200 h-40" />
            <div className="p-4 space-y-2.5">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="h-3 bg-slate-100 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Transition Screen ───────────────────────────────────────────────────────
function TransitionScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-xs">
        <div className="w-14 h-14 bg-[#EAF4EF] rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">🔍</span>
        </div>
        <p className="text-slate-700 font-semibold text-lg">Sebentar ya…</p>
        <p className="text-slate-500 text-sm">Kami lagi mencocokkan preferensimu dengan kos yang tersedia.</p>
      </div>
    </div>
  );
}

// ─── No Profile State ────────────────────────────────────────────────────────
function NoProfileState() {
  return (
    <>
      <SEO title="Rekomendasi Kos – Ngekost" />
      <div className="max-w-md mx-auto px-4 py-28 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-3xl">🧭</div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Belum tahu kamu cocoknya dengan kos yang seperti apa?</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Jawab beberapa pertanyaan singkat supaya kami bisa mencari tempat yang lebih cocok buat kamu.
          </p>
        </div>
        <Link to="/find" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D5A47] text-white text-sm font-semibold rounded-lg hover:bg-[#234939] transition-colors">
          Cari kos yang cocok buat aku
        </Link>
      </div>
    </>
  );
}

// ─── Alt Category Logic ──────────────────────────────────────────────────────
function getAltCategory(prop, topProp) {
  const topPrice = topProp?.pricing?.min || topProp?.priceMin || Infinity;
  const propPrice = prop.pricing?.min || prop.priceMin || 0;
  const topDist = topProp?.distanceFromIPB || 99;
  const propDist = prop.distanceFromIPB || 99;
  const propSocial = prop.personality?.social || 3;
  const propCommunity = prop.personality?.community || 3;

  if (propPrice < topPrice * 0.9) return 'hemat';
  if (propDist < topDist * 0.85) return 'dekat';
  if (propSocial >= 4 || propCommunity >= 4) return 'sosial';
  return 'nyaman';
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function RecommendationsPage() {
  const { profile, clearProfile } = useStudentProfile();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    const t = setTimeout(() => setTransitioning(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!profile) { setLoading(false); return; }
    setLoading(true);
    propertyService
      .getRecommendedProperties(profile)
      .then(setProperties)
      .catch(err => console.error('Recommendations load error:', err))
      .finally(() => setLoading(false));
  }, [profile]);

  const sorted = useMemo(() => {
    const copy = [...properties];
    if (sortBy === 'score')    copy.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    if (sortBy === 'distance') copy.sort((a, b) => (a.distanceFromIPB || 99) - (b.distanceFromIPB || 99));
    if (sortBy === 'price')    copy.sort((a, b) => ((a.pricing?.min || a.priceMin) || 0) - ((b.pricing?.min || b.priceMin) || 0));
    return copy;
  }, [properties, sortBy]);

  const topPick = sorted[0] || null;
  const rest = sorted.slice(1, 7);

  const altGroups = useMemo(() => {
    if (!topPick || !rest.length) return {};
    const groups = {};
    rest.forEach(prop => {
      const cat = getAltCategory(prop, topPick);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(prop);
    });
    return groups;
  }, [rest, topPick]);

  const makeMatchResult = (prop) => ({
    score: prop.matchScore || 0,
    reasons: prop.matchReasons || [],
    tradeoffs: prop.matchTradeoffs || []
  });

  const allScoresLow = properties.length > 0 && properties.every(p => (p.matchScore || 0) < 60);

  if (!profile && !loading) return <NoProfileState />;
  if (transitioning) return <TransitionScreen />;

  return (
    <>
      <SEO
        title="Rekomendasi Kos Buat Kamu – Ngekost"
        description="Kos yang paling cocok berdasarkan kebutuhan, budget, fasilitas, jarak, dan gaya hidupmu."
      />

      <div className="bg-slate-50 min-h-screen pb-16">
        {/* ── Page Header ── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors">
                ← Beranda
              </Link>
              <button
                onClick={() => { clearProfile(); navigate('/find'); }}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Mulai ulang
              </button>
            </div>

            <span className="text-xs font-semibold text-[#2D5A47] uppercase tracking-wider">Rekomendasi buat kamu</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Ini beberapa kos yang paling cocok buat kamu.
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Kami mencocokkan kebutuhan, budget, fasilitas, jarak, dan suasana tempat tinggalmu.
            </p>

            {/* Preference summary tags */}
            {profile && (
              <div className="mt-4">
                <PreferenceSummary profile={profile} />
              </div>
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 pt-6">
          {/* ── Transparency ── */}
          <MatchTransparency />

          {/* ── Low score warning ── */}
          {allScoresLow && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-lg">⚠️</span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-900">Belum ada kos yang benar-benar cocok dengan semua kebutuhanmu.</p>
                <p className="text-xs text-amber-700">Tapi ada beberapa pilihan yang mendekati. Kalau kamu memperluas jarak atau budget, ada pilihan yang lebih sesuai.</p>
                <button onClick={() => navigate('/find')} className="text-xs font-semibold text-amber-800 underline underline-offset-2 mt-1">
                  Ubah preferensi
                </button>
              </div>
            </div>
          )}

          {/* ── Sort + count bar ── */}
          {!loading && sorted.length > 0 && (
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="text-sm text-slate-500 font-medium">
                <span className="font-bold text-slate-800">{sorted.length}</span> pilihan ditemukan
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:block">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2D5A47]"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── Content ── */}
          {loading ? (
            <LoadingSkeleton />
          ) : sorted.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="text-4xl">🔍</div>
              <p className="text-slate-600 font-semibold">Belum ada kos yang cocok ditemukan.</p>
              <p className="text-sm text-slate-400">Coba perluas kriteria pencarianmu.</p>
              <button onClick={() => navigate('/find')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
                Ubah preferensi
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* ─── TOP PICK ─── */}
              {topPick && (
                <section>
                  <TopPickCard property={topPick} matchResult={makeMatchResult(topPick)} />
                </section>
              )}

              {/* ─── ALTERNATIVE GROUPS ─── */}
              {Object.keys(altGroups).length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <h2 className="text-base font-bold text-slate-800">Pilihan lain yang mungkin cocok</h2>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <div className="space-y-8">
                    {Object.entries(altGroups).map(([cat, props]) => (
                      <div key={cat}>
                        {/* Category divider */}
                        <CategoryDivider catKey={cat} />

                        {/* Cards grid */}
                        <div className={`mt-4 grid gap-5 ${
                          props.length === 1
                            ? 'grid-cols-1 sm:grid-cols-2'
                            : props.length === 2
                            ? 'grid-cols-1 sm:grid-cols-2'
                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        }`}>
                          {props.map((prop, i) => (
                            <div key={prop.id} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                              <RecommendationCard
                                property={prop}
                                matchResult={makeMatchResult(prop)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ─── BOTTOM CTA ─── */}
              <div className="text-center py-8 space-y-3 border-t border-slate-200">
                <p className="text-slate-500 text-sm">Tidak ada yang benar-benar cocok?</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => { clearProfile(); navigate('/find'); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Ubah preferensi
                  </button>
                  <Link to="/kost" className="text-sm text-slate-400 hover:text-slate-700 underline underline-offset-2 transition-colors">
                    Lihat semua kos →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
