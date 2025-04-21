'use client';

import React from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 1,
  className = '',
  width = 1000,
  height = 1000,
  priority = false,
  quality = 90,
}) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      data-scroll
      data-scroll-speed={speed}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        priority={priority}
        quality={quality}
      />
    </div>
  );
};

export default ParallaxImage;
