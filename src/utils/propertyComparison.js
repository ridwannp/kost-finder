import { matchPropertyToProfile } from './matching';

/**
 * Standard facilities to compare across properties
 */
export const COMPARISON_FACILITIES = [
  { key: 'wifi', label: 'WiFi High Speed' },
  { key: 'ac', label: 'AC (Pendingin Ruangan)' },
  { key: 'bathroom_inside', label: 'Kamar Mandi Dalam' },
  { key: 'furnished', label: 'Sudah Berperabot (Kasur & Lemari)' },
  { key: 'parking_motor', label: 'Parkir Motor' },
  { key: 'parking_car', label: 'Parkir Mobil' },
  { key: 'security', label: 'Keamanan / CCTV' },
  { key: 'kitchen', label: 'Dapur Bersama' },
  { key: 'laundry', label: 'Mesin Cuci / Laundry' },
  { key: 'water_heater', label: 'Water Heater' }
];

/**
 * Check if a property has a given facility.
 * Returns: true | false | null (null means unknown)
 */
export function getFacilityStatus(property, facilityKey) {
  if (!property) return null;
  const facs = property.facilities;
  if (!facs) return null;

  if (Array.isArray(facs)) {
    if (facilityKey === 'bathroom_inside') {
      return facs.includes('bathroom_inside') || facs.includes('private_bathroom');
    }
    if (facilityKey === 'parking_motor') {
      return facs.includes('parking_motor') || facs.includes('parking');
    }
    return facs.includes(facilityKey);
  }

  if (typeof facs === 'object') {
    if (facilityKey in facs) return Boolean(facs[facilityKey]);
    return null;
  }

  return null;
}

/**
 * Comparison category definitions
 */
