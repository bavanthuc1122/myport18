"use client"

import Image from "next/image"
import Link from "next/link"

export interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  category: string;
  behanceLink?: string;
}

export default function ImageCard({ src, alt, title, category, behanceLink }: ImageCardProps) {
  const CardContent = () => (
    <div className="aspect-[3/4] w-full bg-white relative">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={600}
        loading="lazy"
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
        <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
        <p className="text-gray-300 text-sm">{category}</p>
      </div>
    </div>
  );

  // Nếu có behanceLink, bọc trong Link component
  if (behanceLink) {
    return (
      <Link href={behanceLink} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden">
        <CardContent />
      </Link>
    );
  }

  // Nếu không có behanceLink, chỉ hiển thị card
  return (
    <div className="group relative overflow-hidden">
      <CardContent />
    </div>
  );
}