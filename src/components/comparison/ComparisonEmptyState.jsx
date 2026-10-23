import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Columns3, ArrowRight } from 'lucide-react';

export default function ComparisonEmptyState() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-5 shadow-2xs max-w-lg mx-auto my-12">
      <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center mx-auto border border-slate-200">
        <Columns3 className="w-8 h-8 text-slate-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Pilih minimal dua kos untuk mulai membandingkan.
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          Bandingkan perbedaan harga, fasilitas, suasana, dan jarak berdampingan untuk menentukan pilihan terbaik.
        </p>
      </div>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/saved"
          className="w-full sm:w-auto px-6 py-3 bg-[#2D5A47] hover:bg-[#234939] text-white font-bold text-xs rounded-xl shadow-md shadow-[#2D5A47]/20 flex items-center justify-center gap-2 transition-all hover:scale-102"
        >
          <Bookmark className="w-4 h-4" />
          <span>Pilih kos tersimpan</span>
        </Link>

        <Link
          to="/kost"
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <span>Jelajahi Semua Kos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
