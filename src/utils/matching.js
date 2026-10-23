/**
 * Deterministic Matching Engine for Ngekost
 * Compares student preference profile against property data.
 *
 * Scoring breakdown (100% Total):
 * - Budget compatibility: 25%
 * - Facilities compatibility: 20%
 * - Distance compatibility: 20%
 * - Environment compatibility: 15%
 * - Privacy/social preference: 10%
 * - Lifestyle compatibility: 10%
 */

// 1. Budget Score (0 - 25)
export function calculateBudgetScore(profile = {}, property = {}) {
  const budgetMax = profile.budgetMax || profile.preferences?.budgetMax || profile.budget || 2000000;
  const priceMin = property.pricing?.min || property.priceMin || property.pricing?.basePrice || 0;

  if (!budgetMax || budgetMax <= 0) return { score: 25, reason: null, tradeoff: null };

  if (priceMin <= budgetMax) {
    return {
      score: 25,
      reason: 'Masuk budget kamu',
      tradeoff: null
    };
  } else if (priceMin <= budgetMax * 1.15) {
    const diffInRupiah = Math.round((priceMin - budgetMax) / 100000) * 100000;
    const diffFormatted = diffInRupiah >= 100000 ? `Rp${(diffInRupiah / 1000).toLocaleString('id-ID')}rb` : `sedikit`;
    return {
      score: 14,
      reason: null,
      tradeoff: `Harga mulai dari Rp${(priceMin / 1000000).toFixed(1)} juta, ${diffFormatted} di atas budget.`
    };
  } else {
    return {
      score: 5,
      reason: null,
      tradeoff: `Harga Rp${(priceMin / 1000000).toFixed(1)} juta melebihi budget kamu.`
    };
  }
}

// 2. Facilities Score (0 - 20)
export function calculateFacilityScore(profile = {}, property = {}) {
  const reqFacilities = profile.facilities || profile.preferences?.facilities || [];
  const propFacilities = property.facilities || [];

  // Map object format if property.facilities is an object (e.g. { wifi: true, bathroomInside: true })
  let propFacList = [];
  if (Array.isArray(propFacilities)) {
    propFacList = propFacilities;
  } else if (typeof propFacilities === 'object' && propFacilities !== null) {
    if (propFacilities.wifi) propFacList.push('wifi');
    if (propFacilities.ac) propFacList.push('ac');
    if (propFacilities.bathroomInside || propFacilities.private_bathroom) propFacList.push('bathroom_inside', 'private_bathroom');
    if (propFacilities.parking) propFacList.push('parking');
    if (propFacilities.kitchen) propFacList.push('kitchen');
    if (propFacilities.security) propFacList.push('security');
  }

  const reasons = [];
  const tradeoffs = [];

  if (reqFacilities.length === 0) {
    return { score: 20, reasons: ['Fasilitas standar tersedia lengkap'], tradeoffs: [] };
  }

  const matched = reqFacilities.filter((req) => {
    if (req === 'wifi' && propFacList.includes('wifi')) {
      reasons.push('WiFi tersedia');
      return true;
    }
    if ((req === 'private_bathroom' || req === 'bathroom_inside') && 
        (propFacList.includes('bathroom_inside') || propFacList.includes('private_bathroom'))) {
      reasons.push('Kamar mandi pribadi');
      return true;
    }
    if (req === 'ac' && propFacList.includes('ac')) {
      reasons.push('Kamar mandi & kamar ber-AC');
      return true;
    }
    if (req === 'security' && propFacList.includes('security')) {
      reasons.push('Keamanan & parkir aman');
      return true;
    }
    if (req === 'kitchen' && propFacList.includes('kitchen')) {
      reasons.push('Dapur bersama tersedia');
      return true;
    }
    return propFacList.includes(req);
  });

  const ratio = matched.length / reqFacilities.length;
  const score = Math.round(ratio * 20);

  // Check missing facilities for tradeoffs
  const missing = reqFacilities.filter((req) => !matched.includes(req));
  if (missing.includes('private_bathroom') || missing.includes('bathroom_inside')) {
    tradeoffs.push('Kamar mandi luar (luar kamar)');
  }
  if (missing.includes('ac')) {
    tradeoffs.push('Belum dilengkapi AC');
  }

  return { score, reasons, tradeoffs };
}

