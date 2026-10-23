import React from 'react';

export default function MatchReasons({ reasons = [] }) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <h4 className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
        Kenapa cocok buat kamu?
      </h4>
      <ul className="space-y-1 text-sm text-slate-700">
        {reasons.map((reason, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
