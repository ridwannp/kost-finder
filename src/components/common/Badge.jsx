import React from 'react';

export default function Badge({ variant = 'default', children, className = '' }) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors';

  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    primary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    putra: 'bg-blue-50 text-blue-700 border-blue-200',
    putri: 'bg-rose-50 text-rose-700 border-rose-200',
    campur: 'bg-purple-50 text-purple-700 border-purple-200',
    verified: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    demo: 'bg-slate-800 text-slate-100 border-slate-700'
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <span className={`${baseClasses} ${selectedVariant} ${className}`}>
      {children}
    </span>
  );
}
