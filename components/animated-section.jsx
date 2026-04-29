"use client";

import { useEffect, useRef } from 'react';

export default function AnimatedSection({
  children,
  className = "",
  delay = 0.2,
  direction = "up",
  ...props
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Sử dụng Intersection Observer để thêm class khi section xuất hiện
    if (typeof IntersectionObserver !== 'undefined' && sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Thêm class và style để tạo hiệu ứng mượt mà
              entry.target.classList.add('in-view');
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';

              // Ngừng theo dõi sau khi đã hiển thị
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1, // Chỉ cần hiển thị 10% là kích hoạt
          rootMargin: '0px 0px -10% 0px' // Kích hoạt sớm hơn một chút
        }
      );

      observer.observe(sectionRef.current);

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }
  }, []);

  // Tính toán style ban đầu dựa trên hướng
  const getInitialStyle = () => {
    const baseStyle = { opacity: 0 };

    switch(direction) {
      case "up":
        return { ...baseStyle, transform: `translateY(20px)` };
      case "down":
        return { ...baseStyle, transform: `translateY(-20px)` };
      case "left":
        return { ...baseStyle, transform: `translateX(20px)` };
      case "right":
        return { ...baseStyle, transform: `translateX(-20px)` };
      default:
        return { ...baseStyle, transform: `translateY(20px)` };
    }
  };

  // Tính toán transition-delay dựa trên prop delay
  const getTransitionStyle = () => {
    return {
      transitionDelay: `${delay}s`,
      transitionProperty: 'opacity, transform',
      transitionDuration: 'var(--transition-duration)',
      transitionTimingFunction: 'var(--transition-timing)'
    };
  };

  return (
    <section
      ref={sectionRef}
      className={`${className} animated-section`}
      style={{ ...getInitialStyle(), ...getTransitionStyle() }}
      {...props}
    >
      {children}
    </section>
  );
}