export const COMPARISON_CATEGORIES = [
  {
    id: 'price',
    title: 'Harga & Biaya Sewa',
    fields: [
      {
        id: 'price_monthly',
        label: 'Harga per Bulan',
        getValue: (p) => p.priceMin || p.pricing?.min || null,
        format: (val) => (val ? `Rp${Number(val).toLocaleString('id-ID')} /bln` : 'Belum diketahui')
      },
      {
        id: 'price_max',
        label: 'Rentang Harga Tertinggi',
        getValue: (p) => p.priceMax || p.pricing?.max || null,
        format: (val) => (val ? `Rp${Number(val).toLocaleString('id-ID')} /bln` : '-')
      },
      {
        id: 'price_period',
        label: 'Periode Pembayaran',
        getValue: (p) => p.pricing?.period || 'bulan',
        format: (val) => (val === 'bulan' ? 'Bulanan' : val === 'tahun' ? 'Tahunan' : val)
      }
    ]
  },
  {
    id: 'location',
    title: 'Lokasi & Akses IPB',
    fields: [
      {
        id: 'distance',
        label: 'Jarak ke Kampus IPB',
        getValue: (p) => (typeof p.distanceFromIPB === 'number' ? p.distanceFromIPB : null),
        format: (val) => {
          if (val === null || val === undefined) return 'Belum diketahui';
          if (val < 1) return `${Math.round(val * 1000)} m dari IPB`;
          return `${val} km dari IPB`;
        }
      },
      {
        id: 'area_name',
        label: 'Area / Wilayah',
        getValue: (p) => p.location?.areaName || p.location?.area || null,
        format: (val) => val || 'Belum diketahui'
      },
      {
        id: 'address',
        label: 'Alamat Lengkap',
        getValue: (p) => p.location?.address || null,
        format: (val) => val || 'Belum diketahui'
      }
    ]
  },
  {
    id: 'specs',
    title: 'Kamar & Ketersediaan',
    fields: [
      {
        id: 'gender',
        label: 'Tipe Penghuni',
        getValue: (p) => p.gender || null,
        format: (val) => {
          if (!val) return 'Belum diketahui';
          if (val === 'putri') return 'Khusus Putri';
          if (val === 'putra') return 'Khusus Putra';
          return 'Campur (Putra & Putri)';
        }
      },
      {
        id: 'availability',
        label: 'Ketersediaan Kamar',
        getValue: (p) => p.availability?.status || (p.availability?.availableRooms ? `Tersedia ${p.availability.availableRooms} Kamar` : null),
        format: (val) => val || 'Tanyakan Pengelola'
      },
      {
        id: 'verified',
        label: 'Status Verifikasi',
        getValue: (p) => (typeof p.verified === 'boolean' ? p.verified : null),
        format: (val) => (val === true ? 'Terverifikasi Tim Ngekost' : val === false ? 'Belum Terverifikasi' : 'Belum diketahui')
      }
    ]
  },
  {
    id: 'facilities',
    title: 'Fasilitas Utama',
    fields: COMPARISON_FACILITIES.map((f) => ({
      id: `fac_${f.key}`,
      label: f.label,
      getValue: (p) => getFacilityStatus(p, f.key),
      format: (val) => {
        if (val === true) return 'Ada';
        if (val === false) return 'Tidak tersedia';
        return 'Belum diketahui';
      }
    }))
  },
  {
    id: 'environment',
    title: 'Karakter Suasana Lingkungan',
    fields: [
      {
        id: 'env_quiet',
        label: 'Ketenangan Belajar',
        getValue: (p) => p.personality?.quiet ?? (p.environment?.noiseLevel === 'low' ? 5 : p.environment?.noiseLevel === 'high' ? 2 : 3),
        format: (val) => (val ? `${val}/5 · ${val >= 4 ? 'Sangat Tenang' : val <= 2 ? 'Cukup Ramai' : 'Seimbang'}` : 'Belum diketahui')
      },
      {
        id: 'env_privacy',
        label: 'Tingkat Privasi',
        getValue: (p) => p.personality?.privacy ?? null,
        format: (val) => (val ? `${val}/5 · ${val >= 4 ? 'Tinggi' : 'Standar'}` : 'Belum diketahui')
      },
      {
        id: 'env_social',
        label: 'Suasana Sosial / Komunal',
        getValue: (p) => p.personality?.social ?? null,
        format: (val) => (val ? `${val}/5 · ${val >= 4 ? 'Ramai & Akrab' : 'Cenderung Tertutup'}` : 'Belum diketahui')
      },
      {
        id: 'env_cleanliness',
        label: 'Kebersihan Lingkungan',
        getValue: (p) => p.personality?.cleanliness ?? (p.environment?.cleanlinessLevel === 'high' ? 5 : null),
        format: (val) => (val ? `${val}/5 · Sangat Bersih` : 'Belum diketahui')
      }
    ]
  }
];

/**
 * Checks if a specific field has different values among the compared properties.
 * Null/unknown values are treated carefully: if all properties have known same value, it's not different.
 */
export function hasFieldDifference(properties, field) {
  if (!properties || properties.length <= 1) return false;

  const values = properties.map((p) => {
    const val = field.getValue(p);
    return val === undefined ? null : val;
  });

  const first = values[0];
  return values.some((val) => JSON.stringify(val) !== JSON.stringify(first));
}

/**
 * Filter categories and fields to show only differences when toggle is ON.
 */
export function getFilteredComparisonCategories(categories, properties, showDifferencesOnly) {
  if (!showDifferencesOnly) return categories;

  return categories
    .map((cat) => {
      const diffFields = cat.fields.filter((field) => hasFieldDifference(properties, field));
      return {
        ...cat,
        fields: diffFields
      };
    })
    .filter((cat) => cat.fields.length > 0);
}

/**
 * Generates rule-based personal decision summary comparing the properties
 * with the student's profile (or general attributes if no profile is provided).
 */
