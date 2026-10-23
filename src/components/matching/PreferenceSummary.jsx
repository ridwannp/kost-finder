import React from 'react';
import { Link } from 'react-router-dom';

function formatRupiah(amount) {
  if (!amount) return null;
  return `Rp${(amount / 1000000).toFixed(1)} juta`;
}

function PrefTag({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full">
      {children}
    </span>
  );
}

export default function PreferenceSummary({ profile }) {
  if (!profile) return null;

  const prefs = profile.preferences || {};
  const lifestyle = prefs.lifestyle || {};
  const tags = [];

  // Environment
  if (lifestyle.environmentPref === 'quiet') tags.push('Tenang untuk belajar');
  else if (lifestyle.environmentPref === 'social') tags.push('Suasana sosial & ramai');
  else tags.push('Suasana seimbang');

  // Distance
  if (prefs.maxDistance) tags.push(`Maks. ${prefs.maxDistance} km dari IPB`);

  // Facilities
  const facs = prefs.facilities || [];
  if (facs.includes('wifi')) tags.push('WiFi cepat');
  if (facs.includes('bathroom_inside')) tags.push('Kamar mandi pribadi');
  if (facs.includes('ac')) tags.push('AC');
  if (facs.includes('security')) tags.push('Keamanan 24 jam');
  if (facs.includes('kitchen')) tags.push('Dapur bersama');

  // Budget
  if (prefs.budgetMax) tags.push(`Budget maks. ${formatRupiah(prefs.budgetMax)}`);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-slate-500 shrink-0">Kamu cari:</span>
      {tags.slice(0, 6).map((tag, i) => (
        <PrefTag key={i}>{tag}</PrefTag>
      ))}
      <Link
        to="/find"
        className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 shrink-0 ml-1"
      >
        Ubah preferensi
      </Link>
    </div>
  );
}
