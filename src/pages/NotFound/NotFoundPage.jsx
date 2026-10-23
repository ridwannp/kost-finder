import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertCircle } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 - Halaman Tidak Ditemukan" />

      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900">404</h1>
            <h2 className="text-lg font-bold text-slate-800">Halaman Tidak Ditemukan</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Maaf, halaman yang Anda tuju tidak tersedia atau alamat URL salah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Ke Beranda</span>
            </Link>

            <Link
              to="/kost"
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Cari Kost IPB</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