// 3. Distance Score (0 - 20)
export function calculateDistanceScore(profile = {}, property = {}) {
  const dist = property.distanceFromIPB ?? property.distance ?? 1.5;
  const targetDist = profile.maxDistance || profile.preferences?.maxDistance || 2.0;

  if (dist <= 0.8) {
    return {
      score: 20,
      reason: `Hanya ${dist} km dari IPB (bisa jalan kaki)`,
      tradeoff: null
    };
  } else if (dist <= targetDist) {
    return {
      score: 18,
      reason: `Kurang dari ${targetDist} km dari IPB`,
      tradeoff: null
    };
  } else if (dist <= targetDist + 1.0) {
    return {
      score: 12,
      reason: null,
      tradeoff: `Jaraknya (${dist} km) sedikit lebih jauh dari preferensi kamu.`
    };
  } else {
    return {
      score: 6,
      reason: null,
      tradeoff: `Jarak (${dist} km) membutuhkan angkutan atau kendaraan.`
    };
  }
}

// 4. Environment Score (0 - 15)
export function calculateEnvironmentScore(profile = {}, property = {}) {
  const userEnv = profile.lifestyle?.environmentPref || profile.preferences?.lifestyle?.environmentPref || profile.environmentPref || 'quiet';
  const noiseLevel = property.environment?.noiseLevel || 'medium';

  if (userEnv === 'quiet') {
    if (noiseLevel === 'low') {
      return { score: 15, reason: 'Tenang untuk belajar', tradeoff: null };
    } else if (noiseLevel === 'medium') {
      return { score: 10, reason: null, tradeoff: 'Suasana area terkadang cukup ramai di jam tertentu.' };
    } else {
      return { score: 5, reason: null, tradeoff: 'Suasanya lebih ramai dibanding preferensi tenangmu.' };
    }
  } else if (userEnv === 'social') {
    if (noiseLevel === 'medium' || noiseLevel === 'high') {
      return { score: 15, reason: 'Suasana hidup & mudah bersosialisasi', tradeoff: null };
    } else {
      return { score: 10, reason: null, tradeoff: 'Lingkungan cenderung agak sepi.' };
    }
  } else {
    return { score: 13, reason: 'Suasana seimbang untuk belajar dan istirahat', tradeoff: null };
  }
}

// 5. Privacy & Social Score (0 - 10)
export function calculateSocialPrivacyScore(profile = {}, property = {}) {
  const userPrivacy = profile.lifestyle?.privacy ?? profile.preferences?.lifestyle?.privacy ?? 3;
  const propPrivacy = property.personality?.privacy ?? 3;

  const diff = Math.abs(userPrivacy - propPrivacy);
  if (diff <= 1) {
    if (propPrivacy >= 4) {
      return { score: 10, reason: 'Privasi terjaga dengan baik', tradeoff: null };
    } else {
      return { score: 10, reason: 'Suasana ramah berinteraksi', tradeoff: null };
    }
  } else {
    return { score: 5, reason: null, tradeoff: null };
  }
}

// 6. Lifestyle Score (0 - 10)
export function calculateLifestyleScore(profile = {}, property = {}) {
  const afterClass = profile.lifestyle?.afterClass || profile.preferences?.lifestyle?.afterClass || 'rest';
  const propQuiet = property.personality?.quiet ?? 3;
  const propCommunity = property.personality?.community ?? 3;

  if (afterClass === 'study' && propQuiet >= 4) {
    return { score: 10, reason: 'Kondusif untuk belajar setelah kuliah', tradeoff: null };
  } else if (afterClass === 'hangout' && propCommunity >= 3) {
    return { score: 10, reason: 'Dekat ke tempat kumpul & kuliner', tradeoff: null };
  } else if (afterClass === 'rest') {
    return { score: 10, reason: 'Nyaman untuk istirahat total', tradeoff: null };
  }
  return { score: 7, reason: null, tradeoff: null };
}

/**
 * Main Deterministic Matching Function
 */
