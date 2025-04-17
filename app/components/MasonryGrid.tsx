"use client"

import Masonry from 'react-masonry-css'
import ImageCard from '../components/ImageCard'

interface MasonryGridProps {
  items: {
    id: number;
    src: string;
    title: string;
    category: string;
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
      {items.map((item) => (
        <div key={item.id} className="mb-2">
          <ImageCard
            src={item.src}
            alt={item.title}
            title={item.title}
            category={item.category}
          />
        </div>
      ))}
    </div>
  )
} 