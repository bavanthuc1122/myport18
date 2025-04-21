'use client';

import React, { ReactNode, useRef, useEffect } from 'react';
import { useScroll } from './ScrollProvider';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  speed?: number; // Parallax speed
  direction?: 'vertical' | 'horizontal';
  targetElement?: string; // Element to target for parallax
  as?: keyof JSX.IntrinsicElements;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className = '',
  id,
  speed = 0,
  direction = 'vertical',
  targetElement,
  as: Component = 'section',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scroll } = useScroll();

  useEffect(() => {
    // If we have a scroll instance and a target element for parallax
    if (scroll && targetElement && sectionRef.current) {
      const target = sectionRef.current.querySelector(targetElement);
      
      if (target) {
        // Update scroll for new elements
        scroll.update();
      }
    }
  }, [scroll, targetElement]);

  const dataScrollProps = {
    'data-scroll': true,
    'data-scroll-section': true,
    ...(speed !== 0 && { 'data-scroll-speed': speed }),
    ...(direction === 'horizontal' && { 'data-scroll-direction': 'horizontal' }),
  };

  return (
    <Component
      ref={sectionRef}
      className={className}
      id={id}
      {...dataScrollProps}
    >
      {children}
    </Component>
  );
};

export default ScrollSection;
