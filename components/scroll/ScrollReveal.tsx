'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
// Động import ScrollReveal để tránh lỗi SSR
import dynamic from 'next/dynamic';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: string;
  origin?: 'top' | 'right' | 'bottom' | 'left' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
  easing?: string;
  reset?: boolean;
  viewFactor?: number;
  mobile?: boolean;
  interval?: number;
  opacity?: number;
  scale?: number;
  rotate?: { x: number; y: number; z: number };
  cleanup?: boolean;
  useDelay?: 'always' | 'onload' | 'once';
  beforeReveal?: (domEl: HTMLElement) => void;
  afterReveal?: (domEl: HTMLElement) => void;
}

const ScrollRevealComponent: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 200,
  duration = 1000,
  distance = '50px',
  origin = 'bottom',
  easing = 'cubic-bezier(0.5, 0, 0, 1)',
  reset = false,
  viewFactor = 0.2,
  mobile = true,
  interval = 0,
  opacity = 0,
  scale = 1,
  rotate = { x: 0, y: 0, z: 0 },
  cleanup = true,
  useDelay = 'always',
  beforeReveal,
  afterReveal,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Động import ScrollReveal
    const importScrollReveal = async () => {
      const ScrollRevealModule = await import('scrollreveal');
      const ScrollReveal = ScrollRevealModule.default;

      // Configure ScrollReveal
      const sr = ScrollReveal({
        delay,
        duration,
        distance,
        origin,
        easing,
        reset,
        viewFactor,
        mobile,
        interval,
        opacity,
        scale,
        rotate,
        cleanup,
        useDelay,
        beforeReveal,
        afterReveal,
      });

      if (sectionRef.current) {
        sr.reveal(sectionRef.current);
      }

      return sr;
    };

    let scrollRevealInstance: any;
    importScrollReveal().then(sr => {
      scrollRevealInstance = sr;
    });

    return () => {
      if (cleanup && sectionRef.current && scrollRevealInstance) {
        scrollRevealInstance.clean(sectionRef.current);
      }
    };
  }, [delay, duration, distance, origin, easing, reset, viewFactor, mobile, interval, opacity, scale, rotate, cleanup, useDelay, beforeReveal, afterReveal]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollRevealComponent;
