'use client';

import React, { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';
import { LocomotiveScrollOptions } from 'locomotive-scroll';

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
  const scrollRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initScroll = async () => {
      if (!containerRef.current || scrollRef.current) return;

      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      if (!isMounted || !containerRef.current) return;

      scrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        ...options,
      });

      setIsReady(true);

      const handleResize = () => {
        scrollRef.current?.update();
      };

      window.addEventListener('resize', handleResize);
      window.setTimeout(() => scrollRef.current?.update(), 250);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    let cleanupResize: void | (() => void);
    initScroll().then((cleanup) => {
      cleanupResize = cleanup;
    });

    return () => {
      isMounted = false;
      cleanupResize?.();
      scrollRef.current?.destroy();
      scrollRef.current = null;
    };
  }, [options]);

  return (
    <ScrollContext.Provider value={{ scroll: scrollRef.current, isReady }}>
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
