import React from 'react';

export default function TradeoffList({ tradeoffs = [] }) {
  if (!tradeoffs || tradeoffs.length === 0) return null;

  return (
    <div className="space-y-1.5 pt-2 border-t border-slate-100">
      <h4 className="text-xs font-medium text-slate-500 tracking-wide uppercase">
        Yang perlu kamu pertimbangkan
      </h4>
      <ul className="space-y-1 text-xs text-slate-600">
        {tradeoffs.map((tradeoff, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tradeoff}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
