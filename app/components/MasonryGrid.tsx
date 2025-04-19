"use client"

import Masonry from 'react-masonry-css'
import ImageCard from '../components/ImageCard'
import { urlFor } from '@/lib/sanity'

interface MasonryGridProps {
  items: {
    id?: number;
    _id?: string;
    src?: string;
    imageSource?: string;
    coverImage?: any;
    imageUrl?: string;
    title: string;
    category?: string | { title?: string; _ref?: string; };
    behanceLink?: string;
  }[];
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const breakpointColumns = {
    default: 6,
    1536: 5, // 2xl
    1280: 4, // xl
    1024: 3, // lg
    768: 2,  // md
    640: 2,  // sm
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item) => {
        // Xác định src cho hình ảnh
        let imageSrc = '';

        if (item.src) {
          // Nếu có src trực tiếp (dữ liệu cũ)
          imageSrc = item.src;
        } else if (item.imageSource === 'upload' && item.coverImage) {
          // Nếu là ảnh tải lên từ Sanity
          imageSrc = urlFor(item.coverImage).width(400).height(600).url();
        } else if (item.imageSource === 'url' && item.imageUrl) {
          // Nếu là URL bên ngoài
          imageSrc = item.imageUrl;
        } else {
          // Fallback
          imageSrc = '/placeholder.svg?height=600&width=400';
        }

        // Xác định category
        let category = 'Uncategorized';
        if (typeof item.category === 'string') {
          category = item.category;
        } else if (item.category && typeof item.category === 'object') {
          category = (item.category as { title?: string }).title || 'Uncategorized';
        }

        return (
          <div key={item._id || item.id || Math.random().toString()} className="mb-2">
            <ImageCard
              src={imageSrc}
              alt={item.title}
              title={item.title}
              category={category}
              behanceLink={item.behanceLink}
            />
          </div>
        );
      })}
    </Masonry>
  )
}