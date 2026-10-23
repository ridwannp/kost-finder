/**
 * Formatting utilities for Ngekost
 */

export function formatRupiah(amount) {
  if (!amount && amount !== 0) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  })
    .format(amount)
    .replace(',00', '');
}

export function formatDistance(km) {
  if (!km && km !== 0) return '0 km';
  if (km < 1) {
    return `${Math.round(km * 1000)} m dari IPB`;
  }
  return `${km} km dari IPB`;
}

export function getNoiseLevelLabel(level) {
  switch (level) {
    case 'low':
      return 'Sangat Tenang';
    case 'medium':
      return 'Sedang / Seimbang';
    case 'high':
      return 'Cukup Ramai';
    default:
      return 'Tenang';
  }
}
