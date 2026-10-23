import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, MapPin, Compass, Users, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Tentang IPB Kost Finder"
        description="Platform pencarian kost khusus mahasiswa IPB University (Dramaga & Bogor). Menghubungkan mahasiswa dengan hunian kos berkualitas dan aman."
      />

      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            <Building2 className="w-3.5 h-3.5" />
            <span>Platform Penemuan Kost IPB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Membantu Mahasiswa IPB Menemukan Hunian Ideal
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            IPB Kost Finder hadir untuk mempermudah ribuan mahasiswa IPB University mencari tempat tinggal di kawasan Dramaga, Babakan, Cibanteng, Balungbangjaya, dan sekitarnya.
          </p>
        </div>

        {/* Product Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Khusus Lingkungan IPB</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fokus mendalam pada area kampus IPB Dramaga, mengukur estimasi jarak riil harian mahasiswa menuju gerbang kampus.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Pencocokan Presisi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menyesuaikan anggaran bulanan, preferensi gender, dan fasilitas wajib mahasiswa secara efisien tanpa perantara.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Informasi Transparan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menyajikan foto properti jelas, spesifikasi tipe kamar, serta kontak WhatsApp pemilik kost tanpa biaya komisi.
            </p>
          </div>
        </div>

        {/* Future Landlord Partnership Callout */}
        <div id="landlord" className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-12 rounded-3xl text-white shadow-xl space-y-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 bg-amber-500 text-white text-[11px] font-extrabold uppercase rounded-full tracking-wider">
              Kemitraan Pemilik Kost (Landlord)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pemilik Kost di Sekitar Kampus IPB Dramaga?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Daftarkan tempat kos Anda untuk mendapatkan calon penghuni mahasiswa IPB secara konsisten. Platform kami mendukung pencatatan ketersediaan kamar dan analitik permintaan mahasiswa.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://wa.me/6281234567890?text=Halo%20IPB%20Kost%20Finder,%20saya%20pemilik%20kost%20ingin%20mendaftarkan%20properti%20saya"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Hubungi Tim Kemitraan (WhatsApp)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/find"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Coba Asisten Pencari Kost
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
