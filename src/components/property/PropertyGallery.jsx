import React, { useState } from 'react';
import { Image as ImageIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PropertyGallery({ images = [], title = 'Kost' }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const safeImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'];

  const mainImage = safeImages[activeImageIndex] || safeImages[0];

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Image View */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative group h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm border border-slate-100"
      >
        <img
          src={mainImage}
          alt={`${title} - foto ${activeImageIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Image Counter Badge */}
        <div className="absolute bottom-3 right-3 px-3 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold rounded-lg flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{activeImageIndex + 1} / {safeImages.length} Foto</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-20 w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-600/30 scale-102'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-200 hover:text-white rounded-full hover:bg-slate-700 transition-colors z-50"
            aria-label="Tutup galeri"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={mainImage}
              alt={`${title} full view`}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            {safeImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 p-3 bg-slate-800/80 text-white rounded-full hover:bg-slate-700 transition-colors"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 p-3 bg-slate-800/80 text-white rounded-full hover:bg-slate-700 transition-colors"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
