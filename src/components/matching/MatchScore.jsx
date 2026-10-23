import React from 'react';
import { getMatchLabel } from '../../utils/matching';

export default function MatchScore({ score }) {
  const label = getMatchLabel(score);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full text-xs font-medium">
      <span className="font-semibold text-amber-800">{score}%</span>
      <span className="text-amber-300">•</span>
      <span>{label}</span>
    </div>
  );
}