export function generateDecisionSummary(properties, studentProfile) {
  if (!properties || properties.length < 2) return null;

  const prefs = studentProfile?.preferences || studentProfile || null;
  const matchResults = prefs
    ? properties.map((p) => ({
        property: p,
        match: matchPropertyToProfile(p, prefs)
      }))
    : [];

  const summaries = [];

  // 1. Budget comparison
  const sortedByPrice = [...properties].sort((a, b) => (a.priceMin || 0) - (b.priceMin || 0));
  const cheapest = sortedByPrice[0];
  const mostExpensive = sortedByPrice[sortedByPrice.length - 1];

  if ((cheapest.priceMin || 0) < (mostExpensive.priceMin || 0)) {
    const diff = (mostExpensive.priceMin || 0) - (cheapest.priceMin || 0);
    summaries.push({
      type: 'budget',
      title: 'Paling Hemat Anggaran',
      propertyId: cheapest.id,
      propertyName: cheapest.name,
      text: `${cheapest.name} lebih hemat Rp${(diff / 1000).toLocaleString('id-ID')}rb/bln dibanding ${mostExpensive.name}.`
    });
  }

  // 2. Distance comparison
  const sortedByDist = [...properties].sort((a, b) => (a.distanceFromIPB || 99) - (b.distanceFromIPB || 99));
  const closest = sortedByDist[0];
  const furthest = sortedByDist[sortedByDist.length - 1];

  if ((closest.distanceFromIPB || 0) < (furthest.distanceFromIPB || 0)) {
    summaries.push({
      type: 'distance',
      title: 'Akses Kampus Terdekat',
      propertyId: closest.id,
      propertyName: closest.name,
      text: `${closest.name} paling dekat ke IPB (${closest.distanceFromIPB} km), menghemat waktu tempuh kuliah harian.`
    });
  }

  // 3. Facilities count
  const sortedByFacilities = [...properties].sort((a, b) => (b.facilities?.length || 0) - (a.facilities?.length || 0));
  const mostEquipped = sortedByFacilities[0];
  const leastEquipped = sortedByFacilities[sortedByFacilities.length - 1];

  if ((mostEquipped.facilities?.length || 0) > (leastEquipped.facilities?.length || 0)) {
    summaries.push({
      type: 'facilities',
      title: 'Fasilitas Paling Lengkap',
      propertyId: mostEquipped.id,
      propertyName: mostEquipped.name,
      text: `${mostEquipped.name} mencatatkan ${mostEquipped.facilities?.length} fasilitas aktif di sistem.`
    });
  }

  // 4. Quiet / Privacy atmosphere
  const sortedByQuiet = [...properties].sort((a, b) => (b.personality?.quiet || 0) - (a.personality?.quiet || 0));
  const quietest = sortedByQuiet[0];
  if ((quietest.personality?.quiet || 0) >= 4) {
    summaries.push({
      type: 'quiet',
      title: 'Ketenangan Belajar Tertinggi',
      propertyId: quietest.id,
      propertyName: quietest.name,
      text: `${quietest.name} memiliki rating ketenangan ${quietest.personality.quiet}/5, paling kondusif untuk fokus belajar.`
    });
  }

  // 5. Match result insight if profile available
  let topMatch = null;
  if (matchResults.length > 0) {
    matchResults.sort((a, b) => b.match.score - a.match.score);
    topMatch = matchResults[0];
  }

  return {
    summaries,
    topMatch,
    hasProfile: Boolean(prefs && (prefs.budgetMax || prefs.environmentPref || prefs.facilities?.length)),
    prioritiesContext: prefs
      ? [
          prefs.budgetMax ? `budget maks Rp${(prefs.budgetMax / 1000000).toFixed(1)} jt` : null,
          prefs.maxDistance ? `jarak maks ${prefs.maxDistance} km` : null,
          prefs.environmentPref ? `suasana ${prefs.environmentPref === 'quiet' ? 'tenang' : 'sosial'}` : null,
          prefs.facilities?.includes('bathroom_inside') ? 'kamar mandi dalam' : null,
          prefs.facilities?.includes('wifi') ? 'WiFi' : null
        ].filter(Boolean)
      : []
  };
}
