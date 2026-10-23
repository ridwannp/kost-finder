import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Menu, X } from 'lucide-react';

import { useSavedKost } from '../../context/SavedKostContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { count: savedCount } = useSavedKost();

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/kost', label: 'Daftar Kos' },
    { path: '/find', label: 'Rekomendasi' },
    { path: '/about', label: 'Tips & Info' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#2D5A47] flex items-center justify-center text-white shadow-xs">
              <Home className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="font-extrabold text-[#2D5A47] text-xl tracking-tight leading-none">
                Ngekost
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-normal mt-1">
                personality-driven student housing
              </p>
            </div>
          </Link>

          {/* Centered Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-2 text-sm font-semibold transition-colors ${active ? 'text-[#2D5A47] font-bold' : 'text-slate-600 hover:text-[#2D5A47]'
                    }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D5A47] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/kost"
              className="p-2 text-slate-600 hover:text-[#2D5A47] rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Cari Kos"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Saved properties button with indicator */}
            <Link
              to="/saved"
              className={`relative px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                location.pathname === '/saved'
                  ? 'bg-[#EAF4EF] text-[#2D5A47]'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Kos Tersimpan"
            >
              <span>Disimpan</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#2D5A47] text-white text-[10px] font-extrabold rounded-full">
                  {savedCount}
                </span>
              )}
            </Link>

            <Link
              to="/auth"
              className="px-5 py-2.5 bg-[#2D5A47] hover:bg-[#234939] text-white text-xs font-bold rounded-full transition-all shadow-xs"
            >
              Masuk / Daftar
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block p-3 rounded-xl text-sm font-semibold transition-colors ${active ? 'bg-emerald-50 text-[#2D5A47] font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-between"
            >
              <span>Kos yang Disimpan</span>
              {savedCount > 0 && (
                <span className="px-2 py-0.5 bg-[#2D5A47] text-white text-[10px] font-bold rounded-full">
                  {savedCount}
                </span>
              )}
            </Link>

            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-[#2D5A47] text-white text-center font-bold text-xs rounded-full shadow-xs"
            >
              Masuk / Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
