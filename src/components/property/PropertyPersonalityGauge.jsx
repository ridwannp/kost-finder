import React from 'react';

/**
 * Visual indicator component for Property Personality & Suasana traits (1 to 5 scale).
 */
export default function PropertyPersonalityGauge({ personality = {}, environment = {} }) {
  const traits = [
    { label: 'Ketenangan (Noise Level)', value: personality.quiet || 4, helper: environment.noiseLevel === 'low' ? 'Sangat Tenang' : 'Sedang' },
    { label: 'Privasi Kamar', value: personality.privacy || 4, helper: 'Privasi Tinggi' },
    { label: 'Kebersihan Properti', value: personality.cleanliness || 5, helper: 'Sangat Bersih' },
    { label: 'Keakraban / Komunitas', value: personality.community || 3, helper: 'Suasana Ramah' },
    { label: 'Akses & Kepraktisan', value: personality.convenience || 5, helper: 'Sangat Praktis' }
  ];

  return (
    <div className="space-y-3.5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
      {traits.map((t, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>{t.label}</span>
            <span className="text-[11px] font-semibold text-[#2D5A47]">{t.helper} ({t.value}/5)</span>
          </div>

          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden flex gap-1 p-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`flex-1 h-full rounded-full transition-all duration-300 ${
                  level <= t.value ? 'bg-[#2D5A47]' : 'bg-slate-300/40'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
