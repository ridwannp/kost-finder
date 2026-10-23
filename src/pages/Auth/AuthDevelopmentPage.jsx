import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, UserCheck, Building2, ArrowLeft, Trophy, RefreshCw, Zap, Star } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function AuthDevelopmentPage() {
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'owner'

  // Mini-Game State: "Tangkap Kunci Kos" (Click key targets as they appear)
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetPos, setTargetPos] = useState({ top: 50, left: 50 });
  const [targetEmoji, setTargetEmoji] = useState('🔑');

  const emojis = ['🔑', '🏠', '⚡', '🎓', '🛋️', '🔐'];

  // Start game
  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    spawnTarget();
  };

  const spawnTarget = () => {
    const randomTop = Math.floor(Math.random() * 70) + 15; // 15% to 85%
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setTargetPos({ top: randomTop, left: randomLeft });
    setTargetEmoji(randomEmoji);
  };

  const handleTargetClick = () => {
    if (!isPlaying) return;
    const newScore = score + 10;
    setScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
    spawnTarget();
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  return (
    <>
      <SEO
        title="Portal Akun Dalam Pengembangan - Ngekost IPB"
        description="Fitur Akun Multi-Role (Mahasiswa & Pemilik Kos) sedang dalam tahap pengembangan interaktif."
      />

      <div className="bg-[#F8FAF9] min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#2D5A47] hover:text-[#1e3d30] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* HERO FEATURE ANNOUNCEMENT */}
        <div className="bg-gradient-to-br from-slate-900 via-[#1b362a] to-[#2D5A47] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden space-y-8">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/20 border border-amber-400/30 rounded-full text-xs font-extrabold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Fitur Multi-Role Account · Coming Soon</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Satu Akun, Pengalaman Kosan Yang <span className="text-emerald-300">Jauh Lebih Personal</span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Kami sedang menyiapkan sistem Autentikasi berbasis Role (Mahasiswa IPB & Pemilik Kos). Sambil menunggu fitur ini siap rilis, kamu bisa menjajal rencana fitur atau mainkan mini-game di bawah! 🚀
              </p>
            </div>

            {/* Status Badge */}
            <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shrink-0 flex items-center gap-3 self-start lg:self-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <div className="text-xs font-extrabold text-white">Status Pengembangan</div>
                <div className="text-[11px] text-emerald-200">Tahap Pengujian Keamanan & Role Access</div>
              </div>
            </div>
          </div>

          {/* ROLE PREVIEW SWITCHER */}
          <div className="pt-6 border-t border-white/15 space-y-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Pilih Role Untuk Melihat Rencana Fitur Khusus:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mahasiswa Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                  selectedRole === 'student'
                    ? 'bg-white text-slate-900 border-white shadow-xl ring-2 ring-emerald-400'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xl ${
                  selectedRole === 'student' ? 'bg-[#EAF4EF] text-[#2D5A47]' : 'bg-white/10 text-white'
                }`}>
                  🎓
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm">Role Mahasiswa IPB</h4>
                    {selectedRole === 'student' && (
                      <span className="px-2 py-0.5 bg-[#2D5A47] text-white text-[10px] font-bold rounded-md">Aktif</span>
                    )}
                  </div>
                  <p className={`text-xs ${selectedRole === 'student' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Simpan wishlist, profil match personal, dan riwayat kontak pemilik kos.
                  </p>
                </div>
              </button>

              {/* Pemilik Kos Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('owner')}
                className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                  selectedRole === 'owner'
                    ? 'bg-white text-slate-900 border-white shadow-xl ring-2 ring-emerald-400'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xl ${
                  selectedRole === 'owner' ? 'bg-[#EAF4EF] text-[#2D5A47]' : 'bg-white/10 text-white'
                }`}>
                  🏠
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm">Role Pemilik / Pengelola Kos</h4>
                    {selectedRole === 'owner' && (
                      <span className="px-2 py-0.5 bg-[#2D5A47] text-white text-[10px] font-bold rounded-md">Aktif</span>
                    )}
                  </div>
                  <p className={`text-xs ${selectedRole === 'owner' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Kelola properti kos, atur status ketersediaan kamar, dan terima inquiry mahasiswa.
                  </p>
                </div>
              </button>
            </div>

            {/* Detailed Feature List based on Role */}
            <div className="p-6 bg-white/95 rounded-2xl text-slate-800 shadow-md space-y-4">
              <h4 className="font-extrabold text-sm text-[#2D5A47] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Fitur Yang Akan Kamu Dapatkan Saat Rilis ({selectedRole === 'student' ? 'Mahasiswa' : 'Pemilik Kos'}):</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                {selectedRole === 'student' ? (
                  <>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      ✨ <strong>Smart Profile Save</strong>: Matched preference tidak akan reset walau pindah HP.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      ❤️ <strong>Unlimited Wishlist</strong>: Kelola dan bandingkan kos favorit dalam satu dashboard.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      💬 <strong>Direct Chat History</strong>: Catat komunikasi langsung dengan pemilik kos.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      🏢 <strong>Property Dashboard</strong>: Tambah/edit listing kosanmu kapan saja.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      ⚡ <strong>Instant Room Status Update</strong>: Ubah status ketersediaan kamar secara live.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      📊 <strong>Lead Analytics</strong>: Lihat seberapa banyak mahasiswa IPB yang tertarik.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MINI GAME INTERACTIVE SECTION: "Tangkap Kunci Kosan" */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2D5A47] bg-[#EAF4EF] px-3 py-1 rounded-full mb-1">
                <Zap className="w-3.5 h-3.5" /> Mini-Game Refreshed
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                🎮 Mini-Game: Tangkap Kunci Kos Ideal!
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Klik ikon kunci atau rumah yang muncul secepat mungkin sebelum waktu habis!
              </p>
            </div>

            {/* Score Stats */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-slate-100 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Waktu</div>
                <div className="text-lg font-black text-rose-600">{timeLeft}s</div>
              </div>

              <div className="px-4 py-2 bg-[#EAF4EF] rounded-xl text-center">
                <div className="text-[10px] text-[#2D5A47] uppercase font-bold">Skor Kamu</div>
                <div className="text-lg font-black text-[#2D5A47]">{score}</div>
              </div>

              <div className="px-4 py-2 bg-amber-50 rounded-xl text-center border border-amber-200">
                <div className="text-[10px] text-amber-700 uppercase font-bold">Skor Tertinggi</div>
                <div className="text-lg font-black text-amber-700">{highScore}</div>
              </div>
            </div>
          </div>

          {/* GAME ARENA CONTAINER */}
          <div className="relative w-full h-[320px] bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-800 flex items-center justify-center shadow-inner">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#2D5A47_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

            {!isPlaying ? (
              <div className="text-center space-y-4 z-10 px-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl animate-bounce">
                  🔑
                </div>
                <h4 className="text-xl font-extrabold text-white">
                  {timeLeft === 0 ? `Waktu Habis! Skor Akhir: ${score}` : 'Siap Bermain?'}
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {timeLeft === 0
                    ? 'Luar biasa! Kamu punya reflek yang cepat seperti mahasiswa pas lagi berburu kos murah!'
                    : 'Uji kecepatan tanganmu menangkap item kosan dalam 15 detik.'}
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="px-6 py-3 bg-[#2D5A47] hover:bg-[#3a7060] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#2D5A47]/30 transition-all flex items-center gap-2 mx-auto hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{timeLeft === 0 ? 'Main Lagi' : 'Mulai Game'}</span>
                </button>
              </div>
            ) : (
              /* ACTIVE GAME TARGET OBJECT */
              <button
                type="button"
                onClick={handleTargetClick}
                style={{ top: `${targetPos.top}%`, left: `${targetPos.left}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-2xl shadow-xl border-2 border-emerald-400 flex items-center justify-center text-3xl transition-all duration-100 hover:scale-125 active:scale-95 cursor-pointer animate-pulse"
              >
                {targetEmoji}
              </button>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
