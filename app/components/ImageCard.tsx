"use client"

import Image from "next/image"

export interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  category: string;
}

export default function ImageCard({ src, alt, title, category }: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden">
      <div className="aspect-[3/4] w-full bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
          <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{category}</p>
        </div>
      </div>
    </div>
  )
} 