export const PROPERTIES = [
  {
    id: 'kost-putri-srikandi',
    name: 'Kost Putri Srikandi',
    slug: 'kost-putri-srikandi',
    badge: 'Rekomendasi',
    badgeColor: 'green',
    description: 'Kost khusus mahasiswi IPB yang tenang dan aman. Berada di lingkungan perumahan Babakan Dramaga yang tidak bising kendaraan. Sangat cocok bagi kamu yang membutuhkan konsentrasi tinggi saat belajar dan mengutamakan kenyamanan istirahat.',
    location: {
      area: 'dramaga',
      areaName: 'Dramaga, Bogor',
      address: 'Jl. Raya Dramaga Gg. Srikandi No. 12, Bogor',
      latitude: -6.5542,
      longitude: 106.7265
    },
    distanceFromIPB: 1.2,
    priceMin: 1200000,
    priceMax: 1500000,
    pricing: { min: 1200000, max: 1500000, period: 'bulan' },
    gender: 'putri',
    genderLabel: 'Kamar Putri',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'furnished', 'desk', 'parking_motor', 'security', 'water_heater'],
    facilityChips: ['Kamar Putri', 'AC', 'WiFi'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'low',
      studentDensity: 'high',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 5,
      social: 2,
      privacy: 5,
      community: 3,
      cleanliness: 5,
      convenience: 5
    },
    suitableFor: [
      'Cocok untuk yang suka suasana tenang',
      'Sering belajar & nugas di kamar',
      'Mengutamakan privasi & kamar mandi dalam',
      'Ingin lokasi tidak terlalu jauh dari IPB'
    ],
    rules: [
      'Batas bertamu hingga jam 22.00 WIB',
      'Khusus mahasiswi / wanita',
      'Dilarang membawa hewan peliharaan',
      'Menjaga ketenangan setelah jam 23.00 WIB'
    ],
    rating: 4.8,
    reviewCount: 32,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 16,
      availableRooms: 3,
      status: 'Tersedia 3 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Tipe Deluxe AC KM Dalam',
        price: 1200000,
        size: '3x4 m',
        facilities: ['Kasur Springbed', 'Lemari Pakaian', 'Meja Belajar', 'AC', 'Wi-Fi 100Mbps', 'Kamar Mandi Dalam'],
        available: 3
      }
    ],
    owner: {
      name: 'Ibu Hj. Ratna',
      phone: '6281234567890',
      whatsapp: '6281234567890',
      responseRate: '98%',
      responseTime: '< 15 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  {
    id: 'kost-mahkota',
    name: 'Kost Mahkota Babakan',
    slug: 'kost-mahkota',
    badge: 'Populer',
    badgeColor: 'amber',
    description: 'Kos favorit mahasiswa di Babakan Tengah. Dekat sekali dengan deretan tempat makan, laundry, dan foto kopi. Suasana ramah, saling kenal antar penghuni, cocok bagi mahasiswa yang aktif bersosialisasi.',
    location: {
      area: 'babakan',
      areaName: 'Babakan, Bogor',
      address: 'Babakan Tengah No. 45, Dramaga, Bogor',
      latitude: -6.5561,
      longitude: 106.7281
    },
    distanceFromIPB: 1.5,
    priceMin: 1450000,
    priceMax: 1800000,
    pricing: { min: 1450000, max: 1800000, period: 'bulan' },
    gender: 'campur',
    genderLabel: 'Kamar Campur',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'furnished', 'desk', 'parking_motor', 'kitchen', 'living_room'],
    facilityChips: ['Kamar Campur', 'AC', 'WiFi'],
    environment: {
      noiseLevel: 'medium',
      socialLevel: 'high',
      studentDensity: 'high',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 3,
      social: 5,
      privacy: 3,
      community: 5,
      cleanliness: 4,
      convenience: 5
    },
    suitableFor: [
      'Suka bersosialisasi & belajar kelompok',
      'Senang tinggal di kawasan ramai tempat makan',
      'Ingin suasana seperti di rumah sendiri',
      'Akses transportasi cepat ke kampus'
    ],
    rules: [
      'Gerbang digital 24 jam dengan kartu akses',
      'Tamu putra/putri wajib di ruang tamu bersama',
      'Menjaga kebersihan dapur bersama'
    ],
    rating: 4.7,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 20,
      availableRooms: 5,
      status: 'Tersedia 5 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Kamar Standard AC',
        price: 1450000,
        size: '3.5x4 m',
        facilities: ['Kasur Springbed', 'AC 1/2 PK', 'Kamar Mandi Dalam', 'Meja Belajar', 'Wi-Fi'],
        available: 5
      }
    ],
    owner: {
      name: 'Pak Bambang',
      phone: '6281398765432',
      whatsapp: '6281398765432',
      responseRate: '95%',
      responseTime: '< 30 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-02-01T08:00:00.000Z'
  },
  {
    id: 'kost-green-house',
    name: 'Kost Green House Cilibende',
    slug: 'kost-green-house',
    badge: null,
    description: 'Kos berkonsep asri dan sejuk dengan kebun halaman hijau di area Cilibende. Sangat menenangkan untuk beristirahat setelah kuliah seharian.',
    location: {
      area: 'cilibende',
      areaName: 'Cilibende, Bogor',
      address: 'Jl. Cilibende Raya No. 18, Bogor Barat',
      latitude: -6.5620,
      longitude: 106.7320
    },
    distanceFromIPB: 2.0,
    priceMin: 1100000,
    priceMax: 1400000,
    pricing: { min: 1100000, max: 1400000, period: 'bulan' },
    gender: 'putri',
    genderLabel: 'Kamar Putri',
    facilities: ['wifi', 'ac', 'kitchen', 'furnished', 'desk', 'parking_motor', 'refrigerator'],
    facilityChips: ['Kamar Putri', 'AC', 'Dapur Bersama'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'medium',
      studentDensity: 'medium',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 4,
      social: 3,
      privacy: 4,
      community: 4,
      cleanliness: 5,
      convenience: 4
    },
    suitableFor: [
      'Menyukai suasana asri & sejuk',
      'Ingin dapur bersama yang bersih untuk memasak',
      'Mahasiswi Vokasi & Kampus Utama IPB',
      'Mengutamakan kebersihan & udara segar'
    ],
    rules: [
      'Wajib menjaga kebersihan dapur & kulkas',
      'Tidak merokok di dalam area kost',
      'Jam malam gerbang utama 22.30 WIB'
    ],
    rating: 4.6,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 12,
      availableRooms: 2,
      status: 'Sisa 2 Kamar!'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard AC Dapur Bersama',
        price: 1100000,
        size: '3.5x3.5 m',
        facilities: ['Kasur Springbed Single', 'AC', 'Dapur Bersama', 'Wi-Fi'],
        available: 2
      }
    ],
    owner: {
      name: 'Ibu Dr. Endang',
      phone: '628111223344',
      whatsapp: '628111223344',
      responseRate: '100%',
      responseTime: '< 10 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  {
    id: 'kost-cendana',
    name: 'Kost Cendana Baranangsiang',
    slug: 'kost-cendana',
    badge: null,
    description: 'Kos super hemat dan praktis di Baranangsiang. Akses mudah ke angkot kota, dekat dengan pusat perbelanjaan, dan harga yang sangat ramah kantong mahasiswa.',
    location: {
      area: 'baranangsiang',
      areaName: 'Baranangsiang, Bogor',
      address: 'Jl. Cendana No. 9, Pajajaran, Bogor',
      latitude: -6.5529,
      longitude: 106.7240
    },
    distanceFromIPB: 2.5,
    priceMin: 900000,
    priceMax: 1200000,
    pricing: { min: 900000, max: 1200000, period: 'bulan' },
    gender: 'campur',
    genderLabel: 'Kamar Campur',
    facilities: ['wifi', 'furnished', 'desk', 'parking_motor', 'kitchen'],
    facilityChips: ['Kamar Campur', 'WiFi', 'Parkir Motor'],
    environment: {
      noiseLevel: 'medium',
      socialLevel: 'medium',
      studentDensity: 'high',
      cleanlinessLevel: 'medium'
    },
    personality: {
      quiet: 3,
      social: 3,
      privacy: 3,
      community: 3,
      cleanliness: 4,
      convenience: 4
    },
    suitableFor: [
      'Mencari kos ekonomis di bawah Rp 1 Juta',
      'Sering bepergian ke pusat kota Bogor',
      'Mahasiswa hemat & praktis',
      'Akses transportasi publik lancar'
    ],
    rules: [
      'Dilarang berbuat gaduh',
      'Parkir motor tertata rapi di dalam pagar',
      'Bayar sewa tepat waktu setiap tanggal 1'
    ],
    rating: 4.5,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c517a?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 15,
      availableRooms: 4,
      status: 'Tersedia 4 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Kamar Standard Non-AC',
        price: 900000,
        size: '3x3 m',
        facilities: ['Kasur Single', 'Lemari Pakaian', 'Meja Belajar', 'Wi-Fi'],
        available: 4
      }
    ],
    owner: {
      name: 'Pak Hendra',
      phone: '6285711223344',
      whatsapp: '6285711223344',
      responseRate: '92%',
      responseTime: '< 1 jam'
    },
    verified: false,
    isDemo: true,
    createdAt: '2026-02-10T08:00:00.000Z'
  },
  {
    id: 'kost-taman-sari',
    name: 'Kost Taman Sari Dramaga',
    slug: 'kost-taman-sari',
    badge: null,
    description: 'Kos nyaman khusus mahasiswi di area Dramaga. Dilengkapi AC, kasur springbed bermutu tinggi, dan meja belajar yang ergonomis.',
    location: {
      area: 'dramaga',
      areaName: 'Dramaga, Bogor',
      address: 'Perum Dramaga Cantik Blok E No. 4, Bogor',
      latitude: -6.5680,
      longitude: 106.7180
    },
    distanceFromIPB: 1.8,
    priceMin: 1300000,
    priceMax: 1600000,
    pricing: { min: 1300000, max: 1600000, period: 'bulan' },
    gender: 'putri',
    genderLabel: 'Kamar Putri',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'furnished', 'desk', 'parking_motor', 'security'],
    facilityChips: ['Kamar Putri', 'AC', 'WiFi'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'low',
      studentDensity: 'medium',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 5,
      social: 2,
      privacy: 5,
      community: 3,
      cleanliness: 5,
      convenience: 5
    },
    suitableFor: [
      'Mahasiswi yang suka ketenangan',
      'Mengutamakan privasi & kamar mandi dalam',
      'Butuh ruang nyaman untuk belajar di kamar',
      'Lingkungan perumahan aman'
    ],
    rules: [
      'Khusus mahasiswi',
      'Keamanan portal perumahan 24 jam',
      'Dilarang merokok di area kos'
    ],
    rating: 4.8,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 18,
      availableRooms: 3,
      status: 'Tersedia 3 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard AC KM Dalam',
        price: 1300000,
        size: '3.5x4 m',
        facilities: ['Kasur Springbed', 'AC', 'Meja Belajar', 'Wi-Fi'],
        available: 3
      }
    ],
    owner: {
      name: 'Ibu Sri',
      phone: '6289654321098',
      whatsapp: '6289654321098',
      responseRate: '96%',
      responseTime: '< 20 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-02-12T08:00:00.000Z'
  },
  {
    id: 'kost-melati',
    name: 'Kost Melati Babakan',
    slug: 'kost-melati',
    badge: null,
    description: 'Kos bersih dan terawat di Babakan Lio. Dilengkapi parkir motor berkanopi aman dan sistem penataan kamar yang rapi.',
    location: {
      area: 'babakan',
      areaName: 'Babakan, Bogor',
      address: 'Babakan Lio Gg. Melati No. 14, Bogor',
      latitude: -6.5590,
      longitude: 106.7410
    },
    distanceFromIPB: 1.7,
    priceMin: 1050000,
    priceMax: 1350000,
    pricing: { min: 1050000, max: 1350000, period: 'bulan' },
    gender: 'campur',
    genderLabel: 'Kamar Campur',
    facilities: ['wifi', 'ac', 'parking_motor', 'furnished', 'desk', 'laundry'],
    facilityChips: ['Kamar Campur', 'AC', 'Parkir Motor'],
    environment: {
      noiseLevel: 'medium',
      socialLevel: 'medium',
      studentDensity: 'high',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 4,
      social: 3,
      privacy: 4,
      community: 4,
      cleanliness: 4,
      convenience: 4
    },
    suitableFor: [
      'Membawa kendaraan motor pribadi',
      'Mencari kos AC harga 1 jutaan',
      'Akses jalan kaki & angkot dekat',
      'Lingkungan ramah mahasiswa'
    ],
    rules: [
      'Motor dikunci ganda saat malam hari',
      'Dilarang membawa senjata / miras',
      'Tamu menginap wajib ijin pengelola'
    ],
    rating: 4.6,
    reviewCount: 21,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 14,
      availableRooms: 4,
      status: 'Tersedia 4 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard AC Parkir Motor',
        price: 1050000,
        size: '3x3.5 m',
        facilities: ['Kasur Single', 'AC 1/2 PK', 'Wi-Fi', 'Parkir Motor'],
        available: 4
      }
    ],
    owner: {
      name: 'Pak Agus',
      phone: '6281809876543',
      whatsapp: '6281809876543',
      responseRate: '94%',
      responseTime: '< 25 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-01-20T08:00:00.000Z'
  },
  {
    id: 'kost-bara-bara-studio',
    name: 'Kost Bara Studio Putra',
    slug: 'kost-bara-bara-studio',
    badge: 'Rekomendasi',
    badgeColor: 'green',
    description: 'Kos studio eksklusif khusus mahasiswa putra selangkah dari Gerbang Bara IPB. Dilengkapi meja gaming & belajar ergonomis serta internet fiber optik 200 Mbps untuk mahasiswa jurusan teknik dan ilmu komputer.',
    location: {
      area: 'babakan',
      areaName: 'Babakan Raya (Bara)',
      address: 'Babakan Raya Gg. 4 No. 9, Dramaga, Bogor',
      latitude: -6.5548,
      longitude: 106.7269
    },
    distanceFromIPB: 0.4,
    priceMin: 1600000,
    priceMax: 1950000,
    pricing: { min: 1600000, max: 1950000, period: 'bulan' },
    gender: 'putra',
    genderLabel: 'Kamar Putra',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'water_heater', 'furnished', 'desk', 'parking_motor', 'access_card', 'security'],
    facilityChips: ['Kamar Putra', 'Jalan Kaki Kampus', 'Fiber WiFi 200M'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'medium',
      studentDensity: 'high',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 5,
      social: 3,
      privacy: 5,
      community: 3,
      cleanliness: 5,
      convenience: 5
    },
    suitableFor: [
      'Ingin bisa jalan kaki 3 menit ke kampus IPB',
      'Koneksi internet super cepat untuk tugas & gaming',
      'Kamar mandi dalam & water heater',
      'Privasi tinggi tanpa bising lalu lintas'
    ],
    rules: [
      'Akses kartu pintar 24 jam',
      'Khusus mahasiswa putra IPB',
      'Dilarang merokok dalam kamar'
    ],
    rating: 4.9,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 16,
      availableRooms: 1,
      status: 'Sisa 1 Kamar!'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Studio Gaming & Study AC',
        price: 1950000,
        size: '4x4 m',
        facilities: ['Kasur King Koil', 'Meja Ergonomis', 'AC 1 PK', 'Water Heater', 'Fiber Optic 200Mbps'],
        available: 1
      }
    ],
    owner: {
      name: 'Mas Dimas Alamsyah',
      phone: '6281299887766',
      whatsapp: '6281299887766',
      responseRate: '100%',
      responseTime: '< 5 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-01-05T08:00:00.000Z'
  },
  {
    id: 'wisma-cibanteng-ekonomis',
    name: 'Wisma Cibanteng Ekonomis',
    slug: 'wisma-cibanteng-ekonomis',
    badge: null,
    description: 'Kos super murah di area Cibanteng dekat Gerbang 2 IPB. Lingkungan sederhana, aman, dan sangat cocok bagi mahasiswa yang mencari hunian ramah anggaran.',
    location: {
      area: 'cibanteng',
      areaName: 'Cibanteng, Bogor',
      address: 'Jl. Raya Cibanteng No. 88, Ciampea, Bogor',
      latitude: -6.5680,
      longitude: 106.7180
    },
    distanceFromIPB: 1.3,
    priceMin: 750000,
    priceMax: 950000,
    pricing: { min: 750000, max: 950000, period: 'bulan' },
    gender: 'putra',
    genderLabel: 'Kamar Putra',
    facilities: ['wifi', 'furnished', 'desk', 'parking_motor', 'kitchen'],
    facilityChips: ['Kamar Putra', 'Ekonomis', 'Dekat Pintu 2'],
    environment: {
      noiseLevel: 'medium',
      socialLevel: 'high',
      studentDensity: 'high',
      cleanlinessLevel: 'medium'
    },
    personality: {
      quiet: 3,
      social: 4,
      privacy: 3,
      community: 4,
      cleanliness: 3,
      convenience: 4
    },
    suitableFor: [
      'Anggaran ketat di bawah Rp 800.000',
      'Lokasi praktis ke Pintu 2 Kampus IPB',
      'Suka suasana kekeluargaan sesama mahasiswa',
      'Fasilitas dasar lengkap'
    ],
    rules: [
      'Jagalah ketertiban umum',
      'Parkir motor di dalam area berkanopi'
    ],
    rating: 4.4,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 18,
      availableRooms: 6,
      status: 'Tersedia 6 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard Kipas Angin',
        price: 750000,
        size: '3x3 m',
        facilities: ['Kasur Single', 'Lemari', 'Meja', 'Kipas Angin', 'Wi-Fi'],
        available: 6
      }
    ],
    owner: {
      name: 'Ibu Sri',
      phone: '6289654321098',
      whatsapp: '6289654321098',
      responseRate: '90%',
      responseTime: '< 45 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-02-12T08:00:00.000Z'
  },
  {
    id: 'residence-dramaga-cantik-suite',
    name: 'Residence Dramaga Cantik Suite',
    slug: 'residence-dramaga-cantik-suite',
    badge: 'Populer',
    badgeColor: 'amber',
    description: 'Kos eksekutif premium tipe campur dengan bangunan modern 3 lantai di Perumahan Dramaga Cantik. Lingkungan tenang, aman, dengan fasilitas kamar mandi dalam water heater & AC.',
    location: {
      area: 'dramaga',
      areaName: 'Dramaga, Bogor',
      address: 'Perum Dramaga Cantik Blok B3 No. 8, Bogor',
      latitude: -6.5620,
      longitude: 106.7320
    },
    distanceFromIPB: 1.4,
    priceMin: 1700000,
    priceMax: 2300000,
    pricing: { min: 1700000, max: 2300000, period: 'bulan' },
    gender: 'campur',
    genderLabel: 'Kamar Campur',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'water_heater', 'furnished', 'desk', 'parking_car', 'parking_motor', 'laundry', 'security', 'living_room'],
    facilityChips: ['Kamar Campur', 'Parkir Mobil', 'Water Heater'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'medium',
      studentDensity: 'medium',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 5,
      social: 3,
      privacy: 5,
      community: 4,
      cleanliness: 5,
      convenience: 5
    },
    suitableFor: [
      'Mahasiswa pascasarjana / tingkat akhir',
      'Membawa kendaraan mobil pribadi',
      'Menginginkan fasilitas hotel bintang 3',
      'Keamanan tingkat tinggi 24 jam'
    ],
    rules: [
      'Keamanan security portal perumahan',
      'Batas bertamu jam 22.00 WIB'
    ],
    rating: 4.9,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 12,
      availableRooms: 2,
      status: 'Sisa 2 Kamar!'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Executive Suite AC Water Heater',
        price: 2300000,
        size: '4x5 m',
        facilities: ['Kasur King Size', 'AC 1 PK', 'Water Heater', 'Smart TV', 'Balkon'],
        available: 2
      }
    ],
    owner: {
      name: 'Ibu Dr. Endang',
      phone: '628111223344',
      whatsapp: '628111223344',
      responseRate: '100%',
      responseTime: '< 10 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  {
    id: 'kost-balungbangjaya-asri',
    name: 'Kost Balungbangjaya Asri',
    slug: 'kost-balungbangjaya-asri',
    badge: null,
    description: 'Kos berkonsep hijau nan tenang di Cikemeuh Balungbangjaya. Cocok bagi mahasiswa yang menyukai suasana alam sejuk dan minim kebisingan jalan raya.',
    location: {
      area: 'balungbangjaya',
      areaName: 'Balungbangjaya, Bogor',
      address: 'Gg. Cikemeuh No. 22, Balungbangjaya, Bogor',
      latitude: -6.5590,
      longitude: 106.7410
    },
    distanceFromIPB: 2.1,
    priceMin: 1250000,
    priceMax: 1650000,
    pricing: { min: 1250000, max: 1650000, period: 'bulan' },
    gender: 'campur',
    genderLabel: 'Kamar Campur',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'parking_car', 'parking_motor', 'laundry', 'security'],
    facilityChips: ['Kamar Campur', 'Suasana Asri', 'Parkir Mobil'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'low',
      studentDensity: 'medium',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 5,
      social: 2,
      privacy: 5,
      community: 3,
      cleanliness: 5,
      convenience: 4
    },
    suitableFor: [
      'Menyukai lingkungan perdesaan sejuk',
      'Sering belajar malam tanpa bising',
      'Membawa kendaraan pribadi'
    ],
    rules: [
      'Menjaga kebersihan kebun bersama',
      'Dilarang membuat gaduh'
    ],
    rating: 4.7,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 14,
      availableRooms: 2,
      status: 'Tersedia 2 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard AC KM Dalam',
        price: 1650000,
        size: '3.5x4 m',
        facilities: ['Kasur Springbed', 'AC 1/2 PK', 'Kamar Mandi Dalam'],
        available: 2
      }
    ],
    owner: {
      name: 'Pak Agus Trikuncoro',
      phone: '6281809876543',
      whatsapp: '6281809876543',
      responseRate: '96%',
      responseTime: '< 20 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-01-20T08:00:00.000Z'
  },
  {
    id: 'kost-babakan-lio-putri-bebas',
    name: 'Kost Babakan Lio Putri Smart',
    slug: 'kost-babakan-lio-putri-bebas',
    badge: null,
    description: 'Kos khusus putri dengan sistem kunci pintu digital otomatis. Cocok bagi mahasiswi aktif organisasi atau laboratorium yang sering pulang larut malam.',
    location: {
      area: 'babakan',
      areaName: 'Babakan Lio, Bogor',
      address: 'Gg. Babakan Lio No. 18, Dramaga, Bogor',
      latitude: -6.5529,
      longitude: 106.7240
    },
    distanceFromIPB: 0.8,
    priceMin: 850000,
    priceMax: 1200000,
    pricing: { min: 850000, max: 1200000, period: 'bulan' },
    gender: 'putri',
    genderLabel: 'Kamar Putri',
    facilities: ['wifi', 'furnished', 'desk', 'parking_motor', 'kitchen', 'access_card', 'refrigerator'],
    facilityChips: ['Kamar Putri', 'Kunci Akses Digital', 'Jalan Kaki Kampus'],
    environment: {
      noiseLevel: 'medium',
      socialLevel: 'medium',
      studentDensity: 'high',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 4,
      social: 3,
      privacy: 4,
      community: 3,
      cleanliness: 4,
      convenience: 5
    },
    suitableFor: [
      'Mahasiswi aktif lab / organisasi',
      'Ingin akses mudah 24 jam tanpa kunci fisik',
      'Jalan kaki 8 menit ke pintu Bara IPB'
    ],
    rules: [
      'Akses kartu pintar individu',
      'Menjaga ketenangan koridor'
    ],
    rating: 4.5,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c517a?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 15,
      availableRooms: 4,
      status: 'Tersedia 4 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard Non-AC KM Luar',
        price: 850000,
        size: '3x3 m',
        facilities: ['Kasur Single', 'Lemari', 'Meja', 'Wi-Fi 100Mbps'],
        available: 3
      }
    ],
    owner: {
      name: 'Pak Hendra',
      phone: '6285711223344',
      whatsapp: '6285711223344',
      responseRate: '92%',
      responseTime: '< 1 jam'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-02-10T08:00:00.000Z'
  },
  {
    id: 'd-laladon-residence',
    name: 'D\'Laladon Co-Living',
    slug: 'd-laladon-residence',
    badge: null,
    description: 'Kos eksklusif tipe campur berkonsep co-living dekat Terminal Laladon. Dilengkapi rooftop lounge santai untuk berkumpul sesama penghuni.',
    location: {
      area: 'laladon',
      areaName: 'Laladon, Bogor',
      address: 'Perum Laladon Permai Blok C4 No. 15, Bogor',
      latitude: -6.5720,
      longitude: 106.7510
    },
    distanceFromIPB: 3.8,
    priceMin: 1300000,
    priceMax: 1900000,
    pricing: { min: 1300000, max: 1900000, period: 'bulan' },
    gender: 'campur',
    genderLabel: 'Kamar Campur',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'water_heater', 'parking_car', 'parking_motor', 'laundry', 'security'],
    facilityChips: ['Kamar Campur', 'Rooftop Lounge', 'Free Laundry'],
    environment: {
      noiseLevel: 'medium',
      socialLevel: 'high',
      studentDensity: 'medium',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 3,
      social: 5,
      privacy: 4,
      community: 5,
      cleanliness: 5,
      convenience: 4
    },
    suitableFor: [
      'Menyukai konsep co-living kekinian',
      'Sering bepergian ke Stasiun Bogor & Kota',
      'Gratis layanan laundry 15kg/bulan'
    ],
    rules: [
      'Bebas bertanggung jawab',
      'Rooftop buka hingga jam 23.00 WIB'
    ],
    rating: 4.6,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 10,
      availableRooms: 3,
      status: 'Tersedia 3 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Deluxe AC Water Heater',
        price: 1800000,
        size: '4x4 m',
        facilities: ['Kasur Springbed', 'AC 1/2 PK', 'Kamar Mandi Dalam', 'Air Panas'],
        available: 3
      }
    ],
    owner: {
      name: 'Pak Rudi',
      phone: '6287890123456',
      whatsapp: '6287890123456',
      responseRate: '94%',
      responseTime: '< 30 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-02-18T08:00:00.000Z'
  },
  {
    id: 'kost-ciherang-asri-putri',
    name: 'Kost Ciherang Asri Putri',
    slug: 'kost-ciherang-asri-putri',
    badge: null,
    description: 'Kos putri tenang di Ciherang Raya dengan suasana hangat kekeluargaan. Pemilik tinggal di depan area kos sehingga keamanan dan kenyamanan sangat terjaga.',
    location: {
      area: 'dramaga',
      areaName: 'Dramaga, Bogor',
      address: 'Jl. Ciherang Raya No. 34, Dramaga, Bogor',
      latitude: -6.5650,
      longitude: 106.7290
    },
    distanceFromIPB: 1.9,
    priceMin: 950000,
    priceMax: 1350000,
    pricing: { min: 950000, max: 1350000, period: 'bulan' },
    gender: 'putri',
    genderLabel: 'Kamar Putri',
    facilities: ['wifi', 'furnished', 'desk', 'parking_motor', 'kitchen', 'refrigerator', 'living_room'],
    facilityChips: ['Kamar Putri', 'Pemilik Pengawasan', 'Dapur Bersama'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'medium',
      studentDensity: 'medium',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 5,
      social: 3,
      privacy: 4,
      community: 4,
      cleanliness: 5,
      convenience: 4
    },
    suitableFor: [
      'Mahasiswi yang mencari suasana aman ibu kost',
      'Anggaran 1 jutaan fasilitas lengkap',
      'Suasana ramah & homy'
    ],
    rules: [
      'Khusus mahasiswi',
      'Jam malam gerbang 22.00 WIB'
    ],
    rating: 4.6,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c517a?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 12,
      availableRooms: 3,
      status: 'Tersedia 3 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard Cozy Non-AC',
        price: 950000,
        size: '3x3.5 m',
        facilities: ['Kasur Single', 'Lemari', 'Meja Belajar', 'Wi-Fi'],
        available: 3
      }
    ],
    owner: {
      name: 'Ibu Ningsih',
      phone: '6285212345678',
      whatsapp: '6285212345678',
      responseRate: '93%',
      responseTime: '< 30 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-02-14T08:00:00.000Z'
  },
  {
    id: 'pondok-cibanteng-asri-putra',
    name: 'Pondok Cibanteng Asri Putra',
    slug: 'pondok-cibanteng-asri-putra',
    badge: null,
    description: 'Kos putra di dekat Gerbang 3 IPB Dramaga. Memiliki lapangan parkir motor luas, akses bebas banjir, dan tetangga penghuni yang solid.',
    location: {
      area: 'cibanteng',
      areaName: 'Cibanteng, Bogor',
      address: 'Jl. Cibanteng Babakan No. 7, Ciampea, Bogor',
      latitude: -6.5695,
      longitude: 106.7195
    },
    distanceFromIPB: 1.5,
    priceMin: 800000,
    priceMax: 1100000,
    pricing: { min: 800000, max: 1100000, period: 'bulan' },
    gender: 'putra',
    genderLabel: 'Kamar Putra',
    facilities: ['wifi', 'furnished', 'desk', 'parking_motor', 'kitchen'],
    facilityChips: ['Kamar Putra', 'Parkir Motor Luas', 'Harga Terjangkau'],
    environment: {
      noiseLevel: 'medium',
      socialLevel: 'high',
      studentDensity: 'high',
      cleanlinessLevel: 'medium'
    },
    personality: {
      quiet: 3,
      social: 4,
      privacy: 3,
      community: 4,
      cleanliness: 4,
      convenience: 4
    },
    suitableFor: [
      'Mahasiswa putra pencari harga terjangkau',
      'Membawa sepeda motor',
      'Suka berteman sesama mahasiswa IPB'
    ],
    rules: [
      'Jagalah kebersihan bersama',
      'Motor diparkir rapi di tempatnya'
    ],
    rating: 4.3,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 10,
      availableRooms: 2,
      status: 'Tersedia 2 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Standard Fan Room',
        price: 800000,
        size: '3x3 m',
        facilities: ['Kasur Single', 'Lemari Pakaian', 'Meja', 'Kipas Angin', 'Wi-Fi'],
        available: 2
      }
    ],
    owner: {
      name: 'Pak H. Syamsul',
      phone: '6281311224455',
      whatsapp: '6281311224455',
      responseRate: '88%',
      responseTime: '< 1 jam'
    },
    verified: false,
    isDemo: true,
    createdAt: '2026-02-20T08:00:00.000Z'
  },
  {
    id: 'villa-laladon-student-house',
    name: 'Villa Laladon Student House',
    slug: 'villa-laladon-student-house',
    badge: null,
    description: 'Kos campur modern 2 lantai dengan teras luar dan lingkungan sejuk. Cocok bagi mahasiswa yang menginginkan kos dengan pencahayaan alami maksimal.',
    location: {
      area: 'laladon',
      areaName: 'Laladon, Bogor',
      address: 'Jl. Laladon Raya No. 56, Bogor Barat',
      latitude: -6.5740,
      longitude: 106.7530
    },
    distanceFromIPB: 3.5,
    priceMin: 1200000,
    priceMax: 1650000,
    pricing: { min: 1200000, max: 1650000, period: 'bulan' },
    gender: 'campur',
    genderLabel: 'Kamar Campur',
    facilities: ['wifi', 'ac', 'bathroom_inside', 'parking_car', 'parking_motor', 'living_room', 'security'],
    facilityChips: ['Kamar Campur', 'Sirkulasi Udara Bagus', 'Parkir Mobil'],
    environment: {
      noiseLevel: 'low',
      socialLevel: 'medium',
      studentDensity: 'medium',
      cleanlinessLevel: 'high'
    },
    personality: {
      quiet: 4,
      social: 3,
      privacy: 4,
      community: 4,
      cleanliness: 5,
      convenience: 4
    },
    suitableFor: [
      'Menyukai kamar dengan ventilasi & jendela besar',
      'Kamar mandi dalam & AC',
      'Parkir kendaraan mobil / motor'
    ],
    rules: [
      'Menjaga kebersihan koridor',
      'Jam tenang jam 22.00 WIB'
    ],
    rating: 4.7,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: {
      totalRooms: 14,
      availableRooms: 4,
      status: 'Tersedia 4 Kamar'
    },
    rooms: [
      {
        id: 'r1',
        name: 'Co-Living AC KM Dalam',
        price: 1650000,
        size: '3.5x4 m',
        facilities: ['Kasur Springbed', 'AC', 'Kamar Mandi Dalam'],
        available: 4
      }
    ],
    owner: {
      name: 'Ibu Fitri',
      phone: '6281988776655',
      whatsapp: '6281988776655',
      responseRate: '97%',
      responseTime: '< 15 menit'
    },
    verified: true,
    isDemo: true,
    createdAt: '2026-01-28T08:00:00.000Z'
  }
];
