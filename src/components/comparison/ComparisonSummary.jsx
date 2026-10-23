import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Compass, AlertCircle } from 'lucide-react';

export default function ComparisonSummary({ decisionData, properties = [] }) {
  if (!decisionData) return null;

  const { summaries, topMatch, hasProfile, prioritiesContext } = decisionData;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
      {/* Section Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4EF] text-[#2D5A47] text-xs font-extrabold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>Decision Support</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Mana yang lebih cocok buat kamu?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Ringkasan komparasi berdasarkan data spesifikasi aktual dan kriteria preferensimu.
        </p>
      </div>

      {/* Priority-Based Context Bar (Section 12 specification) */}
      {hasProfile && prioritiesContext && prioritiesContext.length > 0 ? (
        <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-slate-200/80 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Prioritas Kebutuhanmu:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {prioritiesContext.map((prio, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#2D5A47] font-bold text-xs"
              >
                ✓ {prio}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Kecocokan personal belum dihitung karena kamu belum mengatur preferensi.</span>
          </div>
          <Link
            to="/find"
            className="inline-flex items-center gap-1.5 font-bold text-[#2D5A47] hover:underline shrink-0"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Cari kos berdasarkan kebutuhanmu</span>
          </Link>
        </div>
      )}

      {/* Key Comparative Advantages */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Kelebihan Nyata Tiap Pilihan:
        </h4>

        {summaries && summaries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {summaries.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A47] shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
            Keduanya punya kelebihan berbeda. Pilihan terbaik bergantung pada hal yang paling penting buat kamu.
          </p>
        )}
      </div>

      {/* Top Match Highlight (if match score available) */}
      {topMatch && topMatch.match && (
        <div className="p-5 rounded-2xl bg-[#EAF4EF]/60 border border-[#2D5A47]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#2D5A47] uppercase tracking-wider">
              Rekomendasi Utama Profilmu
            </span>
            <div className="font-extrabold text-sm sm:text-base text-slate-900">
              {topMatch.property.name} ({topMatch.match.score}% Match)
            </div>
            {topMatch.match.reasons?.[0] && (
              <p className="text-xs text-slate-600">
                Alasan utama: {topMatch.match.reasons[0]}
              </p>
            )}
          </div>

          <Link
            to={`/kost/${topMatch.property.slug || topMatch.property.id}`}
            className="px-5 py-2.5 bg-[#2D5A47] hover:bg-[#234939] text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0 text-center"
          >
            Lihat Kos Ini
          </Link>
        </div>
      )}
    </div>
  );
}
