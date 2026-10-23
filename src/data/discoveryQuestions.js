/**
 * discoveryQuestions.js
 * Data-driven question definitions for the student housing discovery flow.
 * Each question maps to scoring weights used in the matching algorithm.
 */

export const DISCOVERY_QUESTIONS = [
  {
    id: 'environment',
    step: 1,
    question: 'Kamu paling nyaman tinggal di tempat yang seperti apa?',
    hint: null,
    type: 'single',
    field: 'environmentPref',
    options: [
      {
        id: 'quiet',
        label: 'Tenang',
        description: 'Lebih suka suasana yang minim gangguan.',
        emoji: '🤫',
        weights: { quiet: 5, social: 1, balanced: 2 }
      },
      {
        id: 'social',
        label: 'Ramai',
        description: 'Suka ada teman dan suasana yang hidup.',
        emoji: '🤝',
        weights: { quiet: 1, social: 5, balanced: 2 }
      },
      {
        id: 'balanced',
        label: 'Seimbang',
        description: 'Tenang saat butuh fokus, tetap nyaman untuk bersosialisasi.',
        emoji: '⚖️',
        weights: { quiet: 3, social: 3, balanced: 5 }
      },
      {
        id: 'flexible',
        label: 'Yang penting nyaman',
        description: 'Suasana bukan prioritas utama, yang penting bersih dan aman.',
        emoji: '✨',
        weights: { quiet: 2, social: 2, balanced: 4 }
      }
    ]
  },
  {
    id: 'afterClass',
    step: 2,
    question: 'Kalau pulang kuliah, biasanya kamu...',
    hint: 'Pilih yang paling sering terjadi.',
    type: 'single',
    field: 'afterClass',
    options: [
      {
        id: 'rest',
        label: 'Langsung istirahat',
        description: 'Butuh kamar yang nyaman dan tenang.',
        emoji: '😴',
        weights: { privacy: 5, quiet: 4 }
      },
      {
        id: 'study',
        label: 'Ngerjain tugas atau belajar',
        description: 'Butuh meja belajar, WiFi cepat, dan suasana fokus.',
        emoji: '📚',
        weights: { wifi: 5, quiet: 4, study_desk: 3 }
      },
      {
        id: 'hangout',
        label: 'Nongkrong sama teman',
        description: 'Senang berkumpul atau keluar bareng teman sekos.',
        emoji: '🎉',
        weights: { social: 5, location: 3 }
      },
      {
        id: 'eat',
        label: 'Keluar cari makan',
        description: 'Penting ada warung atau tempat makan di sekitar.',
        emoji: '🍜',
        weights: { location: 4, social: 2 }
      },
      {
        id: 'flexible',
        label: 'Tergantung harinya',
        description: 'Fleksibel, bisa ngapa-ngapain tergantung situasi.',
        emoji: '🌀',
        weights: { balanced: 4, privacy: 2 }
      }
    ]
  },
  {
    id: 'priorities',
    step: 3,
    question: 'Dari semua ini, mana yang paling penting buat kamu?',
    hint: 'Pilih beberapa yang benar-benar penting, bukan semua yang kamu mau.',
    type: 'multi',
    field: 'facilities',
    maxSelect: 5,
    maxSelectNote: 'Pilih maksimal 5 yang paling penting buat kamu.',
    options: [
      { id: 'bathroom_inside', label: 'Kamar mandi pribadi', emoji: '🚿' },
      { id: 'ac', label: 'AC', emoji: '❄️' },
      { id: 'wifi', label: 'WiFi cepat', emoji: '📶' },
      { id: 'security', label: 'Keamanan 24 jam', emoji: '🔒' },
      { id: 'parking_motor', label: 'Parkiran motor', emoji: '🛵' },
      { id: 'kitchen', label: 'Dapur', emoji: '🍳' },
      { id: 'laundry', label: 'Laundry', emoji: '👕' },
      { id: 'food_nearby', label: 'Dekat tempat makan', emoji: '🍽️' },
      { id: 'study_desk', label: 'Meja belajar', emoji: '🪑' },
      { id: 'privacy', label: 'Privasi tinggi', emoji: '🚪' }
    ]
  },
  {
    id: 'distance',
    step: 4,
    question: 'Seberapa penting dekat dengan IPB?',
    hint: null,
    type: 'single',
    field: 'maxDistance',
    options: [
      {
        id: 'walking',
        label: 'Harus dekat',
        description: 'Jalan kaki atau perjalanan singkat ke kampus.',
        emoji: '🚶',
        value: 0.8
      },
      {
        id: 'close',
        label: 'Maksimal 1 km',
        description: 'Masih sangat dekat, bisa naik sepeda.',
        emoji: '🚲',
        value: 1.0
      },
      {
        id: 'medium',
        label: 'Maksimal 2 km',
        description: '5–10 menit naik motor atau angkot.',
        emoji: '🛵',
        value: 2.0
      },
      {
        id: 'flexible',
        label: 'Nggak terlalu penting',
        description: 'Asalkan ada kendaraan atau transportasi tersedia.',
        emoji: '🚗',
        value: 0
      }
    ]
  },
  {
    id: 'budget',
    step: 5,
    question: 'Budget yang paling nyaman buat kamu?',
    hint: 'Per bulan, termasuk listrik dan air jika ada.',
    type: 'single',
    field: 'budgetMax',
    options: [
      { id: 'under1m', label: 'Di bawah Rp 1 juta', emoji: '💰', min: 0, max: 1000000 },
      { id: '1to1_5m', label: 'Rp 1 – 1,5 juta', emoji: '💰', min: 1000000, max: 1500000 },
      { id: '1_5to2m', label: 'Rp 1,5 – 2 juta', emoji: '💰', min: 1500000, max: 2000000 },
      { id: '2to3m', label: 'Rp 2 – 3 juta', emoji: '💰', min: 2000000, max: 3000000 },
      { id: 'over3m', label: 'Di atas Rp 3 juta', emoji: '💎', min: 3000000, max: 10000000 }
    ]
  },
  {
    id: 'moveIn',
    step: 6,
    question: 'Kamu rencana mulai tinggal kapan?',
    hint: null,
    type: 'single',
    field: 'moveInDate',
    options: [
      { id: 'asap', label: 'Bulan ini atau segera', emoji: '📅' },
      { id: 'next_month', label: 'Bulan depan', emoji: '📅' },
      { id: 'new_semester', label: 'Awal semester baru', emoji: '🎓', hint: 'Agustus / September' },
      { id: 'two_months', label: '2–3 bulan lagi', emoji: '📅' },
      { id: 'unknown', label: 'Belum tahu', emoji: '🤔' }
    ]
  }
];

export const TOTAL_STEPS = DISCOVERY_QUESTIONS.length + 1; // +1 for contact step

export default DISCOVERY_QUESTIONS;