export function matchPropertyToProfile(property, profile = {}) {
  if (!property) {
    return { propertyId: null, score: 0, reasons: [], tradeoffs: [] };
  }

  const budgetRes = calculateBudgetScore(profile, property);
  const facRes = calculateFacilityScore(profile, property);
  const distRes = calculateDistanceScore(profile, property);
  const envRes = calculateEnvironmentScore(profile, property);
  const privRes = calculateSocialPrivacyScore(profile, property);
  const lifeRes = calculateLifestyleScore(profile, property);

  const rawScore =
    budgetRes.score +
    facRes.score +
    distRes.score +
    envRes.score +
    privRes.score +
    lifeRes.score;

  // Clamped to integer 0 - 100
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  // Collect reasons (3 to 5 items)
  const reasons = [];
  if (distRes.reason) reasons.push(distRes.reason);
  if (budgetRes.reason) reasons.push(budgetRes.reason);
  if (envRes.reason) reasons.push(envRes.reason);
  if (facRes.reasons && facRes.reasons.length > 0) {
    facRes.reasons.forEach((r) => {
      if (!reasons.includes(r)) reasons.push(r);
    });
  }
  if (privRes.reason && !reasons.includes(privRes.reason)) reasons.push(privRes.reason);
  if (lifeRes.reason && !reasons.includes(lifeRes.reason)) reasons.push(lifeRes.reason);

  // Fallback reason if less than 3
  if (reasons.length < 2) {
    reasons.push('Lokasi strategis di sekitar kampus IPB');
  }

  // Collect tradeoffs (0 to 2 items)
  const tradeoffs = [];
  if (distRes.tradeoff) tradeoffs.push(distRes.tradeoff);
  if (budgetRes.tradeoff) tradeoffs.push(budgetRes.tradeoff);
  if (envRes.tradeoff) tradeoffs.push(envRes.tradeoff);
  if (facRes.tradeoffs && facRes.tradeoffs.length > 0) {
    facRes.tradeoffs.forEach((t) => {
      if (!tradeoffs.includes(t)) tradeoffs.push(t);
    });
  }

  return {
    propertyId: property.id,
    score,
    reasons: Array.from(new Set(reasons)).slice(0, 5),
    tradeoffs: Array.from(new Set(tradeoffs)).slice(0, 2)
  };
}

/**
 * Score label mappings
 */
export function getMatchLabel(score) {
  if (score >= 90) return 'Sangat cocok';
  if (score >= 80) return 'Cocok banget';
  if (score >= 70) return 'Layak dipertimbangkan';
  if (score >= 60) return 'Ada beberapa yang cocok';
  return 'Kurang sesuai';
}

/**
 * Legacy support wrapper
 */
export function calculateMatchScore(studentProfile, property) {
  const result = matchPropertyToProfile(property, studentProfile);
  return {
    propertyId: property.id,
    score: result.score,
    reasons: result.reasons,
    tradeoffs: result.tradeoffs
  };
}

/**
 * Simple Student Archetype Generator
 */
export function determineStudentArchetype(answers = {}) {
  const env = answers.environmentPref || 'quiet';
  const habit = answers.afterClass || 'rest';

  if (env === 'quiet' || habit === 'study') {
    return {
      title: 'The Focused Academic',
      tagline: 'Kamu lebih cocok dengan lingkungan tenang, berprivasi tinggi, dan mendukung fokus belajar.',
      priorities: ['Ketenangan tinggi', 'Privasi terjaga', 'Koneksi Wi-Fi stabil', 'Kamar mandi dalam'],
      idealKostTraits: ['Tingkat kebisingan rendah', 'Area belajar kondusif', 'Akses internet cepat', 'Dekat ke kampus IPB']
    };
  }

  if (env === 'social' || habit === 'hangout') {
    return {
      title: 'The Friendly Neighbor',
      tagline: 'Kamu tipe yang menyukai suasana hangat, mudah berteman, dan dekat ke tempat kuliner.',
      priorities: ['Suasana komunal', 'Dekat tempat makan', 'Parkir motor aman', 'Fasilitas bersama lengkap'],
      idealKostTraits: ['Area bersama aktif', 'Akses mudah ke warung makan', 'Lingkungan ramah', 'Suasana kekeluargaan']
    };
  }

  return {
    title: 'The Balanced Student',
    tagline: 'Kamu menyukai keseimbangan antara waktu istirahat tenang dan sosialisasi santai dengan teman.',
    priorities: ['Kamar bersih & nyaman', 'Ketenangan seimbang', 'Wi-Fi & AC', 'Lokasi dekat kampus'],
    idealKostTraits: ['Lingkungan sejuk', 'Fasilitas kamar mandi & kasur berkualitas', 'Jarak efisien ke IPB', 'Privasi cukup']
  };
}
