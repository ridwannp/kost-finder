import { useEffect } from 'react';

/**
 * Reusable SEO component to dynamically manage title and meta descriptions
 */
export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Set Page Title
    const appTitle = 'IPB Kost Finder | Pencari Kost Mahasiswa IPB Dramaga';
    document.title = title ? `${title} | IPB Kost Finder` : appTitle;

    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      description ||
        'Platform pencarian dan rekomendasi tempat kos terbaik untuk mahasiswa IPB University, Dramaga, Bogor. Filter lokasi, harga, gender, dan fasilitas lengkap.'
    );

    // Set Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      keywords ||
        'kost ipb, kost dramaga, kost babakan raya, kost murah ipb, kost putri ipb, kost putra ipb, kost ipb dramaga'
    );
  }, [title, description, keywords]);

  return null;
}
