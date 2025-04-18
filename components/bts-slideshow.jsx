'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function BtsSlideshow({ btsSections }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Lấy tất cả hình ảnh từ các section và lọc bỏ các hình ảnh không hợp lệ
  const allImages = btsSections?.flatMap((section, sectionIndex) =>
    (section.images || []).map((img, imgIndex) => ({
      ...img,
      _key: img._key ? `${img._key}-${sectionIndex}-${imgIndex}` : `img-${sectionIndex}-${imgIndex}`
    }))
  ).filter(img => img && img.url) || []

  // Tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    if (allImages.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % allImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [allImages.length])

  // Chuyển đến slide trước
  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + allImages.length) % allImages.length)
  }

  // Chuyển đến slide tiếp theo
  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % allImages.length)
  }

  // Chuyển đến slide cụ thể
  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  // Kiểm tra xem có hình ảnh không
  if (!allImages || allImages.length === 0) {
    return (
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-900">
        <Image
          src="/placeholder.svg?height=675&width=1200"
          alt="Slideshow placeholder"
          fill
          className="object-cover"
        />
      </div>
    )
  }

  // Kiểm tra xem hình ảnh có hợp lệ không
  const isValidImage = (img) => {
    return img && img.url
  }

  return (
    <div>
      <div className="slideshow-container relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-900">
        {allImages.map((img, i) => {
          const validImage = isValidImage(img)

          return (
            <div
              key={img?._key || `slide-${i}`}
              className={`slideshow-slide absolute inset-0 transition-opacity duration-500 ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={validImage ? img.url : '/placeholder.svg?height=675&width=1200'}
                alt={img?.alt || `Slideshow image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          )
        })}

        {/* Slideshow controls */}
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
          {allImages.map((_, i) => (
            <button
              key={`indicator-${i}`}
              className={`slideshow-indicator w-2 h-2 rounded-full ${i === activeIndex ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="slideshow-thumbnails mt-4 grid grid-cols-5 gap-2">
        {allImages.slice(0, 5).map((img, i) => {
          const validImage = isValidImage(img)

          return (
            <button
              key={img?._key || `thumb-${i}`}
              className={`slideshow-thumbnail relative aspect-video rounded-md overflow-hidden bg-gray-900 cursor-pointer ${i === activeIndex ? 'ring-2 ring-white' : ''}`}
              onClick={() => goToSlide(i)}
            >
              <Image
                src={validImage ? img.url : '/placeholder.svg?height=120&width=200'}
                alt={img?.alt || `Thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
