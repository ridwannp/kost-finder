import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2D5A47] flex items-center justify-center text-white">
                <Home className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                IPB KosFinder
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Kosan Dekat Kampus, Hidup Lebih Mudah. Platform penemuan tempat kos terbaik khusus mahasiswa IPB University (Dramaga & Bogor).
            </p>
          </div>

          {/* Location Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Lokasi Populer</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/kost?location=babakan" className="hover:text-emerald-400 transition-colors">
                  Kos Babakan
                </Link>
              </li>
              <li>
                <Link to="/kost?location=dramaga" className="hover:text-emerald-400 transition-colors">
                  Kos Dramaga
                </Link>
              </li>
              <li>
                <Link to="/kost?location=baranangsiang" className="hover:text-emerald-400 transition-colors">
                  Kos Baranangsiang
                </Link>
              </li>
              <li>
                <Link to="/kost?location=cilibende" className="hover:text-emerald-400 transition-colors">
                  Kos Cilibende
                </Link>
              </li>
              <li>
                <Link to="/kost?location=kampus-ipb" className="hover:text-emerald-400 transition-colors">
                  Kos Kampus IPB
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/kost" className="hover:text-emerald-400 transition-colors">
                  Daftar Kos
                </Link>
              </li>
              <li>
                <Link to="/find" className="hover:text-emerald-400 transition-colors">
                  Kategori Kos
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Tips & Info Mahasiswa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kontak</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kawasan Kampus IPB Dramaga, Bogor</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>halo@ipbkosfinder.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 IPB KosFinder. Kosan Dekat Kampus, Hidup Lebih Mudah.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk Mahasiswa IPB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
