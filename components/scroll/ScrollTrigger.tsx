'use client';

import React, { ReactNode } from 'react';

interface ScrollTriggerProps {
  children: ReactNode;
  className?: string;
  threshold?: number; // 0 to 1
  callback?: (el: Element) => void;
  triggerHook?: 'onEnter' | 'onLeave' | 'onCenter';
  once?: boolean;
}

const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  children,
  className = '',
  threshold = 0.5,
  callback,
  triggerHook = 'onCenter',
  once = true,
}) => {
  // Map triggerHook to call value
  const callValue = {
    onEnter: 'enter',
    onLeave: 'exit',
    onCenter: 'default',
  }[triggerHook];

  return (
    <div
      className={className}
      data-scroll
      data-scroll-call={callback ? callValue : undefined}
      data-scroll-offset={`${threshold * 100}%`}
      data-scroll-repeat={!once}
    >
      {children}
    </div>
  );
};

export default ScrollTrigger;
