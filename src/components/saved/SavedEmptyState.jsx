import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Compass, BookmarkPlus } from 'lucide-react';

export default function SavedEmptyState() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-5 shadow-2xs max-w-lg mx-auto my-8">
      <div className="w-16 h-16 bg-emerald-50 text-[#2D5A47] rounded-2xl flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs">
        <BookmarkPlus className="w-8 h-8 text-[#2D5A47]" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Belum ada kos yang kamu simpan.
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          Kalau menemukan tempat yang menarik, simpan dulu. Nanti kamu bisa membandingkannya di sini.
        </p>
      </div>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/kost"
          className="w-full sm:w-auto px-6 py-3 bg-[#2D5A47] hover:bg-[#234939] text-white font-bold text-xs rounded-xl shadow-md shadow-[#2D5A47]/20 flex items-center justify-center gap-2 transition-all hover:scale-102"
        >
          <Search className="w-4 h-4" />
          <span>Cari kos</span>
        </Link>

        <Link
          to="/find"
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Compass className="w-4 h-4 text-[#2D5A47]" />
          <span>Rekomendasi Berdasarkan Profil</span>
        </Link>
      </div>
    </div>
  );
}
