import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function MatchReasonBadge({ reasons = [], matchScore }) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="bg-[#EAF4EF] border border-[#2D5A47]/30 p-5 rounded-2xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#2D5A47] font-extrabold text-sm sm:text-base">
          <Sparkles className="w-4 h-4" />
          <span>Kenapa kos ini cocok buat kamu?</span>
        </div>
        {matchScore && (
          <span className="px-3 py-1 bg-[#2D5A47] text-white text-xs font-extrabold rounded-full">
            {matchScore}% Cocok
          </span>
        )}
      </div>

      <div className="space-y-2 pt-1">
        {reasons.map((reason, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
            <div className="p-0.5 rounded-full bg-[#2D5A47] text-white shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
