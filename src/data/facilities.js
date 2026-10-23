export const FACILITIES = [
  { id: 'wifi', name: 'Wi-Fi Gratis', category: 'basic', icon: 'Wifi' },
  { id: 'ac', name: 'Pendingin Ruangan (AC)', category: 'comfort', icon: 'Wind' },
  { id: 'bathroom_inside', name: 'Kamar Mandi Dalam', category: 'privacy', icon: 'Bath' },
  { id: 'water_heater', name: 'Air Panas', category: 'comfort', icon: 'Flame' },
  { id: 'furnished', name: 'Kasur & Lemari', category: 'basic', icon: 'Bed' },
  { id: 'desk', name: 'Meja Belajar', category: 'study', icon: 'BookOpen' },
  { id: 'parking_motor', name: 'Parkir Motor', category: 'parking', icon: 'Bike' },
  { id: 'parking_car', name: 'Parkir Mobil', category: 'parking', icon: 'Car' },
  { id: 'laundry', name: 'Layanan Laundry', category: 'services', icon: 'Shirt' },
  { id: 'kitchen', name: 'Dapur Bersama', category: 'shared', icon: 'Utensils' },
  { id: 'refrigerator', name: 'Kulkas Bersama', category: 'shared', icon: 'Refrigerator' },
  { id: 'living_room', name: 'Ruang Tamu / Komunal', category: 'shared', icon: 'Users' },
  { id: 'security', name: 'Keamanan 24 Jam / CCTV', category: 'security', icon: 'ShieldCheck' },
  { id: 'access_card', name: 'Akses 24 Jam', category: 'security', icon: 'Key' }
];

export const FACILITY_MAP = FACILITIES.reduce((acc, fac) => {
  acc[fac.id] = fac;
  return acc;
}, {});
