'use client';

import { useState, useEffect } from 'react';

export default function SectionSlideshow({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Kiểm tra và lọc các hình ảnh hợp lệ
  const validImages = images?.filter(img => {
    if (!img) return false;

    // Kiểm tra xem hình ảnh có URL hay không
    if (img.url) return true;

    // Nếu không có URL trực tiếp, kiểm tra xem có asset hay không
    if (img.asset || (img.image && img.image.asset)) {
      console.log('Image with asset but no URL in section slideshow:', img);
      return true; // Chấp nhận hình ảnh có asset nhưng không có URL
    }

    console.warn('Invalid image in section slideshow:', img);
    return false;
  }) || [];

  // Ghi log số lượng hình ảnh hợp lệ
  console.log(`SectionSlideshow: Found ${validImages.length} valid images out of ${images?.length || 0}`);
  if (validImages.length > 0) {
    console.log('First valid image:', validImages[0]);
  }

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
      {validImages.map((img, i) => {
        // Xử lý URL hình ảnh
        let imageUrl = '';
        if (img.url) {
          // Nếu đã có URL
          imageUrl = img.url;
        } else if (img.asset) {
          // Nếu có asset trực tiếp, sử dụng URL tạm thời
          imageUrl = `https://cdn.sanity.io/images/8ucvng19/production/${img.asset._ref.replace('image-', '').replace(/(-[a-z]+)$/, '.$1').replace('-', '.')}`;
        } else if (img.image && img.image.asset) {
          // Nếu có asset trong trường image, sử dụng URL tạm thời
          imageUrl = `https://cdn.sanity.io/images/8ucvng19/production/${img.image.asset._ref.replace('image-', '').replace(/(-[a-z]+)$/, '.$1').replace('-', '.')}`;
        } else {
          // Fallback
          imageUrl = '/placeholder.svg?height=675&width=1200';
        }

        return (
          <div
            key={`section-slide-${img._key || i}`}
            className={`slideshow-slide absolute inset-0 transition-opacity duration-500 ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Sử dụng thẻ img thông thường thay vì component Image */}
            <img
              src={imageUrl}
              alt={img?.alt || `Slideshow image ${i + 1}`}
              className="w-full h-full object-cover"
              style={{ display: i === activeIndex ? 'block' : 'none' }}
              onLoad={() => console.log(`Section image ${i} loaded:`, imageUrl)}
              onError={(e) => {
                console.error(`Error loading section image ${i}:`, imageUrl);
                e.target.src = '/placeholder.svg?height=675&width=1200';
              }}
            />
          </div>
        );
      })}

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
