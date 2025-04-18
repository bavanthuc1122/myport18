'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SectionSlideshow({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const validImages = images?.filter(img => img && img.url) || [];

  // Tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % validImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  // Chuyển đến slide trước
  const prevSlide = () => {
    if (validImages.length <= 1) return;
    setActiveIndex((current) => (current - 1 + validImages.length) % validImages.length);
  };

  // Chuyển đến slide tiếp theo
  const nextSlide = () => {
    if (validImages.length <= 1) return;
    setActiveIndex((current) => (current + 1) % validImages.length);
  };

  // Nếu không có hình ảnh
  if (!validImages || validImages.length === 0) {
    return (
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
        <span className="text-gray-400">Không có hình ảnh nào được chọn</span>
      </div>
    );
  }

  return (
    <div className="slideshow-container relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-900">
      {validImages.map((img, i) => (
        <div
          key={`section-slide-${img._key || i}`}
          className={`slideshow-slide absolute inset-0 transition-opacity duration-500 ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={img.url}
            alt={img?.alt || `Slideshow image ${i + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}

      {/* Slideshow controls - chỉ hiển thị nếu có nhiều hơn 1 hình ảnh */}
      {validImages.length > 1 && (
        <>
          <div className="slideshow-controls absolute inset-0 flex items-center justify-between p-4">
            <button 
              className="slideshow-control bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              onClick={prevSlide}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="slideshow-control bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              onClick={nextSlide}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slideshow indicators */}
          <div className="slideshow-indicators absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {validImages.map((_, i) => (
              <button
                key={`indicator-${i}`}
                className={`slideshow-indicator w-2 h-2 rounded-full ${i === activeIndex ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
