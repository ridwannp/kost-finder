import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  FileText,
  ShieldCheck,
  Search,
  ChevronDown,
  ArrowRight,
  Compass,
  Sparkles,
  Home as HomeIcon,
  Wind,
  Wifi,
  Bath,
  Bike,
  Check,
  User,
  Navigation,
  Sliders,
  Heart
} from 'lucide-react';
import SEO from '../../components/common/SEO';
import PropertyCard from '../../components/property/PropertyCard';
import { propertyService } from '../../services/propertyService';
import { LOCATIONS } from '../../data/locations';
import { useStudentProfile } from '../../context/StudentProfileContext';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLocationFilter, setActiveLocationFilter] = useState('all');
  const [sortOption, setSortOption] = useState('terbaru');

  // Hero Search & Personalizer State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('all');
  const [activeStepTab, setActiveStepTab] = useState('gender'); // 'gender', 'suasana', 'fasilitas', 'jarak'

  // Filter Values
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedSuasana, setSelectedSuasana] = useState('quiet');
  const [selectedFacilities, setSelectedFacilities] = useState(['bathroom_inside', 'ac', 'wifi']);
  const [selectedDistance, setSelectedDistance] = useState('1.5');
  const [selectedBudgetMax, setSelectedBudgetMax] = useState('1500000');

  const navigate = useNavigate();
  const { saveProfile } = useStudentProfile();

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      try {
        const data = await propertyService.getProperties({
          location: activeLocationFilter,
          sortBy: sortOption === 'terbaru' ? 'recommended' : 'lowest_price'
        });
        setProperties(data.slice(0, 6));
      } catch (err) {
        console.error('Failed loading properties:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, [activeLocationFilter, sortOption]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();

    // Build a preference profile from the form selections
    const discoveryData = {
      budgetMin: 0,
      budgetMax: Number(selectedBudgetMax) || 2000000,
      maxDistance: selectedDistance !== '0' ? Number(selectedDistance) : 10,
      genderPreference: selectedGender,
      environmentPref: selectedSuasana,
      afterClass: selectedSuasana === 'quiet' ? 'study' : selectedSuasana === 'social' ? 'hangout' : 'rest',
      facilities: selectedFacilities,
      name: '',
      whatsapp: '',
      email: '',
      source: 'homepage_form'
    };

    // Save to StudentProfileContext (persists in localStorage)
    saveProfile(discoveryData);

    // Navigate to personalised recommendations
    navigate('/recommendations');
  };

  const toggleFacility = (facId) => {
    setSelectedFacilities((prev) =>
      prev.includes(facId) ? prev.filter((f) => f !== facId) : [...prev, facId]
    );
  };

  return (
    <>
      <SEO
        title="Ngekost | Personality-Driven Student Housing IPB"
        description="Temukan kos yang cocok dengan kepribadian, gaya hidup, dan budget mahasiswa IPB Dramaga Bogor."
      />

      {/* SECTION 1 (TOP HERO): EXACT 100% MATCH TO USER SCREENSHOT */}
      <section className="relative w-full h-[540px] sm:h-[700px] bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Full Width & Height Background Showcase Image */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Student Housing IPB Dramaga Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Gradient Overlay for Text Legibility & Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/30 pointer-events-none" />

        {/* Main Content Container overlaying background */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-8">

          {/* Main Grid Overlay: Left Hero Text + Right Floating Personalizer Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1">

            {/* LEFT SIDE: Hero Title & Badges */}
            <div className="lg:col-span-6 space-y-5 text-white pr-0 lg:pr-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-md text-xs font-extrabold text-[#2D5A47]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Personality-driven student housing</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
                Temukan Kos Yang <br />
                Cocok Sama Kamu
              </h1>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-bold shadow-sm">
                <HomeIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modern Student House · IPB Dramaga</span>
              </div>
            </div>

            {/* RIGHT SIDE: Floating White Customization Form Card (Fixed 490px Height, 0 Shift) */}
            <div className="lg:col-span-6 flex justify-end">
              <div className="w-full max-w-xl h-[490px] bg-white rounded-3xl border border-white/80 p-5 sm:p-6 shadow-2xl flex flex-col justify-between shrink-0">
                {/* 1. Panel Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EAF4EF] text-[#2D5A47] flex items-center justify-center font-bold text-lg shrink-0">
                      🌿
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Personalisasi Kos Ideal Kamu
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Atur kriteria suasana, fasilitas, & budget tempat tinggalmu
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-[#2D5A47] bg-[#EAF4EF] px-3 py-1 rounded-full border border-[#2D5A47]/20">
                    <Sliders className="w-3 h-3" />
                    <span>Live Customizer</span>
                  </div>
                </div>

                {/* 2. Step Navigation Tabs */}
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0 my-2">
                  {[
                    { id: 'gender', label: 'Tipe Kos', icon: User },
                    { id: 'suasana', label: 'Suasana', icon: Sparkles },
                    { id: 'fasilitas', label: 'Fasilitas', icon: Bath },
                    { id: 'jarak', label: 'Jarak IPB', icon: Navigation }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activeStepTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveStepTab(tab.id)}
                        className={`py-2 px-1 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${active
                          ? 'bg-white text-[#2D5A47] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                          }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#2D5A47]' : 'text-slate-400'}`} />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 3. Dynamic Interactive Form Body */}
                <div className="flex-1 py-2 flex flex-col justify-center animate-fade-in overflow-hidden">
                  {/* TAB 1: GENDER TYPE */}
                  {activeStepTab === 'gender' && (
                    <div className="space-y-3">
                      <span className="text-xs font-extrabold uppercase text-slate-400 block tracking-wider">
                        Pilih Tipe Gender Penghuni
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: 'all', title: 'Bebas / Semua', desc: 'Semua tipe kosan' },
                          { id: 'putra', title: 'Kos Putra', desc: 'Khusus penghuni putra' },
                          { id: 'putri', title: 'Kos Putri', desc: 'Khusus penghuni putri' },
                          { id: 'campur', title: 'Kos Campur', desc: 'Tipe campur putra/putri' }
                        ].map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setSelectedGender(g.id)}
                            className={`p-3 rounded-2xl border text-left transition-all ${selectedGender === g.id
                              ? 'bg-[#EAF4EF] border-[#2D5A47] text-[#2D5A47] font-extrabold shadow-2xs'
                              : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                              }`}
                          >
                            <div className="text-xs font-bold">{g.title}</div>
                            <div className="text-[10px] text-slate-500 font-normal">{g.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SUASANA BELAJAR */}
                  {activeStepTab === 'suasana' && (
                    <div className="space-y-3">
                      <span className="text-xs font-extrabold uppercase text-slate-400 block tracking-wider">
                        Pilih Suasana Belajar & Istirahat
                      </span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { id: 'quiet', title: '🤫 Tenang', desc: 'Fokus belajar & minim bising' },
                          { id: 'social', title: '🤝 Ramai', desc: 'Suka sosialisasi & keakraban' },
                          { id: 'balanced', title: '⚖️ Seimbang', desc: 'Fleksibel sesuai hari' }
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedSuasana(s.id)}
                            className={`p-3 rounded-2xl border text-center transition-all ${selectedSuasana === s.id
                              ? 'bg-[#EAF4EF] border-[#2D5A47] text-[#2D5A47] font-extrabold shadow-2xs ring-1 ring-[#2D5A47]'
                              : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                              }`}
                          >
                            <div className="text-xs font-extrabold">{s.title}</div>
                            <div className="text-[10px] text-slate-500 font-normal mt-0.5">{s.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: FASILITAS WAJIB */}
                  {activeStepTab === 'fasilitas' && (
                    <div className="space-y-3">
                      <span className="text-xs font-extrabold uppercase text-slate-400 block tracking-wider">
                        Centang Fasilitas Wajib Kamu
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'bathroom_inside', label: 'Kamar Mandi Dalam', icon: Bath },
                          { id: 'ac', label: 'AC (Pendingin Ruangan)', icon: Wind },
                          { id: 'wifi', label: 'Wi-Fi High Speed', icon: Wifi },
                          { id: 'parking_motor', label: 'Parkir Motor Kanopi', icon: Bike }
                        ].map((fac) => {
                          const isChecked = selectedFacilities.includes(fac.id);
                          const Icon = fac.icon;
                          return (
                            <button
                              key={fac.id}
                              type="button"
                              onClick={() => toggleFacility(fac.id)}
                              className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-left ${isChecked
                                ? 'bg-[#EAF4EF] border-[#2D5A47] text-[#2D5A47] font-bold shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                              <div className="flex items-center gap-2 text-xs">
                                <Icon className="w-3.5 h-3.5" />
                                <span>{fac.label}</span>
                              </div>
                              {isChecked && <Check className="w-3.5 h-3.5 text-[#2D5A47] stroke-[3]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: JARAK IPB */}
                  {activeStepTab === 'jarak' && (
                    <div className="space-y-3">
                      <span className="text-xs font-extrabold uppercase text-slate-400 block tracking-wider">
                        Pilih Maksimal Jarak Ke Kampus IPB
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: '0.8', title: '🚶 Jalan Kaki (< 800m)', desc: 'Paling dekat gerbang IPB' },
                          { id: '1.5', title: '🛵 Sangat Dekat (< 1.5 km)', desc: '5 menit naik motor / angkot' },
                          { id: '3.0', title: '🚗 Dekat (< 3 km)', desc: 'Kawasan Dramaga & Cilibende' },
                          { id: '0', title: '🌐 Bebas Jarak', desc: 'Semua jangkauan area' }
                        ].map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedDistance(d.id)}
                            className={`p-3 rounded-2xl border text-left transition-all ${selectedDistance === d.id
                              ? 'bg-[#EAF4EF] border-[#2D5A47] text-[#2D5A47] font-extrabold shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                          >
                            <div className="text-xs font-bold">{d.title}</div>
                            <div className="text-[10px] text-slate-500 font-normal">{d.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Live Selected Criteria Summary Tag Bar */}
                <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 shrink-0 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                    Ringkasan Kriteria Terpilih
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] text-[#2D5A47] font-extrabold">
                      ✓ {selectedGender === 'all' ? 'Semua Tipe' : `Kos ${selectedGender}`}
                    </span>
                    <span className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] text-slate-700 font-medium">
                      {selectedSuasana === 'quiet' ? 'Lingkungan Tenang' : selectedSuasana === 'social' ? 'Suasana Ramah' : 'Suasana Seimbang'}
                    </span>
                    {selectedFacilities.includes('bathroom_inside') && (
                      <span className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] text-slate-600 font-medium">
                        KM Dalam
                      </span>
                    )}
                    {selectedFacilities.includes('ac') && (
                      <span className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] text-slate-600 font-medium">
                        AC
                      </span>
                    )}
                  </div>
                </div>

                {/* 5. Footer Bar Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-500 hidden sm:inline">Budget:</span>
                    <select
                      value={selectedBudgetMax}
                      onChange={(e) => setSelectedBudgetMax(e.target.value)}
                      className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="1000000">&lt; Rp 1.000.000 /bln</option>
                      <option value="1500000">&lt; Rp 1.500.000 /bln</option>
                      <option value="2000000">&lt; Rp 2.000.000 /bln</option>
                      <option value="3000000">&lt; Rp 3.000.000 /bln</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="px-6 py-2.5 bg-[#2D5A47] hover:bg-[#234939] text-white font-extrabold text-xs rounded-xl shadow-md shadow-[#2D5A47]/20 transition-all flex items-center gap-2 hover:scale-102 shrink-0"
                  >
                    <span>Cari Kos Cocok</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Callout Floating Badge */}
          <div className="pt-4 flex items-center justify-start">
            <div className="p-3 bg-slate-950/85 backdrop-blur-md rounded-2xl border border-white/20 text-white flex items-center gap-3 shadow-xl max-w-sm">
              <div className="px-2.5 py-1 rounded-xl bg-[#2D5A47] text-white font-extrabold text-xs shrink-0">
                98%
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-white">Suasana Tenang & Privasi Tinggi</div>
                <div className="text-slate-300 text-[11px]">Sangat disukai mahasiswa IPB jurusan teknik & sains</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Discovery Hook */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Full-width container with subtle background */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-[#1e3d30] rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16">
            {/* Decorative background pattern */}
            <div className="absolute bg-color[#6E3511] inset-0 bg-[radial-gradient(ellipse_at_top_right,_#2D5A47_0%,_transparent_60%)] opacity-40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D5A47]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div className="space-y-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold text-white/80">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Bukan sekadar listing kos
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Setiap anak kos punya kebutuhan yang{' '}
                  <span className="text-amber-400">beda.</span>
                </h2>

                <div className="space-y-3 text-white/70 text-sm leading-relaxed max-w-md">
                  <p>
                    Ada yang butuh tempat tenang buat belajar. Ada yang lebih suka lingkungan ramai. Ada yang paling penting dekat kampus.
                  </p>
                  <p>
                    Ngekost tidak minta kamu tahu nama kosnya dulu.{' '}
                    <span className="text-white font-semibold">Ceritakan bagaimana kamu ingin tinggal — kami yang carikan.</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Link
                    to="/find"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#2D5A47] hover:bg-[#3a7060] text-white font-bold text-sm rounded-2xl transition-all shadow-lg hover:shadow-[#2D5A47]/40 hover:-translate-y-0.5"
                  >
                    <Compass className="w-4 h-4 text-amber-300" />
                    Kenali kos yang cocok buat aku
                  </Link>
                  <Link
                    to="/kost"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm rounded-2xl transition-all"
                  >
                    Lihat semua kos
                  </Link>
                </div>
              </div>

              {/* Right: Personality Profile Cards — 2x2 grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    emoji: '📚',
                    title: 'Si Fokus',
                    desc: 'Lebih nyaman dengan tempat tenang dan privat.',
                    bg: 'bg-blue-500/15',
                    border: 'border-blue-400/30',
                    badge: 'bg-blue-400/20 text-blue-300',
                  },
                  {
                    emoji: '🤝',
                    title: 'Si Sosial',
                    desc: 'Suka lingkungan yang ramai dan mudah bertemu teman.',
                    bg: 'bg-orange-500/15',
                    border: 'border-orange-400/30',
                    badge: 'bg-orange-400/20 text-orange-300',
                  },
                  {
                    emoji: '⚡',
                    title: 'Si Praktis',
                    desc: 'Yang penting dekat, nyaman, dan sesuai budget.',
                    bg: 'bg-emerald-500/15',
                    border: 'border-emerald-400/30',
                    badge: 'bg-emerald-400/20 text-emerald-300',
                  },
                  {
                    emoji: '🏡',
                    title: 'Si Nyaman',
                    desc: 'Lebih memilih kenyamanan dan fasilitas lengkap.',
                    bg: 'bg-purple-500/15',
                    border: 'border-purple-400/30',
                    badge: 'bg-purple-400/20 text-purple-300',
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className={`${card.bg} border ${card.border} backdrop-blur-sm rounded-2xl p-5 space-y-3 hover:scale-[1.02] transition-all duration-200 cursor-default`}
                  >
                    <div className="text-3xl">{card.emoji}</div>
                    <div>
                      <span className={`inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-2 ${card.badge}`}>
                        {card.title}
                      </span>
                      <p className="text-white/70 text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EAF4EF] border border-[#2D5A47]/20 rounded-full text-xs font-bold text-[#2D5A47]">
            Cara kerja
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Cukup tiga langkah.
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Nggak perlu tahu nama kosnya dulu. Cukup ceritakan seperti apa tempat yang kamu butuhkan.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#2D5A47]/30 via-slate-300 to-purple-300 z-0" />

          {[
            {
              num: '01',
              title: 'Ceritakan kebutuhanmu',
              desc: 'Jawab beberapa pertanyaan sederhana tentang cara kamu ingin tinggal. Cuma sekitar 1–2 menit.',
              icon: '💬',
              gradient: 'from-[#EAF4EF] to-emerald-50',
              numColor: 'text-[#2D5A47]',
              numBg: 'bg-[#2D5A47]',
              border: 'border-[#2D5A47]/20',
            },
            {
              num: '02',
              title: 'Kami cari yang cocok',
              desc: 'Kami mencocokkan kebutuhanmu dengan karakteristik setiap kos — bukan hanya harga dan jarak.',
              icon: '🔍',
              gradient: 'from-blue-50 to-sky-50',
              numColor: 'text-blue-700',
              numBg: 'bg-blue-600',
              border: 'border-blue-200',
            },
            {
              num: '03',
              title: 'Pilih tempat yang terasa pas',
              desc: 'Lihat rekomendasi beserta alasan kenapa tempat tersebut cocok buat kamu, bukan orang lain.',
              icon: '✅',
              gradient: 'from-purple-50 to-violet-50',
              numColor: 'text-purple-700',
              numBg: 'bg-purple-600',
              border: 'border-purple-200',
            },
          ].map((step, i) => (
            <div
              key={step.num}
              className={`relative z-10 bg-gradient-to-br ${step.gradient} border ${step.border} rounded-3xl p-7 space-y-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon & number row */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <span className={`text-4xl font-black opacity-10 ${step.numColor}`}>
                  {step.num}
                </span>
              </div>

              {/* Step number pill */}
              <div>
                <span className={`inline-block text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full ${step.numBg} mb-3 uppercase tracking-wider`}>
                  Langkah {step.num}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {step.title}
                </h3>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/find"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#2D5A47] hover:bg-[#1e3d30] text-white font-bold text-sm rounded-2xl transition-all shadow-xl shadow-[#2D5A47]/25 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Cari kos yang cocok buat aku
          </Link>
        </div>
      </section>


      {/* SECTION 4: Location filter */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4 pt-14">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold text-[#2D5A47] uppercase tracking-wider mb-1">
              Area Sekitar IPB
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Beberapa tempat yang mungkin cocok buat kamu.
            </h2>
          </div>
          <Link
            to="/kost"
            className="text-xs font-bold text-slate-600 hover:text-[#2D5A47] flex items-center gap-1 transition-colors group"
          >
            <span>Lihat semua kos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            onClick={() => setActiveLocationFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${activeLocationFilter === 'all'
              ? 'bg-[#EAF4EF] text-[#2D5A47] border border-[#2D5A47]/30 shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#2D5A47]" />
            <span>Semua Lokasi</span>
          </button>

          {LOCATIONS.map((loc) => {
            const active = activeLocationFilter === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocationFilter(loc.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${active
                  ? 'bg-[#EAF4EF] text-[#2D5A47] border border-[#2D5A47]/30 shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{loc.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Featured Properties Grid */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 pb-16">
        <div className="flex items-center justify-end">
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer shadow-2xs appearance-none pr-8 hover:border-[#2D5A47]"
            >
              <option value="terbaru">Urutkan: Terbaru</option>
              <option value="termurah">Urutkan: Termurah</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop, idx) => (
              <div
                key={prop.id}
                className="animate-slide-up"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <p className="text-slate-500 text-sm mb-4">
            Belum yakin yang mana? Biar kami bantu carikan yang paling sesuai.
          </p>
          <Link
            to="/find"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D5A47] hover:bg-[#1e3d30] text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-[#2D5A47]/20 hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            Cari kos yang cocok buat aku
          </Link>
        </div>
      </section>
    </>
  );
}
