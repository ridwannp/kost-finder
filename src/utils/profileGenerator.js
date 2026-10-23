/**
 * profileGenerator.js
 * Deterministic student housing profile generator.
 * Input: student discovery answers
 * Output: housing preference profile with type, title, description, and priorities
 */

/**
 * Generate a housing preference profile from student answers.
 * @param {Object} answers - The student's discovery answers
 * @returns {Object} housing profile
 */
export function generateProfile(answers) {
  const { environmentPref, afterClass, facilities = [], maxDistance, budgetMax } = answers;

  // Determine primary profile type
  const isQuiet = environmentPref === 'quiet' || afterClass === 'rest' || afterClass === 'study';
  const isSocial = environmentPref === 'social' || afterClass === 'hangout';
  const isPractical = maxDistance <= 1.0 || budgetMax <= 1500000;
  const isComfort =
    facilities.includes('ac') &&
    facilities.includes('bathroom_inside') &&
    facilities.length >= 3;

  // Score each archetype
  const scores = {
    focused: 0,
    social: 0,
    practical: 0,
    comfort: 0
  };

  if (environmentPref === 'quiet') scores.focused += 3;
  if (environmentPref === 'social') scores.social += 3;
  if (environmentPref === 'balanced') { scores.focused += 1; scores.social += 1; }
  if (environmentPref === 'flexible') scores.practical += 2;

  if (afterClass === 'rest') scores.focused += 2;
  if (afterClass === 'study') scores.focused += 3;
  if (afterClass === 'hangout') scores.social += 3;
  if (afterClass === 'eat') scores.practical += 2;
  if (afterClass === 'flexible') { scores.practical += 1; scores.social += 1; }

  if (facilities.includes('privacy')) scores.focused += 2;
  if (facilities.includes('wifi')) scores.focused += 1;
  if (facilities.includes('study_desk')) scores.focused += 2;
  if (facilities.includes('ac') && facilities.includes('bathroom_inside')) scores.comfort += 3;
  if (facilities.includes('kitchen')) scores.comfort += 1;
  if (facilities.includes('laundry')) scores.comfort += 1;
  if (facilities.includes('food_nearby')) scores.social += 1;
  if (facilities.length >= 4) scores.comfort += 1;

  if (maxDistance <= 0.8) scores.practical += 3;
  if (maxDistance <= 1.5) scores.practical += 1;
  if (budgetMax <= 1500000) scores.practical += 2;

  // Pick highest scoring archetype
  const topArchetype = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  // Build priorities list
  const priorities = [];
  if (environmentPref === 'quiet' || environmentPref === 'balanced') priorities.push('Suasana tenang');
  if (environmentPref === 'social') priorities.push('Lingkungan ramah');
  if (facilities.includes('wifi')) priorities.push('WiFi cepat');
  if (facilities.includes('ac')) priorities.push('AC');
  if (facilities.includes('bathroom_inside')) priorities.push('Kamar mandi pribadi');
  if (facilities.includes('privacy')) priorities.push('Privasi');
  if (facilities.includes('security')) priorities.push('Keamanan');
  if (facilities.includes('parking_motor')) priorities.push('Parkiran motor');
  if (maxDistance <= 1.0) priorities.push('Dekat kampus IPB');
  if (budgetMax <= 1500000) priorities.push('Budget terjangkau');

  const profiles = {
    focused: {
      archetype: 'focused',
      title: 'Si Fokus',
      englishTitle: 'The Focused One',
      emoji: '📚',
      tagline: 'Tenang, privat, dan mendukung waktu belajar.',
      description:
        'Kamu terlihat lebih nyaman dengan tempat yang tenang dan privat, di mana kamu bisa belajar atau istirahat tanpa gangguan. Kos yang cocok buat kamu adalah yang punya suasana hening, koneksi internet stabil, dan privasi yang cukup.',
      suitableTags: ['Lingkungan tenang', 'Privasi tinggi', 'WiFi stabil', 'Dekat kampus']
    },
    social: {
      archetype: 'social',
      title: 'Si Sosial',
      englishTitle: 'The Social One',
      emoji: '🤝',
      tagline: 'Ramai, akrab, dan mudah bertemu teman.',
      description:
        'Kamu lebih nyaman di lingkungan yang hidup dan mudah bersosialisasi. Kos yang cocok buat kamu biasanya punya penghuni yang aktif, area bersama yang nyaman, dan lokasinya dekat dengan berbagai tempat nongkrong.',
      suitableTags: ['Lingkungan aktif', 'Area komunal', 'Dekat tempat makan', 'Teman sekos asik']
    },
    practical: {
      archetype: 'practical',
      title: 'Si Praktis',
      englishTitle: 'The Practical One',
      emoji: '⚡',
      tagline: 'Yang penting dekat, nyaman, dan sesuai budget.',
      description:
        'Buatmu, yang paling penting adalah efisiensi. Kos yang dekat kampus, harga terjangkau, dan fasilitas cukup sudah lebih dari memadai. Kamu tidak terlalu mempersoalkan hal-hal yang bukan kebutuhan pokok.',
      suitableTags: ['Dekat IPB', 'Harga terjangkau', 'Akses mudah', 'Fasilitas cukup']
    },
    comfort: {
      archetype: 'comfort',
      title: 'Si Nyaman',
      englishTitle: 'The Comfort Seeker',
      emoji: '🏡',
      tagline: 'Fasilitas lengkap dan nyaman di segala waktu.',
      description:
        'Kamu lebih memilih kenyamanan dan fasilitas yang lengkap sebagai prioritas. Tempat yang bersih, fasilitas modern, dan suasana yang menyenangkan membuat kamu betah lebih lama di kos.',
      suitableTags: ['Fasilitas lengkap', 'AC & WiFi', 'Kamar mandi dalam', 'Bersih & nyaman']
    }
  };

  const profile = profiles[topArchetype] || profiles.practical;

  return {
    ...profile,
    priorities: priorities.length > 0 ? priorities.slice(0, 5) : profile.suitableTags,
    rawScores: scores,
    answers: {
      environmentPref,
      afterClass,
      facilities,
      maxDistance,
      budgetMax
    }
  };
}

/**
 * Map discovery answers to property matching criteria.
 * @param {Object} answers - Discovery answers
 * @returns {Object} matching criteria for propertyService
 */
export function answersToMatchCriteria(answers) {
  const { facilities = [], maxDistance, budgetMax, budgetMin = 0, environmentPref } = answers;

  return {
    maxPrice: budgetMax || 2000000,
    minPrice: budgetMin || 0,
    maxDistance: maxDistance || 0,
    wifi: facilities.includes('wifi'),
    ac: facilities.includes('ac'),
    bathroomInside: facilities.includes('bathroom_inside'),
    parkingMotor: facilities.includes('parking_motor'),
    environment: environmentPref || 'balanced'
  };
}

export default generateProfile;
