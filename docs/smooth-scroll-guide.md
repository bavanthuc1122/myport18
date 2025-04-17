# Hướng dẫn sử dụng Smooth Scroll và Animation

## Giới thiệu

Dự án này sử dụng CSS `scroll-behavior: smooth` kết hợp với Framer Motion và GSAP để tạo trải nghiệm cuộn mượt mà và animation đẹp mắt. Giải pháp này được đánh giá cao bởi các nhà phát triển vì:

1. **Hiệu suất cao**: Sử dụng CSS native thay vì JavaScript nặng
2. **Tương thích tốt**: Hoạt động trên hầu hết các trình duyệt hiện đại
3. **Dễ tùy chỉnh**: Kết hợp với GSAP và Framer Motion để tạo animation phức tạp
4. **Không có dependencies phức tạp**: Giảm thiểu các thư viện bên thứ ba

## Cách sử dụng

### 1. Smooth Scroll

Smooth scroll đã được thiết lập tự động cho toàn bộ trang web thông qua CSS và component `SmoothScrollProvider`. Bạn không cần làm gì thêm để kích hoạt tính năng này.

#### Cuộn đến một section cụ thể:

```jsx
<a href="#section-id">Cuộn đến section</a>

// Section đích
<section id="section-id" className="scroll-section">
  {/* Nội dung */}
</section>
```

### 2. Animation với Framer Motion

Dự án sử dụng component `AnimatedSection` để tạo animation khi cuộn:

```jsx
<AnimatedSection
  delay={0.2}
  duration={0.8}
  direction="up"
  className="your-class"
>
  {/* Nội dung cần animation */}
</AnimatedSection>
```

#### Các tham số:

- `delay`: Thời gian trễ trước khi bắt đầu animation (giây)
- `duration`: Thời gian diễn ra animation (giây)
- `direction`: Hướng animation (up, down, left, right)
- `distance`: Khoảng cách di chuyển (pixel)

### 3. Animation với CSS

Bạn có thể sử dụng các class CSS có sẵn để tạo animation:

```jsx
<div className="fade-in">
  {/* Nội dung sẽ hiện dần */}
</div>

<div className="slide-up">
  {/* Nội dung sẽ trượt lên */}
</div>

<div className="scale-in">
  {/* Nội dung sẽ phóng to dần */}
</div>
```

Để kích hoạt animation khi phần tử xuất hiện trong viewport, thêm class `is-inview` khi phần tử được nhìn thấy:

```jsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  const elements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
  elements.forEach(el => observer.observe(el));
  
  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
}, []);
```

### 4. Animation nâng cao với GSAP

Để sử dụng GSAP cho animation phức tạp hơn:

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MyComponent() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Đăng ký plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Tạo animation
    gsap.from('.element', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
    
    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="scroll-section">
      <div className="element">Element 1</div>
      <div className="element">Element 2</div>
      <div className="element">Element 3</div>
    </section>
  );
}
```

## Tối ưu hóa hiệu suất

1. **Sử dụng `will-change`**: Đã được thiết lập trong CSS
2. **Hardware acceleration**: Sử dụng `transform: translateZ(0)` và `backface-visibility: hidden`
3. **Lazy loading**: Chỉ kích hoạt animation khi phần tử xuất hiện trong viewport
4. **Throttle/Debounce**: Giảm số lần gọi hàm khi cuộn

## So sánh với Locomotive Scroll

| Tính năng | CSS Smooth Scroll + GSAP | Locomotive Scroll |
|-----------|--------------------------|-------------------|
| Hiệu suất | Cao | Trung bình |
| Tương thích | Tốt (>95% trình duyệt) | Tốt |
| Kích thước | Nhỏ | Lớn |
| Tùy biến | Cao | Cao |
| Độ phức tạp | Thấp | Cao |
| Hỗ trợ cộng đồng | Rất tốt | Tốt |

## Lưu ý

- Nếu cần animation phức tạp hơn, hãy sử dụng GSAP ScrollTrigger
- Đảm bảo tất cả các section đều có class `scroll-section`
- Sử dụng Intersection Observer để kích hoạt animation khi phần tử xuất hiện trong viewport
