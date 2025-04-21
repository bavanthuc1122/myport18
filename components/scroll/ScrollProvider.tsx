'use client';

import React, { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';
import { LocomotiveScrollOptions } from 'locomotive-scroll';
import { useLocomotiveScroll } from '@studio-freight/react-locomotive-scroll';

interface ScrollContextType {
  scroll: any;
  isReady: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
  scroll: null,
  isReady: false,
});

export const useScroll = () => useContext(ScrollContext);

interface ScrollProviderProps {
  children: ReactNode;
  options?: LocomotiveScrollOptions;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ 
  children,
  options = {
    smooth: true,
    multiplier: 1,
    class: 'is-revealed',
    lerp: 0.1, // Linear Interpolation, 0 > 1 > Smoother
    smartphone: {
      smooth: true,
      multiplier: 1,
    },
    tablet: {
      smooth: true,
      multiplier: 1,
    },
  }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const { scroll } = useLocomotiveScroll({
    el: containerRef.current,
    ...options,
  });

  useEffect(() => {
    if (scroll) {
      // Locomotive Scroll is ready
      setIsReady(true);

      // Update scroll on page resize
      const handleResize = () => {
        scroll.update();
      };

      window.addEventListener('resize', handleResize);

      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        if (scroll) scroll.destroy();
      };
    }
  }, [scroll]);

  return (
    <ScrollContext.Provider value={{ scroll, isReady }}>
      <div 
        data-scroll-container 
        ref={containerRef}
        className="scroll-container"
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};
